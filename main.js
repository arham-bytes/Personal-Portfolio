import { initThemeSwitcher } from './components/theme.js';
import { initTerminal } from './components/terminal.js';
import { initProjectsAndPublications } from './components/projects.js';
import { initDynamicBackground } from './components/background.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Components
  initThemeSwitcher();
  initTerminal();
  initProjectsAndPublications();
  initDynamicBackground();

 // Bind Avatar Image
const avatarImg = document.getElementById('avatar-img');

if (avatarImg) {
  avatarImg.src = './assets/avatar.png';
}

  // Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Dynamic Typing Effect
  const typingText = document.getElementById('typing-text');
  const words = ['Data Science Enthusiast', 'Quantitative Finance Enthusiast', 'Startup Builder', 'WorldQuant Researcher'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 120;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 60;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 120;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingDelay = 1500; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingDelay = 500; // Pause before starting new word
    }

    setTimeout(type, typingDelay);
  }

  if (typingText) {
    setTimeout(type, 1000);
  }

  // Intersection Observer for Skill Bars Animation
  function animateSkills() {

  const bars =
  document.querySelectorAll(
  '.skill-progress-bar'
  );

  bars.forEach(bar=>{

    const progress =
    bar.dataset.progress;

    setTimeout(()=>{

      bar.style.width =
      progress;

    },300);

  });

}

window.addEventListener(
'load',
animateSkills
);

  // Resume Download Button Placeholder click
  const resumeDownloadBtn = document.getElementById('resume-download-btn');

if (resumeDownloadBtn) {
  resumeDownloadBtn.addEventListener('click', () => {
    console.log('Resume download started');
  });
}
});