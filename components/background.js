export function initDynamicBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrameId;

  const mouse = {
    x: null,
    y: null,
    radius: 180 // Distance within which particles connect to mouse
  };

  // Adjust size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  // Generate particles based on screen area
  function initParticles() {
    particles = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 16000); // Dynamic density
    const maxParticles = Math.min(particleCount, 120); // Cap at 120 to preserve battery/CPU

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1
      });
    }
  }

  // Track mouse coordinates globally
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Get current accent color from CSS variables
  function getThemeColors() {
    const computed = getComputedStyle(document.body);
    const accent = computed.getPropertyValue('--accent-cyan').trim() || '#00f0ff';
    return accent;
  }

  // Animation frame loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const color = getThemeColors();

    // Update & draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off walls
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Clamp coordinates to bounds
      p.x = Math.max(0, Math.min(p.x, canvas.width));
      p.y = Math.max(0, Math.min(p.y, canvas.height));

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

    // Draw connection lines (Double loop for node pairings)
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];

      // Connect to other particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1.0; // Reset
        }
      }

      // Connect to mouse pointer
      if (mouse.x !== null && mouse.y !== null) {
        const dx = p1.x - mouse.x;
        const dy = p1.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.globalAlpha = 1.0; // Reset
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Listeners
  window.addEventListener('resize', resizeCanvas);
  
  // Start
  resizeCanvas();
  animate();
}
