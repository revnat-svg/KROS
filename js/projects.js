/* ============================================================
   KROS Limited — Projects JS
   Filter bar, grid rendering from projects-data.js
   ============================================================ */

(function () {
  'use strict';

  const grid      = document.querySelector('.js-projects-grid');
  const filterBar = document.querySelector('.js-filter-bar');

  if (!grid || typeof KROS_PROJECTS === 'undefined') return;

  let activeFilter = 'all';

  /* ---- Build project card HTML ---- */
  function buildCard(project) {
    const hasImage = project.hero_image &&
      !project.hero_image.includes('placeholders');

    const imageHtml = hasImage
      ? `<img src="${project.hero_image}" alt="${project.name}" loading="lazy">`
      : `<div class="project-card__placeholder">
           <span class="project-card__placeholder-logo">KROS</span>
         </div>`;

    return `
      <article class="project-card reveal"
               data-category="${project.category}"
               data-id="${project.id}">
        <div class="project-card__image">
          ${imageHtml}
        </div>
        <div class="project-card__body">
          <div class="project-card__meta">
            <span class="badge badge--gold">${project.type}</span>
            <span class="text-grey" style="font-size:0.78rem;">${project.year}</span>
          </div>
          <h3>${project.name}</h3>
          <p class="project-card__location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${project.location}
          </p>
          <p>${project.brief.length > 120
               ? project.brief.substring(0, 117) + '…'
               : project.brief}</p>
          <div class="project-card__footer">
            <a href="project-template.html?id=${project.id}"
               class="arrow-link">View Project</a>
          </div>
        </div>
      </article>`;
  }

  /* ---- Render all / filtered projects ---- */
  function renderProjects(filter) {
    activeFilter = filter;
    const filtered = filter === 'all'
      ? KROS_PROJECTS
      : KROS_PROJECTS.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(buildCard).join('');

    /* Re-observe new elements for scroll reveal */
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    } else {
      grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }
  }

  /* ---- Filter buttons ---- */
  if (filterBar) {
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
      });
    });
  }

  /* ---- Initial render ---- */
  renderProjects('all');

})();
