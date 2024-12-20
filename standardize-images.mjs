import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const FREELANCERS_DIR = 'src/images/freelancers';

async function standardizeImages() {
  try {
    // Get all freelancer directories
    const dirs = await fs.readdir(FREELANCERS_DIR);

    for (const dir of dirs) {
      // Skip Codrut's directory since it's working
      if (dir === 'onofrei-andrei-codrut') continue;

      const imagePath = path.join(FREELANCERS_DIR, dir, 'photo.jpeg');
      const tempPath = path.join(FREELANCERS_DIR, dir, 'temp.jpeg');

      // Read the original image
      const imageBuffer = await fs.readFile(imagePath);

      // Process the image with Sharp:
      // - Strip all metadata
      // - Convert to progressive JPEG
      // - Set density to 1x1
      // - Resize to 400x400
      await sharp(imageBuffer)
        .resize(400, 400)
        .jpeg({
          progressive: true,
          quality: 80,
          density: 1
        })
        .toFile(tempPath);

      // Replace original with standardized version
      await fs.unlink(imagePath);
      await fs.rename(tempPath, imagePath);

      console.log(`Standardized ${imagePath}`);
    }

    console.log('Image standardization completed successfully');
  } catch (error) {
    console.error('Standardization failed:', error);
  }
}

standardizeImages();
