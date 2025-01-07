import { useEffect} from "react"
import { Socket } from "socket.io-client";
import { IMessage } from "../Interface/IMessage";

const useMessageSocket = (socket:Socket,setMessages:React.Dispatch<React.SetStateAction<IMessage[]|null >>) =>{
   
   useEffect(()=>{
    socket.on("deleted-message", deletedMsg => {
        setMessages((prev) => (prev?prev.filter(x => x.id !== deletedMsg.id):[]));
      })
      socket.on("updated-message", (updatedMsg: { message: string, author_id: string, name: string, id: string, lobby_id: string }) => {
        setMessages((prev) =>{
          if(!prev) return []
          return prev.map((item) => item.id === updatedMsg.id ? { ...item, message: updatedMsg.message } : item)
        }
      );
  
      })
      return () => {
        socket.off("deleted-message");
        socket.off("updated-message");
        
      }  
   },[])

   return {};
}

export default useMessageSocket;