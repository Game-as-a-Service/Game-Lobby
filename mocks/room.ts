import { Room, RoomType, RoomInfo } from "@/requests/rooms";

const mock_genRoom = (id: string, status: RoomType): Room => ({
  id,
  name: `[${id}] - ${status} room`,
  game: {
    id: "mock game id",
    name: "好玩的遊戲",
    imgUrl: "http://localhost:3030/images/game-avatar.jpg",
  },
  host: {
    id: "mock user id",
    nickname: "mock user name",
  },
  minPlayers: 1,
  maxPlayers: 8,
  isLocked: Number(id) % 2 === 1,
  currentPlayers: Number(id) % 3 ? 8 : 3,
});

const mock_genRooms = {
  [RoomType.PLAYING]: new Array(100)
    .fill(undefined)
    .map((_, index) => mock_genRoom(index.toString(), RoomType.PLAYING)),
  [RoomType.WAITING]: new Array(100)
    .fill(undefined)
    .map((_, index) => mock_genRoom(index.toString(), RoomType.WAITING)),
};

export const mock_rooms = (status: RoomType) => {
  return mock_genRooms[status];
};

export const mock_createRoomResponse: Room = {
  id: "3345678",
  name: "銀河路跑2v2",
  game: {
    id: "456",
    name: "銀河路跑",
    imgUrl: "/undefined",
  },
  host: {
    id: "mock-currentUser-uid",
    nickname: "mock currentUser",
  },
  isLocked: false,
  currentPlayers: 1,
  minPlayers: 2,
  maxPlayers: 7,
};

export const mock_roomInfo: RoomInfo.Room = {
  id: "3345678",
  name: "銀河路跑2v2",
  status: "WAITING",
  game: { id: "456", name: "銀河路跑" },
  host: {
    id: "mock-currentUser-uid",
    nickname: "mock currentUser",
    isReady: true,
  },
  isLocked: false,
  players: [
    {
      id: "mock-currentUser-uid",
      nickname: "mock currentUser",
      isReady: true,
    },
    {
      id: "mock-currentUser-uid-b",
      nickname: "mock user B",
      isReady: true,
    },
    {
      id: "mock-currentUser-uid-c",
      nickname: "mock user C",
      isReady: true,
    },
  ],
  currentPlayers: 1,
  minPlayers: 2,
  maxPlayers: 7,
};
