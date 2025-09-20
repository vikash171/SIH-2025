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
│   ├── Homepage.jsx      # Main dashboard with stats and quick actions
│   ├── Profile.jsx       # Reusable profile dropdown with theme/language settings
│   ├── Learn.jsx         # Learning page using modular components
│   ├── Learn_header.jsx  # Header for learning page (subject/topic info)
│   ├── Level_view.jsx    # Learning path with curved level layout
│   ├── Level.jsx         # Individual level nodes with interactions
│   ├── Classroom.jsx     # Classroom page using Class component
│   ├── Class.jsx         # Individual class cards with details
│   ├── VirtualLab.jsx    # Virtual lab page using Lab component
│   ├── Lab.jsx           # Individual lab cards with interactions
│   ├── Leaderboard.jsx   # Leaderboard with tab-based vertical rankings
│   └── Rank.jsx          # Individual rank component for leaderboard entries
├── contexts/
│   └── LanguageContext.jsx # Language management and translation system
├── assets/               # Static assets
├── App.jsx              # Root component with navigation and language provider
├── db.js                # IndexedDB configuration
├── index.css            # Global styles and theme variables
└── main.jsx             # App entry point
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

## Pages & Features

### 🏠 Homepage (`Homepage.jsx`)
- **Dashboard Overview**: XP, streaks, level, and achievements
- **Quick Actions**: Resume learning, start new challenges
- **Theme Switching**: Three accessible color themes
- **Profile Management**: Stats, rewards, settings
- **Navigation**: Quick access to all sections

### 📚 Learn (Modular Components)
- **Learn.jsx**: Main learning page container
- **Learn_header.jsx**: Subject/topic header with progress info
- **Level_view.jsx**: Curved learning path layout manager
- **Level.jsx**: Individual level nodes with interactions
- **Features**: Auto-focus on current level, gamified progression, clean design

### 🧪 Virtual Lab (Modular Components)
- **VirtualLab.jsx**: Main virtual lab page container
- **Lab.jsx**: Individual lab cards with interactions
- **Features**: Single featured lab, subject-specific styling, completion tracking

### 🎓 Classroom (Modular Components)
- **Classroom.jsx**: Main classroom page container
- **Class.jsx**: Individual class cards with details
- **Features**: Single active class, progress tracking, quick actions

### 🏆 Leaderboard (Modular Components)
- **Leaderboard.jsx**: Main leaderboard page with tab navigation
- **Rank.jsx**: Individual rank entries with user info and styling
- **Features**: Personal/School/Global rankings, vertical layout, user highlighting

### 🧭 Navigation
- **5-Tab Navigation**: Home, Learn, Labs, Ranks, Class
- **Mobile-First Design**: Fixed bottom navigation
- **Seamless Routing**: Smooth transitions between sections

## Modular Architecture

### Component Hierarchy
- **Page Components**: Main containers (Learn.jsx, Classroom.jsx, etc.)
- **Shared Components**: Reusable across pages (Profile.jsx)
- **Feature Components**: Reusable UI elements (Level.jsx, Class.jsx, Lab.jsx, Rank.jsx)
- **Layout Components**: Structure managers (Level_view.jsx, Learn_header.jsx)

### Profile Component Features
- **Theme Selection**: Three accessible themes (Playful Growth, Calm Focus, High Contrast)
- **Language Options**: English, Hindi (हिंदी), Odia (ଓଡ଼ିଆ) with full translation support
- **User Stats**: XP points and streak tracking
- **Settings Access**: Quick access to app settings
- **Consistent Design**: Used across all main pages

### Language System
- **Multi-language Support**: Full translation system for English, Hindi, and Odia
- **Context-based Translation**: Uses React Context for global language management
- **Persistent Language**: Saves user's language preference in localStorage
- **Math/Number Preservation**: Numbers and mathematical symbols remain unchanged
- **Dynamic Switching**: Real-time language switching without page reload

### Leaderboard System
- **Modular Rank Component**: Reusable rank entries with name, avatar, and position
- **Personal Rankings**: Individual stats, achievements, and progress tracking
- **School Leaderboard**: Class-based vertical rankings
- **Global Rankings**: Worldwide competition with country flags and schools
- **Tab Navigation**: Clean switching between different leaderboard types
- **User Highlighting**: Current user's position clearly marked with special styling
- **Vertical Layout**: Simple, clean list-based rankings without complex podiums

### Mock Data Structure
- **Single Data Source**: One mock item per component type
- **JSON Ready**: Prepared for future data integration
- **Focused Design**: Clean, uncluttered interfaces

## Accessibility

- WCAG 2.1 AA compliant color contrasts
- Reduced motion support via `prefers-reduced-motion`
- Screen reader compatible
- Keyboard navigation support
