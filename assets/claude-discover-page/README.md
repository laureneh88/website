# Claude Discover — Concept Prototype

An independent interview concept demonstrating capability discovery beside Claude Chat.

## Publish

`index.html` is the complete, deployable website. Its HTML, CSS, JavaScript, logo, and primary font are included in that one file. No build step, package installation, backend, API key, or environment variables are needed.

- For a standalone repo: put `index.html` in the root and deploy as a static site.
- For an existing static personal website: put it in a folder such as `claude-discover/index.html`. Visit `/claude-discover/`.
- For a React/Next.js site: put the folder under `public/claude-discover/` and link to `/claude-discover/index.html`. This is a standalone page, not a React component.
- For GitHub Pages: publish from the branch/folder containing `index.html` using your repository's Pages settings.

The optional `source/` folder is for reference; it does not need to be deployed.

## Preview locally

Open `index.html` in a browser. Alternatively, run this from the folder:

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Edit

Edit `index.html`; it contains the complete working prototype.

- Gallery cards: look for `data-open-cap`.
- Scripted conversations: look for `capabilityFlows`. Later assignments override earlier versions.
- Website demonstration: `startRecipeDemo`, `basicRecipeMarkup`, and `polishedRecipeMarkup`.
- Main website creation replay: `startMainWebsiteFlow`.
- Visual styling: the `<style>` section. Later overrides are intentional and take precedence.

This is the full iterative prototype source, not a refactored component library. Embedded images and fonts account for long encoded strings in the source.

`source/inline-preview.html` is the conversation-preview version for reference. `source/recipe-website-before.html` and `source/recipe-website-after.html` are the recipe pages used in the website demonstration; editing these alone does not change the embedded versions in `index.html`.

## Included experience

1. Make it click — featured visual learning example.
2. Make a document — notes become a shareable document.
3. Find the time — example calendar openings and approved events.
4. Compare your options — side-by-side choices refined by priorities.
5. Create a website — preserved recipe demo and main-chat website flow.

## Prototype behavior

Conversations and outputs are scripted simulations. No real AI, calendar connection, event creation, file generation, or account access takes place. The calendar demonstration explicitly uses an example connected calendar. The plan dropdown is illustrative. The main website replay starts only after selecting Make Your Website. Other CTAs prefill the main composer; it does not provide live AI responses.

Recipe previews may request Fraunces and Karla from Google Fonts; they have local fallbacks. The rest of the primary visual assets are embedded. The AI disclaimer links to Claude's support website.

No credentials or local computer paths are required. The Claude brand assets are included to preserve this concept's appearance; no ownership or license transfer is implied.
