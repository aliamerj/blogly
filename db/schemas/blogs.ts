import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const statusEnum = pgEnum("status", ["draft", "published", "archived"]);
export const visibilityEnum = pgEnum("visibility", [
  "public",
  "private",
  "unlisted",
]);

export const blogs = pgTable("blog", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image"),
  author: text("author").notNull(),
  description: text("description").notNull(),
  status: statusEnum("status").default("draft").notNull(),
  visibility: visibilityEnum("visibility").default("unlisted").notNull(),
  publishTime: timestamp("publish_time"),
});

export const blogsRelations = relations(blogs, ({ one }) => ({
  author: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
}));
