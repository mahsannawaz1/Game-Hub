import { useQuery } from "@tanstack/react-query"
import { Platform } from "../components/GameGrid"
import platforms from "../data/platforms"
import APIService from "../services/api-service"

const apiService = new APIService<Platform>("/platforms/lists/parents")

const usePlatforms = (endpoint:string) => {
    return  useQuery({
        queryKey:['platforms'],
        queryFn: () => apiService.getData(),
        staleTime: 24 * 60 * 60 * 1000, // 1 Day
        initialData: {count:platforms.length,results:platforms}
        
    })
}

export default usePlatforms