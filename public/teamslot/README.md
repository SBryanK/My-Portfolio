# TeamSlot

A lightweight, privacy-first team availability app for coordinating meeting times without accounts, a backend, or scheduling back-and-forth.

## Live app

https://sbryank.github.io/My-Portfolio/teamslot/

## Purpose

TeamSlot was built for a fixed October 2026 scheduling window in Singapore time. Team members select when they are available, optionally mark preferred times, and share a generated response link. The organizer imports those links into a consolidated board that ranks the strongest overlaps and visualizes availability across the team.

## Core workflow

1. Enter your name.
2. Select available slots.
3. Tap a selected slot again to mark it as preferred.
4. Copy or share your response link.
5. The organizer imports team response links.
6. TeamSlot ranks the best overlap and shows an availability matrix.
7. The organizer can copy a summary, export CSV, or add the selected time to Google Calendar.

## Features

- Responsive participant and organizer views
- Available / preferred / unselected slot states
- Live selection summary and schedule coverage
- Team member list with response counts
- Best-overlap ranking with percentage bars
- Unanimous-slot count
- Availability matrix for side-by-side comparison
- Shareable individual response links
- Shareable consolidated team-board links
- CSV export
- Google Calendar handoff
- Local browser persistence
- Singapore timezone support
- No login and no backend required
- Keyboard-visible focus states and reduced-motion support

## Privacy model

TeamSlot is a static application. Availability data is encoded in the URL fragment of generated share links and is also stored locally in the browser for convenience.

Because URL fragments are not sent to the web server in a normal page request, the deployed GitHub Pages site does not need a database to process responses. Users should still treat generated response links as shareable scheduling data and only send them to intended teammates.

## Design principles

The interface follows a small set of production-oriented design principles:

- **Clear hierarchy:** primary scheduling actions are visually dominant while secondary controls are deliberately quieter.
- **Progressive disclosure:** participants focus on selecting availability; organizer analytics appear in the dedicated board.
- **Consistent state language:** green means available, violet means preferred, neutral means unselected.
- **Scannability:** dates, time slots, overlap scores, and team status are grouped into predictable visual blocks.
- **Responsive layout:** the two-column desktop layout becomes a single-column mobile workflow.
- **Accessible interaction:** semantic controls, focus-visible states, aria labels, high-contrast states, and reduced-motion support are included.
- **Privacy transparency:** the UI clearly explains where scheduling data lives and how links work.
- **Low operational complexity:** the application remains dependency-free and deploys as one static HTML file.

## Technical architecture

TeamSlot intentionally uses a minimal architecture:

```text
GitHub Pages
    |
    +-- teamslot/index.html
            |
            +-- HTML
            +-- CSS
            +-- Vanilla JavaScript
            +-- localStorage
            +-- URL-fragment encoded response data
```

There is no framework, package manager, server, database, or build step.

## Data model

Each response contains a small JSON payload similar to:

```json
{
  "v": 2,
  "name": "Bryan",
  "yes": ["2026-10-08_14:00"],
  "pref": ["2026-10-12_17:45"],
  "created": "2026-09-16T11:00:00.000Z"
}
```

The payload is encoded and stored after the `#` fragment in the generated response URL.

## Organizer scoring

For each time slot, TeamSlot calculates:

- number of team members available
- number of team members who marked the slot as preferred
- percentage of the imported team available

Ranking priority is:

1. highest availability count
2. highest preferred count
3. earlier date
4. earlier start time

## Deployment

The application is hosted with GitHub Pages from the existing `SBryanK/My-Portfolio` repository.

The production URL is:

```text
https://sbryank.github.io/My-Portfolio/teamslot/
```

Changes pushed to the repository are deployed through the repository's GitHub Pages workflow.

## Local development

No build process is required. Open `index.html` directly in a browser or serve the repository with any static web server.

Example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/teamslot/
```

## Current scope

The current version is intentionally static and link-based. It does not provide real-time multi-user synchronization. The organizer imports responses from team members or shares a consolidated board link.

A future full-stack version could add:

- one shared poll URL
- real-time updates
- poll ownership and edit controls
- authentication or invite-only access
- database persistence
- deadline / reminder support
- automatic calendar event creation
- multiple scheduling polls

## Repository

Source: https://github.com/SBryanK/My-Portfolio/tree/main/teamslot

---

Built as a simple, production-oriented scheduling tool with a focus on clarity, privacy, responsiveness, and zero-maintenance deployment.
