# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Scout group website** for Scouts Sint-Johannes built with:
- **Next.js 15.3.1** with App Router
- **TypeScript** (with `strict: false`)
- **Payload CMS 3.34.0** as headless CMS
- **PostgreSQL** database
- **Docker** for containerized development

## Development Commands

### Using Docker (Recommended)
```bash
# Start development environment (frontend + database)
docker compose up

# Build production image
docker compose -f docker-compose.prod.yml build
```

### Direct npm commands (from frontend/ directory)
```bash
npm run dev    # Start development server on localhost:3000
npm run build  # Create production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Architecture

### Route Structure
The app uses Next.js App Router with route groups:
- `app/(my-app)/` - Public website routes (activiteiten, leiding, contact, etc.)
- `app/(payload)/` - CMS admin interface (`/admin`)
- `app/api/` - API routes including GraphQL
- `app/preview/` - Preview routes for CMS content

### Key Collections (Payload CMS)
- **Activiteiten** - Activities/events
- **Leiders** - Scout leaders with photos
- **Events, Camps, Weekends** - Different event types
- **FormPages** - Dynamic form builder
- **Enrollments** - Form submissions
- **HomepageHeros** - Hero section management

### Component Patterns
- Server/Client components are clearly marked (`.client.tsx` suffix for client components)
- Rich text rendering uses Lexical via `PayloadRichText` component
- Preview functionality uses `PreviewControls` and draft mode
- Category filtering for activities by age groups (Kapoenen, Wouters, etc.)

### Database
PostgreSQL runs in Docker container:
- Database: `payload`
- User: `postgres`
- Password: `postgres`
- Port: `5432`

## Important Notes

1. **No test framework** is currently set up - only linting is available
2. **Media files** are stored locally in `frontend/media/` directory
3. **Environment variables** are loaded from `.env` file (not in repo)
4. **TypeScript strict mode is disabled** - be cautious with type safety
5. **Custom fonts** (Aglet Slab) are loaded from public/fonts/
6. **Age groups** (takken): Kapoenen, Wouters, Jonggivers, Givers, Jin