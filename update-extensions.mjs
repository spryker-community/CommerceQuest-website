import fs from 'fs/promises';
import path from 'path';

const FREELANCERS_DIR = 'src/images/freelancers';
const CONTENT_DIR = 'src/content/freelancers';

async function updateExtensions() {
  try {
    // Get all freelancer directories
    const dirs = await fs.readdir(FREELANCERS_DIR);

    for (const dir of dirs) {
      const dirPath = path.join(FREELANCERS_DIR, dir);
      const files = await fs.readdir(dirPath);
      
      // Find photo.jpg file
      const jpgFile = files.find(f => f === 'photo.jpg');
      if (jpgFile) {
        // Rename the file
        const oldPath = path.join(dirPath, 'photo.jpg');
        const newPath = path.join(dirPath, 'photo.jpeg');
        await fs.rename(oldPath, newPath);
        console.log(`Renamed ${oldPath} to ${newPath}`);

        // Update the corresponding YAML file
        const yamlPath = path.join(CONTENT_DIR, `${dir}.yaml`);
        const content = await fs.readFile(yamlPath, 'utf8');
        const newContent = content.replace(
          /photo: (.+)\.jpg/,
          'photo: $1.jpeg'
        );
        await fs.writeFile(yamlPath, newContent, 'utf8');
        console.log(`Updated ${yamlPath}`);
      }
    }

    console.log('Extension updates completed successfully');
  } catch (error) {
    console.error('Update failed:', error);
  }
}

updateExtensions();
