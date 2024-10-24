interface CommunityToolCreatorInterface {
  name: string;
  url?: string;
}

interface CommunityToolContributorInterface {
  name: string;
  url?: string;
}

interface CommunityToolLinkInterface {
  label: string;
  url: string;
}

export interface NavEntry {
  label?: string;
  href?: string;
  isExternal?: boolean;
  submenu?: NavEntry[] | undefined;
}

export interface CommunityToolInterface {
  title: string;
  subtitle: string | undefined;
  description: string;
  tags?: string[];
  license: string;
  creators: CommunityToolCreatorInterface[];
  contributors: CommunityToolContributorInterface[];
  links: CommunityToolLinkInterface[];
}

export type CommunityToolCollection = CommunityToolInterface[];

// Define the Spryker certifications interface
export interface SprykerCertifications {
  backEndDeveloper: boolean;
  solutionArchitect: boolean;
}

// Define the Freelancer type
export type Freelancer = {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
  headline?: string; // Optional
  availability: string;
  location: string;
  countryCode: string; // ISO Country Code, e.g., "US"
  language: string;
  shortPitch: string;
  linkedIn?: string; // Optional as not all freelancers may have LinkedIn
  github?: string; // Optional as not all freelancers may have GitHub
  sprykerCertifications: SprykerCertifications;
  skills: string[];
  timezoneRange: string;
  yearStartedWebDev: number;
  yearStartedSpryker: number;
  references?: string; // Optional, could include HTML markup
  idealCustomer?: string; // Optional, could include HTML markup
  locationFlexibility: string;
  otherCertifications?: string; // Optional
  employmentType: string;
  contact: string;
  forumProfile?: string;
  isVisible: boolean;
};