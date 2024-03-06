import React from "react";
import { Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";

const GameGrid = () => {
  const { games, error } = useGames();

  return (
    <React.Fragment>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map((game, index) => (
          <React.Fragment key={index}>
            <li>{game.id}</li>
            <li>{game.name}</li>
          </React.Fragment>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default GameGrid;
