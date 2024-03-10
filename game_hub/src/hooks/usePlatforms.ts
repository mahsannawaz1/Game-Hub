import { useQuery } from "@tanstack/react-query"
import { FetchResponse } from "../services/api-client"
import { Platform } from "../components/GameGrid"
import apiClient from "../services/api-client"
import platforms from "../data/platforms"

const usePlatforms = (endpoint:string) => {
    return  useQuery({
        queryKey:['platforms'],
        queryFn: () => apiClient.get<FetchResponse<Platform>>(endpoint).then(res=>res.data),
        staleTime: 24 * 60 * 60 * 1000, // 1 Day
        initialData: {count:platforms.length,results:platforms}
        
    })
}

export default usePlatforms