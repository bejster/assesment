import { writeFileSync, mkdirSync, existsSync } from "fs";

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

if (!API_KEY) {
  console.error("Missing ELEVENLABS_API_KEY in .env file");
  process.exit(1);
}

if (!VOICE_ID) {
  console.error("Missing ELEVENLABS_VOICE_ID in .env file");
  process.exit(1);
}

interface Scene {
  id: string;
  text: string;
}

// Define your scenes here - each scene gets its own voiceover file
const scenes: Scene[] = [
  {
    id: "scene-01-intro",
    text: "Welcome! This is an example voiceover generated with your cloned voice.",
  },
  {
    id: "scene-02-main",
    text: "You can change these texts to whatever you want. Each scene will get its own audio file.",
  },
  {
    id: "scene-03-outro",
    text: "That's it! Your voice, your videos, all automated.",
  },
];

async function generateVoiceover(scene: Scene): Promise<void> {
  console.log(`Generating voiceover for: ${scene.id}`);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY!,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: scene.text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.3,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ElevenLabs API error for ${scene.id}: ${response.status} ${error}`);
  }

  const audioBuffer = Buffer.from(await response.arrayBuffer());

  const outputDir = "public/voiceover";
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = `${outputDir}/${scene.id}.mp3`;
  writeFileSync(outputPath, audioBuffer);
  console.log(`Saved: ${outputPath}`);
}

async function main() {
  console.log(`Using voice ID: ${VOICE_ID}`);
  console.log(`Generating ${scenes.length} voiceover files...\n`);

  for (const scene of scenes) {
    await generateVoiceover(scene);
  }

  console.log("\nAll voiceovers generated!");
}

main().catch(console.error);
