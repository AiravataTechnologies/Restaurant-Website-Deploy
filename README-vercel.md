# Vercel Deployment Guide

## Overview
Your restaurant management system has been restructured for Vercel deployment with serverless functions.

## Changes Made for Vercel
1. **Serverless API Functions**: Converted Express routes to individual Vercel serverless functions in the `/api` directory
2. **Vercel Configuration**: Added `vercel.json` with proper routing and build settings
3. **CORS Support**: Added CORS headers to all API functions for cross-origin requests
4. **Static File Serving**: Frontend builds to `/dist` directory for Vercel static hosting

## Deployment Steps

### 1. Install Vercel CLI (optional)
```bash
npm i -g vercel
```

### 2. Deploy to Vercel
Option A - Via Vercel Dashboard:
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it as a Vite project
3. Deploy with default settings

Option B - Via CLI:
```bash
vercel
```

### 3. Environment Variables (if needed)
If you add database or external API integration:
1. Go to Vercel Dashboard > Project > Settings > Environment Variables
2. Add your environment variables (DATABASE_URL, etc.)

## API Endpoints (Serverless Functions)
- `GET /api/menu-items` - Get restaurant menu items
- `GET /api/special-menu` - Get special menu items  
- `GET /api/testimonials` - Get customer testimonials
- `GET /api/gallery` - Get gallery images
- `POST /api/bookings` - Create table booking

## Project Structure for Vercel
```
/
├── api/                 # Vercel serverless functions
│   ├── menu-items.js
│   ├── special-menu.js  
│   ├── testimonials.js
│   ├── gallery.js
│   └── bookings.js
├── client/              # React frontend source
├── server/              # Shared server logic (storage, etc.)
├── shared/              # Shared schemas and types
├── vercel.json          # Vercel configuration
└── dist/                # Built frontend (auto-generated)
```

## Notes
- The storage uses in-memory data (resets on each function call)
- For production, connect to a database like PlanetScale or Neon
- All API functions include CORS headers for cross-origin requests
- Frontend is built as static files and served by Vercel's CDN