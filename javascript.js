// app.js
// Minimal logic: handle intro timing (2s), show main UI, simple upload mock, accessibility

(() => {
  const INTRO_MS = 2000; // 2 seconds — change if you like
  const introEl = document.getElementById('intro');
  const appEl = document.getElementById('app');

  // File upload UI
  const uploadBtn = document.getElementById('uploadBtn');
  const fileInput = document.getElementById('fileInput');
  const filesList = document.getElementById('filesList');
  const enterBtn = document.getElementById('enterBtn');
  const openPlans = document.getElementById('openPlans');

  // helper: escape text
  function esc(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

  // Intro sequence
  function completeIntro() {
    // hide intro (fade)
    introEl.classList.add('hidden');
    introEl.setAttribute('aria-hidden', 'true');

    // reveal app
    appEl.classList.add('visible');
    appEl.setAttribute('aria-hidden', 'false');

    // move focus to main UI (accessibility)
    setTimeout(() => {
      const firstFocusable = appEl.querySelector('button, [href], input, textarea, select');
      if (firstFocusable) firstFocusable.focus();
    }, 220);
  }

  // If user prefers reduced motion, skip animation and shorten intro
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const introDelay = reduced ? 0 : INTRO_MS;

  // start timer on DOMContentLoaded
  window.addEventListener('DOMContentLoaded', () => {
    // ensure intro hides even if images/SVG slow: set a hard timeout
    setTimeout(completeIntro, introDelay);
    // allow Enter Dashboard to bypass intro
    enterBtn.addEventListener('click', () => {
      completeIntro();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Upload interactions (mock)
  uploadBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    // create readable list
    files.forEach(f => {
      const div = document.createElement('div');
      div.className = 'file';
      div.innerHTML = `<svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h8v10H7z" stroke="#00AEEF" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                       <div style="flex:1"><div style="font-weight:700">${esc(f.name)}</div><div style="font-size:12px;color:#6b7280">${Math.round(f.size/1024)} KB</div></div>`;
      filesList.prepend(div);
    });

    // brief mock notification
    alert(`Selected ${files.length} file(s). This is a mock demo — no upload to server.`);
    e.target.value = '';
  });

  // Plans button demo
  openPlans.addEventListener('click', () => alert('Plans modal (demo): 20GB ₹199, 50GB ₹449, 100GB ₹799'));

})();
