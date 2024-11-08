import type { Room } from "@/requests/rooms";

import Cover from "@/components/shared/Cover";
import Button, { ButtonSize } from "@/components/shared/Button/v2";

interface RoomsCardProps {
  room: Room;
  className?: string;
  onClick: (id: string) => void;
}

function RoomCard({ room, onClick }: RoomsCardProps) {
  const lackTotalPlayers = room.maxPlayers - room.currentPlayers;

  return (
    <div className="bg-primary-700/40 rounded-2xl">
      <div className="flex p-4 gap-4 text-primary-50">
        <Cover
          className="w-16 h-16 rounded-lg object-cover"
          src="/images/game-avatar.jpg"
          alt={room.game.name}
          width={68}
          height={68}
        />
        <div className="overflow-hidden">
          <h3 className="mb-2 text-2xl truncate">{room.game.name}</h3>
          <h4 className="text-base truncate">{room.name}</h4>
        </div>
      </div>
      <div className="flex justify-between px-4 py-2 rounded-b-2xl bg-primary-700/40 text-primary-300 overflow-hidden">
        {lackTotalPlayers > 0 ? (
          <div className="truncate">
            <span className="text-secondary-300">
              剩餘 {lackTotalPlayers} 個位置
            </span>
            <span> / {room.maxPlayers} 人</span>
          </div>
        ) : (
          <div className="truncate">人數已滿</div>
        )}
        <Button
          variant="highlight"
          size={ButtonSize.SMALL}
          onClick={() => onClick(room.id)}
        >
          加入
        </Button>
      </div>
    </div>
  );
}

export default RoomCard;
