# Project Configuration

## Video Creation

This is a Remotion video project. When asked to create videos, use the Remotion skill (`remotion-best-practices`).

### Remotion Workflow
1. Create compositions in `src/` using React + Remotion APIs
2. Register compositions in `src/Root.tsx`
3. Use `npx remotion studio` to preview in browser
4. Use `npx remotion render <CompositionId>` to export final video

### Key Remotion Patterns
- Use `useCurrentFrame()` and `useVideoConfig()` for timing
- Use `interpolate()` for animations
- Use `spring()` for natural motion
- Use `<Sequence>` for scene ordering
- Use `<AbsoluteFill>` for layout
- Use TailwindCSS for styling

### Project Structure
- `src/Root.tsx` - Register all compositions here
- `src/Composition.tsx` - Video components
- `src/index.ts` - Entry point
- `public/` - Static assets (images, logos, fonts)

### Assets
- Place all images, logos, and media files in `public/`
- Reference them with `staticFile()` from Remotion

### Services & Skills
- **Remotion**: Video creation framework (installed)
- Add additional API keys and services below as needed

### Style Guide
- Default: white background, dark text, modern clean design
- Customize per request
