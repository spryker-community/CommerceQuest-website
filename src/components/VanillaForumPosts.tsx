import { useState, useEffect } from 'react';
import { getDiscussions, getPopularDiscussions } from '../utils/vanillaApi';
import type { FormattedDiscussion } from '../utils/vanillaApi';

// Component to display a single discussion
const DiscussionCard = ({ discussion }: { discussion: FormattedDiscussion }) => (
  <div className="mb-8 pb-8 border-b border-gray-700/20 last:border-b-0 last:mb-0 last:pb-0">
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <a href={`https://forum.commercequest.space/profile/${discussion.author.userID}`} className="block hover:opacity-90">
          <img src={discussion.author.photoUrl} alt={discussion.author.name} className="w-12 h-12 rounded-full" />
        </a>
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight">
          <a href={discussion.url} className="hover:underline">{discussion.name}</a>
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-base mt-2 leading-relaxed">
          <a href={discussion.url} className="hover:underline">{discussion.description}</a>
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
          <span>Started by <a href={`https://forum.commercequest.space/profile/${discussion.author.userID}`} className="hover:underline">{discussion.author.name}</a></span>
          <span className="text-gray-300 dark:text-gray-600">•</span>
          <a href={discussion.url} className="hover:underline">{discussion.commentCount} comments</a>
          <span className="text-gray-300 dark:text-gray-600">•</span>
          <a href={discussion.url} className="hover:underline">{discussion.viewCount} views</a>
        </div>
      </div>
    </div>
  </div>
);

// Main component
const VanillaForumPosts = () => {
  // State management
  const [recentDiscussions, setRecentDiscussions] = useState<FormattedDiscussion[]>([]);
  const [popularDiscussions, setPopularDiscussions] = useState<FormattedDiscussion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use our existing API utility functions
        const [recent, popular] = await Promise.all([
          getDiscussions(),
          getPopularDiscussions()
        ]);

        setRecentDiscussions(recent);
        setPopularDiscussions(popular);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching discussions:', err);
        setError('Failed to fetch forum posts');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Recent Discussions */}
      <div className="bg-neutral-100 dark:bg-[#0A1628] rounded-xl shadow-md overflow-hidden mb-10 p-8">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 sm:text-3xl mb-5">
          <span className="text-blue-500 dark:text-blue-400">Latest</span> Posts
        </h2>

        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-400"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 font-bold p-4 rounded bg-red-100">
            <p>Error: {error}</p>
          </div>
        )}

        {!isLoading && !error && recentDiscussions.slice(0, 3).map((discussion) => (
          <DiscussionCard key={discussion.id} discussion={discussion} />
        ))}
      </div>

      {/* Popular Discussions */}
      <div className="bg-neutral-100 dark:bg-[#0A1628] rounded-xl shadow-md overflow-hidden mb-10 p-8">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 sm:text-3xl mb-5">
          <span className="text-pink-500 dark:text-pink-400">Recently Popular</span> Posts
        </h2>

        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-400"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 font-bold p-4 rounded bg-red-100">
            <p>Error: {error}</p>
          </div>
        )}

{!isLoading && !error && popularDiscussions.slice(0, 3).map((discussion) => (
  <DiscussionCard key={discussion.id} discussion={discussion} />
))}
      </div>
    </div>
  );
};

export default VanillaForumPosts;
