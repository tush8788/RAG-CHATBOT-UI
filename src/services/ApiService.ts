import BaseService from "./BaseService";

async function fetchData(params:any):Promise<Response>{
    try{
        const response:Response = await BaseService(params)
        return response
    }
    catch(err){
        throw err
    }
}

export default fetchData