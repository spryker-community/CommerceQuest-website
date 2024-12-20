import fs from 'fs/promises';
import path from 'path';

const FREELANCERS_CONTENT_DIR = 'src/content/freelancers';

async function renameFiles() {
  try {
    // Get all freelancer YAML files
    const files = await fs.readdir(FREELANCERS_CONTENT_DIR);
    const yamlFiles = files.filter(file => file.endsWith('.yaml'));

    for (const yamlFile of yamlFiles) {
      // Skip the already correctly named file
      if (yamlFile === 'onofrei-andrei-codrut.yaml') continue;

      // Create new filename (lowercase with hyphens)
      const newFilename = yamlFile
        .toLowerCase()
        .replace(/ /g, '-');

      // Only rename if the filename actually changed
      if (yamlFile !== newFilename) {
        const oldPath = path.join(FREELANCERS_CONTENT_DIR, yamlFile);
        const newPath = path.join(FREELANCERS_CONTENT_DIR, newFilename);

        // Rename the file
        await fs.rename(oldPath, newPath);
        console.log(`Renamed ${yamlFile} to ${newFilename}`);
      }
    }

    console.log('File renaming completed successfully');
  } catch (error) {
    console.error('Rename failed:', error);
  }
}

renameFiles();
