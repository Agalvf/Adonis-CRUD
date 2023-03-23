import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export async function obtenerTokenAutorizacion():Promise<string>{
    let endpoint = "/api/v1/auth/login"
    let body = {
        "email": "agalvisf@gmail.co",
        "password": "123456789"
    }
    
    try {
        let axiosResponse = await axios.post(Env.get("PATH_APP") + endpoint, body)
        return axiosResponse.data["token"]  
    } catch (error) {
        throw new Error(error.message)
    }
}
