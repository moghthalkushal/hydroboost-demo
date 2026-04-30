# Manual Test Plan

## Local checks

1. Open the repo root in a browser by launching a static server:

```bash
python -m http.server 8080
```

2. Open `http://localhost:8080/`.
3. Confirm the page loads and sections render.
4. Confirm prompt filters work.
5. Confirm prompt copy buttons work where browser clipboard permissions allow.
6. Confirm Product Truth JSON toggle works.
7. Open `robots.txt`.
8. Open `sitemap.xml`.
9. Inspect page source and confirm JSON-LD blocks exist.

## GitHub Pages checks

1. Publish to GitHub Pages.
2. Open:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/
```

3. Confirm the canonical URL is correct after placeholder replacement.
4. Confirm no `noindex` appears on the homepage.
5. Confirm `robots.txt` and `sitemap.xml` load publicly.
6. Run the URL through a structured data validator.
7. Test mobile layout in browser dev tools.

## Prompt visibility checks

Run prompts manually in ChatGPT, Gemini, Claude, Copilot, and conventional search engines. Record:

- prompt
- date
- platform
- whether Neutrogena appears
- position or rank where visible
- cited source URL
- whether the brand-owned GitHub Pages URL appears
- answer quality
- missing claim or source gap
- recommended content change

Repeat after indexing. Visibility and citation are platform-dependent and not guaranteed.
