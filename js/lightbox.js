/* ============================================================
   KROS Limited — Lightbox
   Handles photo gallery lightbox and project detail page
   ============================================================ */

(function () {
  'use strict';

  /* ---- Project detail: load from URL param ---- */
  const detailContainer = document.querySelector('.js-project-detail');
  if (detailContainer && typeof KROS_PROJECTS !== 'undefined') {
    loadProjectDetail();
  }

  function loadProjectDetail() {
    const params  = new URLSearchParams(window.location.search);
    const id      = params.get('id');
    const project = KROS_PROJECTS.find(p => p.id === id);

    if (!project) {
      detailContainer.innerHTML =
        `<div class="container" style="padding:var(--spacing-xl) 0;text-align:center;">
           <h2>Project not found</h2>
           <p>Please <a href="projects.html" class="arrow-link">view all projects</a>.</p>
         </div>`;
      return;
    }

    /* Set page title */
    document.title = `${project.name} — KROS Limited`;

    /* Hero */
    const heroEl = document.querySelector('.js-project-hero');
    if (heroEl) {
      heroEl.innerHTML = `
        <div class="page-hero" style="min-height:55vh;display:flex;align-items:flex-end;">
          ${project.hero_image
            ? `<img src="${project.hero_image}" alt="${project.name}"
                    style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.35;">`
            : ''}
          <div class="texture-overlay"></div>
          <div class="container" style="position:relative;z-index:1;padding-bottom:var(--spacing-lg);">
            <span class="page-hero__eyebrow">${project.type}</span>
            <h1 class="hero-animate">${project.name}</h1>
            <div style="display:flex;gap:1.5rem;flex-wrap:wrap;margin-top:1rem;align-items:center;">
              <span style="color:rgba(255,255,255,0.6);font-size:0.875rem;">
                📍 ${project.location}
              </span>
              <span style="color:rgba(255,255,255,0.6);font-size:0.875rem;">
                🗓 ${project.year}
              </span>
              ${project.duration !== '[TO ADD] weeks'
                ? `<span style="color:rgba(255,255,255,0.6);font-size:0.875rem;">⏱ ${project.duration}</span>`
                : ''}
            </div>
          </div>
        </div>`;
    }

    /* Stats bar */
    const statsEl = document.querySelector('.js-project-stats');
    if (statsEl) {
      statsEl.innerHTML = `
        <div class="stats-bar">
          <div class="container">
            <div class="stats-bar__inner">
              <div class="stats-bar__item">
                <div class="stats-bar__value">${project.year}</div>
                <div class="stats-bar__label">Year Completed</div>
              </div>
              <div class="stats-bar__item">
                <div class="stats-bar__value">${project.type}</div>
                <div class="stats-bar__label">Project Type</div>
              </div>
              <div class="stats-bar__item">
                <div class="stats-bar__value">${project.location.split(',')[0]}</div>
                <div class="stats-bar__label">Location</div>
              </div>
              <div class="stats-bar__item">
                <div class="stats-bar__value">${
                  project.show_value && project.value !== '£[TO ADD]'
                    ? project.value
                    : '—'
                }</div>
                <div class="stats-bar__label">Contract Value</div>
              </div>
            </div>
          </div>
        </div>`;
    }

    /* Story content */
    const storyEl = document.querySelector('.js-project-story');
    if (storyEl) {
      const testimonialHtml = project.testimonial && !project.testimonial.startsWith('[')
        ? `<blockquote style="border-left:3px solid var(--gold);padding-left:1.5rem;margin-top:2rem;
                              font-family:var(--font-display);font-style:italic;font-size:1.1rem;
                              color:var(--navy);">
             "${project.testimonial}"
           </blockquote>`
        : '';

      storyEl.innerHTML = `
        <div class="grid-2" style="gap:var(--spacing-lg);align-items:start;">
          <div>
            <div class="reveal" style="margin-bottom:var(--spacing-md);">
              <span class="section-eyebrow">The Brief</span>
              <p style="color:var(--dark);margin-top:0.5rem;">${project.brief}</p>
            </div>
            <div class="reveal" style="margin-bottom:var(--spacing-md);">
              <span class="section-eyebrow">The Challenge</span>
              <p style="color:var(--dark);margin-top:0.5rem;">${
                project.challenge.startsWith('[')
                  ? 'Details to be added.'
                  : project.challenge
              }</p>
            </div>
          </div>
          <div>
            <div class="reveal" style="margin-bottom:var(--spacing-md);">
              <span class="section-eyebrow">Our Approach</span>
              <p style="color:var(--dark);margin-top:0.5rem;">${
                project.approach.startsWith('[')
                  ? 'Details to be added.'
                  : project.approach
              }</p>
            </div>
            <div class="reveal">
              <span class="section-eyebrow">The Result</span>
              <p style="color:var(--dark);margin-top:0.5rem;">${
                project.result.startsWith('[')
                  ? 'Details to be added.'
                  : project.result
              }</p>
              ${testimonialHtml}
            </div>
          </div>
        </div>`;
    }

    /* Gallery */
    const galleryEl = document.querySelector('.js-project-gallery');
    if (galleryEl && project.gallery.length > 0) {
      galleryEl.innerHTML = `
        <div class="section-header reveal">
          <span class="section-eyebrow">Photography</span>
          <h2>Project Gallery</h2>
        </div>
        <div class="gallery-grid reveal">
          ${project.gallery.map((img, i) => `
            <div class="gallery-grid__item" data-index="${i}" data-src="${img}">
              <img src="${img}" alt="${project.name} — photo ${i + 1}" loading="lazy">
            </div>`).join('')}
        </div>`;
    } else if (galleryEl) {
      galleryEl.style.display = 'none';
    }

    /* Next project */
    const nextEl = document.querySelector('.js-next-project');
    if (nextEl) {
      const idx  = KROS_PROJECTS.findIndex(p => p.id === id);
      const next = KROS_PROJECTS[(idx + 1) % KROS_PROJECTS.length];
      nextEl.innerHTML = `
        <a href="project-template.html?id=${next.id}" class="arrow-link"
           style="font-size:1rem;">
          Next: ${next.name}
        </a>`;
    }

    /* Init lightbox on newly created gallery items */
    initLightbox();
  }

  /* ---- Lightbox ---- */
  function initLightbox() {
    const overlay = document.querySelector('.lightbox-overlay');
    if (!overlay) return;

    const imgEl   = overlay.querySelector('.lightbox-img');
    const caption = overlay.querySelector('.lightbox-caption');
    const closeBtn= overlay.querySelector('.lightbox-close');
    const prevBtn = overlay.querySelector('.lightbox-prev');
    const nextBtn = overlay.querySelector('.lightbox-next');

    const items = Array.from(document.querySelectorAll('.gallery-grid__item[data-src]'));
    let current = 0;

    function show(index) {
      current = (index + items.length) % items.length;
      const item = items[current];
      imgEl.src        = item.dataset.src || item.querySelector('img')?.src || '';
      imgEl.alt        = item.querySelector('img')?.alt || '';
      caption.textContent = `${current + 1} / ${items.length}`;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function hide() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      imgEl.src = '';
    }

    items.forEach((item, i) => {
      item.addEventListener('click', () => show(i));
    });

    if (closeBtn) closeBtn.addEventListener('click', hide);
    if (prevBtn)  prevBtn.addEventListener('click', () => show(current - 1));
    if (nextBtn)  nextBtn.addEventListener('click', () => show(current + 1));

    overlay.addEventListener('click', e => { if (e.target === overlay) hide(); });

    document.addEventListener('keydown', e => {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape')      hide();
      if (e.key === 'ArrowLeft')   show(current - 1);
      if (e.key === 'ArrowRight')  show(current + 1);
    });
  }

  /* Init lightbox for static gallery pages (non-detail) */
  initLightbox();

})();
