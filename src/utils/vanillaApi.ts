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

export interface FormattedDiscussion {
  id: number;
  name: string;
  description: string;
  url: string;
  author: {
    userID: number;  // Changed from id to userID to match API
    name: string;
    photoUrl: string;
    profileUrl: string;
    title: string;
  };
  commentCount: number;
  viewCount: number;
  dateInserted: string;
}

export async function getDiscussions(): Promise<FormattedDiscussion[]> {
  try {
    // Use local endpoint instead of direct API call
    const response = await fetch('/api/forum/discussions.json');
    if (!response.ok) {
      console.error('Failed to fetch forum posts:', response.status, response.statusText);
      throw new Error('Failed to fetch forum posts');
    }
    const data: Discussion[] = await response.json();
    
    return data.map((discussion: Discussion) => formatDiscussion(discussion));
  } catch (error) {
    console.error('Error fetching discussions:', error);
    throw error; // Re-throw to handle in component
  }
}

export async function getPopularDiscussions(): Promise<FormattedDiscussion[]> {
  try {
    // Use local endpoint instead of direct API call
    const response = await fetch('/api/forum/discussions.json');
    if (!response.ok) {
      console.error('Failed to fetch forum posts:', response.status, response.statusText);
      throw new Error('Failed to fetch forum posts');
    }
    const data: Discussion[] = await response.json();
    
    // Calculate the date 4 weeks ago
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
    
    // Filter discussions from the last 4 weeks and sort by comment count
    const recentPopularDiscussions = data
      .filter(discussion => new Date(discussion.dateInserted) >= fourWeeksAgo)
      .sort((a, b) => (b.countComments || 0) - (a.countComments || 0))
      .slice(0, 5)
      .map(discussion => formatDiscussion(discussion));
    
    return recentPopularDiscussions;
  } catch (error) {
    console.error('Error fetching popular discussions:', error);
    throw error; // Re-throw to handle in component
  }
}

// Helper function to format a discussion
function formatDiscussion(discussion: Discussion): FormattedDiscussion {
  if (!discussion.discussionID) {
    console.error('Discussion missing discussionID:', discussion);
  }
  const commentCount = discussion.countComments || 0;
  const viewCount = discussion.countViews || 0;

  return {
    id: discussion.discussionID,
    name: truncateText(discussion.name, 50),
    description: truncateText(stripHtmlTags(discussion.body), 100),
    url: discussion.discussionID ? `https://forum.commercequest.space/discussion/${discussion.discussionID}` : '#',
    author: {
      userID: discussion.insertUser.userID,  // Using userID from API
      name: truncateText(discussion.insertUser.name, 30),
      photoUrl: discussion.insertUser.photoUrl,
      profileUrl: discussion.insertUser.profileUrl,
      title: discussion.insertUser.title
    },
    commentCount: commentCount,
    viewCount: viewCount,
    dateInserted: discussion.dateInserted
  };
}

// Helper function to truncate text to a specified length
function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Helper function to strip HTML tags from a string
function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}
