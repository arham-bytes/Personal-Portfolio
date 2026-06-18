export function initThemeSwitcher() {
  const themeButtons = document.querySelectorAll('.theme-dot-btn');
  const body = document.body;

  // Retrieve theme from localStorage or default to cyberpunk
  const savedTheme = localStorage.getItem('arham-portfolio-theme') || 'cyberpunk';
  applyTheme(savedTheme);

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      applyTheme(theme);
    });
  });

  function applyTheme(themeName) {
    // Remove all theme classes
    body.classList.remove('theme-cyberpunk', 'theme-obsidian', 'theme-sakura', 'theme-slate');
    
    // Add selected theme class
    body.classList.add(`theme-${themeName}`);
    
    // Save theme
    localStorage.setItem('arham-portfolio-theme', themeName);

    // Update active button state
    themeButtons.forEach(btn => {
      if (btn.getAttribute('data-theme') === themeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Notify terminal (custom event) if it's listening
    const event = new CustomEvent('themeChanged', { detail: { theme: themeName } });
    window.dispatchEvent(event);
  }
}
