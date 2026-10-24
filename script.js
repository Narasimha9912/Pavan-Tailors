/* ==========================================================
   Pavan Tailors - script.js
   Edit the CONFIG, SERVICES, GALLERY and REVIEWS sections below.
   Refresh the page to see changes.
   ========================================================== */

/* ---------- 1. BUSINESS CONFIGURATION (change details here) ---------- */
const CONFIG = {
  shopName: "Pavan Tailors",
  owner: "Lakshmi Narasaiah",
  address: "Near Government Hospital, Town Police Station side, Ahobilam Road, Allagadda, Andhra Pradesh - 518543",
  phones: ["6305844824", "7382135328"],   // Shown and dialled in this order
  whatsapp: "916305844824",              // Country code + number, no "+" or spaces
  mapsQuery: "Pavan Tailors, Near Government Hospital, Ahobilam Road, Allagadda, Andhra Pradesh 518543",
  social: {                              // Paste full profile URLs when you have them
    instagram: "",
    facebook: "",
    youtube: "",
  },
};

/* ---------- 2. SERVICES (drives service cards, price list and form dropdown) ----------
   IMPORTANT: prices are SAMPLES. The owner must verify or replace them before publishing. */
const SERVICES = [
  { name: "Men's shirt stitching", desc: "Formal, casual and daily-wear shirts with a neat collar and comfortable fit.", price: "₹ 600 onwards" },
  { name: "Men's pant and trouser stitching", desc: "Formal and casual trousers cut to your waist, length and preferred fit.", price: "₹ 500 onwards" },
  { name: "Suit and blazer tailoring", desc: "Two-piece suits, blazers and jackets tailored for a sharp, comfortable fit.", price: "₹ 2,500 onwards" },
  { name: "Traditional wear and ethnic outfits", desc: "Kurtas, pyjamas, sherwanis and traditional outfits stitched to your measurements.", price: "₹ 1,200 onwards" },
  { name: "Women's blouse stitching", desc: "Blouses with your choice of neck, back and sleeve design, fitted to you.", price: "₹ 400 onwards" },
  { name: "Women's dress and custom outfit stitching", desc: "Dresses, salwar suits and custom outfits in the style you choose.", price: "₹ 900 onwards" },
  { name: "Alterations and fitting adjustments", desc: "Waist, length, sleeve and width adjustments for existing or ready-made clothes.", price: "₹ 80 onwards" },
  { name: "Uniform stitching", desc: "School, office and institution uniforms stitched in batches.", price: "₹ 550 onwards" },
  { name: "Children's clothing", desc: "Shirts, frocks, trousers and festive wear for children, sized to grow comfortably.", price: "₹ 300 onwards" },
  { name: "Special occasion and custom orders", desc: "Weddings, festivals and one-of-a-kind designs, discussed with you before stitching.", price: "₹ 3,000 onwards" },
];

/* ---------- 3. GALLERY (add your own photos to assets/images/) ----------
   category must match an id in GALLERY_FILTERS. Leave GALLERY empty until photos are ready. */
const GALLERY_FILTERS = [
  ["all", "All"],
  ["men", "Men"],
  ["women", "Women"],
  ["children", "Children"],
  ["traditional", "Traditional"],
  ["alterations", "Alterations"],
];
const GALLERY = [
  // { src: "assets/images/shirt-01.jpg", alt: "Men's shirt being stitched", category: "men", caption: "Men's shirt" },
];

/* ---------- 4. REVIEWS (add only genuine reviews, with permission) ---------- */
const REVIEWS = [
  // { name: "Customer name", text: "What the customer said." },
];

/* ---------- Helper functions ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const val = id => $("#" + id).value.trim();
const pad = n => String(n).padStart(2, "0");

// Escape text before inserting it into HTML
const esc = text => String(text).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const waLink = message => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
const mapsLink = () => "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(CONFIG.mapsQuery);
const fmtPhone = n => `+91 ${n.slice(0, 5)} ${n.slice(5)}`;

// Turns "+91 63058 44824" or "916305844824" into "6305844824"
const normPhone = value => {
  let d = value.replace(/[\s\-()]/g, "");
  if (d.startsWith("+91")) d = d.slice(3);
  else if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  return d;
};
const validPhone = value => /^[6-9]\d{9}$/.test(normPhone(value));
const todayISO = () => { const n = new Date(); return `${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())}`; };
const longDate = iso => new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/* ---------- 5. FILL CONFIG VALUES INTO THE PAGE ---------- */
function fillBindings() {
  const text = { name: CONFIG.shopName, owner: CONFIG.owner, address: CONFIG.address, year: new Date().getFullYear() };
  $$("[data-bind]").forEach(el => { el.textContent = text[el.dataset.bind]; });

  $$("[data-tel]").forEach(el => { el.href = "tel:+91" + CONFIG.phones[el.dataset.tel - 1]; });
  $$("[data-num]").forEach(el => { el.textContent = fmtPhone(CONFIG.phones[el.dataset.num - 1]); });

  $$("[data-wa]").forEach(el => {
    el.href = waLink(`Hello ${CONFIG.shopName}, I would like to make an enquiry.`);
    el.target = "_blank";
    el.rel = "noopener";
  });
  $$("[data-directions]").forEach(el => {
    el.href = mapsLink();
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Social links stay hidden until a URL is added in CONFIG.social
  Object.entries(CONFIG.social).forEach(([key, url]) => {
    if (!url) return;
    $$(`[data-social="${key}"]`).forEach(el => {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener";
      el.hidden = false;
    });
  });
}

/* ---------- 6. RENDER SERVICES, PRICES, DROPDOWN AND FOOTER LINKS ---------- */
function renderServices() {
  $("#service-grid").innerHTML = SERVICES.map(s => `
    <article class="card reveal">
      <svg class="icon" aria-hidden="true"><use href="#i-needle"/></svg>
      <h3>${esc(s.name)}</h3>
      <p>${esc(s.desc)}</p>
      <a class="btn btn-wa" target="_blank" rel="noopener"
         href="${waLink(`Hello ${CONFIG.shopName}, I would like to enquire about ${s.name}.`)}">Enquire on WhatsApp</a>
    </article>`).join("");
}

function renderPrices() {
  $("#price-body").innerHTML = SERVICES.map(s =>
    `<tr><th scope="row">${esc(s.name)}</th><td class="price">${esc(s.price)}</td></tr>`).join("");
}

function renderDropdownAndFooter() {
  $("#a-service").append(
    ...SERVICES.map(s => new Option(s.name, s.name)),
    new Option("Other or custom order", "Other or custom order")
  );
  $("#footer-services").innerHTML = SERVICES.map(s =>
    `<li><a href="#services">${esc(s.name)}</a></li>`).join("");
}

/* ---------- 7. GALLERY: filters and lightbox ---------- */
let activeFilter = "all";

function renderGallery() {
  $("#gallery-filters").innerHTML = GALLERY_FILTERS.map(([id, label]) =>
    `<button class="filter" type="button" data-filter="${id}" aria-pressed="${id === activeFilter}">${esc(label)}</button>`
  ).join("");

  const items = GALLERY.map((item, index) => ({ ...item, index }))
    .filter(item => activeFilter === "all" || item.category === activeFilter);

  const photos = items.map(item => `
    <button class="shot" type="button" data-index="${item.index}" aria-label="Enlarge photo: ${esc(item.alt)}">
      <img src="${esc(item.src)}" alt="${esc(item.alt)}" loading="lazy">
    </button>`).join("");

  const message = GALLERY.length
    ? "No photos in this category yet."
    : "Our photo gallery is being prepared. Ask us on WhatsApp to see recent work.";

  $("#gallery-grid").innerHTML = photos + `<p class="empty" ${items.length ? "hidden" : ""}>${message}</p>`;
}

function bindGallery() {
  $("#gallery-filters").addEventListener("click", e => {
    const button = e.target.closest("[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    renderGallery();
  });

  $("#gallery-grid").addEventListener("click", e => {
    const shot = e.target.closest(".shot");
    if (!shot) return;
    const item = GALLERY[shot.dataset.index];
    $("#lb-img").src = item.src;
    $("#lb-img").alt = item.alt;
    $("#lb-caption").textContent = item.caption || item.alt;
    $("#lightbox").showModal();
  });

  $("#lb-close").addEventListener("click", () => $("#lightbox").close());
  // Clicking the dark backdrop closes the lightbox
  $("#lightbox").addEventListener("click", e => { if (e.target.tagName === "DIALOG") e.target.close(); });
}

/* ---------- 8. REVIEWS ---------- */
function renderReviews() {
  const list = $("#review-list");
  const hasReviews = REVIEWS.length > 0;
  list.hidden = !hasReviews;
  $("#review-empty").hidden = hasReviews;
  list.innerHTML = REVIEWS.map(r => `
    <figure class="card reveal">
      <blockquote><p>${esc(r.text)}</p></blockquote>
      <figcaption><strong>${esc(r.name)}</strong></figcaption>
    </figure>`).join("");
}

/* ---------- 9. FORM VALIDATION ---------- */
// Returns the first invalid field, or null when the form is valid
function validate(form) {
  let firstBad = null;

  const mark = (field, message) => {
    const error = field.closest(".field").querySelector(".error");
    field.classList.toggle("invalid", Boolean(message));
    field.setAttribute("aria-invalid", String(Boolean(message)));
    error.textContent = message;
    if (message && !firstBad) firstBad = field;
  };

  $$("[required]", form).forEach(field => {
    const v = field.value.trim();
    let message = "";
    if (!v) message = "This field is required.";
    else if (field.type === "tel" && !validPhone(v)) message = "Enter a valid 10-digit mobile number.";
    mark(field, message);
  });

  // Appointment date and time: no past dates, no past times today
  const date = form.querySelector("#a-date");
  if (date && !firstBad) mark(date, dateTimeError(date.value, form.querySelector("#a-time").value));

  return firstBad;
}

function dateTimeError(date, time) {
  if (!date) return "";
  const now = new Date();
  const clock = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  if (date < todayISO()) return "Please choose today or a later date.";
  if (date === todayISO() && time && time <= clock) return "Please choose a time later than now.";
  return "";
}

/* ---------- 10. APPOINTMENT FORM ---------- */
function showSummary(rows, link) {
  $("#summary-list").replaceChildren(...rows.flatMap(([label, value]) => {
    const dt = Object.assign(document.createElement("dt"), { textContent: label });
    const dd = Object.assign(document.createElement("dd"), { textContent: value });
    return [dt, dd];
  }));
  $("#summary-wa").href = link;
  $("#summary").hidden = false;
}

function bindAppointmentForm() {
  const form = $("#appointment-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const badField = validate(form);
    if (badField) { badField.focus(); return; }

    const rows = [
      ["Name", val("a-name")],
      ["Phone", fmtPhone(normPhone(val("a-phone")))],
      ["Service", val("a-service")],
      ["Preferred date", longDate(val("a-date"))],
      ["Preferred time", val("a-time")],
      ["Notes", val("a-notes") || "None"],
    ];
    const message = `Hello ${CONFIG.shopName}, I would like to request an appointment. Please confirm when you reply.\n\n`
      + rows.map(([label, value]) => `${label}: ${value}`).join("\n");

    const link = waLink(message);
    showSummary(rows, link);
    window.open(link, "_blank", "noopener");
    $("#a-status").textContent = "WhatsApp opened with your request. Tap Send there to reach the shop.";
  });
}

/* ---------- 11. ENQUIRY FORMS (contact and measurement) ---------- */
// Each simple form validates, then opens WhatsApp with a prefilled message
function bindSimpleForm(formId, statusId, buildMessage) {
  const form = $("#" + formId);
  form.addEventListener("submit", e => {
    e.preventDefault();
    const badField = validate(form);
    if (badField) { badField.focus(); return; }
    window.open(waLink(buildMessage()), "_blank", "noopener");
    $("#" + statusId).textContent = "WhatsApp opened with your message. Tap Send there to reach the shop.";
  });
}

function bindEnquiryForms() {
  bindSimpleForm("contact-form", "c-status", () =>
    `Hello ${CONFIG.shopName}, I am ${val("c-name")} (${normPhone(val("c-phone"))}). ${val("c-message")}`);

  bindSimpleForm("enquiry-form", "m-status", () =>
    `Hello ${CONFIG.shopName}, I would like to request: ${val("m-type")}.\n`
    + `Name: ${val("m-name")}\nPhone: ${normPhone(val("m-phone"))}\nDetails: ${val("m-details") || "None"}`);
}

/* ---------- 12. NAVIGATION, BACK TO TOP, AND SCROLL REVEAL ---------- */
function bindNavigation() {
  const toggle = $(".nav-toggle");
  const nav = $("#site-nav");

  const setMenu = open => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  const toTop = $("#to-top");
  const onScroll = () => toTop.classList.toggle("show", window.scrollY > 500);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function setupReveal() {
  // Adding the "js" class lets CSS hide reveal items. Without JavaScript, everything stays visible.
  document.documentElement.classList.add("js");
  const items = $$(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("in"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => observer.observe(el));
}

/* ---------- 13. START ---------- */
fillBindings();
renderServices();
renderPrices();
renderDropdownAndFooter();
renderGallery();
bindGallery();
renderReviews();
bindAppointmentForm();
bindEnquiryForms();
bindNavigation();
$("#a-date").min = todayISO();  // Stops the date picker from offering past dates
setupReveal();
