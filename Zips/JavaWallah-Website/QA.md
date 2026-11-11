# Verification record

## Passed

- Generated all 23 real HTML pages from the central JSON file.
- Checked every local link/asset target and fragment, unique page titles, one H1 per page, image alt text, metadata presence and parseable JSON-LD.
- Confirmed HTTP 200 responses for every delivered page and local asset.
- Visually checked the homepage at desktop (1280 px), tablet (768 px) and mobile (390 px) widths.
- Checked mobile course card layout and working navigation to a nested detail page.
- Tested mobile Bootstrap navigation expansion and curriculum accordion expansion.
- Tested Full Stack catalogue filtering, search with no matches, and corresponding result counts.
- Tested required-field form validation, valid form data, program selection, offline restriction for courses, and online selection for internships.
- Verified the fallback creates a correctly addressed email draft link and explicitly says nothing was sent. No test email was opened or sent.
- Temporarily supplied malformed JSON and verified the contact page and enquiry fallback remained usable, then restored the valid configuration.
- Reviewed console output during homepage, catalogue and normal contact-form testing; no application errors appeared in those checks. A later browser log contained a MutationObserver observation error during browser-tool interaction; the site source does not use MutationObserver and the enquiry still worked.
- Optional trackers disabled; no fake testimonials or placement statistics present.

## Limits and pending integration

No live submission service, verified WhatsApp number or exact map location was supplied. Real delivery and endpoint failure/success responses therefore remain integration tests for the selected service. No email or WhatsApp message was sent. Social profiles use the supplied handles and were not independently authenticated. No automated Lighthouse/Core Web Vitals score or full cross-browser/device matrix is claimed. Reduced-motion support, focus styles and semantic form labels are implemented; a full screen-reader accessibility audit was not performed.

The local iframe width previews exercise responsive CSS and mobile navigation, but do not reproduce every aspect of a physical mobile browser. Draft legal pages and articles are marked for review and excluded from indexing. The actual javawallah.com domain was not connected.
