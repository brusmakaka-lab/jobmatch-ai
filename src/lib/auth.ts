export const AUTH_COOKIE_NAME = "jobmatch_session";

export function isDemoAuthEnabled() {
  return process.env.DEMO_AUTH_ENABLED === "true" || process.env.NODE_ENV !== "production";
}

export function isPublicDemoAccessEnabled() {
  return process.env.DEMO_PUBLIC_ACCESS === "true";
}
