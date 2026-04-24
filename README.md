# Movement Snacks · BreathworkMike

A micro-ritual web app for when you've been sitting at a desk all day.  
**Move. Breathe. Reflect.**

Built as a single-file HTML app — no framework, no backend, no dependencies except a Google Fonts link. Works offline as a PWA.

---

## What it does

The app guides you through three stages:

1. **Movement** — pick exercises from a library of 15, set your duration, and follow along with guided voice cues, countdown tones, and rest periods between sets
2. **Breathwork** — choose from 5 downregulating breath patterns (Box, Coherence, 4-7-8, Relaxing, Deep calm) with live BPM stats and adjustable rounds or minutes
3. **Reflection** — a daily mantra, a tarot draw, and a simple intention prompt to close the session

---

## Files

```
/
├── daily-practice.html   ← the full app (self-contained)
├── manifest.json         ← PWA manifest (name, icons, theme colour)
├── sw.js                 ← service worker (offline caching)
└── README.md
```

All three files need to live in the same directory on your server.

---

## Features

- 🏃 **15 movement exercises** with hover tooltips and guided voice cues
- 🌬️ **5 breath presets** — all downregulating, with custom dial controls
- 💭 **Reflection page** — rotating mantras, tarot draw, intention setting
- 🎵 **Binaural-adjacent tones** — 528/440/396/330 Hz per breath phase
- 🗣️ **Voice guidance** — speaks exercise names using Web Speech API (prefers Ava, Allison, Samantha on macOS/iOS)
- 💾 **Saved routines** — store and reload your favourite movement sequences
- 🌿 / 🌸 **Colour theme toggle** — green (default) or pink
- 📱 **PWA** — installable to home screen, works fully offline after first visit
- 📣 **Coach Mode** — Mike can push a weekly featured routine via a public JSON file
- 📤 **Share card** — native share or clipboard copy on session completion
- 📳 **Haptic feedback** — subtle vibration on breath phase transitions (mobile)
- 🔔 **Sound toggle** — mute/unmute, preference saved to localStorage

---

## Running it locally

No build step needed. Just open the file:

```bash
# Option 1 — open directly in browser
open daily-practice.html

# Option 2 — serve locally (needed for PWA/service worker to work)
npx serve .
# then visit http://localhost:3000
```

The service worker only registers over HTTPS or `localhost` — so for full PWA functionality, use a local server or deploy to your host.

---

## Deploying to Netlify (recommended)

1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Click **Add new site → Deploy manually**
3. Drag the folder containing all three files into the upload area
4. Netlify gives you a URL like `https://something.netlify.app`
5. Go to **Domain settings** and add your custom domain
6. Done — HTTPS is automatic

---

## Deploying to GitHub Pages

1. Push this repo to GitHub (see below)
2. Go to your repo → **Settings → Pages**
3. Set source to **Deploy from branch → main → / (root)**
4. GitHub gives you `https://yourusername.github.io/repo-name`
5. To use a custom domain: add a `CNAME` file containing just your domain name, then point your domain's DNS to GitHub Pages

---

## Setting up Coach Mode

Coach Mode lets Mike push a featured weekly practice to all users without touching the code.

**How it works:**
1. Create a public GitHub Gist at [gist.github.com](https://gist.github.com)
2. Add a file called `coach.json` with this structure:

```json
{
  "title": "This week: Morning reset",
  "message": "Start with hip circles and finish with a forward fold. Take your time — this one is about waking up gently.",
  "moves": ["Hip circles", "Shoulder rolls", "Forward fold", "Chest opener"],
  "durSec": 60,
  "breathPreset": 1,
  "breathMins": 5
}
```

3. Click **Raw** on the Gist and copy the URL
4. In `daily-practice.html`, find `const COACH_URL =` and replace the value with your raw Gist URL

The app caches the coach content for 6 hours, so it works offline after first load. If the Gist is unavailable, the app works normally with no coach card shown.

**breathPreset values:**
| Value | Pattern |
|-------|---------|
| 0 | Box (5-5-5-5) |
| 1 | Coherence (6-6) |
| 2 | 4-7-8 |
| 3 | Relaxing (4-8) |
| 4 | Deep calm (5-10) |

---

## Customising the voice

The app uses the Web Speech API and prefers on-device voices in this order:
`Ava → Allison → Samantha → Susan → Zoe → Karen → Moira → Tessa → Fiona → Google UK English Female → Microsoft Zira`

To see which voices are available in your browser, open the console during a session — all available voices are logged there.

To change the preferred voice, find `const prefs=[` in the JS and reorder or add voice names.

---

## Tones reference

| Phase | Frequency | Character |
|-------|-----------|-----------|
| Inhale | 528 Hz | Bright, opening |
| Hold in | 440 Hz | Concert A, neutral |
| Exhale | 396 Hz | Lower, releasing |
| Hold out | 330 Hz | Deepest, most restful |
| Celebration | 396→440→528→660 Hz | Ascending arpeggio |

---

## About

Made by [BreathworkMike](https://instagram.com/breathworkmike)  
If this has helped you move or breathe easier, consider [a tip via Ko-fi](https://ko-fi.com/breathworkmike) ☕  
breathworkmike@gmail.com
