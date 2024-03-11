import React from "react";
import { Box, Button, Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { Genre } from "./GenreList";
import useGames1 from "../hooks/useGames";

export interface QueryKeys {
  genre: number | undefined;
  platform: number | undefined;
  orderBy: string | undefined;
  search: string | null;
}

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
  const skeletons = [1, 2, 3, 4, 5, 6];

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGames1(
    {
      params: {
        genres: selectedGenre?.id,
        parent_platforms: selectedPlatform?.id,
        ordering: orderBy?.value,
        search: searchBy,
      },
    },
    {
      genre: selectedGenre?.id,
      platform: selectedPlatform?.id,
      orderBy: orderBy?.value,
      search: searchBy,
    }
  );

  return (
    <React.Fragment>
      {error && <Text>{error.message}</Text>}
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

        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((game) => (
              <GameCardContainer key={game.id}>
                <GameCard game={game} />
              </GameCardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>

      <Flex justifyContent="center" marginTop={3}>
        <Box>
          <Box display="flex" justifyContent="center">
            {isFetchingNextPage && <Spinner />}
          </Box>
          {!isFetchingNextPage && hasNextPage && (
            <Button onClick={() => fetchNextPage()}>Load More</Button>
          )}
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default GameGrid;
