import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Text } from "@chakra-ui/react";

interface Game {
  id: number;
  name: string;
}

interface FetchGamesResponse {
  count: number;
  previous?: string;
  next?: string;
  results: Game[];
}

const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>(`/games`)
      .then((res) => setGames(res.data.results))
      .catch((err: Error) => setError(err.message));
  }, []);

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
