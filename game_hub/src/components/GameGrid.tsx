import React from "react";
import { Box, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { Genre } from "./GenreList";
import InfiniteScroll from "react-infinite-scroll-component";
import useGames from "../hooks/useGames";

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

  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames(
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

  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <React.Fragment>
      {error && <Text>{error.message}</Text>}
      <InfiniteScroll
        dataLength={fetchedGamesCount}
        hasMore={hasNextPage}
        next={() => fetchNextPage()}
        loader={
          <Box margin="auto" marginTop={4} width="0%">
            <Spinner />
          </Box>
        }
      >
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
      </InfiniteScroll>
    </React.Fragment>
  );
};

export default GameGrid;
