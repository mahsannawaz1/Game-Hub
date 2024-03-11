import { AxiosRequestConfig } from "axios"
import { useQuery } from "@tanstack/react-query"
import { Game, QueryKeys } from "../components/GameGrid"
import APIService from "../services/api-service";

const apiService = new APIService<Game>("/games")

const useGames = (requestConfig?:AxiosRequestConfig,queryKeys?:QueryKeys) => {
    
    return  useQuery({
        queryKey:['games',queryKeys],
        queryFn: () => apiService.getData(requestConfig)

    })
}

export default useGames