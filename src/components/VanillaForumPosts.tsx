const VanillaForumPosts = () => (
  <div className="flex">
    <a
      href="https://sprykercommunity.slack.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-neutral-100 dark:bg-[#0A1628] rounded-xl shadow-md overflow-hidden p-10 flex flex-col items-center justify-center gap-6 w-full hover:shadow-lg transition-shadow duration-300"
    >
      {/* Slack logo */}
      <svg viewBox="0 0 124 124" className="w-16 h-16 shrink-0" aria-hidden="true">
        <path d="M26.3 78.8a13.2 13.2 0 0 1-13.1 13.1A13.2 13.2 0 0 1 0 78.8a13.2 13.2 0 0 1 13.1-13.2h13.2v13.2zm6.6 0a13.2 13.2 0 0 1 13.2-13.2 13.2 13.2 0 0 1 13.1 13.2v33a13.2 13.2 0 0 1-13.1 13.2 13.2 13.2 0 0 1-13.2-13.2v-33z" fill="#E01E5A"/>
        <path d="M46.1 26.3a13.2 13.2 0 0 1-13.2-13.2A13.2 13.2 0 0 1 46.1 0a13.2 13.2 0 0 1 13.1 13.1v13.2H46.1zm0 6.7a13.2 13.2 0 0 1 13.1 13.1 13.2 13.2 0 0 1-13.1 13.2H13a13.2 13.2 0 0 1-13.1-13.2A13.2 13.2 0 0 1 13 33H46.1z" fill="#36C5F0"/>
        <path d="M97.7 46.1a13.2 13.2 0 0 1 13.2-13.2A13.2 13.2 0 0 1 124 46.1a13.2 13.2 0 0 1-13.1 13.2H97.7V46.1zm-6.6 0a13.2 13.2 0 0 1-13.2 13.2 13.2 13.2 0 0 1-13.1-13.2V13a13.2 13.2 0 0 1 13.1-13.1A13.2 13.2 0 0 1 91.1 13v33.1z" fill="#2EB67D"/>
        <path d="M77.9 97.7a13.2 13.2 0 0 1 13.2 13.2A13.2 13.2 0 0 1 77.9 124a13.2 13.2 0 0 1-13.2-13.1V97.7h13.2zm0-6.6a13.2 13.2 0 0 1-13.2-13.2 13.2 13.2 0 0 1 13.2-13.1H111a13.2 13.2 0 0 1 13.1 13.1A13.2 13.2 0 0 1 111 91.1H77.9z" fill="#ECB22E"/>
      </svg>

      <div className="text-center">
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-2">Our community posts and discussions have moved to</p>
        <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors duration-200">
          Spryker Community
        </p>
        <p className="text-base text-neutral-500 dark:text-neutral-400 mt-1">on Slack</p>
      </div>

      <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-pink-400 hover:bg-pink-500 text-white font-medium transition-colors duration-200">
        Join the Slack community →
      </span>
    </a>
  </div>
);

export default VanillaForumPosts;
