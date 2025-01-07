import { useEffect, useState } from "react"
import axiosInstance from "../Interceptor/axiosInstance";

const useFetch = <T>(url:string,lobbyId:string|undefined) =>{
   const [data,setData] = useState<T|null>(null);
   useEffect(()=>{
    axiosInstance.get(url).
    then(res=>{
        if(lobbyId!==undefined){
            setData(res.data.result)
        }
        else{
            setData(res.data)
        }
    })    
   },[url,lobbyId])

   return {data,setData};
}

export default useFetch;