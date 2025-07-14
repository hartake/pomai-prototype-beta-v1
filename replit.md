# Pomia - Pomodoro Timer Application

## Overview

Pomia is a modern Pomodoro timer application built with React, TypeScript, and a Node.js/Express backend. The application helps users manage their time using the Pomodoro Technique, allowing them to set focused work sessions, track their progress, and build productive habits through a gamified point system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React hooks and TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Storage**: In-memory storage with planned database migration

### Key Design Decisions

**Monorepo Structure**: The application uses a monorepo approach with shared TypeScript definitions between client and server, ensuring type safety across the full stack.

**Component-First UI**: Built using shadcn/ui components for consistent design and accessibility, with custom theming through CSS variables.

**Offline-First Data**: Currently uses localStorage for client-side persistence, allowing the application to work offline while preparing for eventual database synchronization.

## Key Components

### Timer System
- **Timer Display**: Circular progress indicator with customizable duration
- **Audio Notifications**: Web Audio API for completion sounds
- **Session Management**: Start, pause, reset functionality with memo support

### Progress Tracking
- **Points System**: Gamified scoring based on session duration and memo completion
- **Statistics Dashboard**: Total sessions, hours focused, and current streak tracking
- **Session History**: Detailed view of past sessions with completion status

### Data Models
```typescript
- Session: duration, actualDuration, memo, points, completed, timestamps
- UserProgress: totalPoints, totalSessions, totalHours, currentStreak
```

### UI Components
- **Navigation**: Tab-based navigation between Timer and History
- **Progress Bar**: Visual representation of user achievement
- **Session History**: Card-based display of past sessions with status indicators

## Data Flow

### Timer Workflow
1. User selects preset duration or sets custom time
2. Timer starts and tracks elapsed time using setInterval
3. Audio notification plays on completion
4. Session data is calculated and stored in localStorage
5. User progress is updated with new statistics

### State Management
- **Local State**: Timer state, form inputs, UI interactions
- **Persistent State**: Session history and user progress in localStorage
- **Future Database State**: Planned migration to PostgreSQL for multi-device sync

### Point Calculation Algorithm
- Base points: `Math.min(Math.max(Math.floor(durationMinutes / 5), 2), 25)`
- Memo bonus: Full points if memo provided, 60% if no memo
- Encourages longer sessions and thoughtful reflection

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI Framework**: Radix UI primitives, shadcn/ui components
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Data Fetching**: TanStack Query for future API integration

### Database & Backend
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod schemas for type-safe data validation
- **Database Provider**: Neon serverless PostgreSQL

### Development Tools
- **Build**: Vite with React plugin and runtime error overlay
- **TypeScript**: Strict configuration with path mapping
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Replit Integration
- **Cartographer**: Development environment mapping
- **Runtime Error Modal**: Enhanced error handling in development

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR
- **Backend**: tsx with nodemon-like reloading
- **Database**: Drizzle Kit for schema management and migrations

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend assets

### Database Management
- **Migrations**: Drizzle Kit generates and applies schema changes
- **Environment**: DATABASE_URL environment variable required
- **Schema**: Located in `shared/schema.ts` for type sharing

### Planned Enhancements
- **Authentication**: User accounts for cross-device synchronization
- **API Integration**: RESTful API for session and progress management
- **Real-time Features**: WebSocket integration for live statistics
- **PWA Features**: Service worker for offline functionality