// An array of links for navigation bar
import type { NavEntry } from "../types";
import { getSidebar as getStarlightSubmenu, type SidebarEntry } from '../../node_modules/@astrojs/starlight/utils/navigation.ts';

// An array of links for footer
const footerLinks = [
  {
    section: "Platforms",
    links: [
      { name: "Spryker", url: "/spryker" },
      { name: "Oryx", url: "/oryx" },
      { name: "Propel", url: "/propel" },
    ],
  },
  {
    section: "Community",
    links: [
      { name: "Forum", url: "/" },
      { name: "Extensions & Tools", url: "/community-tools" },
      { name: "Upcoming Events", url: "https://forum.commercequest.space/events/category" },
      { name: "Event Recaps", url: "/event-recap" },
      { name: "Guides", url: "/guides/intro" },
    ],
  },
  {
    section: "CommerceQuest",
    links: [
      { name: "About us", url: "/about" },
      { name: "Code of Conduct", url: "https://forum.commercequest.space/discussion/27749/community-guidelines-code-of-conduct" },
      { name: "Help improve this site", url: "https://github.com/spryker-community/CommerceQuest-website?tab=readme-ov-file#landingpage--docs" },
      { name: "Contact", url: "/contact" },
      { name: "Imprint", url: "https://spryker.com/imprint/" },
    ],
  },
];
// An object of links for social icons
const socialLinks = {
  facebook: "https://www.facebook.com/Spryker/",
  x: "https://twitter.com/sprysys",
  github: "https://github.com/spryker-community",
  youtube: "https://www.youtube.com/channel/UC6lVOEbqXxUh0W5FMTvlPDQ",
  linkedin: "https://www.linkedin.com/company/spryker-systems-gmbh",
  discord: "https://discord.gg/kjrdurASgX",
  slack: "https://join.slack.com/t/sprykercommunity/shared_invite/zt-2r8nyxl84-SFMyKuJ8IjFBtk0~BvWX~w",
};

const mainNavigation: NavEntry[] = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Forum Topics",
    href: "https://forum.commercequest.space/",
    submenu: [
      {
        label: 'General topics',
        submenu: [
          {
            label: "All Posts",
            href: "https://forum.commercequest.space/discussions",
          },
          {
            label: "All Categories",
            href: "https://forum.commercequest.space/categories",
          },
          {
            label: "Developer Corner",
            href: "https://forum.commercequest.space/categories/spryker-developers",
          },
          {
            label: "Product & Business",
            href: "https://forum.commercequest.space/categories/business-user-questions",
          },
          {
            label: "Spryker Safari",
            href: "https://forum.commercequest.space/categories/safari-questions",
          },
        ],
      },
      {
        label: 'Technologies',
        submenu: [
          {
            label: "Spryker",
            href: "https://forum.commercequest.space/categories/spryker-development",
          },
          {
            label: "Oryx",
            href: "https://forum.commercequest.space/categories/oryx",
          },
          {
            label: "Propel",
            href: "https://forum.commercequest.space/categories/propel-orm",
          },
        ],
      },
      {
        label: 'Community Projects',
        submenu: [
          {
            label: "News",
            href: "https://forum.commercequest.space/categories/spryker-news",
          },
          {
            label: "Ideation Board",
            href: "https://forum.commercequest.space/categories/community-ideation-board",
          },
          {
            label: "Hackathons",
            href: "https://forum.commercequest.space/categories/hackathons",
          },
        ],
      },
      {
        label: 'Launchpad',
        submenu: [
          {
            label: "Help & Guidelines",
            href: "https://forum.commercequest.space/categories/help-and-guidelines",
          },
          {
            label: "Your CQ Suggestions",
            href: "https://forum.commercequest.space/categories/community-ideas-and-feedback",
          },
          {
            label: "Random",
            href: "https://forum.commercequest.space/categories/Random/",
          },
          {
            label: "Jobs",
            href: "https://forum.commercequest.space/categories/jobs",
          },
        ],
      },
    ]
  },
  {
    label: "Extensions & Tools",
    href: "/community-tools",
  },
  {
    label: "Jobs",
    href: "/jobs",
  },
  {
    label: "Events",
    href: "/",
    submenu: [
      {
        submenu: [
          {
            label: "Upcoming Events",
            href: "https://forum.commercequest.space/events/category",
          },
          {
            label: "Event Recaps",
            href: "/event-recap",
          },
          {
            label: "Organize your own event",
            href: "/events/hackathon-blueprint",
          },
        ],
      },
    ]
  },
  {
    label: "Guides",
    href: "/guides/intro",
  },
];

function mapStarlightMenuToMainNavEntries(items: SidebarEntry[]): NavEntry[] {
  return items.map(function(item): NavEntry {
    let navEntry: NavEntry = {
      label: item.label,
    }

    if ('entries' in item && item.entries) {
      navEntry.submenu = mapStarlightMenuToMainNavEntries(item.entries);
    }

    if ('href' in item && item.href) {
      navEntry.href = item.href;
    }

    return navEntry;
  });
}

function decorateGuideSubNavigation(pathname?: string, locale?: string) {
  const starlightSubmenu = getStarlightSubmenu(pathname || '', locale);

  return mapStarlightMenuToMainNavEntries(starlightSubmenu);
}

function getMainNavEntries(pathname?: string, locale?: string): NavEntry[] {
  return mainNavigation.map(function(entry) {
    switch (entry.label) {
      case 'Guides':
        entry.submenu = decorateGuideSubNavigation(pathname, locale);
        break;
    }

    return entry;
  });
}

export default {
  getMainNavEntries,
  footerLinks,
  socialLinks,
};
