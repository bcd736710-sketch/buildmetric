import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

type AnalyticsTestResponse = {
  ok: boolean;
  status: "sent" | "setup_required" | "failed";
  message: string;
  statusCode?: number;
};

export async function POST() {
  const apiSecret = process.env.GA_MEASUREMENT_PROTOCOL_SECRET;

  if (!apiSecret) {
    return NextResponse.json<AnalyticsTestResponse>({
      ok: false,
      status: "setup_required",
      message:
        "Set GA_MEASUREMENT_PROTOCOL_SECRET in Vercel to enable the server-side GA test.",
    });
  }

  const endpoint = new URL("https://www.google-analytics.com/mp/collect");
  endpoint.searchParams.set("measurement_id", siteConfig.googleAnalyticsId);
  endpoint.searchParams.set("api_secret", apiSecret);

  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      client_id: crypto.randomUUID(),
      events: [
        {
          name: "server_analytics_check",
          params: {
            source: "buildmetric_analytics_check",
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    return NextResponse.json<AnalyticsTestResponse>({
      ok: false,
      status: "failed",
      message: "Google Analytics rejected the server-side test request.",
      statusCode: response.status,
    });
  }

  return NextResponse.json<AnalyticsTestResponse>({
    ok: true,
    status: "sent",
    message:
      "Server-side test event sent. Check GA Realtime or DebugView for server_analytics_check.",
    statusCode: response.status,
  });
}
