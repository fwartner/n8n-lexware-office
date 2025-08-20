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

// Function to copy directory recursively
function copyDirSync(source, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }
    
    const files = fs.readdirSync(source);
    
    files.forEach(file => {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);
        
        if (fs.statSync(sourcePath).isDirectory()) {
            copyDirSync(sourcePath, targetPath);
        } else {
            copyFileSync(sourcePath, targetPath);
        }
    });
}

// Main copy operation
try {
    console.log('Copying assets to dist folder...');
    
    // Copy SVG icons
    const sourceIconDir = path.join(__dirname, '..', 'nodes', 'LexwareOffice');
    const targetIconDir = path.join(__dirname, '..', 'dist', 'nodes', 'LexwareOffice');
    
    if (fs.existsSync(sourceIconDir)) {
        copyDirSync(sourceIconDir, targetIconDir);
    }
    
    // Copy any other assets that might be needed
    const sourceAssets = [
        { source: 'credentials', target: 'dist/credentials' },
        { source: 'types', target: 'dist/types' },
        { source: 'constants', target: 'dist/constants' },
        { source: 'utils', target: 'dist/utils' },
        { source: 'resources', target: 'dist/resources' }
    ];
    
    sourceAssets.forEach(({ source, target }) => {
        const sourcePath = path.join(__dirname, '..', source);
        const targetPath = path.join(__dirname, '..', target);
        
        if (fs.existsSync(sourcePath)) {
            copyDirSync(sourcePath, targetPath);
        }
    });
    
    console.log('Assets copied successfully!');
} catch (error) {
    console.error('Error copying assets:', error);
    process.exit(1);
}
