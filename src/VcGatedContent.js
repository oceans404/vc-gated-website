import { Image } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function VcGatedContent() {
  return (
    <div style={{ color: "white" }}>
      <h1>👀 Here's the super secret VC gated content!</h1>
      <Image
        my={4}
        src="https://i.imgflip.com/7obsbb.jpg"
        alt="privacy meme"
        borderRadius="lg"
      />
      <a
        href="https://github.com/oceans404/vc-verifier"
        target="_blank"
        rel="noreferrer"
      >
        Fork this code to build your own VC gated app, dapp, or website{" "}
        <ExternalLinkIcon />
      </a>
    </div>
  );
}

export default VcGatedContent;
