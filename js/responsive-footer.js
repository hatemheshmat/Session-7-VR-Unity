/**
 * Responsive Footer JavaScript
 * Adds interactive functionality to the presentation footer
 */

// Initialize the footer when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeFooter();
});

/**
 * Initialize the footer functionality
 */
function initializeFooter() {
    // Get current slide information
    const currentSlideInfo = getCurrentSlideInfo();
    
    // Update progress bar
    updateProgressBar(currentSlideInfo.current, currentSlideInfo.total);
    
    // Set up button event listeners
    setupButtonListeners(currentSlideInfo);
    
    // Set up keyboard navigation
    setupKeyboardNavigation(currentSlideInfo);
    
    // Initialize fullscreen functionality
    setupFullscreenMode();
    
    // Initialize theme toggle
    setupThemeToggle();
    
    // Initialize slide notes
    setupSlideNotes();
}

/**
 * Get information about the current slide
 */
function getCurrentSlideInfo() {
    // Extract current slide number and total from the page
    const slideNumberElement = document.querySelector('.slide-number');
    let current = 1;
    let total = 45;
    
    if (slideNumberElement) {
        const slideText = slideNumberElement.textContent;
        const match = slideText.match(/Slide\s+(\d+)\s*\/\s*(\d+)/i);
        if (match) {
            current = parseInt(match[1]);
            total = parseInt(match[2]);
        }
    }
    
    // Determine previous and next slide paths
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop();
    
    // Get all slides in order
    const allSlides = getAllSlides();
    const currentIndex = allSlides.indexOf(filename);
    
    const prevSlide = currentIndex > 0 ? allSlides[currentIndex - 1] : null;
    const nextSlide = currentIndex < allSlides.length - 1 ? allSlides[currentIndex + 1] : null;
    
    return {
        current,
        total,
        currentIndex,
        prevSlide,
        nextSlide,
        allSlides
    };
}

/**
 * Get all slides in order
 */
function getAllSlides() {
    return [
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
}

/**
 * Update the progress bar based on current slide position
 */
function updateProgressBar(current, total) {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const percentage = (current / total) * 100;
        progressBar.style.width = `${percentage}%`;
    }
}

/**
 * Set up event listeners for footer buttons
 */
function setupButtonListeners(slideInfo) {
    // Previous slide button
    const prevButton = document.getElementById('prevSlideBtn');
    if (prevButton) {
        if (slideInfo.prevSlide) {
            prevButton.addEventListener('click', function() {
                window.location.href = slideInfo.prevSlide;
            });
        } else {
            prevButton.disabled = true;
        }
    }
    
    // Next slide button
    const nextButton = document.getElementById('nextSlideBtn');
    if (nextButton) {
        if (slideInfo.nextSlide) {
            nextButton.addEventListener('click', function() {
                window.location.href = slideInfo.nextSlide;
            });
        } else {
            nextButton.disabled = true;
        }
    }
    
    // First slide button
    const firstButton = document.getElementById('firstSlideBtn');
    if (firstButton) {
        firstButton.addEventListener('click', function() {
            window.location.href = slideInfo.allSlides[0];
        });
    }
    
    // Last slide button
    const lastButton = document.getElementById('lastSlideBtn');
    if (lastButton) {
        lastButton.addEventListener('click', function() {
            window.location.href = slideInfo.allSlides[slideInfo.allSlides.length - 1];
        });
    }
    
    // Home button
    const homeButton = document.getElementById('homeBtn');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
}

/**
 * Set up keyboard navigation
 */
function setupKeyboardNavigation(slideInfo) {
    document.addEventListener('keydown', function(e) {
        // Right arrow or Space or Enter for next slide
        if ((e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') && slideInfo.nextSlide) {
            window.location.href = slideInfo.nextSlide;
        }
        // Left arrow for previous slide
        else if (e.key === 'ArrowLeft' && slideInfo.prevSlide) {
            window.location.href = slideInfo.prevSlide;
        }
        // Home key for first slide
        else if (e.key === 'Home') {
            window.location.href = slideInfo.allSlides[0];
        }
        // End key for last slide
        else if (e.key === 'End') {
            window.location.href = slideInfo.allSlides[slideInfo.allSlides.length - 1];
        }
        // F key for fullscreen toggle
        else if (e.key === 'f' || e.key === 'F') {
            toggleFullscreen();
        }
    });
}

/**
 * Set up fullscreen mode
 */
function setupFullscreenMode() {
    const fullscreenButton = document.getElementById('fullscreenBtn');
    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', toggleFullscreen);
    }
}

/**
 * Toggle fullscreen mode
 */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
    
    // Toggle fullscreen class on body
    document.body.classList.toggle('fullscreen-mode');
}

/**
 * Set up theme toggle functionality
 */
function setupThemeToggle() {
    const themeButton = document.getElementById('themeBtn');
    if (themeButton) {
        themeButton.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Update button icon
            const icon = themeButton.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
    }
}

/**
 * Set up slide notes functionality
 */
function setupSlideNotes() {
    const notesButton = document.getElementById('notesBtn');
    if (notesButton) {
        notesButton.addEventListener('click', function() {
            const notesPanel = document.getElementById('notesPanel');
            if (notesPanel) {
                notesPanel.classList.toggle('show');
                
                // Update button icon
                const icon = notesButton.querySelector('i');
                if (notesPanel.classList.contains('show')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-sticky-note';
                }
            }
        });
    }
}

/**
 * Create slide notes panel if it doesn't exist
 */
function createNotesPanel() {
    if (!document.getElementById('notesPanel')) {
        const notesPanel = document.createElement('div');
        notesPanel.id = 'notesPanel';
        notesPanel.className = 'notes-panel';
        
        const notesPanelHeader = document.createElement('div');
        notesPanelHeader.className = 'notes-panel-header';
        notesPanelHeader.innerHTML = '<h3>Slide Notes</h3>';
        
        const notesPanelContent = document.createElement('div');
        notesPanelContent.className = 'notes-panel-content';
        notesPanelContent.innerHTML = '<textarea placeholder="Add your notes here..."></textarea>';
        
        notesPanel.appendChild(notesPanelHeader);
        notesPanel.appendChild(notesPanelContent);
        
        document.body.appendChild(notesPanel);
    }
}

