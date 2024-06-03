import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as users from "./schemas/users";
import * as blogs from "./schemas/blogs";
import path from "path";
const schema = {
  ...users,
  ...blogs,
};

const connection = process.env.DRIZZLE_DATABASE_URL as string;
const queryClient = postgres(connection, { max: 1 });
export const databaseDrizzle = drizzle(queryClient, { schema });
export const migrationClient = migrate(databaseDrizzle, {
  migrationsFolder: path.join("drizzle"),
});
