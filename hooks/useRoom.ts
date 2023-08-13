import { useReducer, useCallback } from "react";
import { RoomInfo } from "@/requests/rooms";

const initRoomInfo: RoomInfo.Room = {
  id: "",
  name: "string",
  status: "WAITING",
  game: { id: "", name: "" },
  host: { id: "", nickname: "", isReady: false },
  isLocked: false,
  players: [{ id: "", nickname: "", isReady: false }],
  currentPlayers: 0,
  minPlayers: 0,
  maxPlayers: 0,
};

const enum REDUCER_ACTION_TYPE {
  INITIALIZE_ROOM,
  ADD_PLAYER,
  REMOVE_PLAYER,
  UPDATE_HOST,
  UPDATE_ROOM_STATUS,
  TOGGLE_USER_READY_STATUS,
  CLEAN_UP_ROOM,
}

type InitializeRoomAction = {
  type: REDUCER_ACTION_TYPE.INITIALIZE_ROOM;
  payload: RoomInfo.Room;
};

type AddPlayerAction = {
  type: REDUCER_ACTION_TYPE.ADD_PLAYER;
  payload: Omit<RoomInfo.User, "isReady">;
};

type RemovePlayerAction = {
  type: REDUCER_ACTION_TYPE.REMOVE_PLAYER;
  payload: Pick<RoomInfo.User, "id">;
};

type UpdateHostAction = {
  type: REDUCER_ACTION_TYPE.UPDATE_HOST;
  payload: Pick<RoomInfo.User, "id">;
};

type UpdateRoomStatus = {
  type: REDUCER_ACTION_TYPE.UPDATE_ROOM_STATUS;
  payload: Pick<RoomInfo.Room, "status">;
};

type UpdateUserReadyStatus = {
  type: REDUCER_ACTION_TYPE.TOGGLE_USER_READY_STATUS;
  payload: Pick<RoomInfo.User, "id" | "isReady">;
};

type CleanUpRoomAction = {
  type: REDUCER_ACTION_TYPE.CLEAN_UP_ROOM;
};

type ReducerAction =
  | InitializeRoomAction
  | AddPlayerAction
  | RemovePlayerAction
  | UpdateHostAction
  | UpdateRoomStatus
  | UpdateUserReadyStatus
  | CleanUpRoomAction;

const useRoomReducer = (
  state: RoomInfo.Room,
  action: ReducerAction
): RoomInfo.Room => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INITIALIZE_ROOM: {
      return action.payload;
    }

    case REDUCER_ACTION_TYPE.ADD_PLAYER: {
      const { payload } = action;
      const nextPlayers: RoomInfo.User[] = [
        ...state.players,
        { ...payload, isReady: false },
      ];
      return {
        ...state,
        players: nextPlayers,
        currentPlayers: state.currentPlayers + 1,
      };
    }

    case REDUCER_ACTION_TYPE.REMOVE_PLAYER: {
      const { payload } = action;
      const nextPlayers: RoomInfo.User[] = state.players.filter(
        (player) => player.id !== payload.id
      );
      return {
        ...state,
        players: nextPlayers,
        currentPlayers: state.currentPlayers - 1,
      };
    }

    case REDUCER_ACTION_TYPE.UPDATE_HOST: {
      const { payload } = action;
      const nextHost = state.players.find((player) => player.id === payload.id);
      if (!nextHost)
        throw new Error("Recived invalid user id when updating host");
      return { ...state, host: nextHost };
    }

    case REDUCER_ACTION_TYPE.TOGGLE_USER_READY_STATUS: {
      const { payload } = action;
      const nextPlayers = [...state.players];
      const userIndex = nextPlayers.findIndex(
        (player) => player.id === payload.id
      );

      if (userIndex === -1)
        throw new Error("Recived invalid user id when toggling ready status.");

      nextPlayers[userIndex].isReady = !nextPlayers[userIndex].isReady;
      return {
        ...state,
        players: nextPlayers,
      };
    }

    case REDUCER_ACTION_TYPE.UPDATE_ROOM_STATUS: {
      const { payload } = action;
      return { ...state, status: payload.status };
    }

    case REDUCER_ACTION_TYPE.CLEAN_UP_ROOM: {
      return { ...initRoomInfo };
    }
    default:
      throw new Error("Invalid action type");
  }
};

export default function useRoom() {
  const [roomInfo, dispatch] = useReducer(useRoomReducer, initRoomInfo);

  const initializeRoom = useCallback((roomInfo: RoomInfo.Room) => {
    dispatch({ type: REDUCER_ACTION_TYPE.INITIALIZE_ROOM, payload: roomInfo });
  }, []);

  const addPlayer = useCallback((payload: Omit<RoomInfo.User, "isReady">) => {
    dispatch({ type: REDUCER_ACTION_TYPE.ADD_PLAYER, payload });
  }, []);

  const removePlayer = useCallback((userId: RoomInfo.User["id"]) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.REMOVE_PLAYER,
      payload: { id: userId },
    });
  }, []);

  const updateHost = useCallback((userId: RoomInfo.User["id"]) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.UPDATE_HOST,
      payload: { id: userId },
    });
  }, []);

  const updateRoomStatus = useCallback((status: RoomInfo.Room["status"]) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.UPDATE_ROOM_STATUS,
      payload: { status },
    });
  }, []);

  const toggleUserReadyStatus = useCallback(
    (userId: RoomInfo.User["id"], isReady: boolean) => {
      dispatch({
        type: REDUCER_ACTION_TYPE.TOGGLE_USER_READY_STATUS,
        payload: { id: userId, isReady },
      });
    },
    []
  );

  const cleanUpRoom = useCallback(() => {
    dispatch({ type: REDUCER_ACTION_TYPE.CLEAN_UP_ROOM });
  }, []);

  return {
    roomInfo,
    initializeRoom,
    addPlayer,
    removePlayer,
    updateHost,
    updateRoomStatus,
    toggleUserReadyStatus,
    cleanUpRoom,
  };
}
