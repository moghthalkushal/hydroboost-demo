# Neutrogena Hydro Boost - Claims-Powered AEO/GEO Product Truth Demo

Static GitHub Pages proof of concept for the Neutrogena Hydro Boost Water Gel / Hydro Boost hydration line.

This POC shows how a product experience can be made more AEO/GEO-ready with answer-first content, demo claims data, a product truth object, visible FAQ content, structured data, prompt-to-claim-to-page mapping, source placeholders, and public hosting readiness.

## What this POC is

- A static microsite that can be hosted on GitHub Pages.
- A browser-ready demo for brand, SEO, digital commerce, HCP, and enterprise architecture conversations.
- A product truth demonstration using demo-safe placeholders.
- A public crawlability and structured-data readiness reference.

## What this POC is not

- It is not approved Neutrogena or Kenvue production copy.
- It is not medical advice.
- It does not guarantee Google ranking, indexing, or AI citation.
- It does not prove ChatGPT, Copilot, Gemini, Claude, or any search platform will use the content.
- It does not include approved claims, final label data, pricing, ratings, reviews, availability, or retailer offers.

## Why Hydro Boost was selected

Hydration is a high-intent skincare theme. Consumers ask about moisturizer texture, dry skin, dehydrated skin, daily routines, sunscreen layering, ingredients, price/value, comparisons, and dermatologist-style authority. Hydro Boost is a useful showcase for connecting answer demand to approved product truth.

## What AEO/GEO means

AEO means Answer Engine Optimization: shaping content so answer systems can extract clear, direct, well-supported responses.

GEO means Generative Engine Optimization: shaping content so generative AI systems can understand, summarize, and cite brand-owned source material more reliably.

## What claims-powered content means

Claims-powered content connects each answer fragment to claim metadata:

- approved claim wording
- consumer-friendly text
- evidence reference
- market and language approvals
- required qualifier
- required warning
- approval status
- linked prompts
- allowed channels

Every claim in this POC is marked `approval_status: "demo_placeholder"` and must be replaced before production.

## Preview locally

Because the page fetches JSON files, the most reliable local preview is a small static server from the repo root:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

Opening `index.html` directly may work for the static shell, but some browsers block local JSON fetches from `file://`.

## Replace placeholders

Replace these strings across the repository:

- `YOUR-GITHUB-USERNAME`
- `YOUR-REPO-NAME`
- `YOUR-GITHUB-PAGES-URL`
- `GOOGLE_VERIFICATION_TOKEN_PLACEHOLDER`
- `BING_VERIFICATION_TOKEN_PLACEHOLDER`
- `YOUR_INDEXNOW_KEY`

Replace demo data with approved source data:

- approved product copy
- official product page URL
- approved claims system references
- approved substantiation references
- verified label ingredients and warnings
- market approvals
- language approvals
- final canonical URL

## Publish to GitHub Pages

1. Create a GitHub repository.
2. Commit these static files to the repository.
3. In GitHub, open Settings > Pages.
4. Select the branch and root folder.
5. Save and wait for the GitHub Pages deployment.
6. Confirm the public URL loads:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/
```

## Submit to Google Search Console

Follow `docs/google-search-console-submission.md`.

Use the URL-prefix property for:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/
```

Submit:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/sitemap.xml
```

Indexing is not guaranteed.

## Submit to Bing Webmaster Tools

Follow `docs/bing-webmaster-submission.md`.

Submit the same sitemap URL and optionally configure IndexNow with:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/indexnow-key-placeholder.txt
```

Indexing is not guaranteed.

## Files

- `index.html` - complete microsite page and JSON-LD
- `styles.css` - responsive visual system
- `script.js` - JSON rendering, filters, copy buttons, validation preview
- `data/claims.json` - 8 demo claims
- `data/product-truth.json` - product truth object
- `data/prompts.json` - 60 prompt objects
- `data/validation-report.json` - mock readiness report
- `robots.txt` - crawler allowance
- `sitemap.xml` - single-page sitemap
- `docs/` - submission, demo, architecture, testing, and scale documentation

## Approval required before production

Before this pattern is used for a live brand experience, complete legal, regulatory, medical, brand, claims, SEO, analytics, privacy, accessibility, and market approval review.
