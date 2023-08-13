import Breadcrumb from "@/components/shared/Breadcrumb";
import { RoomInfo } from "@/requests/rooms";

type RoomBreadcrumbType = {
  roomInfo: RoomInfo.Room;
};

function RoomBreadcrumb({ roomInfo }: RoomBreadcrumbType) {
  const isPublicText = (roomInfo.isLocked ? "非公開" : "公開") + "遊戲房間";
  const maxPlayerText = `${roomInfo.maxPlayers}人房`;
  const statusText =
    roomInfo.status === "WAITING" ? "等待玩家中" : "遊戲進行中";

  const combinedText = roomInfo.name + "-" + maxPlayerText + "-" + statusText;
  return (
    <Breadcrumb className="text-white">
      <Breadcrumb.Item text={isPublicText} href="/rooms" />
      <Breadcrumb.Item text={combinedText} href="" />
    </Breadcrumb>
  );
}

export default RoomBreadcrumb;
