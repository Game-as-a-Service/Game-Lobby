import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

import "@/styles/reset.css";
import "@/styles/global.css";

import AxiosProvider from "@/containers/provider/AxiosProvider";
import AppLayout from "@/containers/layout/AppLayout";
import ModalManager from "@/components/shared/Modal/ModalManager";
import AuthProvider from "@/containers/provider/AuthProvider";
import Startup from "@/containers/util/Startup";
import { ToastQueueProvider } from "@/components/shared/Toast";

export type NextPageWithProps<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  Anonymous?: boolean;
};

type AppWithProps = AppProps & {
  Component: NextPageWithProps;
};

export default function App({ Component, pageProps }: AppWithProps) {
  const isAnonymous = Component.Anonymous || false;

  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => <AppLayout>{page}</AppLayout>);

  return (
    <ToastQueueProvider>
      <ModalManager.Provider>
        <AxiosProvider>
          <AuthProvider>
            <Startup isAnonymous={isAnonymous}>
              {getLayout(<Component {...pageProps} />)}
            </Startup>
          </AuthProvider>
        </AxiosProvider>
      </ModalManager.Provider>
    </ToastQueueProvider>
  );
}
