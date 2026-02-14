import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { VoiceoverComposition } from "./VoiceoverComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="VoiceoverDemo"
        component={VoiceoverComposition}
        durationInFrames={420}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
