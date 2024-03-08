import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";


interface FetchResponse<T>{
    count:number;
    results:T[]
}

const useData = <T> (endpoint:string,requestConfig?:AxiosRequestConfig,deps?:any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading,setIsLoading] = useState(false)
  
    useEffect(() => {
      setIsLoading(true)
      setData([])
      apiClient
        .get< FetchResponse<T> >( endpoint,{ ...requestConfig } )
        .then((res) => {
          setData(res.data.results)
          setIsLoading(false)
        }) 
        .catch((err: Error) => {
            if(err instanceof CanceledError) return;
            setError(err.message);
            setIsLoading(false)
        })
       
        
    }, deps ? [...deps] : []);
    return {  data,error,isLoading }
}

export default useData