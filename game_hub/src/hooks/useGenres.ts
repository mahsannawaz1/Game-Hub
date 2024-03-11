import { useQuery } from "@tanstack/react-query"
import genres from "../data/genres";
import APIService from "../services/api-service";
import { Genre } from "../components/GenreList";

const apiService = new APIService<Genre>("/genres")

const useGenres = (endpoint:string) => {
      return  useQuery({
            queryKey:['genres'],
            queryFn: () => apiService.getData(),
            staleTime: 24 * 60 * 60 * 1000, // 1 Day
            initialData: { count:genres.length,results:genres,next:null }
            
        })
}

export default useGenres