// An array of links for navigation bar
import type { NavEntry } from "../types";
import { type SidebarEntry } from '../../node_modules/@astrojs/starlight/utils/routing/types.ts';
import { getSidebar as getStarlightSubmenu } from '../../node_modules/@astrojs/starlight/utils/navigation.ts';

// An array of links for footer
const footerLinks = [
  {
    section: "Platforms",
    links: [
      { name: "Spryker", url: "/spryker" },
      { name: "Propel", url: "/propel" },
    ],
  },
  {
    section: "Community",
    links: [
      { name: "Forum", url: "/" },
      { name: "Extensions & Tools", url: "/community-tools" },
      { name: "Jobs", url: "/jobs" },
      { name: "Event Recaps", url: "/event-recap" },
      { name: "Guides", url: "/guides/intro" },
    ],
  },
  {
    section: "CommerceQuest",
    links: [
      { name: "About us", url: "/about" },
      { name: "Code of Conduct", url: "/guides/intro" },
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
        label: "Event Options",  // Added missing label
        submenu: [
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
    label: "Videos",
    href: "/videos",
  },
  {
    label: "Guides",
    href: "/guides/intro",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@SprykerSystems/playlists",
  },
  {
    label: "Contribute",
    href: "/guides/contributing/types",
  },
  {
    label: "Community Repos",
    href: "https://github.com/spryker-community",
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
