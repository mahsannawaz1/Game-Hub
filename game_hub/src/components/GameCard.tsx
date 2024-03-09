import { Card, CardBody, HStack, Heading, Image, Text } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/image-url";
import { Game } from "./GameGrid";

interface Props {
  game: Game;
}

const GameCard = ({
  game: { id, name, background_image, parent_platforms, metacritic },
}: Props) => {
  return (
    <Card>
      <Image maxHeight="252px" src={getCroppedImageUrl(background_image)} />
      <CardBody>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          marginBottom={3}
        >
          <PlatformIconList
            platforms={parent_platforms.map(({ platform }) => platform)}
          />
          <CriticScore score={metacritic} />
        </HStack>
        <Heading fontSize="2xl">{name}</Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
