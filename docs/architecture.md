# Architecture

The POC demonstrates a simple static architecture:

```text
Consumer / AI prompt
-> intent classification
-> claims lookup
-> product truth object
-> safe answer fragment
-> PDP / article / FAQ module
-> structured data / JSON-LD
-> public search and AI-readable page
-> measurement loop
```

## Components

- `data/prompts.json` stores prompt demand and maps each prompt to intent, module, claim types, priority, and status.
- `data/claims.json` stores demo claim objects with approval, evidence, qualifier, warning, channel, market, and language fields.
- `data/product-truth.json` stores the product truth object for the Hydro Boost demo.
- `index.html` publishes visible answer-first content and JSON-LD.
- `script.js` renders product truth, prompts, validation score, copy buttons, and structured data preview.
- `robots.txt` and `sitemap.xml` support crawl discovery.

## Production integration targets

- Product information management such as Salsify.
- Digital asset management such as Aprimo.
- Claims and substantiation systems.
- CMS and brand site publishing.
- Shopify or ecommerce storefronts.
- Retailer content payloads.
- Localization and market approval workflows.

## Governance principle

No answer fragment should publish unless it can be traced to approved product truth, approved claims, required qualifiers, required warnings, and source provenance.
