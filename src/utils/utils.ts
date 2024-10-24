import type { SprykerCertifications } from '.././types';

// Format the date to a string
function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'};
  
    return new Date(date).toLocaleDateString(undefined, options);
  }
  // Capitalize the first letter
function capitalize(str:string): string {
  if ( typeof str !== 'string' || str.length === 0 ) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Convert country code to flag emoji
function getFlagEmoji(countryCode: string): string {
  if (typeof countryCode !== 'string' || countryCode.length !== 2) {
    return '';
  }
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Check if user has any Spryker certifications
function hasSprykerCertifications(certifications: SprykerCertifications): boolean {
  return certifications.backEndDeveloper || certifications.solutionArchitect;
}

// Generate URL-friendly slug from first and last name
function generateNameSlug(firstName: string, lastName: string): string {
  // Combine first and last name, convert to lowercase, replace spaces with hyphens
  // Remove special characters and normalize to basic Latin characters
  const normalizedName = `${firstName} ${lastName}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
  
  return normalizedName;
}

// Export the new function along with existing ones
export { 
  formatDate, 
  capitalize, 
  getFlagEmoji, 
  hasSprykerCertifications,
  generateNameSlug 
};