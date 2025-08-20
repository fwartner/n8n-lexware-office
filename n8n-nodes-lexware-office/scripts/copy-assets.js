const fs = require('fs');
const path = require('path');

// Function to copy files recursively
function copyFileSync(source, target) {
    const targetDir = path.dirname(target);
    
    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Copy the file
    fs.copyFileSync(source, target);
    console.log(`Copied: ${source} -> ${target}`);
}

// Function to copy directory recursively, filtering out TypeScript files
function copyDirSync(source, target, filterExtensions = []) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }
    
    const files = fs.readdirSync(source);
    
    files.forEach(file => {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);
        
        if (fs.statSync(sourcePath).isDirectory()) {
            copyDirSync(sourcePath, targetPath, filterExtensions);
        } else {
            // Skip TypeScript files and only copy necessary assets
            const shouldSkip = filterExtensions.some(ext => file.endsWith(ext));
            if (!shouldSkip) {
                copyFileSync(sourcePath, targetPath);
            }
        }
    });
}

// Main copy operation
try {
    console.log('Copying assets to dist folder...');
    
    // Copy SVG icons only
    const sourceIconDir = path.join(__dirname, '..', 'nodes', 'LexwareOffice');
    const targetIconDir = path.join(__dirname, '..', 'dist', 'nodes', 'LexwareOffice');
    
    if (fs.existsSync(sourceIconDir)) {
        // Only copy SVG files, not TypeScript files
        const files = fs.readdirSync(sourceIconDir);
        files.forEach(file => {
            if (file.endsWith('.svg')) {
                const sourcePath = path.join(sourceIconDir, file);
                const targetPath = path.join(targetIconDir, file);
                copyFileSync(sourcePath, targetPath);
            }
        });
    }
    
    console.log('Assets copied successfully!');
} catch (error) {
    console.error('Error copying assets:', error);
    process.exit(1);
}
