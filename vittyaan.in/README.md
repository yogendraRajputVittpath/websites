# Vittyaan - Pure HTML/CSS/Bootstrap Website

## Overview
This is a standalone, pure HTML/CSS/Bootstrap website for Vittyaan - a FinTech technology platform provider. No React, no build process, no npm dependencies required.

## Files Structure
```
vittyaan-standalone/
├── index.html          # Homepage
├── about.html          # About page
├── platforms.html      # Platforms page
├── blog.html           # Blog/Insights page (dynamic loading)
├── compliance.html     # Compliance & Disclaimers
├── contact.html        # Contact page with form
├── css/
│   └── vittyaan.css   # Custom styles
├── js/
│   ├── main.js        # Main functionality (navbar, scroll, active links)
│   ├── blog.js        # Blog dynamic loading & filtering
│   └── contact.js     # Contact form validation
├── data/
│   └── blogs.json     # Blog posts data
└── README.md          # This file
```

## Features
- ✅ Pure HTML/CSS/Bootstrap 5.3.2
- ✅ Vanilla JavaScript (no frameworks)
- ✅ Dark theme with conservative FinTech colors
- ✅ Responsive design (mobile-first)
- ✅ AOS scroll animations
- ✅ Dynamic blog loading with category filtering
- ✅ Contact form with frontend validation
- ✅ SEBI-compliant content (no investment advice)
- ✅ Smooth scrolling & scroll-to-top button

## How to Use

### Option 1: Open Directly in Browser
Simply open `index.html` in any modern web browser.

### Option 2: Serve with a Local Server (Recommended)
```bash
# Using Python 3
cd vittyaan-standalone
python3 -m http.server 8000

# Using Node.js (if installed)
npx http-server -p 8000

# Using PHP (if installed)
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.

## External Dependencies (Loaded via CDN)
- Bootstrap 5.3.2 (CSS + JS)
- AOS (Animate On Scroll) 2.3.4

No installation required - everything loads from CDN.

## Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Customization
- **Colors**: Edit CSS variables in `css/vittyaan.css` (lines 1-20)
- **Content**: Edit HTML files directly
- **Blog Posts**: Edit `data/blogs.json`
- **Styling**: Modify `css/vittyaan.css`

## SEBI Compliance
All content follows Indian financial regulatory safe language:
- No investment advice or recommendations
- No stock tips or trading signals
- Clear technology provider positioning
- Comprehensive risk disclosures

## License
© 2025 Vittyaan - All rights reserved

## Support
For questions about the website, contact through the contact form.
