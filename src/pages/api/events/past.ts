import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    const now = new Date().toISOString();
    
    // Get all events from Vanilla API
    const url = `https://forum.commercequest.space/api/v2/events?sort=-dateEnds`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VANILLA_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter and sort past events
    const events = Array.isArray(data) ? data : [];
    const pastEvents = events
      .filter(event => {
        const endDate = new Date(event.dateEnds);
        const nowDate = new Date(now);
        
        // Only include events that have completely ended
        return endDate < nowDate;
      })
      .sort((a, b) => {
        const dateA = new Date(a.dateEnds);
        const dateB = new Date(b.dateEnds);
        // Sort by end date in descending order (most recent first)
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 3);

    return new Response(JSON.stringify({ data: pastEvents }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in past events proxy:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch past events', data: [] }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
