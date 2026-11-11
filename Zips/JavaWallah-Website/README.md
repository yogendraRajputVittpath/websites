# JavaWallah website

A complete, portable 23-page website using HTML5, CSS3, Bootstrap 5.3.3, vanilla JavaScript and jQuery 3.7.1. The supplied JavaWallah logos are used in the navigation, footer, favicon and social metadata. No JavaScript framework, Node.js server, package installation or database is needed to host the site.

## Open or host

Upload **the contents of `dist/`** to the document root of any conventional static web host (Apache, nginx, cPanel or static hosting). Preserve the folders. Nested program and article pages use ordinary relative URLs and require no rewrite rules.

To preview locally, from this folder run:

```sh
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000`. Use an HTTP server rather than double-clicking HTML files: browser `file://` security can prevent configuration loading. The pre-rendered content still remains available if the configuration cannot load.

## One configuration source

Edit `dist/assets/config/site-config.json`, then run:

```sh
python3 build.py
python3 check_site.py
```

Python 3.9+ is only an optional authoring tool for regenerating the standalone HTML pages. It is not part of the deployed website and does not run on the host. All generated HTML, SEO tags, navigation, curricula, comparisons, contacts and forms come from this source. Do not edit the generated HTML to change fees or contact details. Deploy the regenerated `dist/` contents after editing.

- `brand`: name, requested domain, tagline, parent attribution and logo assets.
- `contact`: phone, country code, emails, address, WhatsApp, social URLs and verified map URL.
- `programs`: fees, duration, mode, descriptions, highlights, eligibility, curriculum, outcomes, project examples and benefit eligibility.
- `team`, `benefits`, `journey`, `workflow`, `careerRoadmap`, `faqs`: editable institutional content.
- `articles`: titles, slugs, categories, summaries, paragraphs and review status.
- `testimonials`: hidden by default. Add only genuine approved entries with `name`, `program`, `text`, `approved: true`, then enable the section. Do not invent results.
- `theme`: navy, blue, cyan and background colours. These also update at runtime.
- `pages`, `seo`: page titles, descriptions, sharing image and canonical origin.
- `legal`: business-review draft language.

Runtime form configuration uses a fresh JSON fetch. If the JSON is missing or malformed, the page retains the pre-rendered content and uses safe embedded contact/program defaults, with no form endpoint or tracking enabled.

## Enquiries

The supplied configuration has **no submission endpoint**. Forms validate locally and prepare an email link. The visitor must open their email app and send the draft. No data is submitted or stored by this website in fallback mode, and the UI says so explicitly.

To connect your chosen service, set `forms.endpoint` to its HTTPS URL. The service must accept a CORS-enabled JSON POST from the site origin and return an HTTP 2xx response with:

```json
{"success": true}
```

Submitted fields: `name`, `phone`, `email`, `program` (ID), `programName`, `mode`, `education`, `message`, `consent` and `campaign` (recognised UTM parameters). The configured service is responsible for validation, anti-spam, storage, delivery, access controls and retention. Keep API keys and service credentials on the backend; never place secrets in this JSON file. Timeouts, non-2xx responses and missing confirmation display an honest fallback, not a success message.

The `contact.whatsapp` default is empty because no WhatsApp number was confirmed. Enter the verified full international number, with country code, to enable WhatsApp CTAs and the form fallback, then regenerate. The phone number has not been assumed to be a WhatsApp account.

Courses restrict preferred mode to Offline. Internships allow Offline or Online. Counselling is an enquiry, not an automatic confirmed appointment.

## SEO and domains

HTML content is pre-rendered for visitors and crawlers. The site includes unique titles/descriptions, canonical tags, Open Graph and X/Twitter metadata, Organization/Course/Article/BreadcrumbList JSON-LD, a sitemap and robots.txt. Draft articles and draft legal pages carry `noindex,follow` and are omitted from the sitemap. Their draft labels remain visible.

`brand.domain` records the intended domain `https://javawallah.com`. `seo.canonicalBase` currently points to the intended domain `https://javawallah.com`. If hosting at a different origin, update this field, regenerate and upload. No DNS or domain ownership changes have been made by this project. Schema markup is structurally checked; eligibility for a search rich result is not guaranteed.

## Analytics and privacy

Tracking IDs are empty by default, so no tracking providers are contacted. Valid `tracking.ga4Id` and/or `tracking.metaPixelId` activate a consent prompt, not immediate tracking. Analytics loads only after the visitor allows it. A footer Privacy settings button permits declining later and reloads to stop further script loading. The consent preference is stored in localStorage when available. Declining does not retroactively delete provider-held data or existing cookies.

Campaign parameters are carried through same-origin page links and included in an enquiry if present. They are not persistently stored by this implementation. `tracking.searchConsoleVerification` inserts the optional verification meta tag during regeneration. Supply real IDs only and update/approve the privacy notice for the actual services used.

## Files

- `dist/index.html`: complete homepage.
- `dist/courses.html`, `dist/internships.html`: searchable/filterable catalogues and comparisons.
- `dist/courses/*.html`: two flagship program pages.
- `dist/internships/*.html`: three internship pages.
- `dist/career-support.html`, `team.html`, `placements.html`, `contact.html`.
- `dist/blog.html`, `dist/blog/*.html`: journal and seven editorial drafts.
- `dist/privacy-policy.html`, `terms.html`, `refund-policy.html`: clearly labelled drafts for business review.
- `dist/assets/`: local Bootstrap, jQuery, styles, scripts, Manrope font, config and supplied raster logos.
- `build.py`: standard-library static generator.
- `check_site.py`: local structure/link/configuration checks.
- `REFERENCE_REVIEW.md`, `QA.md`: design review and verification scope.

## Before public launch

Confirm the supplied default business contacts, social profile URLs, fees and batch schedules. Add a verified exact map location, WhatsApp number and form service if desired. Review the policy drafts, confirm attendance and completion rules, and approve editorial content. Testimonials stay hidden until genuine approved material is supplied. No placement, salary, employer or student-count claims have been invented.

A private Sites project was registered, but source upload was blocked by this session’s automatic approval policy before publication. No live deployment was completed. The downloadable website is portable and has no Sites runtime dependency. Publishing tooling is separate from the website technology stack.
