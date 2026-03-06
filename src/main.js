import './style.css';

// ===== STATE =====
let currentPage = 0;
const totalPages = 10;
let noClickCount = 0;
let musicPlaying = false;

// ===== CREATE FLOATING HEARTS =====
function createFloatingHearts() {
  const container = document.createElement('div');
  container.className = 'hearts-container';
  container.id = 'hearts-bg';
  document.getElementById('app').appendChild(container);

  const hearts = ['💕', '💖', '💗', '💓', '💘', '💝', '🌹', '✨', '💐', '🦋', '🌸'];

  function spawnHeart() {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 14000);
  }

  for (let i = 0; i < 15; i++) {
    setTimeout(spawnHeart, i * 300);
  }
  setInterval(spawnHeart, 800);
}

// ===== ROSE PETALS =====
function createRosePetals() {
  const container = document.getElementById('hearts-bg');

  function spawnPetal() {
    const petal = document.createElement('div');
    petal.className = 'rose-petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.width = (Math.random() * 10 + 8) + 'px';
    petal.style.height = (Math.random() * 10 + 8) + 'px';
    petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
    petal.style.animationDelay = Math.random() * 3 + 's';
    container.appendChild(petal);
    setTimeout(() => petal.remove(), 12000);
  }

  setInterval(spawnPetal, 1200);
}

// ===== CREATE SPARKLES =====
function createSparkles() {
  const container = document.getElementById('hearts-bg');

  function spawnSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    sparkle.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    container.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 5000);
  }

  for (let i = 0; i < 20; i++) {
    setTimeout(spawnSparkle, i * 200);
  }
  setInterval(spawnSparkle, 500);
}

// ===== CURSOR HEART TRAIL =====
function setupCursorTrail() {
  const miniHearts = ['💗', '✨', '💕', '🌸', '💖'];
  let lastTime = 0;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < 80) return; // Throttle
    lastTime = now;

    const heart = document.createElement('span');
    heart.className = 'cursor-heart';
    heart.textContent = miniHearts[Math.floor(Math.random() * miniHearts.length)];
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  });
}

// ===== CONFETTI =====
function launchConfetti() {
  const colors = ['#a78bfa', '#fbbf24', '#c4b5fd', '#7c3aed', '#5eead4', '#f0abfc', '#fcd34d', '#818cf8', '#6ee7b7'];
  const shapes = ['circle', 'rect'];

  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = color;
      confetti.style.borderRadius = shape === 'circle' ? '50%' : '2px';
      confetti.style.width = (Math.random() * 10 + 6) + 'px';
      confetti.style.height = (Math.random() * 10 + 6) + 'px';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4500);
    }, i * 25);
  }
}

// ===== SCREEN FLASH =====
function screenFlash() {
  const flash = document.createElement('div');
  flash.className = 'screen-flash';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 600);
}

// ===== PROGRESS BAR =====
function createProgressBar() {
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  bar.id = 'progress-bar';
  document.getElementById('app').appendChild(bar);
}

function updateProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (bar) {
    const progress = ((currentPage) / (totalPages - 1)) * 100;
    bar.style.width = progress + '%';
  }
}

// ===== MUSIC TOGGLE =====
function createMusicToggle() {
  const btn = document.createElement('button');
  btn.className = 'music-toggle';
  btn.id = 'music-toggle';
  btn.textContent = '🔇';
  btn.title = 'Play romantic music';
  document.getElementById('app').appendChild(btn);

  // Create audio context for a simple gentle tone
  btn.addEventListener('click', () => {
    musicPlaying = !musicPlaying;
    btn.textContent = musicPlaying ? '🎵' : '🔇';
    btn.classList.toggle('playing', musicPlaying);

    if (musicPlaying) {
      startAmbientMusic();
    } else {
      stopAmbientMusic();
    }
  });
}

// Simple ambient music with Web Audio API
let audioCtx = null;
let musicNodes = [];

function startAmbientMusic() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  const notes = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5
  const now = audioCtx.currentTime;

  function playChord(time) {
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.03, time + 0.5);
      gainNode.gain.linearRampToValueAtTime(0.02, time + 3);
      gainNode.gain.linearRampToValueAtTime(0, time + 4);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start(time + i * 0.3);
      osc.stop(time + 4);

      musicNodes.push(osc);
    });
  }

  // Play repeating gentle chords
  for (let i = 0; i < 20; i++) {
    playChord(now + i * 4);
  }
}

function stopAmbientMusic() {
  musicNodes.forEach(node => {
    try { node.stop(); } catch (e) { }
  });
  musicNodes = [];
}

// ===== TYPEWRITER EFFECT =====
function startTypewriter() {
  const lines = document.querySelectorAll('.typewriter-line');
  lines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('visible');
      const text = line.getAttribute('data-text');
      line.textContent = '';
      let charIndex = 0;

      function typeChar() {
        if (charIndex < text.length) {
          line.textContent += text[charIndex];
          charIndex++;
          setTimeout(typeChar, 50);
        } else {
          line.classList.add('done');
        }
      }
      typeChar();
    }, i * 2200);
  });
}

// ===== BUILD PAGES =====
function buildPages() {
  const app = document.getElementById('app');

  // Page 1: Entrance
  const page1 = createPage('page-entrance', `
    <div class="envelope-wrapper" id="open-envelope">
      <div class="envelope">💌</div>
    </div>
    <p class="entrance-text">I have something important to tell you...</p>
    <p class="tap-hint">tap the envelope to open</p>
  `);

  // Page 2: I'm Sorry - STRONGER MESSAGE
  const page2 = createPage('page-sorry', `
    <div class="sorry-heart">💔</div>
    <h1 class="sorry-title">I'm Deeply Sorry</h1>
    <p class="sorry-text">
      <span class="sorry-emphasis">It was all my fault.</span> I take full responsibility 
      for everything. I know I hurt you, and there's no excuse for that. 
      You didn't deserve any of it. I can't stop thinking about the pain 
      I caused you, and I'm truly, deeply sorry from the bottom of my heart.
    </p>
  `);

  // Page 3: Reasons - MORE ITEMS
  const page3 = createPage('page-reasons', `
    <h2 class="reasons-title">I Know What I Did Wrong</h2>
    <ul class="reasons-list">
      <li>💫 It was my fault — I should have been more understanding</li>
      <li>🌙 I should have listened to you instead of reacting</li>
      <li>🌸 I should have put your feelings above everything</li>
      <li>🦋 I never should have made you feel unimportant</li>
      <li>💝 You deserved patience and I gave you the opposite</li>
      <li>🌹 I was wrong, and I'm not too proud to admit it</li>
    </ul>
  `);

  // Page 4: What You Mean To Me (NEW)
  const page4 = createPage('page-meaning', `
    <h2 class="meaning-title">What You Mean To Me</h2>
    <div class="typewriter-container" id="typewriter-container">
      <div class="typewriter-line" data-text="You are my first thought every morning">.</div>
      <div class="typewriter-line" data-text="You are the reason I smile for no reason">.</div>
      <div class="typewriter-line" data-text="You make my whole world make sense">.</div>
      <div class="typewriter-line" data-text="I can't imagine life without you">.</div>
    </div>
    <div class="meaning-emoji-row">
      <span>🌹</span><span>💎</span><span>🌙</span><span>⭐</span><span>🦋</span>
    </div>
  `);

  // Page 5: Promise - MORE ITEMS
  const page5 = createPage('page-promise', `
    <div class="promise-icon">🤞</div>
    <h2 class="promise-title">My Promise To You</h2>
    <p class="promise-text">
      From the very bottom of my heart, I promise to be the person 
      you deserve. Not just with words, but with my actions every single day.
    </p>
    <div class="promise-items">
      <div class="promise-item">🌹 To always listen first</div>
      <div class="promise-item">💎 To cherish every moment with you</div>
      <div class="promise-item">🌙 To never take you for granted</div>
      <div class="promise-item">🛡️ To protect your heart always</div>
    </div>
  `);

  // Page 6: Love Letter - DEEPER MESSAGE
  const page6 = createPage('page-letter', `
    <div class="letter-container">
      <p class="letter-greeting">My Dearest Love,</p>
      <p class="letter-body">
        Every moment without your smile feels like an eternity. 
        You are the reason my heart beats, the melody in my 
        silence, and the light in my darkest days.
        <br><br>
        I was foolish. I was wrong. <strong>It was all my fault</strong>, 
        and I will carry that regret until I make it right. I don't 
        deserve your forgiveness, but I'm asking for it anyway — 
        because losing you would be losing the best part of me.
        <br><br>
        You make me want to be a better person — the kind of 
        person who truly deserves someone as incredible as you. 
        Please give me the chance to prove it every day.
      </p>
      <p class="letter-signature">Forever & Always Yours 💕</p>
    </div>
  `);

  // Page 7: Memories - MORE CARDS
  const page7 = createPage('page-memories', `
    <h2 class="memories-title">What We Have Is Special</h2>
    <div class="memories-grid">
      <div class="memory-card">
        <div class="memory-emoji">😂</div>
        <p class="memory-text">Our endless laughter together</p>
      </div>
      <div class="memory-card">
        <div class="memory-emoji">🌅</div>
        <p class="memory-text">Those beautiful moments we shared</p>
      </div>
      <div class="memory-card">
        <div class="memory-emoji">🫂</div>
        <p class="memory-text">The warmth of your hugs</p>
      </div>
      <div class="memory-card">
        <div class="memory-emoji">💬</div>
        <p class="memory-text">Our late night deep talks</p>
      </div>
      <div class="memory-card">
        <div class="memory-emoji">🎵</div>
        <p class="memory-text">Songs that remind me of you</p>
      </div>
      <div class="memory-card">
        <div class="memory-emoji">🥺</div>
        <p class="memory-text">How you always understand me</p>
      </div>
    </div>
  `);

  // Page 8: Our Song / Quote (NEW)
  const page8 = createPage('page-song', `
    <div class="song-icon">🎶</div>
    <h2 class="song-title">Every Love Song Reminds Me of You</h2>
    <p class="song-quote">
      If I could turn back time, I would hold you tighter, 
      listen harder, and love you louder. You are my favorite 
      song on repeat — my heart's melody that never gets old.
    </p>
    <div class="equalizer">
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
    </div>
  `);

  // Page 9: Final Question
  const page9 = createPage('page-final', `
    <div class="final-hearts">💕</div>
    <h2 class="final-question">Will You Forgive Me?</h2>
    <p class="final-subtext">I promise to make it up to you every single day</p>
    <div class="final-buttons">
      <button class="btn-yes" id="btn-yes">Yes, I Forgive You 💖</button>
      <button class="btn-no" id="btn-no">Not yet...</button>
    </div>
  `);

  // Page 10: Celebration
  const page10 = createPage('page-celebration', `
    <div class="celebration-emoji">🥰</div>
    <h2 class="celebration-title">Thank You, My Love!</h2>
    <p class="celebration-text">You just made me the happiest person alive</p>
    <div class="celebration-hearts">💖 💕 💗 💓 💘</div>
    <p class="celebration-message">
      I will spend every day proving that your forgiveness 
      was not wasted. I love you more than words could ever say. 💕
    </p>
  `);

  [page1, page2, page3, page4, page5, page6, page7, page8, page9, page10].forEach(p => app.appendChild(p));

  createIndicators();
  createNavButtons();
  createProgressBar();
  createMusicToggle();
}

function createPage(className, innerHTML) {
  const page = document.createElement('div');
  page.className = `page ${className}`;
  page.innerHTML = innerHTML;
  return page;
}

// ===== INDICATORS =====
function createIndicators() {
  const container = document.createElement('div');
  container.className = 'page-indicators';
  container.id = 'indicators';

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('div');
    dot.className = 'indicator';
    dot.addEventListener('click', () => goToPage(i));
    container.appendChild(dot);
  }

  document.getElementById('app').appendChild(container);
}

// ===== NAV BUTTONS =====
function createNavButtons() {
  const prevBtn = document.createElement('button');
  prevBtn.className = 'nav-btn nav-prev';
  prevBtn.id = 'nav-prev';
  prevBtn.textContent = '← Back';
  prevBtn.addEventListener('click', () => goToPage(currentPage - 1));

  const nextBtn = document.createElement('button');
  nextBtn.className = 'nav-btn nav-next';
  nextBtn.id = 'nav-next';
  nextBtn.textContent = 'Next →';
  nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

  document.getElementById('app').appendChild(prevBtn);
  document.getElementById('app').appendChild(nextBtn);
}

// ===== NAVIGATION =====
let typewriterStarted = false;

function goToPage(index) {
  if (index < 0 || index >= totalPages) return;

  const pages = document.querySelectorAll('.page');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('nav-prev');
  const nextBtn = document.getElementById('nav-next');

  pages.forEach(p => p.classList.remove('active'));

  currentPage = index;
  pages[currentPage].classList.add('active');

  // Update indicators
  indicators.forEach((ind, i) => {
    ind.classList.toggle('active', i === currentPage);
  });

  // Update progress bar
  updateProgressBar();

  // Toggle nav buttons visibility
  prevBtn.style.display = currentPage === 0 ? 'none' : 'block';

  // Hide next on final question + celebration
  if (currentPage >= totalPages - 2) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'block';
  }

  // Hide indicators & prev on entrance and celebration
  const indicatorContainer = document.getElementById('indicators');
  if (currentPage === 0 || currentPage === totalPages - 1) {
    indicatorContainer.style.display = 'none';
    prevBtn.style.display = 'none';
  } else {
    indicatorContainer.style.display = 'flex';
  }

  // Start typewriter on meaning page
  if (currentPage === 3 && !typewriterStarted) {
    typewriterStarted = true;
    startTypewriter();
  }
}

// ===== EVENT LISTENERS =====
function setupEvents() {
  // Envelope click
  document.getElementById('open-envelope').addEventListener('click', () => {
    screenFlash();
    goToPage(1);
  });

  // Forgive button
  document.getElementById('btn-yes').addEventListener('click', () => {
    screenFlash();
    goToPage(totalPages - 1);
    launchConfetti();
    setTimeout(launchConfetti, 1500);
    setTimeout(launchConfetti, 3000);
    setTimeout(launchConfetti, 5000);
  });

  // "Not yet" button — it runs away AND the yes button grows!
  const btnNo = document.getElementById('btn-no');
  const btnYes = document.getElementById('btn-yes');

  function handleNo() {
    noClickCount++;

    if (noClickCount >= 4) {
      btnNo.style.display = 'none';
      btnYes.classList.add('growing');
      return;
    }

    // Make the yes button slightly bigger each time
    const scale = 1 + noClickCount * 0.08;
    btnYes.style.transform = `scale(${scale})`;

    // Move the no button away
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 100;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    btnNo.style.position = 'fixed';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
    btnNo.style.zIndex = '9999';

    // Change no button text
    const noTexts = ['Are you sure? 🥺', 'Please? 😢', 'Think again... 💔', 'One more chance? 🙏'];
    btnNo.textContent = noTexts[Math.min(noClickCount - 1, noTexts.length - 1)];
  }

  btnNo.addEventListener('mouseover', handleNo);
  btnNo.addEventListener('click', handleNo);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      if (currentPage === 0) goToPage(1);
      else if (currentPage < totalPages - 2) goToPage(currentPage + 1);
    }
    if (e.key === 'ArrowLeft' && currentPage > 1) {
      goToPage(currentPage - 1);
    }
    if (e.key === 'Enter' && currentPage === 0) {
      screenFlash();
      goToPage(1);
    }
  });

  // Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPage < totalPages - 2) {
        if (currentPage === 0) goToPage(1);
        else goToPage(currentPage + 1);
      } else if (diff < 0 && currentPage > 1) {
        goToPage(currentPage - 1);
      }
    }
  }, { passive: true });
}

// ===== INIT =====
function init() {
  buildPages();
  createFloatingHearts();
  createRosePetals();
  createSparkles();
  setupCursorTrail();
  setupEvents();
  goToPage(0);
}

document.addEventListener('DOMContentLoaded', init);
