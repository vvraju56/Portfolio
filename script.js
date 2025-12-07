// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile menu toggle and main functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Setup contact form
    setTimeout(setupContactForm, 1000);
    
    // Setup navbar scroll effect
    setupNavbarScroll();
    
    // Enforce dark theme and initialize magnetic buttons
    document.documentElement.setAttribute('data-theme', 'dark');
    initMagneticButtons();
});

// Utility functions
function downloadResume() {
    // Create a dropdown menu for download options
    const downloadOptions = document.createElement('div');
    downloadOptions.innerHTML = `
        <div id="download-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Download Resume</h3>
                <div class="space-y-3">
                    <button onclick="downloadPDF()" class="w-full bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors">
                        <i class="fas fa-file-pdf mr-2"></i>Download as PDF
                    </button>
                    <button onclick="downloadWord()" class="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                        <i class="fas fa-file-word mr-2"></i>Download as Word
                    </button>
                    <button onclick="viewOnline()" class="w-full bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                        <i class="fas fa-eye mr-2"></i>View Online
                    </button>
                </div>
                <button onclick="closeDownloadModal()" class="mt-4 w-full text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times mr-2"></i>Cancel
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(downloadOptions);
}

function downloadPDF() {
    // Open PDF-optimized version in new window for printing/saving
    const pdfWindow = window.open('V_VISHNURAJU_Resume.pdf.html', '_blank');
    closeDownloadModal();
}

function downloadWord() {
    // Create Word document content
    const wordContent = generateWordContent();
    const blob = new Blob([wordContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'V_VISHNURAJU_Resume.doc';
    link.click();
    URL.revokeObjectURL(url);
    closeDownloadModal();
}

function viewOnline() {
    window.open('resume.html', '_blank');
    closeDownloadModal();
}

function closeDownloadModal() {
    const modal = document.getElementById('download-modal');
    if (modal) {
        modal.remove();
    }
}

function generateWordContent() {
    return `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>V VISHNURAJU - Resume</title>
<style>
body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
.header { text-align: center; border-bottom: 3px solid #667eea; padding-bottom: 20px; margin-bottom: 30px; }
.name { font-size: 24pt; font-weight: bold; color: #667eea; margin-bottom: 5px; }
.title { font-size: 14pt; color: #666; margin-bottom: 15px; }
.contact { font-size: 10pt; }
.section-title { font-size: 12pt; font-weight: bold; color: #667eea; border-bottom: 2px solid #667eea; margin: 20px 0 10px 0; }
.project { margin-bottom: 15px; padding: 10px; background: #f9f9f9; }
.education-item { margin-bottom: 10px; }
</style>
</head>
<body>

<div class="header">
    <div class="name">V VISHNURAJU</div>
    <div class="title">Web, App & Game Developer</div>
    <div class="contact">
        📧 vishnuraju922732@gail.com | 🔗 github.com/vvraju56 | 💼 linkedin.com/in/vishnuraju-v-757b9929b | 📍 India
    </div>
</div>

<div class="section-title">PROFESSIONAL SUMMARY</div>
<p>Passionate and multi-skilled developer with expertise in web, mobile, and game development. Proficient in modern frameworks like React.js, React Native, and Unity. Experienced in building scalable, performance-driven applications with focus on user experience and clean code architecture.</p>

<div class="section-title">TECHNICAL SKILLS</div>
<p><strong>Frontend:</strong> React.js, JavaScript, HTML5, CSS3, Bootstrap, Tailwind CSS</p>
<p><strong>Backend:</strong> Node.js, Express.js, MongoDB, Python</p>
<p><strong>Mobile & Game:</strong> React Native, Android Studio, Unity, C#</p>
<p><strong>Languages:</strong> Java, C, C#, Python, JavaScript</p>
<p><strong>Tools:</strong> Git, VS Code, Netlify, Power BI, MS Excel</p>

<div class="section-title">KEY PROJECTS</div>

<div class="project">
    <strong>Cross-Platform Game Application</strong><br>
    <em>Technologies: Unity, React Native, C#</em><br>
    • Developed interactive mobile game with advanced scoring system and real-time leaderboard<br>
    • Implemented smooth animations, game physics, and responsive controls<br>
    • Achieved cross-platform compatibility for iOS and Android devices
</div>

<div class="project">
    <strong>E-Commerce Mobile Application</strong><br>
    <em>Technologies: React Native, Firebase, JavaScript</em><br>
    • Built comprehensive e-commerce solution with user authentication<br>
    • Developed shopping cart, product catalog, and secure order processing<br>
    • Integrated Firebase for real-time database and cloud storage
</div>

<div class="project">
    <strong>Personal Portfolio Website</strong><br>
    <em>Technologies: React.js, Tailwind CSS, JavaScript</em><br>
    • Designed responsive portfolio showcasing technical skills and projects<br>
    • Implemented smooth scroll animations and modern UI/UX<br>
    • Deployed with performance optimization and SEO best practices
</div>

<div class="section-title">EDUCATION</div>

<div class="education-item">
    <strong>Bachelor of Technology - Information Technology</strong><br>
    2022 - 2026<br>
    Nandha Engineering College
</div>

<div class="education-item">
    <strong>Higher Secondary Certificate (12th Grade)</strong><br>
    2021 - 2022 | 57.1%<br>
    JKK Nataraja Matric Higher Sec School
</div>

<div class="education-item">
    <strong>Secondary School Certificate (10th Grade)</strong><br>
    2019 - 2020 | 57.3%<br>
    JKK Nataraja Matric Higher Sec School
</div>

<div class="section-title">CERTIFICATIONS</div>
<p>✓ UI UX Certificate</p>
<p>✓ Data Analysis Training</p>
<p>✓ Unity Game Development Certificate</p>

<div class="section-title">CORE COMPETENCIES</div>
<p>• Full-Stack Web Development • Cross-Platform Mobile Apps • Game Development & Design<br>
• Database Architecture • API Development & Integration • Performance Optimization<br>
• User Experience Design • Problem Solving & Debugging • Team Collaboration</p>

<div class="section-title">ACHIEVEMENTS</div>
<p>• 25+ Projects Completed • AI Knowledge • Multitasking • 15+ Technologies Mastered</p>

<hr style="margin-top: 30px;">
<p style="text-align: center; font-size: 8pt; color: #666;">© 2024 V VISHNURAJU | All Rights Reserved</p>

</body>
</html>
    `;
}

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function setupContactForm() {
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitBtn.disabled = true;
    });
}

/* Dark theme enforced by default (no toggle) */

/* Magnetic button pointer tracking */
function initMagneticButtons(){
    const buttons = document.querySelectorAll('.btn-magnetic');
    buttons.forEach(btn => {
        btn.addEventListener('pointermove', function(e){
            const rect = btn.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            btn.style.setProperty('--x', x + '%');
            btn.style.setProperty('--y', y + '%');
        });
        btn.addEventListener('pointerleave', function(){
            btn.style.setProperty('--x', '50%');
            btn.style.setProperty('--y', '50%');
        });
    });
}

// Setup navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });
}

// Smooth scrolling for navigation links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
            });
        }
    }
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to skill chips
    const skillChips = document.querySelectorAll('.skill-chip');
    skillChips.forEach(chip => {
        chip.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        chip.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';

        /* ===============================
             PARALLAX JS (append)
             - Scroll-based parallax for elements with `.parallax` and `data-speed`
             - Mouse tilt for `.project-card` (light, GPU-accelerated)
             - Decorative drift initialization for `.drift`
             - Respects `prefers-reduced-motion` and disables on small screens
        =================================== */

        (function(){
            // feature / accessibility checks
            const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const isSmall = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

            if (prefersReduced) return; // no motion

            // SCROLL PARALLAX
            const parallaxEls = Array.from(document.querySelectorAll('.parallax'));
            const handleScroll = () => {
                const scrollY = window.scrollY || window.pageYOffset;
                parallaxEls.forEach(el => {
                    const speed = parseFloat(el.dataset.speed) || 0.12;
                    // reduce effect on small screens
                    const s = isSmall ? (speed * 0.25) : speed;
                    el.style.transform = `translate3d(0, ${scrollY * s}px, 0)`;
                });
            };
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();

            // HERO subtle background parallax (separate faster handler for fine control)
            const hero = document.querySelector('#home.hero-parallax') || document.querySelector('#home');
            if (hero && !isSmall) {
                const heroSpeed = 0.06;
                const heroHandler = () => {
                    const base = window.scrollY || window.pageYOffset;
                    const y = base * heroSpeed;
                    hero.style.transform = `translate3d(0, ${y}px, 0)`;
                };
                window.addEventListener('scroll', heroHandler, { passive: true });
            }

            // MOUSE TILT FOR PROJECT CARDS
            if (!isSmall) {
                const cards = document.querySelectorAll('.project-card');
                cards.forEach(card => {
                    let rect = null;
                    const strength = 18; // lower = more subtle

                    const onMove = (e) => {
                        if (!rect) rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const midX = rect.width / 2;
                        const midY = rect.height / 2;
                        const rotateY = (x - midX) / strength;
                        const rotateX = -(y - midY) / strength;
                        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                    };
                    const onLeave = () => { card.style.transform = ''; rect = null; };
                    card.addEventListener('mousemove', onMove);
                    card.addEventListener('mouseleave', onLeave);
                });
            }

            // Decorative drift: randomize slight phase to avoid uniform motion
            const drifts = document.querySelectorAll('.drift');
            drifts.forEach((el, i) => {
                const delay = (i % 5) * 0.7;
                el.style.animationDelay = `${delay}s`;
            });

        })();

        /* ===============================
             CURSOR GLOW FOLLOW
        ================================*/

        (function () {
            const glow = document.getElementById("cursor-glow");
            if (!glow) return;

            let targetX = window.innerWidth / 2;
            let targetY = window.innerHeight / 2;
            let currentX = targetX;
            let currentY = targetY;
            let rafId;

            const prefersReduced =
                window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (prefersReduced) {
                glow.style.display = "none";
                return;
            }

            const onMove = (e) => {
                targetX = e.clientX;
                targetY = e.clientY;
                if (!rafId) {
                    rafId = requestAnimationFrame(updateGlow);
                }
            };

            function updateGlow() {
                const lerp = 0.18;
                currentX += (targetX - currentX) * lerp;
                currentY += (targetY - currentY) * lerp;

                glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

                if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
                    rafId = requestAnimationFrame(updateGlow);
                } else {
                    rafId = null;
                }
            }

            window.addEventListener("mousemove", onMove);
        })();

        /* ===============================
             PAGE TRANSITION ON NAV LINKS
        ================================*/

        (function () {
            const overlay = document.getElementById("page-transition");
            if (!overlay) return;

            const internalLinks = document.querySelectorAll('a[href^="#"]');

            const prefersReduced =
                window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            internalLinks.forEach((link) => {
                link.addEventListener("click", (e) => {
                    const href = link.getAttribute("href");
                    const id = href && href.startsWith("#") ? href.substring(1) : null;
                    const target = id ? document.getElementById(id) : null;

                    if (!target) return;

                    e.preventDefault();

                    if (prefersReduced) {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                        return;
                    }

                    overlay.classList.add("page-transition--active");

                    setTimeout(() => {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 200);

                    setTimeout(() => {
                        overlay.classList.remove("page-transition--active");
                    }, 750);
                });
            });

            // Initial subtle entrance
            window.addEventListener("load", () => {
                overlay.classList.add("page-transition--active");
                setTimeout(() => overlay.classList.remove("page-transition--active"), 700);
            });
        })();


        /* ===============================
                    PARALLAX + 3D TILT (append)
        ================================*/

        // scroll parallax for elements with .parallax
        (function(){
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const items = document.querySelectorAll('.parallax');
            const onScroll = () => {
                const scrollY = window.scrollY || window.pageYOffset;
                items.forEach(el => {
                    const speed = parseFloat(el.dataset.speed) || 0.08;
                    el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
                });
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();

            // 3D tilt for project cards
            if (!window.matchMedia || !window.matchMedia('(max-width: 768px)').matches) {
                document.querySelectorAll('.project-card').forEach(card => {
                    card.addEventListener('mousemove', e => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const midX = rect.width / 2;
                        const midY = rect.height / 2;
                        const rotateX = -(y - midY) / 18;
                        const rotateY = (x - midX) / 18;
                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                    });
                    card.addEventListener('mouseleave', () => {
                        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
                    });
                });
            }

        })();


        });
    });
    
    // Add click effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Typing effect for hero section (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}
