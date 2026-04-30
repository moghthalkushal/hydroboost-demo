# Google Search Console Submission

This document explains how to submit the public GitHub Pages POC to Google Search Console.

## Steps

1. Publish the site to GitHub Pages.
2. Open Google Search Console.
3. Add a URL-prefix property.
4. Use this placeholder URL and replace it with the live GitHub Pages URL:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/
```

5. Verify ownership with either the meta tag in `index.html` or the HTML verification file.
6. Replace `GOOGLE_VERIFICATION_TOKEN_PLACEHOLDER` with the real token provided by Google.
7. Commit and push the updated file.
8. Wait for GitHub Pages to redeploy.
9. Submit the sitemap:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/sitemap.xml
```

10. Use URL Inspection for the homepage.
11. Request indexing if the option is available.
12. Monitor Pages, Performance, and Enhancements.

## Notes

- Keep `robots.txt` crawlable.
- Keep the homepage free of `noindex`.
- Confirm the canonical URL matches the public GitHub Pages URL.
- Search discovery, crawling, indexing, ranking, and AI citation are not guaranteed.
