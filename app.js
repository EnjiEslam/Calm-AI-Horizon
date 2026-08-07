
/* Calm AI - java Script */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Calm AI loaded');
    
    initHeader();
    initMenu();
    initLang();
    initBreathing();
    initGrounding();
    initEmergency();
    initDashboard();
    initSmooth();
});

// Header scroll
function initHeader() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu
function initMenu() {
    const btn = document.getElementById('menuBtn');
    const nav = document.querySelector('.navbar');
    if (btn && nav) {
        btn.addEventListener('click', function() {
            nav.classList.toggle('open');
        });
        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
            });
        });
    }
}

// Language toggle
function initLang() {
    const btn = document.getElementById('langBtn');
    if (btn) {
        btn.addEventListener('click', function() {
            const html = document.documentElement;
            const span = this.querySelector('span');
            if (html.lang === 'ar') {
                html.lang = 'en';
                html.dir = 'ltr';
                span.textContent = 'العربية';
                showToast('Switched to English');
            } else {
                html.lang = 'ar';
                html.dir = 'rtl';
                span.textContent = 'English';
                showToast('تم التبديل للعربية');
            }
        });
    }
}

// Breathing exercise
function initBreathing() {
    const circle = document.getElementById('breathCircle');
    const text = document.getElementById('breathText');
    const countEl = document.getElementById('breathCount');
    const startBtn = document.getElementById('startBreath');
    const stopBtn = document.getElementById('stopBreath');
    
    let active = false;
    let count = 0;
    let interval = null;
    let phase = 'inhale';
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            if (active) return;
            active = true;
            count = 0;
            phase = 'inhale';
            circle.classList.add('active');
            text.textContent = 'شهيق';
            countEl.textContent = '0';
            showToast('🧘 بدأت جلسة التنفس');
            clearInterval(interval);
            interval = setInterval(function() {
                if (phase === 'inhale') {
                    circle.style.transform = 'scale(1)';
                    text.textContent = 'شهيق';
                    phase = 'exhale';
                } else {
                    circle.style.transform = 'scale(0.6)';
                    text.textContent = 'زفير';
                    phase = 'inhale';
                    count++;
                    countEl.textContent = count;
                }
            }, 3000);
        });
    }
    
    if (stopBtn) {
        stopBtn.addEventListener('click', function() {
            active = false;
            clearInterval(interval);
            circle.classList.remove('active');
            circle.style.transform = 'scale(1)';
            text.textContent = 'شهيق';
            showToast('⏹️ تم إيقاف التمرين');
        });
    }
}

// Grounding technique
function initGrounding() {
    const startBtn = document.getElementById('startGrounding');
    const steps = document.querySelectorAll('.groundSteps .step');
    const progress = document.getElementById('groundingProgress');
    
    let current = 0;
    let active = false;
    let timeout = null;
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            if (active) return;
            active = true;
            current = 0;
            progress.style.width = '0%';
            showToast('🌿 بدأت تقنية التأريض');
            steps.forEach(function(step) {
                step.classList.remove('active');
            });
            activateStep(0);
        });
    }
    
    function activateStep(index) {
        if (index >= steps.length) {
            active = false;
            progress.style.width = '100%';
            showToast('✅ أكملت تقنية التأريض!');
            return;
        }
        const step = steps[index];
        step.classList.add('active');
        progress.style.width = ((index + 1) / steps.length * 100) + '%';
        const label = step.querySelector('.label').textContent;
        const num = step.querySelector('.num').textContent;
        showToast('🔍 ' + num + ' ' + label);
        timeout = setTimeout(function() {
            step.classList.remove('active');
            activateStep(index + 1);
        }, 2500);
    }
}

// Emergency support
function initEmergency() {
    const btn = document.getElementById('emergencyBtn');
    if (btn) {
        btn.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.5);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;';
            overlay.innerHTML = `
                <div style="background:white;padding:40px;border-radius:20px;max-width:400px;width:90%;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,0.2);">
                    <div style="font-size:64px;margin-bottom:12px;">🆘</div>
                    <h2 style="font-size:24px;margin-bottom:8px;">طلب مساعدة</h2>
                    <p style="color:#6B7280;margin-bottom:20px;">هل أنت بحاجة للاتصال بالطوارئ؟</p>
                    <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
                        <button onclick="window.location.href='tel:123'" style="padding:12px 30px;background:#FF6B6B;color:white;border:none;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;font-family:'Cairo',sans-serif;">
                            <i class="fas fa-phone"></i> اتصل الآن
                        </button>
                        <button onclick="this.closest('div[style]').parentNode.remove()" style="padding:12px 30px;background:transparent;color:#6B7280;border:2px solid #E5E7EB;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;font-family:'Cairo',sans-serif;">
                            إلغاء
                        </button>
                    </div>
                    <p style="font-size:12px;color:#9CA3AF;margin-top:16px;">رقم الطوارئ: 123 (للتوضيح فقط)</p>
                </div>
            `;
            document.body.appendChild(overlay);
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) overlay.remove();
            });
        });
    }
}

// Dashboard stats
function initDashboard() {
    const weekly = document.getElementById('weeklyPanics');
    const heart = document.getElementById('avgHeartRate');
    const sleep = document.getElementById('avgSleep');
    const calm = document.getElementById('calmScore');
    
    if (weekly) {
        setTimeout(function() {
            weekly.textContent = Math.floor(Math.random() * 5) + 1;
        }, 500);
    }
    if (heart) {
        setTimeout(function() {
            heart.textContent = Math.floor(Math.random() * 15) + 68;
        }, 800);
    }
    if (sleep) {
        setTimeout(function() {
            sleep.textContent = (Math.random() * 3 + 5).toFixed(1);
        }, 1100);
    }
    if (calm) {
        setTimeout(function() {
            calm.textContent = Math.floor(Math.random() * 30) + 60;
        }, 1400);
    }
}

// Smooth scroll
function initSmooth() {
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('header').offsetHeight;
                const pos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });
}

// Toast notifications
function showToast(message) {
    const old = document.querySelectorAll('.custom-toast');
    old.forEach(function(t) { t.remove(); });
    
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.style.cssText = 'position:fixed;bottom:30px;right:30px;padding:14px 25px;background:#1A1A2E;color:white;border-radius:12px;font-family:Cairo,sans-serif;font-weight:600;box-shadow:0 10px 30px rgba(0,0,0,0.2);z-index:10000;animation:slideIn 0.4s ease;max-width:350px;font-size:14px;';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function() {
        toast.style.animation = 'slideOut 0.4s ease';
        setTimeout(function() {
            if (toast.parentNode) toast.remove();
        }, 400);
    }, 3500);
}

// Inject animations
(function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100px); opacity: 0; } }
    `;
    document.head.appendChild(style);
})();

console.log('All systems ready');