# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal website built with Gatsby.js and TypeScript, featuring poetry and writing. The site uses MDX for content, Rebass for UI components, and Theme UI for theming with dark/light mode support.

## Common Commands

```bash
# Development
npm start                    # Start dev server at localhost:8000
npm run dev                  # Same as npm start

# Building
npm run build               # Build for production
npm run clean               # Clean the public directory

# Code Quality
npm run lint                # Run ESLint with auto-fix
npm run format              # Format code with Prettier
npm run tsc                 # Run TypeScript compiler
npm test                    # Run type-check and lint

# Deployment
npm run deploy              # Build and deploy to gh-pages
```

## Architecture

### Content System

Content lives in `src/content/` organized by type:
- `src/content/poems/` - Poetry content in MDX format
- `src/content/writing/` - Written articles/essays

MDX files use frontmatter with the following structure:
```yaml
title: 'Post Title'
published: '2019-08-01'
tags: ['poetry', 'writing']
preview: ['First line', 'Second line', ...]  # Array of strings shown on index
minWidth: 420  # Optional minimum width in pixels for the post page
```

File naming convention: `YYYY-MM-DD-slug.mdx`

### Page Generation

`gatsby-node.js` handles MDX file transformation:
1. Creates slugs by removing the date prefix from filenames
2. Generates pages using `src/templates/post.tsx`
3. Makes content queryable via GraphQL

The slug transformation removes the date prefix, so `2019-08-01-my-post.mdx` becomes `/my-post/`.

### Component Architecture

**Layout & Theming**
- `src/layouts/index.tsx` - Main layout wrapper with header and color mode toggle
- `src/gatsby-plugin-theme-ui/index.ts` - Theme definition with dark (default) and light modes
- Uses Theme UI's `useColorMode` hook for theme switching, with localStorage persistence

**Homepage (`src/pages/index.tsx`)**
- Displays filterable list of all MDX content
- Tag filtering with localStorage persistence for user selection
- Uses `PreviewItems` component to render content cards

**Components**
- `PreviewItems.tsx` - Queries and filters MDX content by selected tags, displays preview cards
- `Tags.tsx` - Tag selection UI for filtering content
- `Container.tsx` - Content container with max-width
- `Link.tsx` - Internal link wrapper using Gatsby Link
- `Footnote.tsx` - Footnote component for content
- `Icon.tsx` - Icon wrapper component
- `src/components/blackout-poems/` - Interactive D3-based blackout poem components

### Styling & UI

Uses Rebass and Theme UI for component-based styling:
- Rebass components: `Box`, `Flex`, `Heading`, `Text`, `Button`, `Link`
- Theme UI for consistent theming and color modes
- Emotion for CSS-in-JS
- Theme colors: `background`, `foreground`, `text`, `accent`, `muted`, `hr`

MDX content can import and use React components directly, including Rebass components for layout control (see `2019-08-01-i-walk-a-little.mdx` for example).

### GraphQL Queries

Key GraphQL patterns:
- `allMdx` - Query all MDX content
- Sort by `frontmatter___published` in DESC order for chronological display
- Group by `frontmatter___tags` for tag list generation
- Fields available: `slug`, `layout` (added via `gatsby-node.js`)
- Frontmatter fields: `title`, `published`, `tags`, `preview`, `minWidth`

### Build Configuration

- `gatsby-config.js` - Site metadata, plugin configuration
- Content sourced from `src/content` directory
- Images optimized with gatsby-image and gatsby-plugin-sharp
- SVG support through gatsby-plugin-react-svg for files in `/images/` directory
- Prism.js for code syntax highlighting
- gatsby-remark plugins for MDX enhancements (responsive iframes, images, smartypants)

## Development Notes

- TypeScript strict mode enabled
- ESLint configured with blvd config and Prettier integration
- The site uses a monospace font for all text rendering
- Main branch for PRs is `master`
- Site title "if day has to become night" is from e.e. cummings' poem "who are you, little i"
