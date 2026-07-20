# Aahil Baig — Portfolio

Single page portfolio. Plain HTML, CSS, and JavaScript. No build step, no dependencies.

## Structure

- `index.html` — the whole site (hero, about, leadership, projects, showcase, skills, experience, why Nixor, contact)
- `css/style.css` — dark metallic theme, responsive layout, loading screen, animations
- `js/main.js` — loading screen, scroll reveals, nav state, mobile menu, footer year, video autoplay fallback
- `metal-human.mp4` — hero background video
- `videos/` — showcase videos
- `images/` — photography (Nikon D3200)

## Run locally

Open `index.html` in a browser, or:

```bash
npx serve .
```

## Hosting

Works on any static host: GitHub Pages, Netlify, Vercel, Cloudflare Pages. Drag and drop the folder or connect the repo.

### Showcase videos are hosted on Google Drive

The five showcase videos are embedded from Google Drive, so the `videos/` folder does NOT need to be uploaded to the host. To wire them up:

1. Upload each video to Google Drive.
2. Right click the file → Share → set "Anyone with the link" as Viewer.
3. Copy the link. It looks like `https://drive.google.com/file/d/1AbC...XyZ/view` — the file ID is the part between `/d/` and `/view`.
4. In `index.html`, replace the matching placeholder with that ID:
   - `GDRIVE_ID_COMP1` → Comp 1.mp4
   - `GDRIVE_ID_TASM2` → tasm2_edit.mp4
   - `GDRIVE_ID_7000RPM` → at-7000-rpm.mp4
   - `GDRIVE_ID_0713` → 0713.mov
   - `GDRIVE_ID_SHORTFILM` → the short film

Note: Drive embeds show Google's player. If a video ever hits Drive's traffic quota it may temporarily stop playing; unlisted YouTube uploads are the more robust alternative.

### Hero video stays local

`metal-human.mp4` (~55 MB) is still served locally as the hero background. Compress it before hosting (Cloudflare Pages caps files at 25 MB):

```bash
ffmpeg -i metal-human.mp4 -an -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset slow metal-human-web.mp4
```

Then update the `<source src>` in `index.html` to `metal-human-web.mp4`.

### Not needed when uploading to a host

- `videos/` (embedded from Google Drive instead)
- `prompt.txt`
