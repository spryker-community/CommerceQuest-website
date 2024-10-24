// Add the interface for Spryker certifications
interface SprykerCertifications {
  backEndDeveloper: boolean;
  solutionArchitect: boolean;
}

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

export { 
  formatDate, 
  capitalize, 
  getFlagEmoji, 
  hasSprykerCertifications,
  type SprykerCertifications // Export the interface as well
};