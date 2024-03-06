import { Game } from "../hooks/useGames";
import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const GameCard = ({
  game: { id, name, background_image, parent_platforms },
}: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={background_image} />
      <CardBody>
        <Heading fontSize="2xl">{name}</Heading>
        <PlatformIconList
          platforms={parent_platforms.map(({ platform }) => platform)}
        />
      </CardBody>
    </Card>
  );
};

export default GameCard;
