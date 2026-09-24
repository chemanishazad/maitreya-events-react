export const dynamic = "force-dynamic";

/** Liveness probe used by the deploy script, the server cron check and the uptime workflow. */
export function GET() {
  return Response.json(
    {
      ok: true,
      env: process.env.SITE_ENV ?? "local",
      release: process.env.RELEASE_SHA ?? "local",
      uptime: Math.round(process.uptime()),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
