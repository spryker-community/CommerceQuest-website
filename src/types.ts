export interface NavSubmenuEntry {
  label: string;
  href?: string;
  submenu?: NavSubmenuEntry[];
}

export interface NavEntry {
  label?: string;
  href?: string;
  isExternal?: boolean;
  submenu?: NavEntry[] | undefined;
}

export type CommunityToolCreator = {
  name: string;
  url?: string;
}

export type CommunityToolContributor = {
  name: string;
  url?: string;
}

export type CommunityToolLink = {
  label: string;
  url: string;
}

export type CommunityTool = {
  title: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  license: string;
  creators: CommunityToolCreator[];
  contributors: CommunityToolContributor[];
  links: CommunityToolLink[];
}

export type CommunityToolCollection = CommunityTool[];

// Define the Spryker certifications interface
export interface SprykerCertifications {
  backEndDeveloper: boolean;
  solutionArchitect: boolean;
}

export interface KeystaticFreelancer {
  firstName: string;
  lastName: string;
  photo: string;
  headline?: string;
  availability: string;
  location: string;
  countryCode: string;
  language: string;
  shortPitch: string;
  linkedIn: string | null;
  github: string | null;
  sprykerCertifications: SprykerCertifications;
  skills: string[];
  timezoneRange: string;
  yearStartedWebDev: number;
  yearStartedSpryker: number;
  references: string;
  idealCustomer: string;
  locationFlexibility: string;
  otherCertifications: string;
  employmentType: string;
  contact: string;
  forumProfile: string;
  isVisible: boolean;
}

export interface Freelancer extends KeystaticFreelancer {
  id: string;
}