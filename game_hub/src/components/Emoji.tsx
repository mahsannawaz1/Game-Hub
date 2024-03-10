import React from "react";
import bullseye from "../assets/bullseye.svg";
import meh from "../assets/neutral-face.svg";
import thumbsUp from "../assets/thumbs-up.svg";
import { Image, ImageProps } from "@chakra-ui/react";

interface Props {
  rating: number;
}

const Emoji = ({ rating }: Props) => {
  const emojiMap: { [key: number]: ImageProps } = {
    3: { src: meh, alt: "meh", boxSize: "25px" },
    4: { src: thumbsUp, alt: "Recommended", boxSize: "25px" },
    5: { src: bullseye, alt: "Exceptional", boxSize: "35px" },
  };

  return <Image {...emojiMap[rating]} />;
};

export default Emoji;
