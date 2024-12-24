import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Socket } from "socket.io-client";

interface Props {
  message:
    | {
        message: string;
        lobby_id: string;
        id: string;
        author_id: string;
        name: string;
      }
    | undefined;

  display: {
    name: string;
    id: string;
  };
  config: {
    headers: {
      Authorization: string;
    };
  };
  LobbyId: string;
  adminId: string;
  socket: Socket;
  setMessages: React.Dispatch<
    React.SetStateAction<
      {
        message: string;
        lobby_id: string;
        id: string;
        author_id: string;
        name: string;
      }[]
    >
  >;
  messages: {
    message: string;
    lobby_id: string;
    id: string;
    author_id: string;
    name: string;
  }[];
}

const EachMessage: React.FC<Props> = ({
  display,
  message,
  config,
  LobbyId,
  adminId,
  socket,
  messages,
  setMessages,
}) => {
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

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = e.currentTarget.id;
    if (adminId !== display.id) {
      axios
        .delete("http://localhost:5000/api/lobby/message/" + id, config)
        .then((res) => {
          if (res.data === "message deleted") {
            socket.emit("delete-message", message);
          }
        });
    }
    if (adminId === display.id) {
      axios
        .delete(
          "http://localhost:5000/api/admin/message/" + id + "/" + LobbyId,
          config
        )
        .then((res) => {
          if (res.data === "message deleted") {
            socket.emit("delete-message", message);
          }
        });
    }
  }

  function handleUpdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id =
      e.currentTarget.parentElement?.parentElement?.parentElement?.id;
    console.log(id);

    if (adminId !== display.id) {
      axios
        .patch(
          "http://localhost:5000/api/lobby/message/" + id,
          {
            message: input,
          },
          config
        )
        .then((res) => {
          if (
            res.data !==
            "this message doesn't exist or only admin can change this message"
          ) {
            socket.emit("update-message", res.data);
          }
        });
    }

    if (adminId === display.id) {
      axios
        .patch(
          "http://localhost:5000/api/admin/message/" + id + "/" + LobbyId,
          {
            message: input,
          },
          config
        )
        .then((res) => {
          if (res.data !== "this message doesn't exist") {
            socket.emit("update-message", res.data);
          }
        });
    }
    setActive((current) => !current);
  }


  return (
    <>
      <div
        className={
          display.id === message?.author_id ? "own-message" : "message"
        }
        id={message?.id}
      >

        
          <div className="left">
            <p className="username">{message?.name}</p>
            <p className={active === true ? "hide" : "display"}>
              {message?.message}
            </p>
            <div className="change-message">
              <input
                type="text"
                className={active === true ? "display-input" : "hide"}
                onChange={handleChange}
                defaultValue={message?.message}
                
              />
              <button
                className={active === true ? "display-button" : "hide"}
                onClick={handleUpdate}
              >
                <FontAwesomeIcon icon={faPlay} />
              </button>
            </div>
          </div>
          {(display.id===adminId || display.id===message?.author_id)&&
          
          <div className="right" id={message?.id}>
            <button className="dots" onClick={() => setClicked(!clicked)}>
              <p>...</p>
            </button>

            {clicked && (
              <div className="hovered">
                <button
                  className={active === true ? "hide" : "display"}
                  onClick={handleClick}
                >
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
