import { config } from "@/lib/config";

/** "development" locally (never indexed), "production" on the live site. */
export const siteEnv = config.siteEnv;
export const isIndexable = siteEnv !== "development";
