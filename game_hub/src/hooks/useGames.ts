import { AxiosRequestConfig } from "axios"
import { useQuery,useInfiniteQuery } from "@tanstack/react-query"
import { Game, QueryKeys } from "../components/GameGrid"
import APIService from "../services/api-service";
import { FetchResponse } from "../services/api-client";

const apiService = new APIService<Game>("/games")

const useGames = (requestConfig?:AxiosRequestConfig,queryKeys?:QueryKeys) => {
    
    return  useQuery({
        queryKey:['games',queryKeys],
        queryFn: () => apiService.getData(requestConfig)

    })
}

const useGames1 = (requestConfig?:AxiosRequestConfig,queryKeys?:QueryKeys) => {
    
    return  useInfiniteQuery<FetchResponse<Game>,Error>({
        queryKey:['games',queryKeys],
        queryFn: ({ pageParam=1 }) => apiService.getData({...requestConfig,params:{...requestConfig?.params,page:pageParam}}),
        getNextPageParam: (lastPage,allPages)=> lastPage.next ? allPages.length + 1 : undefined,
        initialPageParam:undefined,
        staleTime: 24 * 60 * 60 * 1000 // 1 Day


    })
}

export default useGames1