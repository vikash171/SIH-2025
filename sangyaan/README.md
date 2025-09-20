# STEM Quest - Sangyaan

A gamified STEM learning platform built with React, Vite, Tailwind CSS v4, and IndexedDB for offline functionality.

## Features

- **Interactive Homepage**: Gamified dashboard with learning progress, XP tracking, and achievements
- **Theme System**: Three accessible color themes (Playful Growth, Calm Focus, High Contrast)
- **Learning Paths**: Visual progress tracking through STEM subjects
- **Offline Support**: PWA with IndexedDB for offline functionality
- **Responsive Design**: Works across desktop, tablet, and mobile devices

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling with custom theme system
- **Dexie** - IndexedDB wrapper for offline data
- **PWA** - Progressive Web App capabilities

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   └── Homepage.jsx     # Main homepage component
├── assets/              # Static assets
├── App.jsx             # Root component
├── db.js               # IndexedDB configuration
├── index.css           # Global styles and theme variables
└── main.jsx            # App entry point
```

## Theme System

The application supports three accessibility-focused themes:

1. **Playful Growth** (Default) - High energy, friendly colors for gamified learning
2. **Calm Focus** - Blue-based palette for concentration and study sessions
3. **High Contrast** - Enhanced accessibility for low-vision users

Themes are implemented using CSS custom properties and can be switched dynamically.

## Tailwind CSS v4 Setup

This project uses Tailwind CSS v4 with the official Vite plugin:

- Vite config: uses `@tailwindcss/vite` (see `vite.config.js`)
- CSS entry: imports Tailwind via `@import "tailwindcss"` in `src/index.css`
- Custom theme colors defined in `tailwind.config.js`

## PWA Features

- Offline functionality with service worker
- App manifest for installation
- IndexedDB for local data persistence
- Responsive design for all device types

## Development

The homepage component (`src/components/Homepage.jsx`) includes:

- Theme switching functionality
- Profile dropdown with user stats
- Learning path visualization
- Progress tracking
- Gamification elements (XP, badges, streaks)

## Accessibility

- WCAG 2.1 AA compliant color contrasts
- Reduced motion support via `prefers-reduced-motion`
- Screen reader compatible
- Keyboard navigation support
