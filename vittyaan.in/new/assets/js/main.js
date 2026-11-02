document.addEventListener("DOMContentLoaded", async () => {
  const C = window.VITTYAAN_CONFIG;
  if (!C) return;

  const year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = year);

  // Generic config binding: data-config="company.email", etc.
  const getPath = (obj, path) => path.split(".").reduce((acc, key) => acc?.[key], obj);

  document.querySelectorAll("[data-config]").forEach(el => {
    const value = getPath(C, el.dataset.config);
    if (value !== undefined && value !== null && value !== "") {
      if (el.dataset.configAttr) el.setAttribute(el.dataset.configAttr, value);
      else el.textContent = value;
    }
  });

  // Email / phone / website links.
  document.querySelectorAll("[data-config-href]").forEach(el => {
    const value = getPath(C, el.dataset.configHref);
    if (value) el.setAttribute("href", value);
  });

  // Registered information cards are populated from config.js.
  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach(el => el.textContent = value || "Not configured");
  };

  setText("[data-company-name]", C.company.name);
  setText("[data-company-cin]", C.company.cin);
  setText("[data-company-email]", C.company.email);
  setText("[data-company-phone]", C.company.phone);
  setText("[data-company-address]", C.company.registeredAddress);
  setText("[data-startup-number]", C.company.startupIndia.certificateNumber);
  setText("[data-msme-number]", C.company.msme.udyamNumber);

  const directorWrap = document.querySelector("[data-directors]");
  if (directorWrap) {
    directorWrap.innerHTML = "";
    (C.company.directors || []).forEach((d, i) => {
      const configured = d.name && !d.name.startsWith("UPDATE_ME");
      if (!configured) return;
      directorWrap.insertAdjacentHTML("beforeend", `
        <div class="director-card col-6" data-aos="fade-up" data-aos-delay="${i * 80}">
          <div class="director-index">0${i + 1}</div>
          <h5>${escapeHtml(d.name)}</h5>
          <div class="small-muted fw-semibold">${escapeHtml(d.designation || "Director")}</div>
          <p class="small-muted mt-2 mb-0">${escapeHtml(d.profile || "")}</p>
        </div>
      `);
    });
    if (!directorWrap.children.length) {
      directorWrap.innerHTML = `<div class="alert-vy">Director details are configurable in <code>assets/js/config.js</code>. Add only the public professional information you want to publish.</div>`;
    }
  }

  // Product cards.
  document.querySelectorAll("[data-product]").forEach(card => {
    const product = C.products[card.dataset.product];
    if (!product) return;
    const title = card.querySelector("[data-product-name]");
    const category = card.querySelector("[data-product-category]");
    const desc = card.querySelector("[data-product-description]");
    const link = card.querySelector("[data-product-link]");
    if (title) title.textContent = product.name;
    if (category) category.textContent = product.category;
    if (desc) desc.textContent = product.description;
    if (link) {
      link.href = product.url;
      link.target = product.url.startsWith("http") ? "_blank" : "_self";
      link.rel = product.url.startsWith("http") ? "noopener noreferrer" : "";
      link.textContent = product.url === "#" ? "Link to be configured →" : "Visit platform →";
    }
  });

  // Regulatory disclaimer everywhere it is requested.
  document.querySelectorAll("[data-sebi-disclaimer]").forEach(el => {
    if (!C.regulatory.showDisclaimer) {
      el.remove();
    } else {
      el.textContent = C.regulatory.disclaimer;
    }
  });

  // Active nav.
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar .nav-link").forEach(link => {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });



  // Dynamic blog data.
  const blogGrid = document.querySelector("[data-blog-grid]");
  if (blogGrid) {
    try {
      const response = await fetch(C.site.blogDataUrl);
      if (!response.ok) throw new Error("Blog data could not be loaded.");
      const posts = await response.json();
      renderBlogs(blogGrid, posts, C.site.defaultBlogImage);
      setupBlogFilters();
    } catch (err) {
      blogGrid.innerHTML = `<div class="col-12"><div class="alert-vy">Blog data could not be loaded. Check <code>${C.site.blogDataUrl}</code>.</div></div>`;
    }
  }

  // AOS is loaded in the page head/footer.
  if (window.AOS) {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 60 });
  }
});

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[m]));
}

function renderBlogs(grid, posts, defaultImage) {
  grid.innerHTML = posts.map((post, i) => {
    const image = post.imageUrl || defaultImage;
    return `
      <div class="col-md-6 col-lg-4 blog-item" data-category="${escapeHtml(post.category || "General")}" data-aos="fade-up" data-aos-delay="${(i % 3) * 70}">
        <article class="card-vy blog-card">
          <img src="${escapeHtml(image)}" alt="${escapeHtml(post.title)}" loading="lazy">
          <div class="d-flex gap-2 flex-wrap mt-3">
            <span class="tag">${escapeHtml(post.category || "General")}</span>
            ${post.readTime ? `<span class="tag">${escapeHtml(post.readTime)}</span>` : ""}
          </div>
          <h4 class="mt-3">${escapeHtml(post.title)}</h4>
          <p class="small-muted">${escapeHtml(post.excerpt || "")}</p>
          <div class="small-muted mb-3">${escapeHtml(post.date || "")}</div>
          <a class="fw-bold text-dark" href="${escapeHtml(post.url || "#")}">Read article →</a>
        </article>
      </div>`;
  }).join("");
  if (window.AOS) AOS.refresh();
}

function setupBlogFilters() {
  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".blog-item").forEach(item => {
        item.classList.toggle("d-none", value !== "all" && item.dataset.category !== value);
      });
    });
  });
}
