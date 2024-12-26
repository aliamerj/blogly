import Stripe from "stripe";
import { stripe } from "../../../../lib/stripe";
import { databaseDrizzle } from "../../../../db/database"
import { subscriptions, users } from "../../../../db/schemas/users";
import { eq } from "drizzle-orm";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {


  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          { expand: ["line_items"] }
        );

        const customerId = session.customer as string;
        const customerDetails = session.customer_details;

        if (customerDetails?.email) {
          const user = await databaseDrizzle.query.users.findFirst({
            where: (u, opt) => opt.eq(u.email, customerDetails.email!),
          });

          if (!user) {
            throw new Error("User not found");
          }

          const lineItems = session.line_items?.data || [];
          for (const item of lineItems) {
            const endDate = new Date();
            const priceId = item.price?.id;

            if (priceId === process.env.STRIPE_YEARLY_PRICE_ID) {
              endDate.setFullYear(endDate.getFullYear() + 1);
            } else if (priceId === process.env.STRIPE_MONTHLY_PRICE_ID) {
              endDate.setMonth(endDate.getMonth() + 1);
            } else {
              throw new Error("Invalid priceId");
            }

            await databaseDrizzle.transaction(async (tx) => {
              await tx
                .insert(subscriptions)
                .values({
                  id: customerId,
                  userId: user.id,
                  period: priceId === process.env.STRIPE_MONTHLY_PRICE_ID ? "MONTHLY" : "YEARLY",
                  endAt: endDate,
                })
                .onConflictDoUpdate({
                  target: subscriptions.id,
                  set: {
                    userId: user.id,
                    period: priceId === process.env.STRIPE_MONTHLY_PRICE_ID ? "MONTHLY" : "YEARLY",
                    endAt: endDate,
                  },
                });

              await tx.update(users).set({
                plan: "PRO",
              }).where(eq(users.id, user.id));
            });
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = await stripe.subscriptions.retrieve(
          (event.data.object as Stripe.Subscription).id
        );

        const sub = await databaseDrizzle.query.subscriptions.findFirst({
          where: (sub, opt) => opt.eq(sub.id, subscription.customer as string),
        });

        if (!sub) {
          return new Response("Subscription not found for this customer", { status: 404 });
        }

        await databaseDrizzle.update(users).set({
          plan: "FREE",
        }).where(eq(users.id, sub.userId));
        break;
      }

      case "customer.deleted": {
        const customerId = (event.data.object as Stripe.Customer).id;

        const sub = await databaseDrizzle.query.subscriptions.findFirst({
          where: (sub, opt) => opt.eq(sub.id, customerId),
        });

        if (sub) {
          await databaseDrizzle.update(users).set({
            plan: "FREE",
          }).where(eq(users.id, sub.userId));
        }

        // Optionally clean up related subscription records
        await databaseDrizzle.delete(subscriptions).where(eq(subscriptions.id, customerId));
        break;
      }

    }
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  return new Response("Webhook received", { status: 200 });
}

