interface AuthNavigationProps {
  className?: string;
}

export default function AuthNavigation({ className = '' }: AuthNavigationProps) {
  return (
    <div className={className || "flex items-center"}>
      <a
        href="https://sprykercommunity.slack.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition duration-300 bg-pink-400 hover:bg-pink-500 text-white border border-transparent whitespace-nowrap"
      >
        Join Slack
      </a>
    </div>
  );
}