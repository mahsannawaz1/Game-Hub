import { useQuery } from "@tanstack/react-query"
import apiClient from "../services/api-client"
import { Genre } from "../components/GenreList";
import { FetchResponse } from "../services/api-client"
import genres from "../data/genres";


const useGenres = (endpoint:string) => {
      return  useQuery({
            queryKey:['genres'],
            queryFn: () => apiClient.get<FetchResponse<Genre>>(endpoint).then(res=>res.data),
            staleTime: 24 * 60 * 60 * 1000, // 1 Day
            initialData: { count:genres.length,results:genres }
            
        })
}

export default useGenres