import fs from 'fs/promises';
import path from 'path';

const FREELANCERS_CONTENT_DIR = 'src/content/freelancers';

async function updatePaths() {
  try {
    // Get all freelancer YAML files
    const files = await fs.readdir(FREELANCERS_CONTENT_DIR);
    const yamlFiles = files.filter(file => file.endsWith('.yaml'));

    for (const yamlFile of yamlFiles) {
      // Skip the new format file
      if (yamlFile === 'onofrei-andrei-codrut.yaml') continue;

      // Read YAML content
      const yamlPath = path.join(FREELANCERS_CONTENT_DIR, yamlFile);
      const content = await fs.readFile(yamlPath, 'utf8');

      // Update photo path to include /src prefix
      const newContent = content.replace(
        /photo: "([^"]+)"/,
        'photo: /src/images/freelancers/$1'
      );

      // Write updated YAML
      await fs.writeFile(yamlPath, newContent, 'utf8');

      console.log(`Updated path in ${yamlFile}`);
    }

    console.log('Path updates completed successfully');
  } catch (error) {
    console.error('Update failed:', error);
  }
}

updatePaths();
