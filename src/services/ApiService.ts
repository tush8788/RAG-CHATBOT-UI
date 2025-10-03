import type { AxiosResponse } from "axios";
import BaseService from "./BaseService";

async function fetchData(params:any):Promise<AxiosResponse>{
    try{
        const response:AxiosResponse = await BaseService(params)
        return response
    }
    catch(err){
        throw err
    }
}

export default fetchData