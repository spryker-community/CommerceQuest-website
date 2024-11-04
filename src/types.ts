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

export interface NavSubmenuEntry {
  label: string;
  href?: string;
  submenu?: NavSubmenuEntry[];
}

export interface NavEntry {
  label: string;
  href?: string;
  submenu?: NavSubmenuEntry[];
}

export interface CommunityToolCreator {
  name: string;
  url: string;
}

export interface CommunityToolLink {
  url: string;
  label: string;
}

export interface CommunityTool {
  title: string;
  subtitle: string;
  description: string;
  license: string;
  creators: CommunityToolCreator[];
  links: CommunityToolLink[];
  tags?: string[];
  contributors?: string[];
}

export type CommunityToolCollection = CommunityTool[];
