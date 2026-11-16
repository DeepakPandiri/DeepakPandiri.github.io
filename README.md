# Deepak Pandiri — Profile Website

A static, multi-page career portfolio built with plain HTML and CSS. There is no build step, no framework and no dependencies.

## Pages

| File | Content |
| --- | --- |
| `index.html` | Introduction, professional profile, working approach and career summary |
| `experience.html` | Detailed chronological work history |
| `projects.html` | Product portfolio, one section per product |
| `skills.html` | Technical skills and education |
| `styles.css` | Shared styles for every page |
| `script.js` | Mobile menu, header shadow, back-to-top button and fade-in effects |
| `fonts/` | Self-hosted Poppins font files and their license (`OFL.txt`) |
| `deepak.jpg` | Portrait used in the home-page hero |

The site works without JavaScript: the menu links simply show inline on phones and all content stays visible. To change the accent colour, edit `--hue` at the top of `styles.css` (purple 250, blue 224, green 160, pink 340).

All links and asset paths are relative, so the site works at the root of a domain (`https://<user>.github.io/`) or under a project path (`https://<user>.github.io/<repo>/`).

## Preview locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Publish on GitHub Pages

1. Create a GitHub repository. Name it `<your-username>.github.io` for a root site, or use any name for a project site.
2. Push these files to the default branch (for example `main`), keeping them at the repository root:

   ```bash
   git add index.html experience.html projects.html skills.html styles.css script.js fonts deepak.jpg README.md .nojekyll
   git commit -m "Add profile website"
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```

3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, then select **Save**.
5. After a minute or two, the site appears at the URL shown on that page.

The empty `.nojekyll` file tells GitHub Pages to serve the files as they are, without Jekyll processing.

## Updating content

Each page is a standalone HTML file. The header navigation and footer are repeated in every page, so if you change them, update all four files.
