import fs from 'fs/promises';
import path from 'path';

const FREELANCERS_CONTENT_DIR = 'src/content/freelancers';
const FREELANCERS_IMAGES_DIR = 'src/images/freelancers';

async function migrateImages() {
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

      // Extract current photo path
      const photoMatch = content.match(/photo: (.+\.jpe?g)/);
      if (!photoMatch) {
        console.log(`No photo found in ${yamlFile}`);
        continue;
      }

      const oldPhotoName = photoMatch[1];
      const oldPhotoPath = path.join(FREELANCERS_IMAGES_DIR, oldPhotoName);

      // Create new directory name from YAML filename (without extension)
      const dirName = yamlFile.replace('.yaml', '').toLowerCase().replace(/ /g, '-');
      const newDirPath = path.join(FREELANCERS_IMAGES_DIR, dirName);
      
      // Create new directory
      await fs.mkdir(newDirPath, { recursive: true });

      // Get file extension from original image
      const ext = path.extname(oldPhotoName);
      const newPhotoPath = path.join(newDirPath, `photo${ext}`);

      // Move and rename the image
      await fs.rename(oldPhotoPath, newPhotoPath);

      // Update YAML content with new photo path
      const newContent = content.replace(
        /photo: .+/,
        `photo: "${dirName}/photo${ext}"`
      );

      // Write updated YAML
      await fs.writeFile(yamlPath, newContent, 'utf8');

      console.log(`Migrated ${yamlFile} and its image`);
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateImages();
