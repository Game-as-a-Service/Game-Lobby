import { AppProps } from "next/app";
import { NextPage } from "next";
import { FC, PropsWithChildren, ReactElement } from "react";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";

import "@/styles/reset.css";
import "@/styles/global.css";
import "@/scripts/whyDidYouRender";

import AxiosProvider from "@/containers/provider/AxiosProvider";
import AppLayout from "@/containers/layout/AppLayout";
import AuthProvider from "@/containers/provider/AuthProvider";
import Startup from "@/containers/util/Startup";
import HistoryProvider from "@/containers/provider/HistoryProvider";
import HistoryList from "@/components/util/history/HistoryList";
import { Env, getEnv } from "@/lib/env";
import { ToastQueueProvider } from "@/components/shared/Toast";
import { SocketProvider } from "@/containers/provider/SocketProvider";
import ChatroomContextProvider from "@/containers/provider/ChatroomProvider";

export type NextPageWithProps<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: FC<PropsWithChildren>;
  Anonymous?: boolean;
};

type AppWithProps = AppProps & {
  Component: NextPageWithProps;
};

function App({ Component, pageProps }: AppWithProps) {
  const { env } = getEnv();
  const isAnonymous =
    Component.Anonymous || !!process.env.NEXT_PUBLIC_CI_MODE || false;
  const isProduction = env !== Env.PROD ? false : true;

  const Layout = Component.getLayout ?? AppLayout;

  const getHistory = (children: ReactElement) => {
    return isProduction ? (
      children
    ) : (
      <HistoryProvider>{children}</HistoryProvider>
    );
  };

  return (
    <>
      <Head>
        <title>遊戲微服務大平台</title>
      </Head>
      <ToastQueueProvider>
        <AxiosProvider>
          <AuthProvider>
            {getHistory(
              <SocketProvider>
                <ChatroomContextProvider>
                  <Startup isAnonymous={isAnonymous}>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                    {!isProduction && <HistoryList />}
                  </Startup>
                </ChatroomContextProvider>
              </SocketProvider>
            )}
          </AuthProvider>
        </AxiosProvider>
      </ToastQueueProvider>
    </>
  );
}

export default appWithTranslation(App);
