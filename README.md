# 🏢 Inimba Multi Services Holdings Website

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Static Site](https://img.shields.io/badge/deploy-static-green.svg)](https://pages.github.com/)
[![Responsive](https://img.shields.io/badge/responsive-✓-orange.svg)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

**Professional multi-service website** for **Inimba Multi Services Holdings** (REG NO: 2026/263133/07) - providing **logistics, security, cleaning, and travel services** in **Fourways, Johannesburg, South Africa**.

![Logo](Assets/INIMBA%20HOLDINGS%20LOGO.jpeg)

## 🚀 Features

- **Fully Responsive** (Mobile-first: 320px→Desktop, iPad/Landscape optimized)
- **Modern UI/UX**: Tailwind CSS + Custom animations (fade-ins, hover effects)
- **Pages**: Home, About, Services (detailed), Contact (form + map)
- **Interactive Elements**:
  - Mobile hamburger menu (→X animation)
  - Client-side form validation + localStorage save
  - Smooth scrolling, back-to-top button
  - Scroll-triggered animations
- **SEO Optimized**: Meta tags, semantic HTML, fast-loading
- **Accessibility**: ARIA labels, keyboard nav, focus states
- **Contact**: Phone/WhatsApp (0729778073/0793553140), Email, Google Maps embed
- **Performance**: ~100 Lighthouse score (no heavy deps)

Live demo: [index.html](index.html)

## 📁 Project Structure

```
INIMBA-HOLDINGS/
├── index.html              # Landing page (hero + services preview)
├── Pages/
│   ├── about.html          # Company mission/vision/team
│   ├── services.html       # 4x detailed service cards
│   └── contact.html        # Form + Google Maps + contact info
├── css/
│   └── custom.css          # Custom styles/animations/responsiveness
├── js/
│   ├── main-fixed.js       # Core JS (menu, forms, animations)
│   └── main.js             # Legacy (unused)
├── Assets/                 # Logo, icons
│   ├── INIMBA HOLDINGS LOGO.jpeg
│   └── email-icon.svg
├── tailwind/               # Tailwind CDN (unused locally)
└── README.md              # This file!
```

## 🛠 Quick Start

### 1. Clone & Open
```bash
# From anywhere
git clone <your-repo-url>
cd INIMBA-HOLDINGS
```

### 2. Preview Locally
```bash
# Windows (open in default browser)
start index.html

# macOS/Linux
open index.html
# or
xdg-open index.html
```

**No build step needed** - Pure static HTML/CSS/JS!

### 3. Edit & Customize
- **Content**: Edit HTML pages (semantic structure)
- **Styles**: `css/custom.css` (Tailwind-safe overrides)
- **JS**: `js/main-fixed.js` (menu, forms, animations)
- **Assets**: Add to `Assets/` folder

## 🎨 Customization Guide

### Colors (Tailwind + Custom)
```css
/* Primary */
--primary-blue: #2563eb;     /* Blue-600 */
--primary-green: #059669;    /* Green-600 */

/* Edit in css/custom.css */
:root {
  --bg-gradient: linear-gradient(135deg, #eff6ff 0%, #dcfce7 100%);
}
```

### Add Pages
1. Create `Pages/new-page.html` (copy structure from others)
2. Update navbar/footer links in all HTML files
3. Add to services preview (index.html)

### Form Backend
Currently client-side only. Integrate:
- **EmailJS/Netlify Forms** (no server needed)
- **PHP/Node** (upload to hosting)

## 🚀 Deployment

### Free Static Hosting
| Platform | Command | URL |
|----------|---------|-----|
| **GitHub Pages** | Settings → Pages → Deploy from `main` | `username.github.io/INIMBA-HOLDINGS` |
| **Netlify** | `drag/drop` folder | Custom domain |
| **Vercel** | `vercel --prod` | Auto deploys |
| **Firebase** | `firebase deploy` | Hosting |

### Custom Domain
```bash
# Netlify example
netlify deploy --prod --dir=.
netlify addons:customdomain example.com
```


## 🔧 Tech Stack

| Frontend | Tools | Build |
|----------|-------|-------|
| HTML5, Tailwind CSS (CDN) | VS Code | None! |
| Vanilla JS (ES6+) | Git | Static |

## 🤝 Contributing

1. Fork → Clone → Branch (`feat/your-feature`)
2. Edit → Test locally (`start index.html`)
3. Commit → PR to `main`

**Guidelines**: Mobile-first, semantic HTML, no breaking changes to JS/CSS.

## 📞 Contact

- **Phone/WhatsApp**: [072 977 8073](tel:0729778073) / [079 355 3140](https://wa.me/0793553140)
- **Email**: [inimbamultiservicesholdings@gmail.com](mailto:inimbamultiservicesholdings@gmail.com)
- **Location**: [Fourways, Johannesburg](https://www.google.com/maps/search/?api=1&query=Fourways,Johannesburg)
- **Services**: [Logistics](Pages/services.html), [Security](Pages/services.html#security), [Cleaning](Pages/services.html#cleaning), [Travel](Pages/services.html#travel)

## 📄 License

MIT © [Inimba Multi Services Holdings](.) 2026



