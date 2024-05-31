"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { signInSchema } from "@/schema/user";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignInErrorMessage } from "@/lib/errors/auth/hook";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Loader } from "@/components/loader/Loader";
export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const router =useRouter()
  const params = useSearchParams();
  const errorType = params.get("error");
  const errorMessage = useSignInErrorMessage(
    decodeURIComponent(errorType || ""),
  );
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    startTransition(async() => {
      const login = async () => {
        try {
          await signIn("credentials", data, { redirect: false});
         router.push("/blog") 
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Registration Error",
            description: error.message,
          });
        }
        return;
      };
      await login();
    });
  };
  if (isPending) {
    return <Loader />;
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        {errorMessage && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="email"
                          type="text"
                          placeholder="aliamer19ali@gmail.com"
                          required
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder="******"
                          required
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>{" "}
            </form>
          </Form>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn("google")}
            >
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>{" "}
        </CardContent>
      </Card>
    </div>
  );
}
