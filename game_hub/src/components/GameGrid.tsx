import React from "react";
import { SimpleGrid, Text } from "@chakra-ui/react";

import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import useData from "../hooks/useData";
import { Genre } from "./GenreList";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

interface Props {
  selectedGenre: Genre | null;
  selectedPlatform: Platform | null;
  orderBy: { value: string; label: string } | null;
  searchBy: string | "";
}

const GameGrid = ({
  selectedGenre,
  selectedPlatform,
  orderBy,
  searchBy,
}: Props) => {
  orderBy;
  const { data, error, isLoading } = useData<Game>(
    "/games",
    {
      params: {
        genres: selectedGenre?.id,
        platforms: selectedPlatform?.id,
        ordering: orderBy?.value,
        search: searchBy,
      },
    },
    [selectedGenre?.id, selectedPlatform?.id, orderBy?.value, searchBy]
  );
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <React.Fragment>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={10}
        paddingTop={4}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {data.map((game, index) => (
          <GameCardContainer key={index}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </React.Fragment>
  );
};

export default GameGrid;
