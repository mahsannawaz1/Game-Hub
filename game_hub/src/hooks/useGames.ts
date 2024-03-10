import { AxiosRequestConfig } from "axios"
import { QueryKey, useQuery } from "@tanstack/react-query"
import apiClient from "../services/api-client"
import { FetchResponse } from "./useData"
import { Game, QueryKeys } from "../components/GameGrid"

const useGames = (endpoint:string,requestConfig?:AxiosRequestConfig,queryKeys?:QueryKeys) => {
    
    return  useQuery({
        queryKey:['games',queryKeys],
        queryFn: () => apiClient.get<FetchResponse<Game>>(endpoint, { ...requestConfig } ).then(res=>res.data),  
    })
}

export default useGames