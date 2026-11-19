(function () {
  "use strict";

  const page = document.body.dataset.page || "";
  const enc = encodeURIComponent;
  const pathPrefix = document.location.pathname.split("/").slice(0, -1).join("/") + "/";
  const isRoot = pathPrefix === "/";

  /* ---------- Helpers ---------- */
  const waLink = (o, msg) => `https://wa.me/${o.wa}?text=${enc(msg)}`;
  const DEFAULT_MSG = `Hello ${SITE.short}, I'm interested in a property.`;

  const isPropertyPage = !!document.getElementById("property-detail");
  const isBlogPage = !!document.getElementById("blog-article");
  const isLocationPage = !!document.getElementById("location-page");

  /* ---------- Navigation ---------- */
  const nav = [
    ["/index.html", "Home", "home"],
    ["/properties.html", "Properties", "properties"],
    ["#locations", "Locations", "locations"],
    ["/about.html", "About & Commission", "about"],
    ["/founders.html", "Our Team", "founders"],
    ["/contact.html", "Contact", "contact"],
    ["/blog/", "Blog", "blog"]
  ];
  const locationLinks = LOCATIONS.map(l => `<li><a href="/${l.url}" class="${isLocationPage && findLocation(l.key) ? "active" : ""}">${l.name}</a></li>`).join("");

  const locationsDropdown = `
    <li class="has-dropdown">
      <button class="drop-btn" aria-expanded="false" aria-label="Locations">Locations <span class="arrow">▾</span></button>
      <ul class="drop-menu" id="dropLocations">
        <li><a href="/property-dealer-havelian/">Property Dealer in Havelian</a></li>
        <li><a href="/real-estate-sultanpur/">Real Estate in Sultanpur</a></li>
        <li><a href="/property-dealer-abbottabad/">Property Dealer in Abbottabad</a></li>
        <li><a href="/real-estate-hazara/">Real Estate in Hazara</a></li>
        <li><a href="/real-estate-haripur/">Real Estate in Haripur</a></li>
        <li><a href="/real-estate-mansehra/">Real Estate in Mansehra</a></li>
      </ul>
    </li>`;

  const navItems = nav.map(n => {
    if (n[1] === "Locations") return locationsDropdown;
    const active = page === n[2] || (n[2] === "blog" && (isBlogPage || page === "blog"));
    return `<li><a href="${n[0]}" class="${active ? "active" : ""}">${n[1]}</a></li>`;
  }).join("");

  const header = `
  <header class="site-header"><div class="wrap nav">
    <a class="logo" href="index.html"><span class="logo-mark">MK</span>
      <span>${SITE.name}<small>${SITE.tagline}</small></span></a>
    <ul class="nav-links" id="navLinks">${navItems}</ul>
    <div class="header-actions">
      <button class="btn btn-wa btn-sm desk" data-wa="${DEFAULT_MSG}">💬 WhatsApp</button>
      <button class="burger" id="burger" aria-label="Menu">☰</button>
    </div>
  </div></header>`;
  document.body.insertAdjacentHTML("afterbegin", header);

  /* ---------- JSON-LD structured data ---------- */
  function ld(obj) {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": SITE.url + "#organization",
    name: SITE.name,
    alternateName: SITE.short,
    url: SITE.url,
    logo: SITE.logo,
    image: SITE.logo,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
      addressRegion: SITE.region
    },
    areaServed: SITE.serviceAreas.map(a => ({ "@type": "City", name: a })),
    description: "Trusted property dealers in Havelian, Sultanpur, Abbottabad and the Hazara region. We help clients buy, sell and invest in plots, houses, commercial property and agricultural land.",
    priceRange: "PKR",
    sameAs: Object.values(SITE.social).filter(Boolean)
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE.url + "#website",
    url: SITE.url,
    name: SITE.name,
    potentialAction: {
      "@type": "SearchAction",
      target: SITE.url + "/properties.html?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  ld(orgSchema);
  ld(webSiteSchema);

  /* ---------- Footer ---------- */
  const footer = `
  <footer class="site-footer"><div class="wrap">
    <div class="foot-grid">
      <div>
        <h4>${SITE.name}</h4>
        <p>Trusted property dealers in ${SITE.areas.slice(0, 3).join(", ")} and the wider Hazara region. We help families, investors and overseas Pakistanis buy, sell and invest in property with honest guidance and clear commission.</p>
        <p style="margin-top:14px"><a href="tel:${SITE.phone.replace(/\s/g,'')}" style="color:var(--gold-2);font-weight:600">${SITE.phone}</a> · <a href="mailto:${SITE.email}" style="color:var(--gold-2)">${SITE.email}</a></p>
      </div>
      <div><h4>Pages</h4><ul>
        ${nav.map(n => n[1] !== "Locations" ? `<li><a href="${n[0]}">${n[1]}</a></li>` : "").join("")}
        <li><a href="/property-dealer-havelian/">Property Dealer in Havelian</a></li>
        <li><a href="/real-estate-sultanpur/">Real Estate in Sultanpur</a></li>
        <li><a href="/property-dealer-abbottabad/">Property Dealer in Abbottabad</a></li>
        <li><a href="/real-estate-hazara/">Real Estate in Hazara</a></li>
        <li><a href="/real-estate-haripur/">Real Estate in Haripur</a></li>
        <li><a href="/real-estate-mansehra/">Real Estate in Mansehra</a></li>
      </ul></div>
      <div><h4>Property Types</h4><ul>
        <li><a href="/properties.html">Residential Plots</a></li>
        <li><a href="/properties.html">Houses</a></li>
        <li><a href="/properties.html">Commercial Properties</a></li>
        <li><a href="/properties.html">Agricultural Land</a></li>
        <li><a href="/properties.html">Shops & Buildings</a></li>
        <li><a href="/properties.html">Investment Properties</a></li>
      </ul></div>
      <div><h4>Contact</h4><ul>
        ${OWNERS.map(o => `<li><span style="display:block">${o.name} · ${o.role}</span><a href="${waLink(o, DEFAULT_MSG)}" target="_blank" rel="noopener" style="color:var(--gold-2)">WhatsApp ${o.phone}</a> · <a href="tel:${o.tel}" style="color:var(--gold-2)">Call</a></li>`).join("")}
        <li><span style="display:block">Office</span><a href="tel:${SITE.phone.replace(/\s/g,'')}" style="color:var(--gold-2)">${SITE.phone}</a></li>
      </ul></div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</span>
      <span>Commission: ${SITE.commission.seller}% seller · ${SITE.commission.buyer}% buyer · <a href="/about.html" style="color:var(--gold-2)">Terms</a></span>
    </div>
  </div></footer>

  <button class="wa-float" data-wa="${DEFAULT_MSG}" aria-label="Chat on WhatsApp">💬</button>

  <div class="modal" id="waModal"><div class="modal-box">
    <button class="modal-close" id="waClose" aria-label="Close">×</button>
    <h3>Chat on WhatsApp</h3>
    <p>Choose who you'd like to talk to. Your message is already written for you.</p>
    <div id="waOwners"></div>
  </div></div>`;
  document.body.insertAdjacentHTML("beforeend", footer);

  /* ---------- WhatsApp chooser ---------- */
  const modal = document.getElementById("waModal");
  function openChooser(msg) {
    document.getElementById("waOwners").innerHTML = OWNERS.map(o => `
      <div class="owner-opt">
        <b>${o.name}</b><small>${o.phone}</small>
        <div class="owner-actions">
          <a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waLink(o, msg)}">💬 WhatsApp</a>
          <a class="btn btn-solid btn-sm" href="tel:${o.tel}">📞 Call</a>
        </div>
      </div>`).join("");
    modal.classList.add("open");
  }
  document.getElementById("waClose").onclick = () => modal.classList.remove("open");
  modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("open"); });
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-wa]");
    if (t) { e.preventDefault(); openChooser(t.dataset.wa); }
  });

  /* Mobile menu */
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  if (burger) burger.onclick = () => navLinks.classList.toggle("open");

  /* Locations dropdown */
  const dropBtn = document.querySelector(".drop-btn");
  const dropMenu = document.getElementById("dropLocations");
  if (dropBtn) {
    dropBtn.onclick = (e) => {
      e.stopPropagation();
      const open = dropMenu.style.display === "block";
      dropMenu.style.display = open ? "none" : "block";
      dropBtn.setAttribute("aria-expanded", String(!open));
    };
    document.addEventListener("click", () => { dropMenu.style.display = "none"; dropBtn.setAttribute("aria-expanded", "false"); });
    dropMenu.addEventListener("click", e => e.stopPropagation());
  }

  /* ---------- Property card ---------- */
  function propCard(p) {
    const msg = `Hello ${SITE.short}, I'm interested in this property:\n${p.title} (${p.id})\nLocation: ${p.location}\nType: ${p.type}\nPurpose: ${p.purpose}\nSize: ${p.size}\nPrice: ${p.price}\nPlease share more details.`;
    const bg = p.image ? `style="background-image:url('${p.image}')"` : "";
    const purl = "/properties/" + p.slug + ".html";
    return `
    <article class="property-card">
      <div class="card-media" ${bg}>
        ${p.image ? '<img src="' + p.image + '" alt="' + enc(p.title) + ' in ' + enc(p.location) + '" loading="lazy">' : ""}
        <span class="badge">${enc(p.type)}</span>
        ${p.sample ? '<span class="badge sample">Sample</span>' : ""}
        <span class="sale-tag">For ${enc(p.purpose)}</span>
      </div>
      <div class="card-body">
        <h3><a href="${purl}">${enc(p.title)}</a></h3>
        <div class="prop-loc">📍 ${enc(p.location)} · ${enc(p.purpose)}</div>
        <div class="tags">${p.tags.map(t => `<span>${enc(t)}</span>`).join("")}</div>
        <div class="price">${enc(p.price)}</div>
        <div class="card-foot">
          <a href="${purl}" class="btn btn-ghost btn-sm">View Details</a>
          <button class="btn btn-wa btn-sm" data-wa="${msg.replace(/"/g, "&quot;")}">💬 WhatsApp</button>
        </div>
      </div>
    </article>`;
  }

  /* ---------- Homepage featured + search ---------- */
  const featured = document.getElementById("featured");
  if (featured) featured.innerHTML = PROPERTIES.slice(0, 4).map(propCard).join("");

  const search = document.getElementById("searchForm");
  if (search) search.addEventListener("submit", e => {
    e.preventDefault();
    const v = n => (search.elements[n] && search.elements[n].value) || "Any";
    openChooser(`Hello ${SITE.short}, I'm looking for a property.\nLocation: ${v("loc")}\nType: ${v("type")}\nBudget: ${v("budget")}`);
  });

  /* ---------- Properties listing page ---------- */
  const list = document.getElementById("propList");
  const fLoc = document.getElementById("fLoc");
  const fType = document.getElementById("fType");
  const fPurpose = document.getElementById("fPurpose");
  if (list && fLoc && fType && fPurpose) {
    const locs = [...new Set(PROPERTIES.map(p => p.location))];
    fLoc.innerHTML = '<option value="">All locations</option>' + locs.map(l => `<option>${encHTML(l)}</option>`).join("");
    const types = [...new Set(PROPERTIES.map(p => p.type))];
    fType.innerHTML = '<option value="">All types</option>' + types.map(t => `<option>${encHTML(t)}</option>`).join("");
    const q = new URLSearchParams(location.search);
    if (q.get("loc")) fLoc.value = q.get("loc");
    if (q.get("type")) fType.value = q.get("type");
    if (q.get("purpose")) fPurpose.value = q.get("purpose");
    const render = () => {
      const res = PROPERTIES.filter(p =>
        (!fLoc.value || p.location === fLoc.value) &&
        (!fType.value || p.type === fType.value) &&
        (!fPurpose.value || p.purpose === fPurpose.value));
      list.innerHTML = res.length ? res.map(propCard).join("")
        : `<div class="empty-state"><p>No listing matches your filters yet.</p><p class="lead" style="margin-top:8px">Send us your requirement on WhatsApp and we'll find matching options for you.</p><button class="btn btn-wa" data-wa="Hello ${SITE.short}, I'm looking for a property. Please help me find one.">💬 Tell Us What You Need</button></div>`;
    };
    [fLoc, fType, fPurpose].forEach(f => f.addEventListener("change", render));
    render();
  }

  /* ---------- Property detail page ---------- */
  const propDetail = document.getElementById("property-detail");
  if (propDetail) {
    const slug = propDetail.dataset.slug || "";
    const p = findProperty(slug);
    if (!p) {
      propDetail.innerHTML = `<div class="empty-state"><p>Property not found.</p><a href="../properties.html" class="btn btn-solid">Browse All Properties</a></div>`;
    } else {
      const msg = `Hello ${SITE.short}, I'm interested in this property:\n${p.title} (${p.id})\nLocation: ${p.location}\nType: ${p.type}\nPurpose: ${p.purpose}\nSize: ${p.size}\nPrice: ${p.price}\nPlease share more details and arrange a site visit.`;
      const bedsHtml = p.beds ? `<div class="spec"><span class="spec-val">${p.beds}</span><span class="spec-lab">Bedrooms</span></div>` : "";
      const bathsHtml = p.baths ? `<div class="spec"><span class="spec-val">${p.baths}</span><span class="spec-lab">Bathrooms</span></div>` : "";
      const sizeHtml = `<div class="spec"><span class="spec-val">${p.size}</span><span class="spec-lab">Size</span></div>`;
      const purposeHtml = `<div class="spec"><span class="spec-val">${p.purpose}</span><span class="spec-lab">Purpose</span></div>`;
      propDetail.innerHTML = `
      <section class="property-hero">
        <div class="gallery" style="background-image:url('${p.image}')">
          <img src="${p.image}" alt="${enc(p.title)} ${p.location} ${p.type}" loading="eager">
          <span class="badge">${enc(p.type)}</span>
          <span class="sale-tag">For ${enc(p.purpose)}</span>
          ${p.sample ? '<span class="badge sample">Sample</span>' : ""}
        </div>
      </section>
      <div class="property-detail">
        <div>
          <h1>${enc(p.title)}</h1>
          <div class="prop-meta">${sizeHtml}${bedsHtml}${bathsHtml}${purposeHtml}</div>
          <p class="lead">${enc(p.description)}</p>
          <div class="price-block">
            <span class="price-big">${enc(p.price)}</span>
            <span class="price-note">Asking price · ${p.purpose.toLowerCase()} · ${enc(p.location)}</span>
          </div>
          <h3>Amenities</h3>
          <div class="amenities">${p.amenities.map(a => `<span class="amenity">${enc(a)}</span>`).join("")}</div>
          <div class="actions">
            <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(OWNERS[0], msg)}">💬 Inquire on WhatsApp</a>
            <a class="btn btn-solid" href="tel:${OWNERS[0].tel}">📞 Call ${OWNERS[0].phone}</a>
          </div>
        </div>
        <aside>
          <h3>Asking Price</h3>
          <div class="price-block">
            <span class="price-big">${enc(p.price)}</span>
            <span class="price-note">${enc(p.location)} · ${enc(p.type)}</span>
          </div>
          <h3>Property Specifications</h3>
          <div class="specs-grid">${sizeHtml}${bedsHtml}${bathsHtml}${purposeHtml}</div>
          <h3>Location</h3>
          <p>${enc(p.location)}, ${SITE.region}</p>
          <h3>Agent</h3>
          <p>${OWNERS[0].name} · ${OWNERS[0].role}</p>
          <div class="actions" style="margin-bottom:0">
            <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(OWNERS[0], msg)}">💬 WhatsApp ${OWNERS[0].phone}</a>
            <a class="btn btn-solid" href="tel:${OWNERS[0].tel}">📞 Call ${OWNERS[0].phone}</a>
          </div>
          <h3>Related Properties</h3>
          <div class="related-grid">${PROPERTIES.filter(x => x.id !== p.id && x.location === p.location).slice(0, 3).map(propCard).join("")}</div>
        </aside>
      </div>`;
      /* Page title / meta update */
      document.title = `${p.title} | ${SITE.name} | ${p.location}`;
      ld({
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": SITE.url + "/properties/" + p.slug + ".html#product",
        name: p.title,
        description: p.description,
        image: p.image,
        url: SITE.url + "/properties/" + p.slug + ".html",
        brand: { "@type": "Brand", name: SITE.name },
        offers: {
          "@type": "Offer",
          price: String(p.priceNum),
          priceCurrency: "PKR",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/UsedCondition",
          seller: { "@type": "RealEstateAgent", name: SITE.name }
        },
        category: p.type,
        additionalProperty: [
          { name: "Purpose", value: p.purpose },
          { name: "Size", value: p.size },
          p.beds ? { name: "Bedrooms", value: String(p.beds) } : null,
          p.baths ? { name: "Bathrooms", value: String(p.baths) } : null
        ].filter(Boolean),
        address: {
          "@type": "Place",
          name: p.location,
          addressCountry: "PK",
          addressRegion: SITE.region
        }
      });
    }
  }

  /* ---------- Contact form ---------- */
  const cform = document.getElementById("contactForm");
  if (cform) cform.addEventListener("submit", e => {
    e.preventDefault();
    const f = cform.elements;
    openChooser(
`Hello ${SITE.short},
Name: ${f.name.value}
Phone: ${f.phone.value}
I want to: ${f.intent.value}
Location: ${f.loc.value || "-"}
Budget / Price: ${f.budget.value || "-"}
Message: ${f.msg.value || "-"}`);
  });

  /* ---------- Commission block ---------- */
  document.querySelectorAll("[data-commission]").forEach(el => {
    const { seller, buyer } = SITE.commission;
    el.innerHTML = `
    <div class="commission">
      <span class="eyebrow">Transparent Pricing</span>
      <h2>Clear, Honest <em>Commission</em></h2>
      <p class="lead">No hidden charges. Commission terms are agreed before any transaction moves forward.</p>
      <div class="rate-boxes">
        <div class="rate"><strong>${seller}%</strong><span>Selling party</span></div>
        <div class="rate"><strong>${buyer}%</strong><span>Buying party</span></div>
      </div>
      <div class="calc">
        <h3>Commission Calculator</h3>
        <div class="field"><label>Deal value (PKR)</label>
          <input type="number" min="0" step="10000" placeholder="e.g. 5000000" class="calc-in"></div>
        <div class="calc-out">
          <div class="calc-row"><span>Selling party pays (${seller}%)</span><b class="out-s">PKR 0</b></div>
          <div class="calc-row"><span>Buying party pays (${buyer}%)</span><b class="out-b">PKR 0</b></div>
        </div>
        <p class="note">Commission is calculated on the final agreed deal value. Estimate only. Terms agreed before the transaction.</p>
      </div>
      <button class="btn btn-wa" data-wa="Hello ${SITE.short}, I'd like to discuss a property deal.">💬 Talk to Us on WhatsApp</button>
    </div>`;
    const inp = el.querySelector(".calc-in");
    const fmt = n => "PKR " + Math.round(n).toLocaleString("en-PK");
    inp.addEventListener("input", () => {
      const v = parseFloat(inp.value) || 0;
      el.querySelector(".out-s").textContent = fmt(v * seller / 100);
      el.querySelector(".out-b").textContent = fmt(v * buyer / 100);
    });
  });

  /* ---------- Owner buttons ---------- */
  document.querySelectorAll("[data-owner-buttons]").forEach(el => {
    const o = OWNERS.find(x => x.key === el.dataset.ownerButtons);
    if (!o) return;
    el.innerHTML = `
      <a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waLink(o, DEFAULT_MSG)}">💬 WhatsApp ${o.phone}</a>
      <a class="btn btn-solid btn-sm" href="tel:${o.tel}">📞 Call ${o.phone}</a>`;
  });

  /* ---------- FAQ accordion ---------- */
/* ---------- Blog listing ---------- */
  const blogList = document.getElementById("blogList");
  if (blogList) {
    blogList.innerHTML = BLOG.map(b => `
    <article class="blog-card">
      <div class="blog-media" style="background-image:url('${b.image}')"><img src="${b.image}" alt="${encHTML(b.title)}" loading="lazy"></div>
      <div class="blog-body">
        <div class="blog-meta"><span>${b.author}</span><span>${new Date(b.date).toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric"})}</span></div>
        <h3><a href="${b.slug}.html">${encHTML(b.title)}</a></h3>
        <p>${encHTML(b.excerpt)}</p>
        <a href="${b.slug}.html" class="read">Read article →</a>
      </div>
    </article>`).join("");
  }

  /* ---------- Blog article page ---------- */
  const blogArticle = document.getElementById("blog-article");
  if (blogArticle) {
    const slug = blogArticle.dataset.slug || "";
    const b = findBlog(slug);
    if (!b) {
      blogArticle.innerHTML = `<div class="empty-state"><p>Article not found.</p><a href="../blog/" class="btn btn-solid">Back to Blog</a></div>`;
    } else {
      document.title = `${b.title} | ${SITE.name}`;
      ld({
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": SITE.url + "/blog/" + b.slug + ".html#article",
        url: SITE.url + "/blog/" + b.slug + ".html",
        headline: b.title,
        image: b.image,
        datePublished: b.date,
        dateModified: b.updated || b.date,
        author: { "@type": "Person", name: b.author },
        publisher: orgSchema,
        description: b.excerpt,
        articleSection: "Real Estate",
        keywords: "real estate, property, Havelian, Sultanpur, Abbottabad, Hazara"
      });
      const faqHtml = b.faq ? b.faq.map((f,i)=>`
        <div class="faq-item">
          <div class="faq-q" aria-expanded="false">${encHTML(f.q)}<span class="arrow">▾</span></div>
          <div class="faq-a">${encHTML(f.a)}</div>
        </div>`).join("") : "";
      blogArticle.innerHTML = `
      <div class="blog-article">
        <header>
          <div class="article-meta"><span>${b.author}</span><span>·</span><span>Updated ${new Date(b.updated || b.date).toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric"})}</span></div>
          <h1>${encHTML(b.title)}</h1>
          <p class="article-lead">${encHTML(b.excerpt)}</p>
        </header>
        <div class="blog-body">${b.content}</div>
        ${b.faq ? `<section class="article-footer"><h3>Frequently Asked Questions</h3><div class="faq-grid">${faqHtml}</div></section>` : ""}
        <div class="author-card">
          <div class="author-avatar">${b.author.split(" ").map(n=>n[0]).join("")}</div>
          <div class="author-info"><strong>${b.author}</strong><span>Co-Owner, ${SITE.name}</span></div>
        </div>
        <div class="actions" style="margin-bottom:0">
          <a class="btn btn-wa" data-wa="Hello ${SITE.short}, I read your article '${b.title}' and would like to discuss property in ${SITE.areas.join(", ")}.">💬 Discuss on WhatsApp</a>
          <a class="btn btn-outline" href="../blog/">← Back to Blog</a>
        </div>
      </div>`;
      document.querySelectorAll(".faq-q").forEach(btn => {
        btn.addEventListener("click", () => {
          const item = btn.closest(".faq-item");
          const open = item.classList.toggle("open");
          btn.setAttribute("aria-expanded", String(open));
        });
      });
    }
  }

  /* ---------- Location page ---------- */
  const locationPage = document.getElementById("location-page");
  if (locationPage) {
    const key = locationPage.dataset.key || "";
    const loc = findLocation(key);
    if (loc) {
      document.title = loc.title;
      ld({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": SITE.url + "/" + loc.url + "#webpage",
        url: SITE.url + "/" + loc.url,
        name: loc.h1,
        description: loc.description,
        isPartOf: { "@id": SITE.url + "#website" },
        about: {
          "@type": "RealEstateAgent",
          name: SITE.name
        }
      });
      const keywordHtml = loc.keywords.map(k => `<li>${encHTML(k)}</li>`).join("");
      const areaHtml = loc.areas.map(a => `<li><a href="../properties.html?loc=${enc(a)}">${encHTML(a)}</a></li>`).join("");
      locationPage.innerHTML = `
      <section class="location-hero">
        <div class="wrap">
          <span class="eyebrow">${encHTML(loc.name)} · ${SITE.region}</span>
          <h1>${encHTML(loc.h1)}</h1>
          <p>${encHTML(loc.intro)}</p>
        </div>
      </section>
      <section>
        <div class="wrap">
          <div class="location-intro">
            <p>${encHTML(loc.intro)}</p>
            <p>We work with buyers, sellers and investors across ${loc.areas.join(", ")}, helping with residential plots, houses, commercial property and agricultural land.</p>
          </div>
          <ul class="location-keywords">${keywordHtml}</ul>
        </div>
      </section>
      <section>
        <div class="wrap">
          <div class="section-head center"><span class="eyebrow">Active Areas</span><h2>Where We Work in ${encHTML(loc.name)}</h2></div>
          <div class="location-grid">
            ${loc.areas.map(a => `
            <a class="location-tile" href="/properties.html?loc=${enc(a)}">
              <div class="tile-media" style="background-image:url('${IMAGE.house}')"><img src="${IMAGE.house}" alt="${encHTML(a)} property" loading="lazy"></div>
              <div class="tile-body">
                <span class="tile-eyebrow">Service Area</span>
                <h3>${encHTML(a)}</h3>
                <p>Plots · Houses · Commercial · Land</p>
                <div class="tile-foot"><span class="btn btn-ghost btn-sm">Search ${encHTML(a)}</span></div>
              </div>
            </a>`).join("")}
          </div>
        </div>
      </section>
      <section>
        <div class="wrap">
          <div class="section-head center"><span class="eyebrow">Available Properties</span><h2>Listings in ${encHTML(loc.name)}</h2></div>
          <div class="grid g3" id="loc-list-${key}"></div>
        </div>
      </section>
      <section style="background:#fff">
        <div class="wrap">
          <div class="section-head center"><span class="eyebrow">Frequently Asked Questions</span><h2>${encHTML(loc.name)} <em>FAQs</em></h2></div>
          <div class="faq-grid">
            ${loc.faq.map(f => `
            <div class="faq-item">
              <div class="faq-q" aria-expanded="false">${encHTML(f.q)}<span class="arrow">▾</span></div>
              <div class="faq-a">${encHTML(f.a)}</div>
            </div>`).join("")}
          </div>
        </div>
      </section>
      <section class="dark">
        <div class="wrap" data-commission></div>
      </section>
      <section>
        <div class="wrap cta-band">
          <h2>Looking for Property in ${encHTML(loc.name)}?</h2>
          <p>Send us your requirement on WhatsApp and we'll shortlist verified options for you.</p>
          <button class="btn btn-solid" data-wa="Hello ${SITE.short}, I'm looking for property in ${loc.name}. Please help me find one.">💬 Message on WhatsApp</button>
          <a class="btn btn-outline" style="border-color:#fff;color:#fff" href="/contact.html">Contact Us</a>
        </div>
      </section>`;
      const locList = document.getElementById("loc-list-" + key);
      if (locList) {
        const filtered = PROPERTIES.filter(p => p.location === loc.name);
        locList.innerHTML = filtered.length ? filtered.map(propCard).join("")
          : `<div class="empty-state"><p>No active listings in ${loc.name} right now.</p><p class="lead" style="margin-top:8px">Send us your requirement on WhatsApp and we'll notify you when matching properties become available.</p><button class="btn btn-wa" data-wa="Hello ${SITE.short}, notify me when properties become available in ${loc.name}.">💬 Notify Me</button></div>`;
      }
    }
  }

  /* ---------- Breadcrumbs (detail pages) ---------- */
  function breadcrumbs(crumbs) {
    const container = document.querySelector(".breadcrumbs");
    if (!container) return;
    container.innerHTML = crumbs.map((c, i) => c.url ? `<a href="${c.url}">${c.label}</a><span class="sep">›</span>` : `<span>${c.label}</span>`).join("");
  }

  /* ---------- FAQ accordion (runs after all content injected) ---------- */
  document.querySelectorAll(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });
})();

/* HTML escape helper */
function encHTML(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
