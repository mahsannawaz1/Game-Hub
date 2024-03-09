import { Heading } from "@chakra-ui/react";
import React from "react";
import { GameQuery } from "../App";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  return (
    <Heading as="h1" marginBottom={3}>
      {gameQuery.genre?.name} {gameQuery.platform?.name} Games
    </Heading>
  );
};

export default GameHeading;
