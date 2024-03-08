import React from "react";
import useGenres from "../hooks/useGenres";

const GenreList = () => {
  const { genres, error, isLoading } = useGenres();
  console.log(genres);
  return <div>GenreList</div>;
};

export default GenreList;
