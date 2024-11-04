import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

async function migrateFreelancers() {
  // Read the existing JSON data
  const jsonData = await fs.readFile('src/data_files/freelancers.json', 'utf-8');
  const freelancers = JSON.parse(jsonData);

  // Create the content directory if it doesn't exist
  await fs.mkdir('src/content/freelancers', { recursive: true });

  // Migrate each freelancer
  for (const freelancer of freelancers) {
    const slug = freelancer.firstName.toLowerCase();
    
    // Format the content
    const content = {
      firstName: freelancer.firstName,
      lastName: freelancer.lastName,
      photo: freelancer.photo,
      headline: freelancer.headline || '',
      availability: freelancer.availability,
      location: freelancer.location,
      countryCode: freelancer.countryCode,
      language: freelancer.language,
      shortPitch: freelancer.shortPitch,
      linkedIn: freelancer.linkedIn || '',
      github: freelancer.github || '',
      sprykerCertifications: {
        backEndDeveloper: freelancer.sprykerCertifications.backEndDeveloper,
        solutionArchitect: freelancer.sprykerCertifications.solutionArchitect,
      },
      skills: freelancer.skills || [],
      timezoneRange: freelancer.timezoneRange,
      yearStartedWebDev: freelancer.yearStartedWebDev || 0,
      yearStartedSpryker: freelancer.yearStartedSpryker || 0,
      references: freelancer.references || '',
      idealCustomer: freelancer.idealCustomer || '',
      locationFlexibility: freelancer.locationFlexibility,
      otherCertifications: freelancer.otherCertifications || '',
      employmentType: freelancer.employmentType,
      contact: freelancer.contact,
      forumProfile: freelancer.forumProfile || '',
      isVisible: freelancer.isVisible,
    };

    // Create the YAML file
    const filePath = path.join('src/content/freelancers', `${slug}.yaml`);
    await fs.writeFile(filePath, yaml.dump(content));
  }

  // Remove old files
  const files = await fs.readdir('src/content/freelancers');
  for (const file of files) {
    if (file.endsWith('.json') || file.endsWith('.mdoc')) {
      await fs.unlink(path.join('src/content/freelancers', file));
    }
  }

  console.log('Migration completed successfully!');
}

migrateFreelancers().catch(console.error);
