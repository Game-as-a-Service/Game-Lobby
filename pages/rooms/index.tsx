import { useState } from "react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "@/components/shared/Image";
import Modal from "@/components/shared/Modal";
import Tabs, { TabItemType } from "@/components/shared/Tabs";
import { useGameList } from "@/features/game";
import { JoinLockRoomForm, RoomCard } from "@/features/room";
import usePagination from "@/hooks/usePagination";
import useRequest from "@/hooks/useRequest";
import { Room, RoomType, getRooms } from "@/requests/rooms";

function TabPaneContent({ tabKey }: Readonly<TabItemType<RoomType>>) {
  const { fetch } = useRequest();
  const gameList = useGameList();
  const [room, setRoom] = useState<Room | null>(null);

  const { data, loading } = usePagination({
    source: (page: number, perPage: number) =>
      fetch(getRooms({ page, perPage, status: tabKey })),
    defaultPerPage: 20,
  });

  if (loading) return <div className="my-5">Loading...</div>;

  return (
    <>
      <ul className="grid grid-cols-3 gap-5 my-5">
        {Array.isArray(data) &&
          data
            .map((room) => ({
              ...room,
              game: {
                ...room.game,
                imgUrl:
                  gameList.find((game) => game.id === room.game.id)?.img || "",
              },
            }))
            .map((room) => (
              <li key={room.id}>
                <RoomCard room={room} onClick={() => setRoom(room)} />
              </li>
            ))}
      </ul>

      <Modal
        title="私人房間"
        isOpen={!!room?.isLocked}
        onClose={() => setRoom(null)}
        size="medium"
      >
        {room && (
          <JoinLockRoomForm id={room.id}>
            <div className="flex mb-4 gap-4 text-primary-50">
              <Image
                className="w-12 h-12 rounded-lg object-cover"
                src={room.game.imgUrl}
                alt={room.game.name}
                width={48}
                height={48}
              />
              <div className="overflow-hidden">
                <h3 className="truncate">{room.game.name}</h3>
                <h4 className="truncate">{room.name}</h4>
              </div>
            </div>
          </JoinLockRoomForm>
        )}
      </Modal>
    </>
  );
}

const Rooms = () => {
  const { t } = useTranslation();

  const tabs: TabItemType<RoomType>[] = [
    {
      tabKey: RoomType.WAITING,
      label: t("rooms_waiting"),
    },
    {
      tabKey: RoomType.PLAYING,
      label: t("rooms_playing"),
    },
  ];

  return (
    <div className="pb-5 px-6">
      <Tabs
        tabs={tabs}
        defaultActiveKey={RoomType.WAITING}
        renderTabPaneContent={TabPaneContent}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW")),
    },
  };
};

export default Rooms;
