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
  if (!firstName || !lastName) {
    throw new Error('First name and last name are required for slug generation');
  }

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
  if (!slug) return false;
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug);
}

/**
 * Ensures a slug matches the expected format for freelancer entries
 * @param firstName - The freelancer's first name
 * @param lastName - The freelancer's last name
 * @param currentSlug - The current slug (optional)
 * @returns The correct slug to use
 * @throws Error if unable to generate a valid slug
 */
export function ensureFreelancerSlug(firstName: string, lastName: string, currentSlug?: string): string {
  try {
    // Validate input parameters
    if (!firstName || !lastName) {
      throw new Error('First name and last name are required for slug generation');
    }

    const expectedSlug = generateFreelancerSlug(firstName, lastName);
    
    // Validate the generated slug
    if (!isValidSlug(expectedSlug)) {
      throw new Error(`Generated slug "${expectedSlug}" is invalid`);
    }
    
    // If no current slug or it's invalid, return the generated one
    if (!currentSlug || !isValidSlug(currentSlug)) {
      return expectedSlug;
    }
    
    // If current slug matches the expected format but differs from the generated one,
    // log a warning but keep the current slug for consistency
    if (currentSlug !== expectedSlug) {
      console.warn(`Slug mismatch: Current slug "${currentSlug}" differs from expected "${expectedSlug}"`);
    }
    
    return currentSlug;
  } catch (error) {
    // Log the error for debugging
    console.error('Error in ensureFreelancerSlug:', error);
    throw error;
  }
}
