import { createContext } from "react";
import { Socket } from "socket.io-client";

type StoreContextType = {
  socket: null | Socket;
};

export const SOCKET_URL = "/api/internal/socketio";

export enum SOCKET_EVENT {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  CHATROOM_JOIN = "CHATROOM_JOIN",
  CHATROOM_LEAVE = "CHATROOM_LEAVE",
  CHAT_MESSAGE = "CHAT_MESSAGE",
  USER_JOINED = "USER_JOINED",
  USER_LEFT = "USER_LEFT",
  USER_READY = "USER_READY",
  USER_NOT_READY = "USER_NOT_READY",
  GAME_STARTED = "GAME_STARTED",
  GAME_ENDED = "GAME_ENDED",
  HOST_CHANGED = "HOST_CHANGED",
  ROOM_CLOSED = "ROOM_CLOSED",
}

const SocketContext = createContext<StoreContextType>({
  socket: null,
});

export default SocketContext;
