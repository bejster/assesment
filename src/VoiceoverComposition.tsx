import {
  AbsoluteFill,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";

interface SceneProps {
  text: string;
  audioFile: string;
  durationInFrames: number;
}

const Scene: React.FC<SceneProps> = ({ text, audioFile }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [fps * 2, fps * 2.5],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Audio src={staticFile(audioFile)} />
      <div
        style={{
          opacity: Math.min(opacity, fadeOut),
          maxWidth: "80%",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 48,
            color: "#1a1a1a",
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {text}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene configuration - edit texts and audio files here
const scenes = [
  {
    id: "intro",
    text: "Welcome! This is an example voiceover generated with your cloned voice.",
    audioFile: "voiceover/scene-01-intro.mp3",
    durationInFrames: 150, // 5 seconds at 30fps
  },
  {
    id: "main",
    text: "You can change these texts to whatever you want.",
    audioFile: "voiceover/scene-02-main.mp3",
    durationInFrames: 150,
  },
  {
    id: "outro",
    text: "That's it! Your voice, your videos, all automated.",
    audioFile: "voiceover/scene-03-outro.mp3",
    durationInFrames: 120, // 4 seconds
  },
];

export const VoiceoverComposition: React.FC = () => {
  let startFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      {scenes.map((scene) => {
        const from = startFrame;
        startFrame += scene.durationInFrames;

        return (
          <Sequence
            key={scene.id}
            from={from}
            durationInFrames={scene.durationInFrames}
          >
            <Scene
              text={scene.text}
              audioFile={scene.audioFile}
              durationInFrames={scene.durationInFrames}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
