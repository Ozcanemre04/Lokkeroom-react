import { useEffect} from "react"
import { Socket } from "socket.io-client";
import { IUser } from "../Interface/IUser";
import { ILobby } from "../Interface/ILobby";
import { IAdminLobby } from "../Interface/IAdminLobby";

const useLobbySocket = (socket:Socket,
    setAlllobby:React.Dispatch<React.SetStateAction<ILobby[]|null >>,
    setAdminLobby:React.Dispatch<React.SetStateAction<IAdminLobby[]|null >>,
    setLobbyId:React.Dispatch<React.SetStateAction<string>>,    
) =>{
   
   useEffect(()=>{
    socket.on("not-admin-lobby", lobby => {
          setAlllobby((prev) => (prev? [...prev, lobby]:[lobby]))
        })
        socket.on("not-admin-lobby-deleted", lobby => {
          setAlllobby((prev) => (prev? prev.filter(x => x.lobby_id !== lobby):[]))
          setLobbyId("")
        })
          socket.on("receive-lobby", lobby => {
            setAdminLobby((prev) => (prev?[...prev, lobby]:[lobby]))
          })
          socket.on("lobby-deleted", lobby => {
            setAdminLobby((prev) => (prev? prev.filter(x => x.id !== lobby.id):[]))
            setAlllobby((prev) => (prev? prev.filter(x => x.lobby_id !== lobby.id):[]))
            setLobbyId("")
          })
         
          return () => {
            socket.off("receive-lobby");
            socket.off("not-admin-lobby");
            socket.off("not-admin-lobby-deleted");
            socket.off("lobby-deleted");
          }
      
   },[])

   return {};
}

export default useLobbySocket;