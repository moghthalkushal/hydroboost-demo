const DATA_PATHS = {
  claims: "data/claims.json",
  prompts: "data/prompts.json",
  productTruth: "data/product-truth.json",
  validation: "data/validation-report.json"
};

const state = {
  claims: [],
  prompts: [],
  productTruth: null,
  validation: null,
  activeCategory: "all"
};

document.addEventListener("DOMContentLoaded", () => {
  init();
  wireCopyButtons();
  wireJsonToggle();
  renderJsonLdPreview();
});

async function init() {
  const [claims, prompts, productTruth, validation] = await Promise.all([
    loadJson(DATA_PATHS.claims, []),
    loadJson(DATA_PATHS.prompts, []),
    loadJson(DATA_PATHS.productTruth, null),
    loadJson(DATA_PATHS.validation, null)
  ]);

  state.claims = claims;
  state.prompts = prompts;
  state.productTruth = productTruth;
  state.validation = validation;

  renderProductTruth();
  renderPromptFilters();
  renderPrompts();
  renderValidation();
}

async function loadJson(path, fallback) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Could not load ${path}:`, error);
    return fallback;
  }
}

function renderProductTruth() {
  const root = document.getElementById("product-truth-render");
  const jsonPreview = document.getElementById("product-truth-json");
  if (!root || !jsonPreview) return;

  const productTruth = state.productTruth;
  if (!productTruth) {
    root.innerHTML = `<article class="card wide-card"><h3>Product truth could not be loaded</h3><p>Open this site from a local server or GitHub Pages so the browser can fetch JSON files. The static files are still present in <code>/data</code>.</p></article>`;
    jsonPreview.textContent = "Product truth JSON could not be loaded by the browser.";
    return;
  }

  const family = productTruth.ProductFamily;
  const claimMap = new Map(state.claims.map((claim) => [claim.claim_id, claim]));
  const claimCards = productTruth.Claims.map((claimId) => {
    const claim = claimMap.get(claimId);
    if (!claim) return `<li>${escapeHtml(claimId)} - claim file pending</li>`;
    return `<li><strong>${escapeHtml(claim.claim_type)}:</strong> ${escapeHtml(claim.approved_claim)} <span class="microcopy">(${escapeHtml(claim.approval_status)})</span></li>`;
  }).join("");

  root.innerHTML = `
    <article class="card">
      <h3>ProductFamily</h3>
      <p><strong>${escapeHtml(family.brand)} ${escapeHtml(family.product_line)}</strong></p>
      <p>${escapeHtml(family.product_name)}</p>
      <p class="microcopy">${escapeHtml(family.category)} | ${escapeHtml(family.approval_status)}</p>
    </article>
    <article class="card">
      <h3>Variants</h3>
      <ul>${productTruth.Variants.map((variant) => `<li>${escapeHtml(variant.variant_name)} <span class="microcopy">- ${escapeHtml(variant.status)}</span></li>`).join("")}</ul>
    </article>
    <article class="card">
      <h3>Key Attributes</h3>
      <ul>${productTruth.KeyAttributes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="card">
      <h3>Ingredients / Formulation Notes</h3>
      <ul>${productTruth.Ingredients.map((item) => `<li><strong>${escapeHtml(item.ingredient_name)}:</strong> ${escapeHtml(item.status)}</li>`).join("")}</ul>
      <p class="microcopy">${escapeHtml(productTruth.FormulationNotes.join(" "))}</p>
    </article>
    <article class="card">
      <h3>Usage Instructions</h3>
      <ul>${productTruth.UsageInstructions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="card">
      <h3>Warnings / Safety Notes</h3>
      <ul>${productTruth.Warnings.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="card wide-card">
      <h3>Demo Claims</h3>
      <ul>${claimCards}</ul>
    </article>
    <article class="card wide-card">
      <h3>Content Fragments</h3>
      <div class="feature-grid">
        ${Object.entries(productTruth.ContentFragments).map(([key, value]) => `<div><strong>${titleCase(key)}</strong><p class="microcopy">${escapeHtml(value)}</p></div>`).join("")}
      </div>
    </article>
    <article class="card wide-card">
      <h3>Provenance Placeholders</h3>
      <p><strong>Source URL:</strong> ${escapeHtml(productTruth.Provenance.source_url)}</p>
      <p><strong>Claims source:</strong> ${escapeHtml(productTruth.Provenance.claims_source)}</p>
      <p><strong>Substantiation source:</strong> ${escapeHtml(productTruth.Provenance.substantiation_source)}</p>
      <p><strong>Approval status:</strong> ${escapeHtml(productTruth.Provenance.approval_status)}</p>
    </article>
  `;

  jsonPreview.textContent = JSON.stringify(productTruth, null, 2);
}

function renderPromptFilters() {
  const root = document.getElementById("prompt-filters");
  if (!root) return;

  const categories = ["all", ...new Set(state.prompts.map((prompt) => prompt.category))];
  root.innerHTML = categories.map((category) => {
    const pressed = category === state.activeCategory ? "true" : "false";
    return `<button type="button" data-category="${escapeHtml(category)}" aria-pressed="${pressed}">${escapeHtml(titleCase(category))}</button>`;
  }).join("");

  root.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeCategory = button.dataset.category;
      renderPromptFilters();
      renderPrompts();
    });
  });
}

function renderPrompts() {
  const root = document.getElementById("prompt-bank-render");
  if (!root) return;

  if (!state.prompts.length) {
    root.innerHTML = `<article class="card"><h3>Prompt bank could not be loaded</h3><p>Open this site from a local server or GitHub Pages so the browser can fetch <code>/data/prompts.json</code>.</p></article>`;
    return;
  }

  const prompts = state.activeCategory === "all"
    ? state.prompts
    : state.prompts.filter((prompt) => prompt.category === state.activeCategory);

  root.innerHTML = prompts.map((prompt) => `
    <article class="card prompt-card">
      <div>
        <h3>${escapeHtml(prompt.prompt)}</h3>
        <p class="microcopy">${escapeHtml(prompt.intent)}</p>
      </div>
      <div class="prompt-card__meta">
        <span>${escapeHtml(prompt.category)}</span>
        <span>${escapeHtml(prompt.priority)} priority</span>
        <span>${escapeHtml(prompt.target_page_module)}</span>
      </div>
      <p class="microcopy"><strong>Claim types:</strong> ${escapeHtml(prompt.required_claim_types.join(", "))}</p>
      <button class="button copy-button" type="button" data-copy="${escapeAttr(prompt.prompt)}">Copy Prompt</button>
    </article>
  `).join("");

  wireCopyButtons(root);
}

function renderValidation() {
  const score = document.getElementById("readiness-score");
  const root = document.getElementById("validation-render");

  if (!state.validation) {
    if (score) score.textContent = "Pending";
    if (root) root.innerHTML = `<p>Validation report could not be loaded from <code>/data/validation-report.json</code>.</p>`;
    return;
  }

  if (score) score.textContent = `${state.validation.readiness_score}/100`;
  if (!root) return;

  root.innerHTML = `
    <h3>${state.validation.readiness_score}/100 demo readiness score</h3>
    <p>${state.validation.prompt_count} prompts, ${state.validation.claim_count} demo claims, product truth present: ${state.validation.product_truth_present ? "yes" : "no"}, noindex detected: ${state.validation.noindex_detected ? "yes" : "no"}.</p>
    <p class="microcopy"><strong>Next action:</strong> ${escapeHtml(state.validation.next_actions[0])}</p>
  `;
}

function wireCopyButtons(scope = document) {
  scope.querySelectorAll(".copy-button").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", async () => {
      const value = button.dataset.copy || "";
      const original = button.textContent;
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = "Copied";
      } catch (error) {
        button.textContent = "Copy unavailable";
      }
      window.setTimeout(() => {
        button.textContent = original;
      }, 1400);
    });
  });
}

function wireJsonToggle() {
  const toggle = document.getElementById("toggle-json");
  const preview = document.getElementById("product-truth-json");
  if (!toggle || !preview) return;

  toggle.addEventListener("click", () => {
    const isHidden = preview.classList.toggle("is-hidden");
    toggle.textContent = isHidden ? "Show JSON Preview" : "Hide JSON Preview";
  });
}

function renderJsonLdPreview() {
  const root = document.getElementById("jsonld-preview");
  if (!root) return;

  const blocks = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((script) => {
    try {
      return JSON.parse(script.textContent);
    } catch (error) {
      return { error: "Invalid JSON-LD block", id: script.id };
    }
  });

  root.textContent = JSON.stringify(blocks, null, 2);
}

function titleCase(value) {
  return String(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}
