# Claude activation concepts — website package

## What to upload

Upload this whole folder to your website. `index.html` is a small landing page linking to the two active prototypes. No build step, API key, backend, or package installation is required.

- `discover/index.html` — big bet: Discover.
- `connect/index.html` — medium bet: Connect with a purpose; sidebar destination, dismissible tip, Google/Microsoft/Unknown workspace variants, and post-connection action menus.
- `assets/` — local icons and their license; keep this folder alongside the prototype folders.
- `notes/bet-distinction-for-slides.md` — saved slide framing, measurement, and implementation assumptions.
- `presentation-assets/` — previously created video, posters, and terracotta bottom strip.
- `archive/prompt-suggestions/index.html` — earlier prompt-copy experiment, retained for reference only; not an active bet and not linked on the landing page.

## Put it on your website

For an existing static website, copy the folder into a path such as `claude-activation/`. Your landing page will be `/claude-activation/index.html`, with prototypes at `/claude-activation/discover/index.html` and `/claude-activation/connect/index.html`.

For React or Next.js, copy the folder into `public/claude-activation/` and use those same URLs. These are standalone pages rather than React components.

For a standalone static repository, use this folder’s contents as the site root. All navigation uses relative paths so it also works in a subfolder. Opening `index.html` in a browser also works for a local preview.

## Edit and present

Each prototype page contains its own HTML, styles, scripts, embedded images, and primary font. Edit those pages directly; no separate source compilation is needed. The pages retain the iterative prototype code rather than a refactored application architecture. Optional recipe fonts may load from Google Fonts, with local fallbacks.

The landing page identifies these as independent concept prototypes. The app interfaces preserve the reference styling. All conversations and account data are simulated. Gmail recreates the recorded connection sequence with a sample account. Calendar and Drive omit unrecorded authorization screens and show sample results. No credentials or real Google account access are used.

See `notes/bet-distinction-for-slides.md` before drafting the slides. The small tactical bet remains undecided.

Claude and Google branding is included as reference material for this concept; no ownership or license transfer is implied. Lucide’s license is included under `assets/`.

Current slide copy: `notes/connect-with-a-purpose-slides.md`. Microsoft uses one work-account connector across five app areas. Existing Microsoft authorization is omitted from this simulation.
