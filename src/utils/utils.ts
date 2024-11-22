import type { SprykerCertifications } from '../types';

/**
 * Check if a freelancer has any Spryker certifications
 * @param certifications - The freelancer's Spryker certifications
 * @returns boolean indicating if the freelancer has any certifications
 */
export function hasSprykerCertifications(certifications: SprykerCertifications): boolean {
  return certifications.backEndDeveloper || certifications.solutionArchitect;
}
