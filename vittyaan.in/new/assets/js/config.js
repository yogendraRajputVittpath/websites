/*
 * VittYaan Website — Central Configuration
 * -----------------------------------------
 * Update company/legal/product values ONLY in this file.
 * Pages use these values wherever practical.
 *
 * IMPORTANT:
 * Replace UPDATE_ME values with the exact information from your
 * MCA / Startup India / Udyam / other official certificates before publishing.
 */

window.VITTYAAN_CONFIG = {
  company: {
    name: "VittYaan Private Limited",
    shortName: "VittYaan",
    cin: "U62011UP2025PTC230904",
    email: "info@vittyaan.in",
    phone: "6396387551",

    // Replace with the exact registered office address.
    registeredAddress: "Simplex 51, Singhal DreamCity, Laramda, Agra, Uttar Pradesh, 282001",

    // Replace with exact official identifiers.
    startupIndia: {
      enabled: true,
      certificateNumber: "DIPP239626",
      portalLabel: "Startup India / DPIIT Recognition"
    },

    msme: {
      enabled: true,
      udyamNumber: "UDYAM-UP-01-0176262",
      portalLabel: "MSME / Udyam Registration"
    },

    directors: [
      {
        name: "Kirti Rajput",
        designation: "Co-Founder and Director",
        profile: ""
      },
      {
        name: "Jai Prakash",
        designation: "Director",
        profile: ""
      }
    ]
  },

  // Product URLs can be changed here without editing the HTML.
  products: {
    methodA: {
      name: "MethodA",
      category: "Fintech Technology",
      description: "A technology platform developed by VittYaan for finance-oriented digital workflows.",
      url: "https://methoda.in/"
    },
    creatorLoop: {
      name: "CreatorLoop",
      category: "Creator Economy",
      description: "A platform designed to connect creators and businesses and simplify collaboration workflows.",
      url: "https://creatorloop.in/"
    },
    investingHelp: {
      name: "InvestingHelp",
      category: "Financial Technology",
      description: "A technology initiative focused on research, learning and decision-support workflows.",
      url: "#"
    },
    customBusiness: {
      name: "Custom Business Platforms",
      category: "B2B Software",
      description: "Purpose-built portals, dashboards, APIs, ERP-style systems and workflow applications.",
      url: "contact.html"
    }
  },

  // SEBI-safe positioning. Keep this explicit unless/ until the company's
  // regulatory status changes and the wording is reviewed professionally.
  regulatory: {
    sebiRegistered: false,
    showDisclaimer: true,
    disclaimer:
      "VittYaan Private Limited is a fintech and technology organization. VittYaan does not represent itself as a SEBI-registered. Information on this website is general technology, educational or informational content."
  },
  
//     regulatory: {
//     sebiRegistered: false,
//     showDisclaimer: true,
//     disclaimer:
//       "VittYaan Private Limited is a fintech and technology organization. Unless expressly stated on this website, VittYaan does not represent itself as a SEBI-registered investment adviser, research analyst, stock broker, portfolio manager or other SEBI-regulated intermediary. Information on this website is general technology, educational or informational content and is not investment advice, a recommendation, solicitation, assurance of returns or a guarantee of performance. Investments in securities are subject to market risks."
//   },

  social: {
    instagram: "https://www.instagram.com/creatorloop1505/"
  },

  site: {
    blogDataUrl: "data/blogs.json",
    defaultBlogImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
  }
};
