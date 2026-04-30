# Bing Webmaster Submission

This document explains how to submit the public GitHub Pages POC to Bing Webmaster Tools.

## Steps

1. Publish the site to GitHub Pages.
2. Open Bing Webmaster Tools.
3. Add the site:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/
```

4. Verify ownership with `BingSiteAuth.xml` or the meta tag in `index.html`.
5. Replace `BING_VERIFICATION_TOKEN_PLACEHOLDER` with the real token provided by Bing.
6. Commit and push the updated file.
7. Wait for GitHub Pages to redeploy.
8. Submit the sitemap:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/sitemap.xml
```

9. Use URL submission for the homepage.
10. Optionally configure IndexNow by replacing `YOUR_INDEXNOW_KEY` in `indexnow-key-placeholder.txt`.

## IndexNow optional note

If IndexNow is used, host the key file at the site root and submit changed URLs through the IndexNow endpoint according to Bing's current documentation.

## Notes

- Indexing is not guaranteed.
- Public hosting makes the page crawlable in principle, but discovery and visibility depend on search engine decisions.
