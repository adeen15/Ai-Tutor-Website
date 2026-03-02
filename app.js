/* =============================================
   AI Tutor Website — app.js
   ============================================= */

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

// Close mobile menu when link clicked
mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== STATS COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            statNumbers.forEach(animateCounter);
        }
    });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

// ===== MOUSE PARALLAX ON HERO =====
const heroUniverse = document.getElementById('heroUniverse');
const heroParticles = document.getElementById('heroParticles');

document.addEventListener('mousemove', (e) => {
    if (!heroUniverse) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    heroUniverse.style.transform = `translate(${dx * 18}px, ${dy * 12}px)`;
    if (heroParticles) {
        heroParticles.style.transform = `translate(${dx * -8}px, ${dy * -6}px)`;
    }
});

// ===== CARD 3D TILT EFFECT =====
function applyTilt(cards) {
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotateX = ((y - cy) / cy) * -8;
            const rotateY = ((x - cx) / cx) * 8;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

applyTilt(document.querySelectorAll('.char-card'));
applyTilt(document.querySelectorAll('.feat-card'));

// ===== SCROLL REVEAL ANIMATION =====
const revealItems = document.querySelectorAll('.char-card, .feat-card, .how-step, .safety-item, .testi-card, .et-step, .price-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${(i % 4) * 80}ms`;
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Add base styles for reveal
const style = document.createElement('style');
style.textContent = `
.char-card, .feat-card, .how-step, .safety-item, .testi-card, .et-step, .price-card {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.175,0.885,0.32,1.275);
}
.revealed {
    opacity: 1 !important;
    transform: none !important;
}
`;
document.head.appendChild(style);

revealItems.forEach(item => revealObserver.observe(item));

// ===== MINI QUIZ ENGINE =====
const demoData = {
    dino: {
        icon: '🦖',
        name: 'Professor Dino',
        color: '#f59e0b',
        questions: [
            { q: 'Who built the famous Great Pyramids?', opts: ['The Romans 🏛️', 'The Ancient Egyptians 🏜️', 'The Vikings ⚔️'], correct: 1 },
            { q: 'What do we call preserved ancient bodies?', opts: ['Fossils 🦴', 'Mummies 🤕', 'Robots 🤖'], correct: 1 },
            { q: 'Where did the Ancient Romans live?', opts: ['Egypt 🌅', 'Italy 🍕', 'China 🇨🇳'], correct: 1 }
        ]
    },
    milo: {
        icon: '🐵',
        name: 'Milo Monkey',
        color: '#0369a1',
        questions: [
            { q: 'What is 2 + 2?', opts: ['3 🍌', '4 🍌🍌', '5 🍌🍌🍌'], correct: 1 },
            { q: 'How many sides does a triangle have?', opts: ['2', '3', '4'], correct: 1 },
            { q: 'Which number comes after 9?', opts: ['8', '10', '11'], correct: 1 }
        ]
    },
    alien: {
        icon: '👾',
        name: 'Starry Alien',
        color: '#9333ea',
        questions: [
            { q: 'Which planet do we live on?', opts: ['Mars 🔴', 'Earth 🌍', 'Venus 🌸'], correct: 1 },
            { q: 'What is the closest star to Earth?', opts: ['The Moon 🌙', 'The Sun ☀️', 'Pluto ❄️'], correct: 1 },
            { q: 'How many planets are in our Solar System?', opts: ['7', '8', '9'], correct: 1 }
        ]
    },
    cat: {
        icon: '🐱',
        name: 'Magic Cat',
        color: '#db2777',
        questions: [
            { q: 'Why does ice turn into water?', opts: ['Magic 🪄', 'Heat melts it 🌡️', 'It gets scared 😱'], correct: 1 },
            { q: 'What do magnets attract?', opts: ['Wood 🪵', 'Metal 🔩', 'Plastic 🧴'], correct: 1 },
            { q: 'Plants need ___ to make food?', opts: ['Darkness 🌑', 'Sunlight ☀️', 'Music 🎵'], correct: 1 }
        ]
    },
    bee: {
        icon: '🐝',
        name: 'Bouncy Bee',
        color: '#854d0e',
        questions: [
            { q: 'Why do bees make honey?', opts: ['To paint 🎨', 'As food to eat 🍯', 'To build houses 🏠'], correct: 1 },
            { q: 'What color is the sky on a clear day?', opts: ['Green 💚', 'Blue 💙', 'Pink 💗'], correct: 1 },
            { q: 'What do flowers need to grow?', opts: ['TV 📺', 'Water and sun 🌱', 'Candy 🍬'], correct: 1 }
        ]
    }
};

let currentCharKey = 'dino';
let currentQIndex = 0;
let demoCoins = 0;
let demoXP = 0;
let totalEarnedCoins = 0;
let answered = false;

function selectDemoChar(key) {
    currentCharKey = key;
    currentQIndex = 0;
    demoCoins = 0;
    demoXP = 0;
    totalEarnedCoins = 0;
    answered = false;

    // Update selector buttons
    document.querySelectorAll('.demo-char-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.demo-char-btn[data-char="${key}"]`).classList.add('active');

    // Hide result and complete screens
    document.getElementById('demoResult').style.display = 'none';
    document.getElementById('demoComplete').style.display = 'none';
    document.getElementById('demoOptions').style.display = 'flex';

    updateDemoHUD();
    loadDemoQuestion();
}

function updateDemoHUD() {
    document.getElementById('demoCoins').textContent = demoCoins;
    document.getElementById('demoXP').textContent = demoXP;
    document.getElementById('demoQNum').textContent = currentQIndex + 1;
}

function loadDemoQuestion() {
    const char = demoData[currentCharKey];
    const q = char.questions[currentQIndex];

    document.getElementById('demoCharIcon').textContent = char.icon;
    document.getElementById('demoCharNameTag').textContent = char.name + ' says:';
    document.getElementById('demoQuestion').textContent = q.q;

    const optsEl = document.getElementById('demoOptions');
    optsEl.innerHTML = '';
    q.opts.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'demo-opt' + (i === q.correct ? ' correct-opt' : '');
        btn.setAttribute('data-idx', i);
        btn.textContent = opt;
        btn.onclick = () => checkDemoAnswer(btn, i);
        optsEl.appendChild(btn);
    });

    // Apply character accent color
    document.getElementById('demoCharNameTag').style.color = char.color;
    answered = false;
}

function checkDemoAnswer(btn, chosenIdx) {
    if (answered) return;
    answered = true;

    const char = demoData[currentCharKey];
    const q = char.questions[currentQIndex];
    const isCorrect = chosenIdx === q.correct;
    const allOpts = document.querySelectorAll('.demo-opt');

    allOpts.forEach((b, i) => {
        b.style.pointerEvents = 'none';
        if (i === q.correct) {
            b.style.background = 'rgba(16,185,129,0.35)';
            b.style.borderColor = '#10b981';
        } else if (b === btn && !isCorrect) {
            b.style.background = 'rgba(239,68,68,0.3)';
            b.style.borderColor = '#ef4444';
        }
    });

    const coinsEarned = isCorrect ? 20 : 5;
    const xpEarned = isCorrect ? 10 : 2;
    demoCoins += coinsEarned;
    demoXP += xpEarned;
    totalEarnedCoins += coinsEarned;

    updateDemoHUD();

    setTimeout(() => {
        const resultEl = document.getElementById('demoResult');
        resultEl.style.display = 'block';
        document.getElementById('demoOptions').style.display = 'none';
        document.getElementById('resultIcon').textContent = isCorrect ? '✅' : '❌';
        document.getElementById('resultText').textContent = isCorrect ? 'Brilliant! That\'s correct! 🎉' : 'Not quite — the right answer was highlighted! 💡';
        document.getElementById('resultCoins').textContent = `+${coinsEarned} Coins   +${xpEarned} XP`;

        if (isCorrect) {
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ['#fbbf24', '#a78bfa', '#34d399', '#f472b6'] });
        }
    }, 600);
}

function nextDemoQuestion() {
    currentQIndex++;
    const char = demoData[currentCharKey];

    if (currentQIndex >= char.questions.length) {
        // Show complete screen
        document.getElementById('demoResult').style.display = 'none';
        document.getElementById('demoComplete').style.display = 'block';
        document.getElementById('totalCoins').textContent = totalEarnedCoins;
        
        confetti({ particleCount: 200, spread: 80, origin: { y: 0.5 }, colors: ['#fbbf24', '#a78bfa', '#34d399', '#f472b6', '#60a5fa'] });
    } else {
        document.getElementById('demoResult').style.display = 'none';
        document.getElementById('demoOptions').style.display = 'flex';
        updateDemoHUD();
        loadDemoQuestion();
    }
}

function resetDemo() {
    selectDemoChar(currentCharKey);
}

// Init demo on load
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('demoQuizBox')) {
        loadDemoQuestion();
    }
});

// ===== ADVENTURE MAP TRAVELER ANIMATION =====
(function() {
    const traveler = document.querySelector('.adv-traveler');
    if (!traveler) return;

    const waypoints = [
        { left: '10%', top: '72%' },
        { left: '24%', top: '57%' },
        { left: '39%', top: '39%' },
        { left: '54%', top: '27%' },
    ];

    let wp = 0;
    function moveTraveler() {
        const pos = waypoints[wp % waypoints.length];
        traveler.style.transition = 'left 2s ease, top 2s ease';
        traveler.style.left = pos.left;
        traveler.style.top = pos.top;
        wp++;
        setTimeout(moveTraveler, 3000);
    }
    setTimeout(moveTraveler, 1500);
})();

// ===== HERO CHARACTER CYCLE =====
(function() {
    const charDisplay = document.getElementById('heroCharDisplay');
    if (!charDisplay) return;

    const chars = [
        { icon: '🦖', label: 'Professor Dino', bg: 'radial-gradient(ellipse at 30% 50%, #fff9c4 0%, transparent 60%)' },
        { icon: '🐵', label: 'Milo Monkey',    bg: 'radial-gradient(ellipse at 30% 50%, #bae6fd 0%, transparent 60%)' },
        { icon: '👾', label: 'Starry Alien',   bg: 'radial-gradient(ellipse at 30% 50%, #e9d5ff 0%, transparent 60%)' },
        { icon: '🐱', label: 'Magic Cat',      bg: 'radial-gradient(ellipse at 30% 50%, #fbcfe8 0%, transparent 60%)' },
        { icon: '🐝', label: 'Bouncy Bee',     bg: 'radial-gradient(ellipse at 30% 50%, #fef08a 0%, transparent 60%)' },
    ];

    let ci = 0;
    charDisplay.addEventListener('click', () => {
        ci = (ci + 1) % chars.length;
        charDisplay.style.transform = 'scale(0.7) rotate(-10deg)';
        charDisplay.style.opacity = '0';
        setTimeout(() => {
            charDisplay.textContent = chars[ci].icon;
            charDisplay.style.transition = 'transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.3s';
            charDisplay.style.transform = '';
            charDisplay.style.opacity = '1';
        }, 250);
    });
})();

// ===== SECTION ENTRANCE OBSERVER FOR ADVENTURE MAP =====
(function() {
    const advSection = document.querySelector('.adventure-section');
    if (!advSection) return;

    const advObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const nodes = document.querySelectorAll('.adv-node');
                nodes.forEach((node, i) => {
                    setTimeout(() => node.classList.add('revealed'), i * 200);
                });
                advObserver.unobserve(advSection);
            }
        });
    }, { threshold: 0.2 });

    advObserver.observe(advSection);
})();

// ===== FEAT CARD FLOATING EMOJI RE-TIMING =====
document.querySelectorAll('.feat-icon').forEach((icon, i) => {
    icon.style.animationDelay = `${(i * 0.3) % 3}s`;
});
document.querySelectorAll('.orbit-char, .char-orbit-mini span').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.5}s`;
});
