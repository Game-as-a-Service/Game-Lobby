import { memo, PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Chat from "@/components/shared/Chat";
import useChat from "@/hooks/useChat";
import Head from "next/head";
import SearchBar from "@/components/shared/SearchBar";
import { useToast } from "@/components/shared/Toast";
import { GameListProvider } from "@/features/game";

function AppLayout({ children }: PropsWithChildren) {
  const toast = useToast();
  const router = useRouter();
  const {
    roomId,
    messageList,
    isChatVisible,
    openChat,
    toggleChatVisibility,
    sendChatMessage,
  } = useChat();
  const roomPathname = "/rooms/[roomId]";
  const isSearchBarVisible = ["/", "/rooms"].includes(router.pathname);

  useEffect(() => {
    if (router.pathname === roomPathname) {
      openChat();
    }
  }, [router.pathname, openChat]);

  return (
    <GameListProvider>
      <Head>
        <title>遊戲微服務大平台</title>
      </Head>
      <Header
        className="fixed top-0 inset-x-0 z-40"
        isChatVisible={isChatVisible}
        onClickChatButton={toggleChatVisibility}
      />
      <div className="pl-2 pt-20 flex grow">
        <div className="shrink-0 w-18">
          <Sidebar className="fixed top-20 bottom-6 z-30" />
        </div>
        <main className="grow pb-4 overflow-x-hidden">
          {isSearchBarVisible && (
            <div className="flex justify-center mb-6">
              <SearchBar
                onSubmit={() =>
                  toast(
                    { children: "此功能暫未實現", state: "warning" },
                    { position: "top" }
                  )
                }
                leftSlot={
                  <button
                    type="button"
                    className="pl-5 pr-2.5 px-4 text-primary-300"
                  >
                    類型
                  </button>
                }
              />
            </div>
          )}
          {children}
        </main>
        {isChatVisible && (
          <div className="shrink-0 w-80 mr-4">
            <Chat
              className="fixed top-20 bottom-6 z-30"
              roomId={roomId}
              friendList={[]}
              lobbyMessages={[]}
              roomMessages={messageList}
              defaultTarget={
                router.pathname === roomPathname ? "room" : "lobby"
              }
              onSubmit={sendChatMessage}
            />
          </div>
        )}
      </div>
    </GameListProvider>
  );
}

export default memo(AppLayout);
