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
- **ElevenLabs**: Voice cloning & TTS for voiceovers (configured)
  - API key and Voice ID stored in `.env`
  - Use `eleven_multilingual_v2` model (supports Polish and other languages)
  - Generate voiceovers with: `node --env-file=.env --strip-types generate-voiceover.ts`
  - Audio files go to `public/voiceover/`

### Voiceover Workflow
1. Edit scene texts in `generate-voiceover.ts`
2. Run: `node --env-file=.env --strip-types generate-voiceover.ts`
3. Audio files are saved to `public/voiceover/`
4. Use `<Audio src={staticFile("voiceover/scene-name.mp3")} />` in compositions
5. Use `calculateMetadata` to auto-size composition to audio length

### Style Guide
- Default: white background, dark text, modern clean design
- Customize per request
