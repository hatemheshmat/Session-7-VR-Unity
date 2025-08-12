/**
 * Script to update all quiz slides with fixed quiz functionality
 */

const fs = require('fs');
const path = require('path');

// Directory containing the slides
const slidesDir = __dirname;

// Get all HTML files in the directory
const files = fs.readdirSync(slidesDir).filter(file => file.includes('quiz') && file.endsWith('.html'));

// Process each quiz file
files.forEach(file => {
    const filePath = path.join(slidesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add quiz-fixed.css if not already present
    if (!content.includes('quiz-fixed.css')) {
        content = content.replace(
            /<\/head>/,
            '<link rel="stylesheet" href="css/quiz-fixed.css">\n</head>'
        );
    }
    
    // Add quiz-fixed.js if not already present
    if (!content.includes('quiz-fixed.js')) {
        content = content.replace(
            /<\/body>/,
            '<script src="js/quiz-fixed.js"></script>\n</body>'
        );
    }
    
    // Update question cards with data-question-index attribute
    let questionIndex = 0;
    const questionCardRegex = /<div class="question-card"[^>]*>/g;
    content = content.replace(questionCardRegex, match => {
        const result = `<div class="question-card" data-question-index="${questionIndex}">`;
        questionIndex++;
        return result;
    });
    
    // Add correct class to correct options
    const correctOptionRegex = /<button class="option-btn"[^>]*data-correct="true"[^>]*>/g;
    content = content.replace(correctOptionRegex, match => {
        return match.replace('option-btn', 'option-btn correct');
    });
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`Updated quiz functionality in ${file}`);
});

console.log('All quiz slides updated with fixed quiz functionality!');

