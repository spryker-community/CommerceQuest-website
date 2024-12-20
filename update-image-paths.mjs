import fs from 'fs/promises';
import path from 'path';

const FREELANCERS_CONTENT_DIR = 'src/content/freelancers';

async function updateImagePaths() {
  try {
    // Get all freelancer YAML files
    const files = await fs.readdir(FREELANCERS_CONTENT_DIR);
    const yamlFiles = files.filter(file => file.endsWith('.yaml'));

    for (const yamlFile of yamlFiles) {
      // Skip the working file
      if (yamlFile === 'onofrei-andrei-codrut.yaml') continue;

      // Read YAML content
      const yamlPath = path.join(FREELANCERS_CONTENT_DIR, yamlFile);
      const content = await fs.readFile(yamlPath, 'utf8');

      // Get the slug from the filename (remove .yaml and convert to lowercase)
      const slug = yamlFile.replace('.yaml', '').toLowerCase().replace(/ /g, '-');

      // Get the file extension by checking what exists in the directory
      const imageDir = path.join('src/images/freelancers', slug);
      const files = await fs.readdir(imageDir);
      const photoFile = files.find(f => f.startsWith('photo.'));

      // Update photo path to match Codrut's format exactly
      const newContent = content.replace(
        /photo: .+/,
        `photo: /src/images/freelancers/${slug}/${photoFile}`
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

updateImagePaths();
