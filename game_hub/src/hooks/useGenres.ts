import { useQuery } from "@tanstack/react-query"
import genres from "../data/genres";
import APIService from "../services/api-service";
import { Genre } from "../components/GenreList";
import ms from "ms";

const apiService = new APIService<Genre>("/genres")

const useGenres = () => {
      return  useQuery({
            queryKey:['genres'],
            queryFn: () => apiService.getData(),
            staleTime: ms("24h"),
            initialData: { count:genres.length,results:genres,next:null }
            
        })
}

export default useGenres