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
