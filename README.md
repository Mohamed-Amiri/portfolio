# Mohamed Amiri — Portfolio

Personal portfolio site. Angular 18 (standalone components, signals), SCSS, no backend.

## Run

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build → dist/portfolio/browser
```

## Edit content

All text lives in `src/app/content/` — components never contain copy.

| File | What it holds |
|---|---|
| `content/profile.ts` | Name, intro, about, photo, links, CV, skills, experience, education, languages |
| `content/projects/sakane.ts` | Sakane case study (sections, architecture, stack, screenshots) |
| `content/projects/safari.ts` | Safari case study |
| `content/projects/index.ts` | Project order on the home page |

Anything not yet written starts with `TODO:` and renders as a visible yellow placeholder.
List what is left with:

```bash
npm run check:todos
```

Add a third project by creating `content/projects/<slug>.ts` and adding it to `PROJECTS` in `index.ts`.

## Assets (`public/`)

- `images/mohamed-amiri.jpg` (800×800) and `-400.jpg` — portrait
- `images/<project>-home.jpg` (1280×800) and `-640.jpg` — poster shown in the live-preview window before the iframe loads
- `images/og.jpg` (1200×630) — social sharing image
- `Mohamed-Amiri-CV.pdf` — resume

## Live-preview windows

`shared/live-preview.component.ts` renders each deployed site inside a scaled iframe (1280 px wide, scaled to fit).
It shows the poster first and loads the live site on demand,
opens the full site in a new tab on click, and offers **Browse inside** to interact with the embedded site.
Both `sakane.vercel.app` and `safari-chi-pearl.vercel.app` currently send no `X-Frame-Options` / `frame-ancestors`
headers, so embedding works. If you ever add such headers to those apps, allow your portfolio's origin.

## Deploy

Static hosting. `vercel.json` already contains the SPA rewrite and long cache headers for assets.

- **Vercel**: import the repo, framework *Angular*, build `npm run build`, output `dist/portfolio/browser`.
- **Netlify**: build `npm run build`, publish `dist/portfolio/browser`, add a `_redirects` file with `/* /index.html 200`.
- **GitHub Pages**: build with `--base-href /<repo>/` and copy `index.html` to `404.html`.

## Structure

```
src/app/
  app.component.ts        shell: skip link, header, <router-outlet>, footer
  app.routes.ts           '' home · projects/:slug (lazy) · ** not found
  core/                   header, footer, SEO service, route guard
  content/                typed content (see above)
  shared/                 section, tech-list, todo, rich-text, live-preview, screenshot-gallery
  pages/home/             hero, projects, skills, about, experience, resume, contact
  pages/case-study/       case-study page
  pages/not-found/
styles/                   _tokens.scss (light-only), _base.scss
```
