import useData from "../hooks/useData";

interface Genre {
  id: number;
  name: string;
}

const GenreList = () => {
  const { data, error, isLoading } = useData<Genre>("/genres");
  console.log(data);
  return <div>GenreList</div>;
};

export default GenreList;
