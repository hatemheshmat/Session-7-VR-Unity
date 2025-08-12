/**
 * Script to update all slides with fixed notes functionality
 */

const fs = require('fs');
const path = require('path');

// Directory containing the slides
const slidesDir = __dirname;

// Get all HTML files in the directory
const files = fs.readdirSync(slidesDir).filter(file => file.endsWith('.html'));

// Process each file
files.forEach(file => {
    const filePath = path.join(slidesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace old notes panel CSS with fixed version
    content = content.replace(
        /<link rel="stylesheet" href="css\/notes-panel.css">/g,
        '<link rel="stylesheet" href="css/notes-panel-fixed.css">'
    );
    
    // Add notes panel JS if not already present
    if (!content.includes('notes-panel-fixed.js')) {
        content = content.replace(
            /<script src="js\/responsive-footer-fixed.js"><\/script>/g,
            '<script src="js/responsive-footer-fixed.js"></script>\n<script src="js/notes-panel-fixed.js"></script>'
        );
    }
    
    // Ensure the notes button has the correct ID and icon
    content = content.replace(
        /<button id="notesBtn"[^>]*><i class="[^"]*"><\/i><\/button>/g,
        '<button id="notesBtn" title="Slide Notes"><i class="fas fa-sticky-note"></i></button>'
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`Updated notes functionality in ${file}`);
});

console.log('All slides updated with fixed notes functionality!');

