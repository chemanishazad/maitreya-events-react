/** "development" on dev.maitreyaevents.com, "production" on the live site. Set at build time by CI. */
export const siteEnv = process.env.SITE_ENV ?? "local";
export const isIndexable = siteEnv !== "development";
