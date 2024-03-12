import { useQuery } from "@tanstack/react-query"
import { Platform } from "../components/GameGrid"
import platforms from "../data/platforms"
import APIService from "../services/api-service"
import ms from "ms"

const apiService = new APIService<Platform>("/platforms/lists/parents")

const usePlatforms = () => {
    return  useQuery({
        queryKey:['platforms'],
        queryFn: () => apiService.getData(),
        staleTime: ms("24h"),
        initialData: {count:platforms.length,results:platforms,next:null}
        
    })
}

export default usePlatforms