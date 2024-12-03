import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    // Get the current date in 'YYYY-MM-DD' format
    const nowDate = new Date().toISOString().split('T')[0];

    // Construct the API URL with dateStarts parameter and limit to 2 items
    const apiUrl = `https://forum.commercequest.space/api/v2/events?page=1&limit=2&sort=dateStarts&dateStarts=>=${nowDate}`;

    // Fetch events from the Vanilla API with authorization headers
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VANILLA_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the API response is successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API responded with status: ${response.status}`);
    }

    // Parse the response data as JSON
    const events = await response.json();

    // Return the events wrapped in a data property
    return new Response(JSON.stringify({ data: events }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Log any errors and return a 500 response
    console.error('Error in upcoming events proxy:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch upcoming events', data: [] }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
