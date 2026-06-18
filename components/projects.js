const projectsData = [
  {
    title: 'MarketPulse',
    description: 'A full-stack financial analytics dashboard built to track real-time cryptocurrency and stock market data, manage personal portfolios, and stay updated with live financial news.',
    tags: ['Python', 'Figma', 'PostgreSQL', 'FastAPI', 'Uvicorn'],
    github: 'https://github.com',
    demo: 'https://github.com',
    image: 'linear-gradient(135deg, #00f0ff 0%, #7928ca 100%)'
  },
  {
    title: 'eVEStro',
    description: 'eVEStro is a college event discovery and ticketing platform that helps students find, book, and attend events across campuses in one place. From hackathons and college fests to concerts, workshops, and sports tournaments, eVEStro simplifies event management with seamless ticket booking, QR-based check-ins, and organizer tools.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/arham-bytes/eVEStro',
    demo: 'https://evestro.in',
    image: 'linear-gradient(135deg, #ff007f 0%, #ff007f 40%, #ff8a00 100%)'
  },
  {
    title: 'RoboSpeaker',
    description: 'A Python-based text-to-speech application that transforms text into spoken audio, enabling fast and interactive voice generation through speech synthesis.',
    tags: ['Python(pyttsx3)'],
    github: 'https://github.com/arham-bytes/text-to-speech',
    demo: 'https://arham-bytes.github.io/text-to-speech/',
    image: 'linear-gradient(135deg, #00ff87 0%, #00d4ff 100%)'
  }
];

const publicationsData = [
  {
    title: '	WEARABLE GLOVE SYSTEM FOR TRANSLATING SIGN LANGUAGE INTO CONTEXT-AWARE AND EMOTIONALLY MODULATED SPEECH',
    venue: 'Indian Patent office',
    year: '2025',
    authors: 'Arham Goyal, Dr. Manik rakhra',
    summary: 'A wearable glove-based system that translates sign language into context-aware and emotionally expressive speech using flex sensors, IMU-based motion tracking, intelligent gesture recognition, selectable communication modes, and personalized voice profiles for enhanced communication and social integration.',
    pdf: '/patent.pdf'
  }
];

export function initProjectsAndPublications() {
  const projectsContainer = document.getElementById('projects-container');
  const publicationsContainer = document.getElementById('publications-container');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const docModal = document.getElementById('doc-modal');
  const modalDocTitle = document.getElementById('modal-doc-title');
  const modalDocBody = document.getElementById('modal-doc-body');
  const modalDocClose = document.getElementById('modal-doc-close');

  // Render projects
  function renderProjects(filterValue = 'all') {
    projectsContainer.innerHTML = '';
    const filteredProjects = projectsData.filter(proj => 
      filterValue === 'all' || proj.tags.includes(filterValue)
    );

    filteredProjects.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'project-card';
      
      card.innerHTML = `
        <div class="project-img-wrapper" style="background: ${proj.image}; display: flex; align-items: center; justify-content: center; height: 180px;">
          <span style="font-family: var(--font-mono); font-weight: bold; font-size: 1.5rem; color: var(--text-inverse); text-transform: uppercase;">
            ${proj.title.split(' ')[0]}
          </span>
          <div class="project-tags">
            ${proj.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
        </div>
        <div class="project-info">
          <h3>${proj.title}</h3>
          <p>${proj.description}</p>
          <div class="project-links">
            <a href="${proj.github}" target="_blank" class="btn-neon" style="font-size: 0.75rem; padding: 0.5rem 1rem;">Code</a>
            <a href="${proj.demo}" target="_blank" class="btn-neon btn-neon-magenta" style="font-size: 0.75rem; padding: 0.5rem 1rem;">Demo</a>
          </div>
        </div>
      `;
      
      projectsContainer.appendChild(card);
      applyTiltEffect(card);
    });
  }

  // Tilt Effect Handler
  function applyTiltEffect(card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((centerY - y) / centerY) * 10; // Max 10 deg
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  }

  // Filter Projects Click Listeners
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });

  // Render publications
  function renderPublications() {
    publicationsContainer.innerHTML = '';
    
    publicationsData.forEach((pub, index) => {
      const card = document.createElement('div');
      card.className = 'publication-card';
      
      card.innerHTML = `
        <div class="pub-info">
          <div class="pub-meta">
            <span>[VENUE] ${pub.venue}</span>
            <span>[YEAR] ${pub.year}</span>
          </div>
          <h3>${pub.title}</h3>
          <p class="pub-authors" style="margin-bottom: 0.5rem;">${pub.authors}</p>
          <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">${pub.summary}</p>
        </div>
        <button class="btn-neon btn-neon-magenta show-doc-btn" data-index="${index}" style="white-space: nowrap; align-self: center;">
          Show Document
        </button>
      `;
      
      publicationsContainer.appendChild(card);
    });

    // Add click listeners to Show Document buttons
    document.querySelectorAll('.show-doc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.getAttribute('data-index');
        const pub = publicationsData[index];
        openDocumentModal(pub);
      });
    });
  }

  function openDocumentModal(pub) {
  if (pub.pdf) {
  window.open(pub.pdf, "_blank");
  return;
}

modalDocTitle.textContent = pub.title;

modalDocBody.innerHTML = pub.content;

docModal.classList.add('open');

}


  // Modal Close
  modalDocClose.addEventListener('click', () => {
    docModal.classList.remove('open');
  });

  docModal.addEventListener('click', (e) => {
    if (e.target === docModal) {
      docModal.classList.remove('open');
    }
  });

  // Initialize
  renderProjects();
  renderPublications();
}
