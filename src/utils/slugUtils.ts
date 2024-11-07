/**
 * Utility functions for handling slug generation and management
 */

/**
 * Generates a clean slug from first name and last name
 * @param firstName - The freelancer's first name
 * @param lastName - The freelancer's last name
 * @returns A clean, URL-friendly slug
 */
export function generateFreelancerSlug(firstName: string, lastName: string): string {
  return `${firstName.toLowerCase()}-${lastName.toLowerCase()}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9-]/g, ''); // Keep only lowercase letters, numbers, and hyphens
}

/**
 * Validates if a slug matches the expected format
 * @param slug - The slug to validate
 * @returns boolean indicating if the slug is valid
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug);
}

/**
 * Ensures a slug matches the expected format for freelancer entries
 * @param firstName - The freelancer's first name
 * @param lastName - The freelancer's last name
 * @param currentSlug - The current slug (optional)
 * @returns The correct slug to use
 */
export function ensureFreelancerSlug(firstName: string, lastName: string, currentSlug?: string): string {
  const expectedSlug = generateFreelancerSlug(firstName, lastName);
  
  // If no current slug or it doesn't match the expected format, return the generated one
  if (!currentSlug || !isValidSlug(currentSlug)) {
    return expectedSlug;
  }
  
  // If current slug matches the expected format but differs from the generated one,
  // log a warning but keep the current slug for consistency
  if (currentSlug !== expectedSlug) {
    console.warn(`Slug mismatch: Current slug "${currentSlug}" differs from expected "${expectedSlug}"`);
  }
  
  return currentSlug;
}
