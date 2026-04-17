# KROS Limited Website

Production website for KROS Limited — London construction, civil engineering, project management, and financial consultancy firm.

**www.kros.co.uk**

---

## File Structure

```
kros-website/
├── index.html              Home page
├── about.html              About the firm and team
├── services.html           Four service divisions
├── projects.html           Project portfolio (filter + grid)
├── project-template.html   Individual project case study page
├── consultancy.html        Financial consultancy + Turkish investor section
├── contact.html            Contact form and details
├── css/
│   ├── style.css           Global styles and CSS variables
│   ├── components.css      Nav, footer, cards, forms, tables
│   └── animations.css      Scroll reveals and hover effects
├── js/
│   ├── main.js             Navigation, scroll effects, form handling
│   ├── projects.js         Filter bar and project grid rendering
│   ├── lightbox.js         Gallery lightbox + project detail loader
│   └── projects-data.js    ← EDIT THIS FILE to update projects
└── images/
    ├── logo/               kros-logo.png (place here when ready)
    ├── projects/
    │   ├── bite-cafe/      hero.jpg, photo-1.jpg, photo-2.jpg…
    │   ├── wine-not/       hero.jpg, photo-1.jpg…
    │   └── placeholders/   Used for projects without photos yet
    └── team/               Savas and Metin photos (when ready)
```

---

## How to Add or Update a Project

**You only need to edit one file: `js/projects-data.js`**

### Adding a new project

Copy this template and add it to the `KROS_PROJECTS` array in `projects-data.js`:

```javascript
{
  id: "project-name",               // unique ID, no spaces (use hyphens)
  name: "Project Display Name",
  slug: "project-name",             // same as id
  type: "Commercial Fit-Out",       // shown as badge on card
  category: "commercial",           // commercial / residential / civil
  location: "Chelsea, SW3",
  year: "2024",
  value: "£250,000",
  duration: "12 weeks",
  status: "completed",

  headline: "Short punchy headline",
  brief: "2-3 sentences. What did the client want?",
  challenge: "1-2 sentences. What was complex?",
  approach: "2-3 sentences. How did KROS deliver it?",
  result: "1-2 sentences. What was the outcome?",
  testimonial: "Optional client quote.",

  hero_image: "images/projects/project-name/hero.jpg",
  gallery: [
    "images/projects/project-name/photo-1.jpg",
    "images/projects/project-name/photo-2.jpg",
    "images/projects/project-name/photo-3.jpg",
  ],

  show_on_homepage: false,    // true = appears in the home page featured 3
  show_value: false,          // true = shows contract value publicly
  featured: false
}
```

### Updating an existing project

Find the project by its `id` in `projects-data.js` and edit the relevant fields.

---

## How to Add Photos

### Photo specifications

| Photo | Min. size | Notes |
|-------|-----------|-------|
| Hero image | 1600 × 900px | Best 'after' shot. Wide, good light. |
| Gallery photos | 1200 × 900px | Detail shots — finishes, craftsmanship. |
| Before photos | Any | Before/after is effective. |
| Minimum per project | 4 photos | 1 hero + 3 gallery minimum. |

### File naming

Use clear, consistent naming:
- `bite-cafe-hero.jpg`
- `bite-cafe-kitchen.jpg`
- `bite-cafe-exterior.jpg`

### Where to put photos

Place photos in: `images/projects/[project-id]/`

For example, photos for Bite Café go in: `images/projects/bite-cafe/`

Then reference them in `projects-data.js`:
```javascript
hero_image: "images/projects/bite-cafe/hero.jpg",
gallery: [
  "images/projects/bite-cafe/photo-1.jpg",
  "images/projects/bite-cafe/photo-2.jpg",
]
```

### iPhone tip

Export photos at **Actual Size** when transferring from iPhone. Use AirDrop for fastest transfer. Rename files clearly before uploading.

---

## How to Add the KROS Logo

Place the logo PNG file at: `images/logo/kros-logo.png`

Then in each HTML file, replace the text-based logo in the `<nav>` with:
```html
<a href="index.html" class="nav__logo">
  <img src="images/logo/kros-logo.png" alt="KROS Limited">
</a>
```

The CSS includes `filter: brightness(0) invert(1)` on nav logo images to ensure the logo appears white on the navy header.

---

## How to Add a Phone Number

Search for `[TO BE ADDED]` across all files and replace with the phone number. Key locations:
- `contact.html` — contact detail panel
- `js/projects-data.js` — not needed here
- Footer in each HTML file — add a phone entry

---

## Changing Colours

All colours are CSS custom properties defined at the top of `css/style.css`:

```css
:root {
  --navy:       #0A1628;
  --red:        #C0392B;
  --gold:       #B8860B;
  --gold-light: #D4A017;
  --parchment:  #F7F5F0;
  /* ... */
}
```

Changing a value here updates the colour across the entire site.

---

## Contact Form

The contact form currently shows a success message on submit without sending data anywhere. To connect it to a real email service:

1. Sign up for [Formspree](https://formspree.io) (free tier available)
2. Add your form endpoint to the `<form>` tag:
   ```html
   <form action="https://formspree.io/f/YOUR_ID" method="POST" class="js-contact-form">
   ```
3. Update `js/main.js` to use a real fetch request instead of the simulated timeout

Alternatively, use [Netlify Forms](https://www.netlify.com/products/forms/) if hosting on Netlify.

---

## Hosting

The site is pure HTML/CSS/JS — no build process, no dependencies. It can be hosted on:

- **Netlify** (recommended — free, fast, drag-and-drop upload)
- **GitHub Pages** (free)
- **Any web host** that serves static files

To go live on Netlify: drag the entire `kros-website/` folder into [app.netlify.com](https://app.netlify.com). Done.

---

## Browser Support

Designed for modern browsers. Supports:
- Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- Full mobile responsive (mobile-first design)
- Reduced motion respected (CSS `prefers-reduced-motion`)

---

*KROS Limited — Co. Reg. 06930945 — www.kros.co.uk*
