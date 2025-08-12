/**
 * Script to update all slides with the new responsive footer
 * This script adds the necessary CSS and JS files to each slide
 * and inserts the responsive footer HTML
 */

const fs = require('fs');
const path = require('path');

// Directory containing the slides
const slidesDir = __dirname;
const templateDir = path.join(slidesDir, 'template');

// Get all HTML files in the directory
const files = fs.readdirSync(slidesDir).filter(file => 
    file.endsWith('.html') && 
    file !== 'index.html'
);

// Read the footer template
const footerTemplate = fs.readFileSync(path.join(templateDir, 'responsive-footer.html'), 'utf8');

// CSS files to include
const cssFiles = [
    'css/responsive-slides.css',
    'css/responsive-footer.css',
    'css/notes-panel.css',
    'css/dark-theme.css'
];

// JS files to include
const jsFiles = [
    'js/responsive-footer.js'
];

// Get all slides in order
const allSlides = [
    'slide_00_cover.html',
    'slide_00_agenda.html',
    'slide_01_script_intro.html',
    'slide_02_csharp_unity.html',
    'slide_03_variables_101.html',
    'slide_04_fields_vs_local.html',
    'slide_05_numeric_types.html',
    'slide_06_strings.html',
    'slide_07_booleans.html',
    'slide_08_inspector.html',
    'slide_09_script_test.html',
    'slide_10_variables_quiz.html',
    'slide_11_methods.html',
    'slide_12_parameters.html',
    'slide_13_organizing_code.html',
    'slide_14_if_else.html',
    'slide_15_switch.html',
    'slide_16_loops.html',
    'slide_16_break.html',
    'slide_17_ui_canvas.html',
    'slide_18_textmeshpro_score.html',
    'slide_19_update_ui_script.html',
    'slide_20_anchor_canvas.html',
    'slide_21_worldspace_canvas.html',
    'slide_22_create_worldspace_canvas.html',
    'slide_23_add_tmp_package.html',
    'slide_24_add_tmp_text.html',
    'slide_25_anchor_canvas.html',
    'slide_26_update_ui_script.html',
    'slide_27_target_practice.html',
    'slide_28_performance_tips.html',
    'slide_29_handson_live_score.html',
    'slide_30_ui_recap_quiz.html',
    'slide_30_break.html',
    'slide_31_hook_score_to_hits.html',
    'slide_32_scoremanager_prefab.html',
    'slide_33_target_prefab_fields.html',
    'slide_34_target_spawning.html',
    'slide_35_game_timer.html',
    'slide_36_game_manager.html',
    'slide_37_game_ui_panels.html',
    'slide_38_final_project.html',
    'slide_39_session_recap.html',
    'slide_40_resources.html',
    'slide_40_thank_you.html'
];

// Process each file
files.forEach(file => {
    const filePath = path.join(slidesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Get the current slide index
    const currentIndex = allSlides.indexOf(file);
    if (currentIndex === -1) {
        console.log(`Skipping ${file} - not in slides list`);
        return;
    }
    
    const currentSlideNumber = currentIndex + 1;
    const totalSlides = allSlides.length;
    
    // Add CSS files to head
    let cssLinks = '';
    cssFiles.forEach(cssFile => {
        cssLinks += `<link rel="stylesheet" href="${cssFile}">\n`;
    });
    
    content = content.replace('</head>', `${cssLinks}</head>`);
    
    // Add JS files to end of body
    let jsScripts = '';
    jsFiles.forEach(jsFile => {
        jsScripts += `<script src="${jsFile}"></script>\n`;
    });
    
    // Modify the slide container structure
    content = content.replace(/<div class="slide-container">/g, 
        '<div class="slide-container">\n<div class="slide-content-wrapper">');
    
    // Close the slide-content-wrapper div before the end of slide-container
    content = content.replace(/<\/div>\s*<script>/g, '</div>\n</div>\n<script>');
    
    // If there's no script tag, close before the end of body
    if (!content.includes('</div>\n</div>\n<script>')) {
        content = content.replace(/<\/div>\s*<\/body>/g, '</div>\n</div>\n</body>');
    }
    
    // Remove existing navigation elements
    content = content.replace(/<div class="navigation">[\s\S]*?<\/div>\s*<div class="slide-number">[\s\S]*?<\/div>/g, '');
    
    // Add the footer template with the correct slide numbers
    let footer = footerTemplate.replace('CURRENT_SLIDE_NUMBER', currentSlideNumber);
    footer = footer.replace('TOTAL_SLIDES', totalSlides);
    
    // Add the footer and JS scripts before the end of body
    content = content.replace('</body>', `${footer}\n${jsScripts}</body>`);
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});

console.log('All slides updated successfully!');

