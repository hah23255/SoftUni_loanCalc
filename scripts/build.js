import { copyFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const srcDir = join(rootDir, 'src');
const publicDir = join(rootDir, 'public');

// Create directories in public
const dirs = ['styles', 'components', 'services', 'utils'];
dirs.forEach(dir => {
  try {
    mkdirSync(join(publicDir, dir), { recursive: true });
  } catch (e) {
    // Ignore EEXIST errors (directory already exists)
    if (e.code !== 'EEXIST') {
      console.error(`Error creating directory ${dir}:`, e.message);
    }
  }
});

// Copy files recursively
function copyDir(src, dest) {
  const entries = readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    
    if (entry.isDirectory()) {
      mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
      console.log(`Copied: ${entry.name}`);
    }
  }
}

// Copy all src files to public
copyDir(srcDir, publicDir);

console.log('Build completed successfully!');
