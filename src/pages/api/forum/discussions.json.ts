import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    const response = await fetch('https://forum.commercequest.space/api/v2/discussions', {
      headers: {
        'Accept': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch discussions: ${response.status}`);
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Error in discussions endpoint:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch discussions' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
