import { AxiosRequestConfig } from "axios";
import apiClient, { FetchResponse } from "./api-client";


class APIService<T>{
    endpoint=""
    constructor(endpoint:string){
        this.endpoint = endpoint;
    }
    getData = (requestConfig?:AxiosRequestConfig) => {
       return apiClient.get<FetchResponse<T>>(this.endpoint,{...requestConfig}).then(res=>res.data)
    }
}

export default APIService;