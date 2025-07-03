// TypeScript interfaces for authentication
interface UserProfile {
  userID: number;
  name: string;
  email: string;
  photoUrl: string;
  profileUrl: string;
  roles?: string[];
}

export interface AuthStatus {
  isAuthenticated: boolean;
  user?: UserProfile;
}
// API endpoint configuration
const API_ENDPOINTS = {
  DISCUSSIONS: '/api/forum/discussions.json',
  FORUM_BASE_URL: 'https://forum.commercequest.space',
  // Local proxy endpoints to avoid CORS issues
  EVENTS: {
    UPCOMING: '/api/events/upcoming',
    PAST: '/api/events/past'
  },
  USER_PROFILE: '/api/v2/users/me',
} as const;

/**
 * Check if user is authenticated with the Vanilla forum
 * This function attempts to fetch the current user's profile
 * If successful, user is logged in; if 401/403, user is not logged in
 */
export async function checkAuthenticationStatus(): Promise<AuthStatus> {
  try {
    const response = await fetch(`${API_ENDPOINTS.FORUM_BASE_URL}${API_ENDPOINTS.USER_PROFILE}`, {
      method: 'GET',
      credentials: 'include', // Include cookies for cross-origin requests
      headers: {
        'Accept': 'application/json',
      }
    });

    if (response.ok) {
      const userData = await response.json();
      return {
        isAuthenticated: true,
        user: {
          userID: userData.userID,
          name: userData.name,
          email: userData.email,
          photoUrl: userData.photoUrl,
          profileUrl: userData.profileUrl,
          roles: userData.roles
        }
      };
    } else if (response.status === 401 || response.status === 403) {
      // User not authenticated
      return { isAuthenticated: false };
    } else {
      throw new Error(`Unexpected response: ${response.status}`);
    }
  } catch (error) {
    // Default to not authenticated on error
    return { isAuthenticated: false };
  }
}

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
    const response = await fetch(API_ENDPOINTS.EVENTS.UPCOMING);
    if (!response.ok) {
      throw new Error(`Failed to fetch upcoming events: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();

    // Check if we have the expected data structure
    if (!data || !Array.isArray(data.data)) {
      return [];
    }

    // Filter out any events without required fields
    const validEvents = data.data.filter((event: any) => {
      return event && event.eventID && event.name && event.dateStarts && event.dateEnds;
    });

    return validEvents.map((event: Event) => formatEvent(event));
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
}

export async function getPastEvents(): Promise<FormattedEvent[]> {
  try {
    const response = await fetch(API_ENDPOINTS.EVENTS.PAST);
    if (!response.ok) {
      throw new Error(`Failed to fetch past events: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();

    // Check if we have the expected data structure
    if (!data || !Array.isArray(data.data)) {
      return [];
    }

    // Filter out any events without required fields
    const validEvents = data.data.filter((event: any) => {
      return event && event.eventID && event.name && event.dateStarts && event.dateEnds;
    });

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
  const startDate = new Date(event.dateStarts);
  const endDate = new Date(event.dateEnds);

  return {
    id: event.eventID,
    name: truncateText(event.name, 100),
    description: stripHtmlTags(event.body),
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
