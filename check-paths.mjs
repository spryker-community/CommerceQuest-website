import fs from 'fs/promises';
import path from 'path';

const FREELANCERS_CONTENT_DIR = 'src/content/freelancers';

async function checkPaths() {
  try {
    // Get all freelancer YAML files
    const files = await fs.readdir(FREELANCERS_CONTENT_DIR);
    const yamlFiles = files.filter(file => file.endsWith('.yaml'));

    for (const yamlFile of yamlFiles) {
      // Read YAML content
      const yamlPath = path.join(FREELANCERS_CONTENT_DIR, yamlFile);
      const content = await fs.readFile(yamlPath, 'utf8');

      // Find the photo line
      const photoLine = content.split('\n').find(line => line.startsWith('photo:'));
      
      // Log the exact photo line with character codes
      if (photoLine) {
        console.log(`${yamlFile}:`);
        console.log('Raw:', photoLine);
        console.log('Chars:', [...photoLine].map(c => c.charCodeAt(0)));
        console.log('---');
      }
    }
  } catch (error) {
    console.error('Check failed:', error);
  }
}

checkPaths();
