import fs from 'fs/promises';
import path from 'path';

const FREELANCERS_CONTENT_DIR = 'src/content/freelancers';

async function updateSlugs() {
  try {
    // Get all freelancer YAML files
    const files = await fs.readdir(FREELANCERS_CONTENT_DIR);
    const yamlFiles = files.filter(file => file.endsWith('.yaml'));

    for (const yamlFile of yamlFiles) {
      // Get the slug from the filename (without .yaml)
      const slug = yamlFile.replace('.yaml', '');

      // Read YAML content
      const yamlPath = path.join(FREELANCERS_CONTENT_DIR, yamlFile);
      const content = await fs.readFile(yamlPath, 'utf8');

      // Add or update the slug field if it doesn't exist
      if (!content.includes('slug:')) {
        // Add slug after firstName and lastName
        const newContent = content.replace(
          /(lastName: .+\n)/,
          `$1slug: ${slug}\n`
        );

        // Write updated YAML
        await fs.writeFile(yamlPath, newContent, 'utf8');
        console.log(`Updated slug in ${yamlFile}`);
      }
    }

    console.log('Slug updates completed successfully');
  } catch (error) {
    console.error('Update failed:', error);
  }
}

updateSlugs();
