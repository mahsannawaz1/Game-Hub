import { AxiosRequestConfig } from "axios"
import { useQuery,useInfiniteQuery } from "@tanstack/react-query"
import { Game, QueryKeys } from "../components/GameGrid"
import APIService from "../services/api-service";
import { FetchResponse } from "../services/api-client";
import ms from "ms";

const apiService = new APIService<Game>("/games")


const useGames = (requestConfig?:AxiosRequestConfig,queryKeys?:QueryKeys) => {
    
    return  useInfiniteQuery<FetchResponse<Game>,Error>({
        queryKey:['games',queryKeys],
        queryFn: ({ pageParam=1 }) => apiService.getData({...requestConfig,params:{...requestConfig?.params,page:pageParam}}),
        getNextPageParam: (lastPage,allPages)=> lastPage.next ? allPages.length + 1 : undefined,
        initialPageParam:undefined,
        staleTime: ms('24h')


    })
}

export default useGames