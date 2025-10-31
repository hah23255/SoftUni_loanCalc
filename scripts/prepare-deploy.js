import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');
const publicDir = path.join(root, 'public');

// Create public/src directory if it doesn't exist
const publicSrcDir = path.join(publicDir, 'src');

// Copy src directory to public/src
function copyRecursive(src, dest) {
  try {
    const stats = fs.statSync(src);
    
    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, {recursive: true});
      }
      
      const files = fs.readdirSync(src);
      files.forEach(file => {
        copyRecursive(path.join(src, file), path.join(dest, file));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error.message);
    process.exit(1);
  }
}

try {
  console.log('Preparing files for deployment...');
  
  // Verify source directory exists
  if (!fs.existsSync(srcDir)) {
    throw new Error(`Source directory not found: ${srcDir}`);
  }
  
  copyRecursive(srcDir, publicSrcDir);
  console.log('✓ Files copied to public/src');
  console.log('✓ Ready for deployment!');
} catch (error) {
  console.error('Deployment preparation failed:', error.message);
  process.exit(1);
}
