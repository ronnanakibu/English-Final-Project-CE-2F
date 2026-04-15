/* ==============================
   ENGLISHIFY — English Learning Platform
   script.js
   ============================== */

// ==============================
// THEME MANAGEMENT
// ==============================
const THEME_KEY = 'lexis_theme';
const themeToggle = document.getElementById('themeToggle');

// Initialize theme on page load
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let theme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = '🌙';
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.textContent = '☀️';
  }
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  if (newTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = '🌙';
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.textContent = '☀️';
  }
  
  localStorage.setItem(THEME_KEY, newTheme);
});

initTheme();

// ==============================
// NAVBAR SCROLL BEHAVIOR
// ==============================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);

  const sections = ['home', 'lessons', 'quiz', 'leaderboard'];
  let current = 'home';
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section && window.scrollY >= section.offsetTop - 120) current = id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// ==============================
// MOBILE HAMBURGER MENU
// ==============================
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinksList.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = navLinksList.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navLinksList.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinksList.classList.remove('open'));
});

// ==============================
// SCROLL REVEAL (fade-up)
// ==============================
const fadeUpEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.08}s`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeUpEls.forEach(el => observer.observe(el));

// ==============================
// FISHER-YATES SHUFFLE ALGORITHM
// ==============================
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ==============================
// TEXT-TO-SPEECH FUNCTION
// ==============================
function speakText(text) {
  if (!window.speechSynthesis) {
    console.log('Speech Synthesis not supported');
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}

// ==============================
// EXTENDED LESSON DATABASE
// ==============================
const lessonData = {
  vocab: {
    title: '📖 Smart Dictionary',
    intro: 'Cari kata bahasa Inggris apa saja. Data ditarik langsung dari Free Dictionary API.',
    useAPI: true
  },
  grammar: {
    title: '✏️ Grammar Masterclass',
    intro: 'Pahami struktur bahasa Inggris dari level dasar (A1) hingga mahir (C1).',
    items: [
      { word: 'Present Simple', def: 'Fakta atau kebiasaan. / "The sun rises in the east."' },
      { word: 'Present Continuous', def: 'Sedang terjadi saat ini. / "I am coding a web app right now."' },
      { word: 'Present Perfect', def: 'Masa lalu yang berdampak ke masa kini. / "I have fixed the bug."' },
      { word: 'Past Continuous', def: 'Terjadi di masa lalu saat kejadian lain menyela. / "I was sleeping when the phone rang."' },
      { word: 'Passive Voice', def: 'Fokus pada objek, bukan pelaku. / "The server was hacked yesterday."' },
      { word: 'Third Conditional', def: 'Pengandaian masa lalu yang tidak nyata. / "If I had saved the file, I wouldn\'t have lost my work."' },
      { word: 'Reported Speech', def: 'Menyampaikan ucapan orang lain. / "She said that the system was offline."' }
    ]
  },
  conversation: {
    title: '💬 Real-World Conversation',
    intro: 'Pola percakapan dari skenario kasual hingga profesional.',
    items: [
      { word: 'Greetings & Catching Up', def: '"It\'s been a minute! How have you been holding up?"' },
      { word: 'Making Plans', def: '"Are you free this weekend? Let\'s grab some coffee."' },
      { word: 'Polite Disagreement', def: '"I see your point, but perhaps we should consider the alternative."' },
      { word: 'Asking for Clarification', def: '"Could you elaborate on the technical details?"' },
      { word: 'Wrapping up a Meeting', def: '"I think we\'ve covered everything. Let\'s reconvene next week."' },
      { word: 'Asking for Directions', def: '"Excuse me, could you point me to the nearest transit station?"' }
    ]
  }
};

// ==============================
// MODAL MANAGEMENT
// ==============================
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalCloseBtn = document.getElementById('modalClose');

function closeModal() {
  modalOverlay.classList.remove('open');
}

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Render modal untuk vocabulary (dengan API)
async function renderVocabModal() {
  modalContent.innerHTML = `
    <h2>📖 Smart Dictionary</h2>
    <p>Cari kata bahasa Inggris apa saja. Data ditarik langsung dari Free Dictionary API.</p>
    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
      <input type="text" id="apiSearchInput" class="name-input" placeholder="Ketik kata (cth: resilient)..." style="flex: 1;">
      <button id="apiSearchBtn" class="btn btn-primary">Cari</button>
    </div>
    <div id="apiResultArea" class="modal-items">
      <div class="modal-item"><span>Mulai ketik kata di atas untuk mencari definisi...</span></div>
    </div>
  `;

  const searchBtn = document.getElementById('apiSearchBtn');
  const searchInput = document.getElementById('apiSearchInput');
  const resultArea = document.getElementById('apiResultArea');

  const fetchWord = async () => {
    const word = searchInput.value.trim();
    if (!word) return;

    resultArea.innerHTML = `<div class="modal-item"><span>Mencari data untuk "${word}"... ⏳</span></div>`;

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) throw new Error('Kata tidak ditemukan');
      
      const data = await response.json();
      const phonetic = data[0].phonetic || '';
      const meaning = data[0].meanings[0].definitions[0].definition;
      const example = data[0].meanings[0].definitions[0].example || 'Tidak ada contoh kalimat.';

      resultArea.innerHTML = `
        <div class="modal-item" style="border-left: 4px solid var(--accent);">
          <strong>
            ${data[0].word} <span style="color: var(--text-2); font-weight: normal;">${phonetic}</span>
            <button class="speech-btn" data-word="${data[0].word}" title="Pronounce">🔊</button>
          </strong>
          <span style="display: block; margin-top: 8px;">📖 <b>Def:</b> ${meaning}</span>
          <span style="display: block; margin-top: 4px; color: var(--text-3);">💬 <b>Ex:</b> "${example}"</span>
        </div>
      `;

      const speechBtn = resultArea.querySelector('.speech-btn');
      if (speechBtn) {
        speechBtn.addEventListener('click', (e) => {
          e.preventDefault();
          speakText(speechBtn.getAttribute('data-word'));
        });
      }

    } catch (error) {
      resultArea.innerHTML = `<div class="modal-item"><strong style="color: var(--red);">Error:</strong> <span>Kata tidak ditemukan atau salah ejaan. Coba kata lain.</span></div>`;
    }
  };

  searchBtn.addEventListener('click', fetchWord);
  searchInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') fetchWord(); });
}

// Render modal untuk grammar & conversation (local data)
function renderLessonModal(track) {
  const data = lessonData[track];
  if (!data) return;

  modalContent.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.intro}</p>
    <div class="modal-items" style="max-height: 50vh; overflow-y: auto; padding-right: 10px;">
      ${data.items.map(item => `
        <div class="modal-item">
          <strong>
            ${item.word}
            <button class="speech-btn" data-word="${item.word}" title="Pronounce">🔊</button>
          </strong>
          <span>${item.def}</span>
        </div>
      `).join('')}
    </div>
  `;

  modalContent.querySelectorAll('.speech-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      speakText(btn.getAttribute('data-word'));
    });
  });
}

document.addEventListener('click', async function(e) {
  // Mencari apakah yang diklik adalah tombol atau elemen di dalam tombol
  const lessonBtn = e.target.closest('.lesson-btn');
  
  if (!lessonBtn) return;
  
  e.preventDefault();
  
  // Mengambil data-track dari card induknya
  const card = lessonBtn.closest('.lesson-card');
  if (!card) return;
  
  const track = card.getAttribute('data-track');

  // Logika percabangan untuk isi modal
  if (track === 'vocab') {
    await renderVocabModal(); // Memanggil fungsi API Dictionary
  } else if (track === 'grammar' || track === 'conversation') {
    renderLessonModal(track); // Memanggil data lokal
  }
  
  // Membuka overlay modal
  modalOverlay.classList.add('open');
});

// ==============================
// QUIZ DATA
// ==============================
const questionPool = [
  {
    question: 'Which sentence uses the Present Perfect tense correctly?',
    options: [
      'She go to school yesterday.',
      'She has gone to school today.',
      'She was gone to school.',
      'She goes to school tomorrow.'
    ],
    correct: 1,
    explanation: '"Has gone" = Present Perfect. It connects a past action to now.'
  },
  {
    question: 'Choose the word that means "expressing oneself in a clear, effective way".',
    options: ['Ambiguous', 'Eloquent', 'Reluctant', 'Concise'],
    correct: 1,
    explanation: '"Eloquent" means fluent and persuasive in language.'
  },
  {
    question: 'Which is an example of a Passive Voice sentence?',
    options: [
      'The chef cooked a delicious meal.',
      'She completed the assignment on time.',
      'The report was submitted by the team.',
      'They are working on the project now.'
    ],
    correct: 2,
    explanation: 'In passive voice, the subject receives the action: "was submitted by".'
  },
  {
    question: 'What is the correct way to politely ask for clarification?',
    options: [
      '"What do you mean?!"',
      '"Could you elaborate on that point?"',
      '"Say that again, I didn\'t understand."',
      '"You\'re not being clear enough."'
    ],
    correct: 1,
    explanation: '"Could you elaborate?" is professional and polite.'
  },
  {
    question: 'Which sentence uses the Third Conditional correctly?',
    options: [
      'If I study harder, I will pass.',
      'If she studied, she would pass.',
      'If he had left earlier, he would have caught the bus.',
      'When I was young, I liked to play outside.'
    ],
    correct: 2,
    explanation: 'Third Conditional: "If + past perfect, would have + past participle." Talks about unreal past.'
  }
];

// ==============================
// QUIZ STATE
// ==============================
let questions = [];
let currentQ = 0;
let score = 0;
let userName = '';
let answered = false;
let unloadProtected = false;

// DOM refs
const screenName = document.getElementById('screenName');
const screenQuestion = document.getElementById('screenQuestion');
const screenResult = document.getElementById('screenResult');
const nameInput = document.getElementById('nameInput');
const nameError = document.getElementById('nameError');
const startBtn = document.getElementById('startQuizBtn');
const progressFill = document.getElementById('progressFill');
const questionCounter = document.getElementById('questionCounter');
const liveScore = document.getElementById('liveScore');
const questionText = document.getElementById('questionText');
const optionsGrid = document.getElementById('optionsGrid');
const quizFeedback = document.getElementById('quizFeedback');
const retakeBtn = document.getElementById('retakeBtn');

// Before Unload Protection
const handleBeforeUnload = (e) => {
  e.preventDefault();
  e.returnValue = '';
  return '';
};

// Show a specific quiz screen
function showScreen(id) {
  ['screenName', 'screenQuestion', 'screenResult'].forEach(s => {
    document.getElementById(s).classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// Start quiz with randomization
startBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (!name) {
    nameError.classList.add('show');
    nameInput.focus();
    return;
  }
  nameError.classList.remove('show');
  userName = name;
  currentQ = 0;
  score = 0;

  // Randomize questions using Fisher-Yates
  questions = shuffleArray(questionPool);

  // Randomize options for each question and update correct index
  questions = questions.map(q => {
    const optionsWithIndex = q.options.map((opt, idx) => ({ opt, originalIdx: idx }));
    const shuffledOptions = shuffleArray(optionsWithIndex);
    const newCorrectIdx = shuffledOptions.findIndex(item => item.originalIdx === q.correct);

    return {
      ...q,
      options: shuffledOptions.map(item => item.opt),
      correct: newCorrectIdx
    };
  });

  // Activate beforeunload protection
  unloadProtected = true;
  window.addEventListener('beforeunload', handleBeforeUnload);

  loadQuestion();
  showScreen('screenQuestion');
});

nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') startBtn.click();
});

// Load a question into the DOM
function loadQuestion() {
  answered = false;
  const q = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  progressFill.style.width = `${progress}%`;
  questionCounter.textContent = `Question ${currentQ + 1} of ${questions.length}`;
  liveScore.textContent = `Score: ${score}`;
  questionText.textContent = q.question;
  quizFeedback.textContent = '';
  quizFeedback.className = 'quiz-feedback';

  // Render options
  optionsGrid.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleAnswer(i, btn));
    optionsGrid.appendChild(btn);
  });
}

// Handle answer selection
function handleAnswer(selectedIndex, selectedBtn) {
  if (answered) return;
  answered = true;

  const q = questions[currentQ];
  const allBtns = optionsGrid.querySelectorAll('.option-btn');

  // Disable all buttons
  allBtns.forEach(b => b.disabled = true);

  if (selectedIndex === q.correct) {
    score++;
    selectedBtn.classList.add('correct');
    quizFeedback.textContent = `✓ Correct! ${q.explanation}`;
    quizFeedback.className = 'quiz-feedback correct';
  } else {
    selectedBtn.classList.add('wrong');
    allBtns[q.correct].classList.add('correct');
    quizFeedback.textContent = `✗ Not quite. ${q.explanation}`;
    quizFeedback.className = 'quiz-feedback wrong';
  }

  liveScore.textContent = `Score: ${score}`;

  // Move to next question or show results
  setTimeout(() => {
    currentQ++;
    if (currentQ < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }, 1800);
}

// Show result screen
function showResults() {
  progressFill.style.width = '100%';

  const resultBadge = document.getElementById('resultBadge');
  const finalScore = document.getElementById('finalScore');
  const resultPlayer = document.getElementById('resultPlayer');
  const resultMsg = document.getElementById('resultMsg');

  finalScore.textContent = score;
  resultPlayer.textContent = `Well done, ${userName}! 👋`;

  // Badge & message based on score
  if (score === 5) {
    resultBadge.textContent = '🏆';
    resultMsg.textContent = 'Perfect score! You\'re an Englishify master.';
  } else if (score >= 3) {
    resultBadge.textContent = '⭐';
    resultMsg.textContent = 'Great effort! Keep pushing forward.';
  } else {
    resultBadge.textContent = '📚';
    resultMsg.textContent = 'Review the lessons and try again — you\'ve got this!';
  }

  saveToLeaderboard(userName, score);
  showScreen('screenResult');
  renderLeaderboard();

  // Deactivate beforeunload protection
  unloadProtected = false;
  window.removeEventListener('beforeunload', handleBeforeUnload);
}

// Retake quiz
retakeBtn.addEventListener('click', () => {
  currentQ = 0;
  score = 0;
  nameInput.value = '';
  unloadProtected = false;
  window.removeEventListener('beforeunload', handleBeforeUnload);
  showScreen('screenName');
});

// ==============================
// LEADERBOARD (localStorage)
// ==============================
const LB_KEY = 'lexis_leaderboard';

function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(LB_KEY)) || [];
  } catch {
    return [];
  }
}

function saveToLeaderboard(name, score) {
  const board = getLeaderboard();
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
  board.push({ name, score, date: today, ts: Date.now() });
  board.sort((a, b) => b.score - a.score || a.ts - b.ts);
  localStorage.setItem(LB_KEY, JSON.stringify(board.slice(0, 10)));
}

function renderLeaderboard() {
  const board = getLeaderboard();
  const body = document.getElementById('leaderboardBody');
  const empty = document.getElementById('lbEmpty');

  body.innerHTML = '';

  if (board.length === 0) {
    empty.classList.add('show');
    return;
  }
  empty.classList.remove('show');

  const rankStyle = ['gold', 'silver', 'bronze'];
  const rankEmoji = ['🥇', '🥈', '🥉'];

  board.forEach((entry, i) => {
    const row = document.createElement('div');
    row.className = 'lb-row';

    const rankClass = i < 3 ? rankStyle[i] : 'other';
    const rankDisplay = i < 3 ? rankEmoji[i] : `#${i + 1}`;

    row.innerHTML = `
      <span class="lb-rank ${rankClass}">${rankDisplay}</span>
      <span class="lb-name">${escapeHTML(entry.name)}</span>
      <span class="lb-score">${entry.score} / 5</span>
      <span class="lb-date">${entry.date}</span>
    `;
    body.appendChild(row);
  });
}

// Reset leaderboard
document.getElementById('resetLBBtn').addEventListener('click', () => {
  if (confirm('Reset the leaderboard? This cannot be undone.')) {
    localStorage.removeItem(LB_KEY);
    renderLeaderboard();
  }
});

// Basic XSS protection for user input rendered to DOM
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

// ==============================
// INIT
// ==============================
renderLeaderboard();