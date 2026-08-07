
document.addEventListener('DOMContentLoaded', function() {
    // Log a message to the console to confirm the script loaded
    console.log('🔥 Calm AI loaded successfully!');
    
    // Initialize all the functions for the page
    initHeaderScroll();
    initMobileMenu();
    initLangToggle();
    initBreathingExercise();
    initGroundingTechnique();
    initEmergencySupport();
    initDashboardStats();
    initSmoothScroll();
});

// --------------------------------------------
// Header Scroll Effect
// --------------------------------------------
// This function changes the header's appearance when the user
// scrolls down the page. When scrolled past 80px, the header
// becomes more opaque with a stronger shadow.
function initHeaderScroll() {
    // Get the header element by its ID
    const header = document.getElementById('mainHeader');
    
    // Listen for scroll events on the window
    window.addEventListener('scroll', function() {
        // Check if the user has scrolled more than 80px
        if (window.scrollY > 80) {
            // Add the 'scrolled' class to make header more solid
            header.classList.add('scrolled');
        } else {
            // Remove the class when at the top of the page
            header.classList.remove('scrolled');
        }
    });
}

// --------------------------------------------
// Mobile Menu Toggle
// --------------------------------------------
// On mobile devices, the navigation menu is hidden behind a
// hamburger icon. Clicking the icon shows or hides the menu.
function initMobileMenu() {
    // Get the menu toggle button and the navbar
    const menuBtn = document.getElementById('menuToggle');
    const navbar = document.querySelector('.navbar');
    
    // Only run if both elements exist on the page
    if (menuBtn && navbar) {
        // When the menu button is clicked, toggle the 'open' class
        menuBtn.addEventListener('click', function() {
            navbar.classList.toggle('open');
        });
        
        // When any navigation link is clicked, close the menu
        // This improves the user experience on mobile
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('open');
            });
        });
    }
}

// --------------------------------------------
// Language Toggle
// --------------------------------------------
// This function switches the page between Arabic and English.
// It changes the HTML language attribute, text direction,
// and updates the button text accordingly.
function initLangToggle() {
    // Get the language toggle button
    const langBtn = document.getElementById('langToggle');
    
    if (langBtn) {
        langBtn.addEventListener('click', function() {
            // Get the HTML element and the button's span text
            const html = document.documentElement;
            const span = this.querySelector('span');
            
            // Check the current language
            if (html.lang === 'ar') {
                // Switch to English
                html.lang = 'en';
                html.dir = 'ltr';
                span.textContent = 'العربية';
                showToast('🌍 Switched to English');
            } else {
                // Switch to Arabic
                html.lang = 'ar';
                html.dir = 'rtl';
                span.textContent = 'English';
                showToast('🌍 تم التبديل للعربية');
            }
        });
    }
}

// --------------------------------------------
// Breathing Exercise
// --------------------------------------------
// This creates an interactive breathing guide with a circle
// that expands (inhale) and contracts (exhale). The user can
// start and stop the exercise at any time.
function initBreathingExercise() {
    // Get all the elements needed for the breathing exercise
    const circle = document.getElementById('breathCircle');
    const text = document.getElementById('breathText');
    const countDisplay = document.getElementById('breathCount');
    const startBtn = document.getElementById('startBreath');
    const stopBtn = document.getElementById('stopBreath');
    
    // Track the state of the exercise
    let isActive = false;      // Is the exercise currently running?
    let count = 0;            // How many breaths have been taken?
    let interval = null;      // Reference to the interval timer
    let phase = 'inhale';     // Current phase: 'inhale' or 'exhale'
    
    // Start button - begins the breathing cycle
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            // Don't start if already running
            if (isActive) return;
            
            // Reset the exercise state
            isActive = true;
            count = 0;
            phase = 'inhale';
            
            // Update the UI
            circle.classList.add('active');
            text.textContent = 'شهيق';
            countDisplay.textContent = '0';
            
            // Show a toast notification
            showToast('🧘 بدأت جلسة التنفس');
            
            // Clear any existing interval to prevent conflicts
            clearInterval(interval);
            
            // Start the breathing cycle - every 3 seconds
            interval = setInterval(function() {
                if (phase === 'inhale') {
                    // Inhale phase - circle expands to full size
                    circle.style.transform = 'scale(1)';
                    text.textContent = 'شهيق';
                    phase = 'exhale';
                } else {
                    // Exhale phase - circle contracts to 60%
                    circle.style.transform = 'scale(0.6)';
                    text.textContent = 'زفير';
                    phase = 'inhale';
                    // Increment the breath count after each exhale
                    count++;
                    countDisplay.textContent = count;
                }
            }, 3000); // 3000ms = 3 seconds per phase
        });
    }
    
    // Stop button - ends the exercise and resets everything
    if (stopBtn) {
        stopBtn.addEventListener('click', function() {
            // Stop the exercise
            isActive = false;
            clearInterval(interval);
            
            // Reset the circle to its original state
            circle.classList.remove('active');
            circle.style.transform = 'scale(1)';
            text.textContent = 'شهيق';
            
            // Show a toast notification
            showToast('⏹️ تم إيقاف التمرين');
        });
    }
}

// --------------------------------------------
// Grounding Technique (5-4-3-2-1)
// --------------------------------------------
// This guides the user through the 5-4-3-2-1 grounding technique.
// Each step asks the user to find a certain number of things
// they can see, touch, hear, smell, or taste.
function initGroundingTechnique() {
    // Get the start button, all steps, and the progress bar
    const startBtn = document.getElementById('startGrounding');
    const steps = document.querySelectorAll('.grounding-step');
    const progress = document.getElementById('groundingProgress');
    
    // Track the current step and whether the exercise is active
    let currentStep = 0;
    let isActive = false;
    let timeout = null;
    
    // Start button - begins the grounding exercise
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            // Don't start if already running
            if (isActive) return;
            
            // Reset the exercise state
            isActive = true;
            currentStep = 0;
            progress.style.width = '0%';
            
            // Show a toast notification
            showToast('🌿 بدأت تقنية التأريض');
            
            // Remove active class from all steps
            steps.forEach((step, index) => {
                step.classList.remove('active');
            });
            
            // Start with the first step
            activateStep(0);
        });
    }
    
    // This function activates a specific step in the sequence
    function activateStep(index) {
        // If we've completed all steps, finish the exercise
        if (index >= steps.length) {
            isActive = false;
            progress.style.width = '100%';
            showToast('✅ أكملت تقنية التأريض!');
            return;
        }
        
        // Get the current step element
        const step = steps[index];
        step.classList.add('active');
        
        // Update the progress bar
        progress.style.width = ((index + 1) / steps.length * 100) + '%';
        
        // Show a toast with the step details
        const label = step.querySelector('.step-label').textContent;
        const num = step.querySelector('.step-num').textContent;
        showToast(`🔍 ${num} ${label}`);
        
        // Wait 2.5 seconds before moving to the next step
        timeout = setTimeout(function() {
            // Remove the active class from the current step
            step.classList.remove('active');
            // Move to the next step
            activateStep(index + 1);
        }, 2500);
    }
}

// --------------------------------------------
// Emergency Support
// --------------------------------------------
// This creates an emergency modal popup when the user clicks
// the "طلب مساعدة" button. It shows contact information and
// options for getting help.
function initEmergencySupport() {
    // Get the emergency button
    const emergencyBtn = document.getElementById('emergencyBtn');
    
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            // Create a modal overlay that covers the entire screen
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                inset: 0;
                z-index: 9999;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            `;
            
            // Add the modal content
            overlay.innerHTML = `
                <div style="
                    background: white;
                    padding: 40px;
                    border-radius: 20px;
                    max-width: 400px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 30px 80px rgba(0,0,0,0.2);
                ">
                    <div style="font-size: 64px; margin-bottom: 12px;">🆘</div>
                    <h2 style="font-size: 24px; margin-bottom: 8px;">طلب مساعدة</h2>
                    <p style="color: #6B7280; margin-bottom: 20px;">
                        هل أنت بحاجة للاتصال بالطوارئ؟
                    </p>
                    <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
                        <button onclick="window.location.href='tel:123'" style="
                            padding: 12px 30px;
                            background: #FF6B6B;
                            color: white;
                            border: none;
                            border-radius: 50px;
                            font-size: 16px;
                            font-weight: 700;
                            cursor: pointer;
                            font-family: 'Cairo', sans-serif;
                        ">
                            <i class="fas fa-phone"></i> اتصل الآن
                        </button>
                        <button onclick="this.closest('div[style]').parentNode.remove()" style="
                            padding: 12px 30px;
                            background: transparent;
                            color: #6B7280;
                            border: 2px solid #E5E7EB;
                            border-radius: 50px;
                            font-size: 16px;
                            font-weight: 700;
                            cursor: pointer;
                            font-family: 'Cairo', sans-serif;
                        ">
                            إلغاء
                        </button>
                    </div>
                    <p style="font-size: 12px; color: #9CA3AF; margin-top: 16px;">
                        رقم الطوارئ: 123 (للتوضيح فقط)
                    </p>
                </div>
            `;
            
            // Add the overlay to the page
            document.body.appendChild(overlay);
            
            // Close the modal when clicking outside the content
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    overlay.remove();
                }
            });
        });
    }
}

// --------------------------------------------
// Dashboard Statistics
// --------------------------------------------
// This function simulates real user data for the dashboard.
// It generates random but realistic numbers for:
// - Weekly panic count
// - Average heart rate
// - Average sleep hours
// - Calm score percentage
function initDashboardStats() {
    // Get all the dashboard value elements
    const weeklyPanics = document.getElementById('weeklyPanics');
    const avgHeartRate = document.getElementById('avgHeartRate');
    const avgSleep = document.getElementById('avgSleep');
    const calmScore = document.getElementById('calmScore');
    
    // Simulate data with delays to look like real loading
    if (weeklyPanics) {
        setTimeout(() => {
            weeklyPanics.textContent = Math.floor(Math.random() * 5) + 1;
        }, 500);
    }
    
    if (avgHeartRate) {
        setTimeout(() => {
            avgHeartRate.textContent = Math.floor(Math.random() * 15) + 68;
        }, 800);
    }
    
    if (avgSleep) {
        setTimeout(() => {
            avgSleep.textContent = (Math.random() * 3 + 5).toFixed(1);
        }, 1100);
    }
    
    if (calmScore) {
        setTimeout(() => {
            calmScore.textContent = Math.floor(Math.random() * 30) + 60;
        }, 1400);
    }
}

// --------------------------------------------
// Smooth Scroll for Navigation
// --------------------------------------------
// This adds smooth scrolling behavior to all navigation links
// that point to sections on the same page (e.g., #home, #about).
function initSmoothScroll() {
    // Find all links that start with '#'
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target element ID from the href
            const targetId = this.getAttribute('href');
            // Skip if it's just '#' with no target
            if (targetId === '#') return;
            
            // Find the target element on the page
            const target = document.querySelector(targetId);
            if (target) {
                // Prevent the default jump behavior
                e.preventDefault();
                
                // Calculate the scroll position - accounting for the fixed header
                const headerHeight = document.getElementById('mainHeader').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // Scroll to the target with smooth behavior
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --------------------------------------------
// Toast Notifications
// --------------------------------------------
// This creates temporary popup messages that appear at the
// bottom right of the screen. They disappear after 3.5 seconds.
function showToast(message) {
    // Remove any existing toasts to prevent stacking
    const existingToasts = document.querySelectorAll('.custom-toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create the toast element
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 14px 25px;
        background: #1A1A2E;
        color: white;
        border-radius: 12px;
        font-family: 'Cairo', sans-serif;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.4s ease;
        max-width: 350px;
        direction: ${document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr'};
        font-size: 14px;
    `;
    toast.textContent = message;
    
    // Add the toast to the page
    document.body.appendChild(toast);
    
    // Remove the toast after 3.5 seconds with animation
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.4s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 400);
    }, 3500);
}

// --------------------------------------------
// Inject Animation Keyframes
// --------------------------------------------
// This adds CSS animations to the page dynamically.
// These animations are used by the toast notifications.
(function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100px); opacity: 0; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
})();

// --------------------------------------------
// Console Logs for Development
// --------------------------------------------
// These logs help with debugging and show that the
// script has loaded successfully. They also add a
// human touch to the development process.
console.log('💙 Calm AI - Panic Attack Support');
console.log('📊 Dashboard data loaded');
console.log('🧘 Breathing exercise ready');
console.log('🌿 Grounding technique ready');
console.log('🆘 Emergency support ready');
console.log('✅ All systems go!');