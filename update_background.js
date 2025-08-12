// This script will update all existing slides with the new background
// It adds the background image and navigation buttons to each slide

const fs = require('fs');
const path = require('path');

// Directory containing the slides
const slidesDir = __dirname;

// Get all HTML files in the directory
const files = fs.readdirSync(slidesDir).filter(file => 
    file.endsWith('.html') && 
    file !== 'index.html' && 
    !file.startsWith('slide_00_') && 
    !file.includes('_break.html') &&
    !file.includes('_thank_you.html')
);

// CSS to add to each slide
const backgroundCSS = `
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    font-family: 'Montserrat', sans-serif;
}

.slide-container {
    width: 100%;
    height: 100%;
    position: relative;
    background: url('assets/background.svg') no-repeat center center;
    background-size: cover;
}

.navigation {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
}

.nav-button {
    background-color: rgba(0, 120, 215, 0.8);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

.nav-button:hover {
    background-color: rgba(0, 120, 215, 1);
    transform: scale(1.1);
}

.slide-number {
    position: fixed;
    bottom: 20px;
    left: 20px;
    font-size: 0.8rem;
    color: #666;
}
`;

// Navigation HTML to add to each slide
function getNavigationHTML(prevSlide, nextSlide, slideNumber, totalSlides) {
    return `
<div class="navigation">
    <button class="nav-button" id="prevBtn">
        <i class="fas fa-chevron-left"></i>
    </button>
    <button class="nav-button" id="nextBtn">
        <i class="fas fa-chevron-right"></i>
    </button>
</div>

<div class="slide-number">Slide ${slideNumber} / ${totalSlides}</div>

<script>
    document.getElementById('prevBtn').addEventListener('click', function() {
        window.location.href = '${prevSlide}';
    });
    
    document.getElementById('nextBtn').addEventListener('click', function() {
        window.location.href = '${nextSlide}';
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
            window.location.href = '${nextSlide}';
        } else if (e.key === 'ArrowLeft') {
            window.location.href = '${prevSlide}';
        }
    });
</script>
`;
}

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
    
    // Skip files that already have the background
    if (content.includes('assets/background.svg')) {
        console.log(`Skipping ${file} - already has background`);
        return;
    }
    
    // Get the current slide index
    const currentIndex = allSlides.indexOf(file);
    if (currentIndex === -1) {
        console.log(`Skipping ${file} - not in slides list`);
        return;
    }
    
    // Get previous and next slides
    const prevSlide = currentIndex > 0 ? allSlides[currentIndex - 1] : allSlides[0];
    const nextSlide = currentIndex < allSlides.length - 1 ? allSlides[currentIndex + 1] : allSlides[allSlides.length - 1];
    
    // Add background CSS to head
    content = content.replace(/<\/style>/, `${backgroundCSS}\n</style>`);
    
    // Add navigation HTML before closing body tag
    content = content.replace(/<\/body>/, `${getNavigationHTML(prevSlide, nextSlide, currentIndex + 1, allSlides.length)}\n</body>`);
    
    // Update the slide container to use the background
    content = content.replace(/<div class="slide-container.*?>/, '<div class="slide-container">');
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});

console.log('All slides updated successfully!');

