// API endpoint configuration
const API_ENDPOINTS = {
  DISCUSSIONS: '/api/forum/discussions.json',
  FORUM_BASE_URL: 'https://forum.commercequest.space',
  // Local proxy endpoints to avoid CORS issues
  EVENTS: {
    UPCOMING: '/api/events/upcoming',
    PAST: '/api/events/past'
  }
} as const;

// Define TypeScript interfaces for better type safety
interface Discussion {
  discussionID: number;
  name: string;
  body: string;
  countComments: number;
  countViews: number;
  dateInserted: string;
  insertUser: {
    userID: number;
    name: string;
    photoUrl: string;
    profileUrl: string;
    title: string;
  };
}

interface Event {
  eventID: number;
  name: string;
  body: string;
  dateInserted: string;
  dateStarts: string;
  dateEnds: string;
  excerpt: string;
  url: string;
  ctaUrl?: string;
  ctaLabel?: string;
  location?: string;
  locationUrl?: string;
}

export interface FormattedDiscussion {
  id: number;
  name: string;
  description: string;
  url: string;
  author: {
    userID: number;
    name: string;
    photoUrl: string;
    profileUrl: string;
    title: string;
  };
  commentCount: number;
  viewCount: number;
  dateInserted: string;
}

export interface FormattedEvent {
  id: number;
  name: string;
  description: string;
  url: string;
  startDate: Date;
  endDate: Date;
  dateInserted: string;
  ctaUrl?: string;
  ctaLabel?: string;
  location?: string;
  locationUrl?: string;
}

export async function getDiscussions(): Promise<FormattedDiscussion[]> {
  try {
    const response = await fetch(API_ENDPOINTS.DISCUSSIONS);
    if (!response.ok) {
      throw new Error('Failed to fetch forum posts');
    }
    const data: Discussion[] = await response.json();
    return data.map((discussion: Discussion) => formatDiscussion(discussion));
  } catch (error) {
    console.error('Error fetching discussions:', error);
    return [];
  }
}

export async function getPopularDiscussions(): Promise<FormattedDiscussion[]> {
  try {
    const response = await fetch(API_ENDPOINTS.DISCUSSIONS);
    if (!response.ok) {
      throw new Error('Failed to fetch forum posts');
    }
    const data: Discussion[] = await response.json();
    
    // Calculate the date 4 weeks ago
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
    
    // Filter discussions from the last 4 weeks and sort by comment count
    return data
      .filter(discussion => new Date(discussion.dateInserted) >= fourWeeksAgo)
      .sort((a, b) => (b.countComments || 0) - (a.countComments || 0))
      .slice(0, 5)
      .map(discussion => formatDiscussion(discussion));
  } catch (error) {
    console.error('Error fetching popular discussions:', error);
    return [];
  }
}

export async function getUpcomingEvents(): Promise<FormattedEvent[]> {
  try {
    console.log('Fetching upcoming events...');
    const response = await fetch(API_ENDPOINTS.EVENTS.UPCOMING);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to fetch upcoming events: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Raw upcoming events data:', data);

    // Check if we have the expected data structure
    if (!data || !Array.isArray(data.data)) {
      console.error('Unexpected data structure:', data);
      return [];
    }

    // Filter out any events without required fields
    const validEvents = data.data.filter((event: any) => {
      const hasRequired = event && event.eventID && event.name && event.dateStarts && event.dateEnds;
      if (!hasRequired) {
        console.log('Skipping invalid upcoming event:', event);
      }
      return hasRequired;
    });

    console.log('Valid upcoming events:', validEvents);
    return validEvents.map((event: Event) => formatEvent(event));
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
}

export async function getPastEvents(): Promise<FormattedEvent[]> {
  try {
    console.log('Fetching past events...');
    const response = await fetch(API_ENDPOINTS.EVENTS.PAST);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to fetch past events: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Raw past events data:', data);

    // Check if we have the expected data structure
    if (!data || !Array.isArray(data.data)) {
      console.error('Unexpected data structure:', data);
      return [];
    }

    // Filter out any events without required fields
    const validEvents = data.data.filter((event: any) => {
      const hasRequired = event && event.eventID && event.name && event.dateStarts && event.dateEnds;
      if (!hasRequired) {
        console.log('Skipping invalid past event:', event);
      }
      return hasRequired;
    });

    console.log('Valid past events:', validEvents);
    return validEvents.map((event: Event) => formatEvent(event));
  } catch (error) {
    console.error('Error fetching past events:', error);
    return [];
  }
}

function formatDiscussion(discussion: Discussion): FormattedDiscussion {
  return {
    id: discussion.discussionID,
    name: truncateText(discussion.name, 75),
    description: truncateText(stripHtmlTags(discussion.body), 100),
    url: `${API_ENDPOINTS.FORUM_BASE_URL}/discussion/${discussion.discussionID}`,
    author: {
      userID: discussion.insertUser.userID,
      name: truncateText(discussion.insertUser.name, 30),
      photoUrl: discussion.insertUser.photoUrl,
      profileUrl: discussion.insertUser.profileUrl,
      title: discussion.insertUser.title
    },
    commentCount: discussion.countComments || 0,
    viewCount: discussion.countViews || 0,
    dateInserted: discussion.dateInserted
  };
}

function formatEvent(event: Event): FormattedEvent {
  console.log('Formatting event:', event);
  
  const startDate = new Date(event.dateStarts);
  const endDate = new Date(event.dateEnds);

  console.log('Parsed dates:', {
    name: event.name,
    dateStarts: event.dateStarts,
    startDate: startDate,
    dateEnds: event.dateEnds,
    endDate: endDate
  });

  return {
    id: event.eventID,
    name: truncateText(event.name, 100),
    description: truncateText(stripHtmlTags(event.body), 100),
    url: event.url || `${API_ENDPOINTS.FORUM_BASE_URL}/event/${event.eventID}`,
    startDate: startDate,
    endDate: endDate,
    dateInserted: event.dateInserted,
    ctaUrl: event.ctaUrl,
    ctaLabel: event.ctaLabel,
    location: event.location,
    locationUrl: event.locationUrl
  };
}

function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}
