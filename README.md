# GDSC DYP Akurdi Website

A responsive static recreation of the supplied Google Developer Student Clubs website references, built with HTML, CSS, and vanilla JavaScript.

## Files
- `index.html` — landing page, overview, technology sections, events preview and footer
- `events.html` — dedicated Events & Workshops page with stats, upcoming event and previous-event journey
- `style.css` — responsive styling and optional dark theme
- `script.js` — mobile navigation, theme toggle, event details/registration dialog and active section state
- `assets/flutter-forward.svg` — locally stored placeholder event artwork matching the supplied reference

## Run locally
Open `index.html` in a browser. No build tools or package installation are required. The pages are static and can be hosted on GitHub Pages.

## Functional notes
- Navigation links scroll to their matching sections or open the corresponding page.
- The theme button toggles dark mode and remembers the preference in local storage.
- Event buttons open a dialog. Its registration form validates fields and shows a demo confirmation; it does not submit data to a server.
- External learning/social links open their respective websites.

To connect registrations to a real backend later, replace the demo form handler in `script.js` with a PHP endpoint or a form service.
