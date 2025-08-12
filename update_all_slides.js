/**
 * Script to update all slides with fixed CSS and JS files
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
    
    // Replace old CSS references with new fixed versions
    content = content.replace(
        /<link rel="stylesheet" href="css\/responsive-slides.css">/g,
        '<link rel="stylesheet" href="css/responsive-slides-fixed.css">'
    );
    
    content = content.replace(
        /<link rel="stylesheet" href="css\/responsive-footer.css">/g,
        '<link rel="stylesheet" href="css/responsive-footer-fixed.css">'
    );
    
    // Add the consistent styles CSS if not already present
    if (!content.includes('consistent-styles.css')) {
        content = content.replace(
            /<link rel="stylesheet" href="css\/dark-theme.css">/g,
            '<link rel="stylesheet" href="css/dark-theme.css">\n<link rel="stylesheet" href="css/consistent-styles.css">'
        );
    }
    
    // Replace old JS references with new fixed versions
    content = content.replace(
        /<script src="js\/responsive-footer.js"><\/script>/g,
        '<script src="js/responsive-footer-fixed.js"></script>'
    );
    
    // Ensure all titles and subtitles are centered
    content = content.replace(
        /<h1 class="([^"]*)">/g,
        '<h1 class="$1 text-center mx-auto">'
    );
    
    content = content.replace(
        /<h2 class="([^"]*)">/g,
        '<h2 class="$1 text-center mx-auto">'
    );
    
    content = content.replace(
        /<h3 class="([^"]*)">/g,
        '<h3 class="$1 text-center mx-auto">'
    );
    
    // Ensure slide content wrapper has proper padding for footer
    content = content.replace(
        /<div class="slide-content-wrapper">/g,
        '<div class="slide-content-wrapper" style="padding-bottom: 80px !important;">'
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});

console.log('All slides updated successfully!');

