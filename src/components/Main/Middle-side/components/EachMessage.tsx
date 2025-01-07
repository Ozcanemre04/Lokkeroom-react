import React, { memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Socket } from "socket.io-client";
import axiosInstance from "../../../../Interceptor/axiosInstance";
import { IMessage } from "../../../../Interface/IMessage";
import { IDisplay } from "../../../../Interface/IDisplay";

interface Props {
  message:IMessage;
  display: IDisplay|null
  LobbyId: string;
  adminId: string;
  socket: Socket;
}

const EachMessage: React.FC<Props> = ({display,message,LobbyId,adminId,socket}) => {
  const [active, setActive] = useState(false);
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInput(e.target.value);
  }

  function handleClick() {
    setActive((current) => !current);
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = e.currentTarget.id;
     await axiosInstance.delete(adminId !== display?.id?`api/lobby/message/${id}`:`api/admin/message/${id}/${LobbyId}`)
        .then((res) => {
          if (res.data === "message deleted") {
            socket.emit("delete-message", message);
          }
        });
  }

  async function handleUpdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = e.currentTarget.parentElement?.parentElement?.parentElement?.id;
       await axiosInstance.patch(adminId !== display?.id?`api/lobby/message/${id}`:`api/admin/message/${id}/${LobbyId}`,{message: input})
        .then((res) => {
          if (res.data !=="this message doesn't exist or only admin can change this message" ||res.data !== "this message doesn't exist") {
            socket.emit("update-message", res.data);
          }
        });
    setActive((current) => !current);
  }

  return (
    <>
      <div
        className={display?.id === message?.author_id ? "own-message" : "message"} id={message?.id}>
        <div className="left">
          <p className="username">{message?.name}</p>
          <p className={active === true ? "hide" : "display"}>
            {message?.message}
          </p>
          <div className="change-message">
            <input type="text" className={active === true ? "display-input" : "hide"} onChange={handleChange}
              defaultValue={message?.message}/>
            <button className={active === true ? "display-button" : "hide"} onClick={handleUpdate}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </div>
        </div>

        {(display?.id === adminId || display?.id === message?.author_id) &&
          <div className="right" id={message?.id}>
            <button className="dots" onClick={() => setClicked(!clicked)}>
              <p>...</p>
            </button>

            {clicked && (
              <div className="hovered">
                <button className={active === true ? "hide" : "display"} onClick={handleClick}>
                  <span>
                    <FontAwesomeIcon icon={faPencil} />
                  </span>
                  <p>update</p>
                </button>
                <button onClick={handleDelete} id={message?.id}>
                  <span>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                  <p>delete</p>
                </button>
              </div>
            )}
          </div>
        }

      </div>
    </>
  );
};

export default memo(EachMessage);
