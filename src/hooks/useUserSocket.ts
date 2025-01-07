import { useEffect} from "react"
import { Socket } from "socket.io-client";
import { IUser } from "../Interface/IUser";

const useUserSocket = (socket:Socket,setAllUser:React.Dispatch<React.SetStateAction<IUser[]|null >>) =>{
   
   useEffect(()=>{
    socket.on("user-added", user => {
        setAllUser((prev) => (prev?[...prev, user]:[user]))
      })
      socket.on("user-deleted", user => {
        setAllUser((prev) => (prev?prev.filter(x => x.id !== user):[]))
      })
      return () => {
        socket.off("user-added");
        socket.off("user-deleted");
      }
   },[])

   return {};
}

export default useUserSocket;