import type { APIRoute } from 'astro';

const upcomingEvents = [
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
