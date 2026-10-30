import type { APIRoute } from 'astro';

const upcomingEvents = [
  {
    eventID: 49,
    name: "Spryker 10.26 Community Walkthrough",
    body: "Join us for the Spryker 10.26 Community Walkthrough covering B2B Business-Ready Commerce, Workflows, Back Office Tooling & APIs, and AI-Enabled Development.",
    dateInserted: "2026-10-29T00:00:00+00:00",
    dateStarts: "2026-11-12T10:00:00+00:00",
    dateEnds: "2026-11-12T11:00:00+00:00",
    excerpt: "B2B Customer Groups, Workflows, BO APIs & AI DevSDK!",
    url: "/events/spryker-user-group-10-26",
    ctaUrl: "/events/spryker-user-group-10-26",
    ctaLabel: "More Info",
    location: "Online (Link via registration email)",
    locationUrl: "/events/spryker-user-group-10-26",
  },
  {
    eventID: 48,
    name: "[CANCELED] Spryker User Group: Release 202606.0",
    body: "Join us for a packed session covering the AI Dev SDK, Search Statistics & Back Office Analytics, and the new AI Assistant for Spryker Docs.",
    dateInserted: "2026-07-08T00:00:00+00:00",
    dateStarts: "2026-07-14T10:00:00+00:00",
    dateEnds: "2026-07-14T11:00:00+00:00",
    excerpt: "AI Dev SDK, Search Analytics, AI Assistant & Q&A!",
    url: "/events/spryker-user-group-july-2026",
    ctaUrl: "/events/spryker-user-group-july-2026",
    ctaLabel: "More Info",
    location: "Online — Google Meet",
    locationUrl: "https://meet.google.com/",
  },
  {
    eventID: 47,
    name: "Spryker User Group: Deep Dive into the April Release",
    body: "Join us for a packed session covering the Back Office Configuration Framework (now GA), the new Storefront Design System & Basic Shop Theming, AI Back Office Assistant & Audit Logging, Stripe Integration deep dive, and Import Export Module best practices. Whether you are building custom frontends, debugging AI, or integrating complex payments, this session has something for you.",
    dateInserted: "2026-05-22T00:00:00+00:00",
    dateStarts: "2026-05-26T14:00:00+00:00",
    dateEnds: "2026-05-26T15:00:00+00:00",
    excerpt: "BO Config, Storefront Design, AI, Stripe & More!",
    url: "/events/spryker-user-group-april-release",
    ctaUrl: "/events/spryker-user-group-april-release",
    ctaLabel: "More Info",
    location: "Google Meet (Online)",
    locationUrl: "https://meet.google.com/xge-hbuy-irb",
  }
];

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ data: upcomingEvents }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
  });
};
