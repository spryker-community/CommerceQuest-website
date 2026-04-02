import type { APIRoute } from 'astro';

// Hardcoded past events with YouTube recording links
// Sourced from Vanilla forum dump and matched with YouTube playlist:
// https://www.youtube.com/playlist?list=PLJooqCSo73SiPKM3mlZzc7lGq5zEFQkRS
const pastEvents = [
  {
    eventID: 46,
    name: "Spryker Hackathon - June 25-26 - Berlin",
    body: "Two day hackathon in Berlin to ship Composer-installable Spryker modules in 48h. Four teams delivered MIT-licensed packages — Multi-Variant Quick Add to Cart, Queue CLI, Database Configuration, and 3D Product Visualizer — judged for production readiness and real-world value.",
    dateInserted: "2025-04-29T07:29:56+00:00",
    dateStarts: "2025-06-25T07:00:00+00:00",
    dateEnds: "2025-06-26T15:00:00+00:00",
    excerpt: "",
    url: "https://event.spryker.com/hackathons#june",
    ctaUrl: "https://event.spryker.com/hackathons#june",
    ctaLabel: "",
    location: "Spryker HQ - Berlin",
    locationUrl: "",
    recordingUrl: "https://www.youtube.com/playlist?list=PLJooqCSo73SiVx8RcMg3rbEggXCs0WvnJ"
  },
  {
    eventID: 15,
    name: "Spryker EXCITE 24 + HACKATHON",
    body: "Six teams strived to enhance the Customer Journey and team 'AI Pathfinder' came out on top with their multilingual semantic search, ensuring precise matches across languages.",
    dateInserted: "2023-12-14T09:06:45+00:00",
    dateStarts: "2024-09-11T06:00:00+00:00",
    dateEnds: "2024-09-11T21:00:00+00:00",
    excerpt: "",
    url: "https://spryker.com/events/excite-2024/",
    ctaUrl: "https://spryker.com/events/excite-2024/",
    ctaLabel: "",
    location: "KulturBrauerei - Berlin",
    locationUrl: "",
    recordingUrl: "https://www.youtube.com/watch?v=Cx3U8CeNK44"
  },
  {
    eventID: 32,
    name: "Spryker Hackathon Powered By Nagarro",
    body: "At the Nagarro hackathon, 5 teams worked on providing consumers with more sustainable options by incorporating CO² emission data into the product data, make search results sort on this data, suggest more sustainable products on the PDP and create a rewards system nudging customers to make better purchase decisions.",
    dateInserted: "2024-06-03T07:58:33+00:00",
    dateStarts: "2024-08-01T10:00:00+00:00",
    dateEnds: "2024-08-02T16:00:00+00:00",
    excerpt: "",
    url: "https://event.spryker.com/hackathons#august",
    ctaUrl: "https://event.spryker.com/hackathons#august",
    ctaLabel: "",
    location: "Nagarro Office, Gurugram, India",
    locationUrl: "",
    recordingUrl: "https://www.youtube.com/watch?v=8YcPl5hjV2Y&list=PLJooqCSo73SiCupw9Xtj8-6vUERAxpdk_"
  }
];

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ data: pastEvents }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });
};
