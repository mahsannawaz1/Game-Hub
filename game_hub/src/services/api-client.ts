import axios from "axios";

export interface FetchResponse<T>{
    count:number;
    next:string | null;
    results:T[]
}


export default axios.create({
    baseURL:`https://api.rawg.io/api`,
    params:{
        key:"a47cb585b42e45f48a08b6f66fd76551"
    }
})