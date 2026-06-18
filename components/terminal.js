export function initTerminal() {
  const terminalDrawer = document.getElementById('terminal-drawer');
  const terminalToggle = document.getElementById('terminal-toggle');
  const terminalClose = document.getElementById('terminal-close');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalBody = document.getElementById('terminal-body');

  // Toggle terminal drawer
  terminalToggle.addEventListener('click', () => {
    terminalDrawer.classList.add('open');
    terminalInput.focus();
  });

  terminalClose.addEventListener('click', () => {
    terminalDrawer.classList.remove('open');
  });

  // Listen for clicks outside to close drawer
  document.addEventListener('click', (e) => {
    if (!terminalDrawer.contains(e.target) && e.target !== terminalToggle && !terminalToggle.contains(e.target) && terminalDrawer.classList.contains('open')) {
      terminalDrawer.classList.remove('open');
    }
  });

  // Theme change updates
  window.addEventListener('themeChanged', (e) => {
    printLine(`[SYSTEM] Theme switched to: ${e.detail.theme.toUpperCase()}`, 'info');
  });

  // Handle input
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim();
      terminalInput.value = '';
      if (command) {
        processCommand(command);
      }
    }
  });

  function printLine(text, type = 'default') {
    const line = document.createElement('div');
    line.className = `terminal-output-line type-${type}`;
    
    // Style text based on type
    if (type === 'command') {
      line.innerHTML = `<span style="color: var(--accent-magenta);">arham_usr$</span> <span style="color: var(--accent-cyan); font-weight: bold;">${text}</span>`;
    } else if (type === 'error') {
      line.innerHTML = `<span style="color: #ff5f56; font-weight: bold;">[ERROR]</span> ${text}`;
    } else if (type === 'success') {
      line.innerHTML = `<span style="color: var(--accent-green); font-weight: bold;">[SUCCESS]</span> ${text}`;
    } else if (type === 'info') {
      line.innerHTML = `<span style="color: var(--accent-yellow);">[INFO]</span> ${text}`;
    } else {
      line.innerHTML = text;
    }
    
    terminalOutput.appendChild(line);
    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function processCommand(rawCommand) {
    printLine(rawCommand, 'command');
    
    const parts = rawCommand.toLowerCase().split(' ');
    const cmd = parts[0];
    const arg = parts[1];

    switch(cmd) {
      case 'help':
        printLine(`Available commands:<br>
  - <span style="color: var(--accent-cyan)">about</span>       : Prints a brief overview of who I am<br>
  - <span style="color: var(--accent-cyan)">skills</span>      : Lists my technological stack and proficiency<br>
  - <span style="color: var(--accent-cyan)">projects</span>    : Lists portfolio projects and access details<br>
  - <span style="color: var(--accent-cyan)">publications</span>: Showcases scholarly/technical publications<br>
  - <span style="color: var(--accent-cyan)">academics</span>   : Academic qualifications timeline<br>
  - <span style="color: var(--accent-cyan)">contact</span>     : Displays social links and contact protocols<br>
  - <span style="color: var(--accent-cyan)">theme &lt;name&gt;</span>: Changes color theme (options: cyberpunk, obsidian, sakura, slate)<br>
  - <span style="color: var(--accent-cyan)">clear</span>      : Clears terminal console screen`);
        break;

      case 'about':
        printLine(`Arham is an aspiring Data Scientist & Machine Learning Engineer.<br>
Passionately discovering actionable insights, designing statistical models, and developing automated data pipelines.<br>
Active Workspace: C:\\Users\\arham\\.gemini\\antigravity\\scratch\\personal-portfolio`);
        break;

      case 'skills':
        printLine(`Skill Matrix Matrix:<br>
  - Python (Core) [██████████████████░░] 92%<br>
  - Pandas/Numpy  [███████████████████░] 95%<br>
  - Scikit-Learn  [██████████████████░░] 90%<br>
  - SQL / Query   [█████████████████░░░] 88%<br>
  - PyTorch / DL  [████████████████░░░░] 80%`);
        break;

      case 'projects':
        printLine(`Featured Projects:<br>
  1. <span style="color: var(--accent-cyan)">Housing-Predictor</span>: Regression pipeline forecasting real estate using LightGBM.<br>
  2. <span style="color: var(--accent-cyan)">Deep-Vision</span>: PyTorch CNN medical diagnostic system from chest X-rays.<br>
  3. <span style="color: var(--accent-cyan)">Reddit-NLP</span>: Fine-tuned RoBERTa financial sentiment tracker.<br>
  4. <span style="color: var(--accent-cyan)">Cloud-ETL</span>: Big data cleaning pipeline using PySpark & Airflow.`);
        break;

      case 'publications':
        printLine(`Recent Publications:<br>
  1. "[PDF] Evaluating Bias and Fairness in Large Language Model Reinforcement Loops" - Journal of AI Ethics 2025<br>
  2. "[DOC] Predictive Telemetry Modeling for Smart Grids using Gated Recurrent Units" - IEEE SmartData 2024`);
        break;

      case 'academics':
        printLine(`Education History:<br>
  - B.S. Computer Science @ State Tech (2022 - 2026) // GPA: 3.82<br>
  - Pre-Engineering Degree @ Apex Academy (2020 - 2022) // Grade A+`);
        break;

      case 'contact':
        printLine(`Secure Communication Channels:<br>
  - Email   : arham@example.com<br>
  - GitHub  : github.com<br>
  - LinkedIn: linkedin.com<br>
  - Instgrm : instagram.com`);
        break;

      case 'theme':
        if (!arg) {
          printLine(`Please specify a theme name. Example: "theme obsidian"`, 'error');
        } else if (['cyberpunk', 'obsidian', 'sakura', 'slate'].includes(arg)) {
          // Trigger click on corresponding theme button
          const button = document.querySelector(`.theme-dot-btn.dot-${arg}`);
          if (button) {
            button.click();
          }
        } else {
          printLine(`Theme "${arg}" not found. Available: cyberpunk, obsidian, sakura, slate`, 'error');
        }
        break;

      case 'clear':
        terminalOutput.innerHTML = '';
        break;

      default:
        printLine(`Command not found: "${cmd}". Type "help" for a list of valid commands.`, 'error');
    }
  }
}
