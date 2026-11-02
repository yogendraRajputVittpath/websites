# VittYaan Website v2

Responsive Bootstrap website for VittYaan Private Limited with fintech-safe positioning.

## Pages
- Home
- About Us
- Products & Platforms
- Compliances
- Blog
- Careers
- Contact Us
- Privacy Policy

## Central configuration
Edit only:
`assets/js/config.js`

It controls:
- Company name, CIN, email, phone
- Registered address
- Startup India / DPIIT certificate number
- MSME / Udyam number
- Directors
- Product names, descriptions and URLs
- SEBI regulatory positioning/disclaimer
- Blog JSON path
- Social links

## Dynamic blog
Blog content is loaded from:
`data/blogs.json`

Each post supports:
- id
- title
- category
- date
- readTime
- excerpt
- imageUrl
- url

Add/edit JSON entries to publish new cards without modifying `blog.html`.

## Animation
AOS (Animate On Scroll) is loaded from CDN and initialized from `assets/js/main.js`.

## SEBI-friendly positioning
The site avoids:
- guaranteed returns
- investment performance claims
- unsupported SEBI registration claims
- language presenting ordinary technology as regulated investment advice

The disclaimer is centrally configured in `assets/js/config.js`.

## Important before production
1. Replace all `UPDATE_ME` statutory values in `config.js` with exact official records.
2. Add the exact registered address.
3. Add only the directors' approved public professional details.
4. Verify product URLs.
5. Review all fintech/product wording with the company's legal/compliance adviser.
6. Connect the contact form to a production backend/email service.
7. Replace sample blog images/content with owned or licensed assets.
