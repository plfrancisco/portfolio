const ENABLE_SPARK_CURSOR = true;
const CONNECTION_DISTANCE = 118;
const SECTION_GLOW_POSITIONS = {
  hero: [0.28, 0.32],
  syntegra: [0.72, 0.28],
  projects: [0.24, 0.7],
  skills: [0.68, 0.64],
  timeline: [0.38, 0.48],
  contact: [0.72, 0.78],
};

let skyInstance = null;

/** Inicializa o cÃ©u de nÃ³s e a navegaÃ§Ã£o em grafo da pÃ¡gina. */
export function initNetwork() {
  skyInstance = setupSkyCanvas();
  setupNavigationNetwork(skyInstance);
}

function setupSkyCanvas() {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return null;

  const sky = new StarSky(canvas);
  sky.start();
  return sky;
}

class StarSky {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    this.reduceMotion = this.motionQuery.matches;
    this.width = 0;
    this.height = 0;
    this.stars = [];
    this.constellations = [];
    this.sparks = [];
    this.elapsed = 0;
    this.animationRunning = false;
    this.activeSection = 'hero';
    this.flashUntil = 0;
    this.lastFrameTime = performance.now();

    this.bindEvents();
  }

  start() {
    this.resize();
    this.reduceMotion = this.motionQuery.matches;

    if (this.reduceMotion) {
      this.draw();
      return;
    }

    this.animationRunning = true;
    requestAnimationFrame((now) => this.frame(now));
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });

    const handleMotionChange = (event) => {
      this.reduceMotion = event.matches;
      this.animationRunning = !event.matches;
      this.sparks = [];

      if (event.matches) {
        this.draw();
        return;
      }

      this.lastFrameTime = performance.now();
      requestAnimationFrame((now) => this.frame(now));
    };

    if (this.motionQuery.addEventListener) {
      this.motionQuery.addEventListener('change', handleMotionChange);
    } else {
      this.motionQuery.addListener(handleMotionChange);
    }

    if (ENABLE_SPARK_CURSOR) {
      window.addEventListener('pointermove', (event) => {
        if (this.reduceMotion || !this.pointerQuery.matches) return;

        if (this.sparks.length < 18) {
          this.sparks.push({
            x: event.clientX,
            y: event.clientY,
            size: 0.8 + Math.random() * 1.6,
            alpha: 0.7,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
          });
        }
      }, { passive: true });
    }
  }

  resize() {
    this.width = Math.max(1, window.innerWidth);
    this.height = Math.max(1, window.innerHeight);
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.buildStars();
    this.draw();
  }

  buildStars() {
    const count = this.width < 600 ? 30 : this.width < 1000 ? 48 : 78;
    this.stars = Array.from({ length: count }, (_, index) => {
      const x = seededValue(index + 1, 17) * this.width;
      const y = seededValue(index + 1, 31) * this.height;
      const depth = 0.24 + seededValue(index + 1, 47) * 0.76;

      return {
        x,
        y,
        depth,
        radius: 0.55 + depth * 1.45,
        alpha: 0.14 + depth * 0.48,
        phase: seededValue(index + 1, 67) * Math.PI * 2,
        vx: (seededValue(index + 1, 83) - 0.5) * 0.06,
        vy: (seededValue(index + 1, 101) - 0.5) * 0.045,
      };
    });

    this.constellations = [];
    this.stars.forEach((star, index) => {
      const nearest = this.stars
        .map((candidate, candidateIndex) => ({
          candidate,
          candidateIndex,
          distance: Math.hypot(candidate.x - star.x, candidate.y - star.y),
        }))
        .filter(({ candidateIndex, distance }) => candidateIndex > index && distance <= CONNECTION_DISTANCE)
        .sort((first, second) => first.distance - second.distance)
        .slice(0, 2);

      nearest.forEach(({ candidateIndex }) => {
        this.constellations.push([index, candidateIndex]);
      });
    });
  }

  frame(now) {
    if (!this.animationRunning) return;

    const dt = Math.min(50, now - this.lastFrameTime);
    this.lastFrameTime = now;
    this.elapsed += dt;
    this.updateStars(dt);
    this.updateSparks();
    this.draw();
    requestAnimationFrame((next) => this.frame(next));
  }

  updateStars(dt) {
    const frameScale = Math.min(2, dt / 16.67);

    this.stars.forEach((star) => {
      const drift = Math.sin(this.elapsed * 0.00018 + star.phase) * 0.0015;
      star.vx += Math.cos(star.phase) * drift * frameScale;
      star.vy += Math.sin(star.phase) * drift * frameScale;
    });

    for (let firstIndex = 0; firstIndex < this.stars.length; firstIndex += 1) {
      for (let secondIndex = firstIndex + 1; secondIndex < this.stars.length; secondIndex += 1) {
        const first = this.stars[firstIndex];
        const second = this.stars[secondIndex];
        const dx = second.x - first.x;
        const dy = second.y - first.y;
        const distance = Math.hypot(dx, dy);
        if (!distance || distance > 76) continue;

        const force = (1 - distance / 76) * 0.0018 * frameScale;
        const nx = dx / distance;
        const ny = dy / distance;
        first.vx -= nx * force;
        first.vy -= ny * force;
        second.vx += nx * force;
        second.vy += ny * force;
      }
    }

    this.constellations.forEach(([firstIndex, secondIndex]) => {
      const first = this.stars[firstIndex];
      const second = this.stars[secondIndex];
      const dx = second.x - first.x;
      const dy = second.y - first.y;
      const distance = Math.hypot(dx, dy);
      if (!distance || distance < 72 || distance > CONNECTION_DISTANCE) return;

      const force = ((distance - 72) / 72) * 0.00055 * frameScale;
      first.vx += (dx / distance) * force;
      first.vy += (dy / distance) * force;
      second.vx -= (dx / distance) * force;
      second.vy -= (dy / distance) * force;
    });

    this.stars.forEach((star) => {
      star.vx *= 0.9985;
      star.vy *= 0.9985;
      const speed = Math.hypot(star.vx, star.vy);
      if (speed > 0.08) {
        star.vx = (star.vx / speed) * 0.08;
        star.vy = (star.vy / speed) * 0.08;
      }

      star.x += star.vx * frameScale;
      star.y += star.vy * frameScale;
      if (star.x < -12) star.x = this.width + 12;
      if (star.x > this.width + 12) star.x = -12;
      if (star.y < -12) star.y = this.height + 12;
      if (star.y > this.height + 12) star.y = -12;
    });
  }

  updateSparks() {
    this.sparks.forEach((spark) => {
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.alpha -= 0.035;
    });
    this.sparks = this.sparks.filter((spark) => spark.alpha > 0);
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    this.drawSectionGlow(ctx);
    this.drawConstellations(ctx);
    this.drawStars(ctx);
    this.drawSparks(ctx);
  }

  drawSectionGlow(ctx) {
    const [xRatio, yRatio] = SECTION_GLOW_POSITIONS[this.activeSection] || SECTION_GLOW_POSITIONS.hero;
    const isFlashing = this.flashUntil > performance.now();
    const radius = Math.max(this.width, this.height) * 0.54;
    const glow = ctx.createRadialGradient(
      this.width * xRatio,
      this.height * yRatio,
      0,
      this.width * xRatio,
      this.height * yRatio,
      radius,
    );
    glow.addColorStop(0, `rgba(242, 178, 76, ${isFlashing ? 0.085 : 0.035})`);
    glow.addColorStop(1, 'rgba(242, 178, 76, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  drawConstellations(ctx) {
    this.constellations.forEach(([firstIndex, secondIndex]) => {
      const first = this.stars[firstIndex];
      const second = this.stars[secondIndex];
      const distance = Math.hypot(second.x - first.x, second.y - first.y);
      if (distance > CONNECTION_DISTANCE) return;

      const alpha = Math.max(0.035, 0.12 - (distance / CONNECTION_DISTANCE) * 0.07);
      ctx.beginPath();
      ctx.moveTo(first.x, first.y);
      ctx.lineTo(second.x, second.y);
      ctx.strokeStyle = `rgba(166, 170, 180, ${alpha})`;
      ctx.lineWidth = 0.65 + ((first.depth + second.depth) / 2) * 0.35;
      ctx.stroke();
    });
  }

  drawStars(ctx) {
    this.stars.forEach((star) => {
      const shimmer = this.reduceMotion ? 1 : 0.86 + Math.sin(this.elapsed * 0.0008 + star.phase) * 0.14;
      const alpha = star.alpha * shimmer;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = star.depth > 0.72 ? '#FADFA8' : '#93A8BF';

      if (star.depth > 0.78) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius + 3.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(242, 178, 76, 0.035)';
        ctx.fill();
        ctx.fillStyle = '#FADFA8';
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  drawSparks(ctx) {
    if (this.reduceMotion || !this.sparks.length) return;

    this.sparks.forEach((spark) => {
      ctx.globalAlpha = spark.alpha;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
      ctx.fillStyle = '#F2B24C';
      ctx.shadowColor = '#F2B24C';
      ctx.shadowBlur = 7;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.globalAlpha = 1;
  }

  setActiveSection(sectionId) {
    this.activeSection = sectionId;
    this.draw();
  }

  flashSection(sectionId) {
    this.activeSection = sectionId;
    this.flashUntil = performance.now() + 700;
    this.draw();
  }
}

function setupNavigationNetwork(sky) {
  const sections = document.querySelectorAll('.site-section');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const minimapNodes = document.querySelectorAll('.minimap-node');
  if (!sections.length) return;

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      entry.target.classList.add('is-revealed');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
      minimapNodes.forEach((node) => {
        node.classList.toggle('active', node.dataset.target === id);
      });
      sky?.setActiveSection(id);
    });
  }, {
    root: null,
    rootMargin: '-20% 0px -40% 0px',
    threshold: 0,
  });

  sections.forEach((section) => sectionObserver.observe(section));

  minimapNodes.forEach((node) => {
    node.addEventListener('click', () => {
      const targetId = node.dataset.target;
      const target = document.getElementById(targetId);
      if (!target) return;

      sky?.flashSection(targetId);
      target.scrollIntoView({
        behavior: motionQuery.matches ? 'auto' : 'smooth',
      });
    });
  });
}

function seededValue(index, salt) {
  const raw = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return raw - Math.floor(raw);
}
