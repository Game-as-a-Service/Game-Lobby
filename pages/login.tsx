import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

import ButtonV2, { ButtonVariant } from "@/components/shared/Button/v2";
import Image from "@/components/shared/Image";
import Icon, { IconName } from "@/components/shared/Icon";

import useAuth from "@/hooks/context/useAuth";
import useUser from "@/hooks/useUser";
import { getEnv } from "@/lib/env";
import { LoginType } from "@/requests/auth";

import { NextPageWithProps } from "./_app";
import { BoxFancy } from "@/components/shared/BoxFancy";

const loginMethods: { text: string; type: LoginType; icon: IconName }[] = [
  { text: "Google 帳號登入", type: LoginType.GOOGLE, icon: "Google" },
  { text: "GitHub 帳號登入", type: LoginType.GITHUB, icon: "Github" },
  { text: "LinkedIn 帳號登入", type: LoginType.LINKEDIN, icon: "Linkedin" },
  { text: "Discord 帳號登入", type: LoginType.DISCORD, icon: "Discord" },
];

const Login: NextPageWithProps = () => {
  const { getLoginEndpoint } = useUser();
  const { token } = useAuth();
  const router = useRouter();
  const [checkAuth, setCheckAuth] = useState(false);
  const { internalEndpoint, isMock } = getEnv();

  useEffect(() => {
    if (token) {
      router.push("/");
    } else {
      setCheckAuth(true);
    }
  }, [token, router]);

  const onLoginClick = async (e: SyntheticEvent, type: LoginType) => {
    if (isMock) {
      e.preventDefault();
      e.stopPropagation();

      const endpoint = await getLoginEndpoint(type);
      router.push(endpoint.url);
    }
  };

  return checkAuth ? (
    <div className="relative w-full h-full flex flex-col xl:flex-row justify-between items-center p-4 gap-[18px]">
      <div className="absolute xl:-top-5 xl:-right-5 xl:w-[58%] xl:h-[calc(100%+40px)] rounded-2xl gradient-light shadow blur-[20px]" />
      <div className="px-2 sm:px-6 xl:pl-24 2xl:px-24 flex-1 flex flex-col justify-center items-start">
        <h2 className="relative flex items-center gap-2 text-2xl font-normal text-primary-100 mb-12">
          <Image src="/logo.png" alt="logo" width={48} height={48} priority />
          遊戲微服務大平台
        </h2>
        <p className="text-primary-50 text-3xl font-medium mb-4">
          一起創造與冒險！
        </p>
        <p className="text-primary-50 text-2xl font-normal">
          加入遊戲微服務大平台，和100+遊戲開發者共同創建更多可能！
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center w-full px-[124px] gap-5">
        {loginMethods.map(({ text, type, icon }) => (
          <Link key={type} href={`${internalEndpoint}/login?type=${type}`}>
            <ButtonV2
              className="w-full min-w-[300px] max-w-[50%] xl:max-w-[318px] text-primary-50 flex justify-center items-center"
              variant={ButtonVariant.SECONDARY}
              onClick={(e) => onLoginClick(e, type)}
            >
              <Icon name={icon} className="w-6 h-6 stroke-none" />
              {text}
            </ButtonV2>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

Login.Anonymous = true;

Login.getLayout = ({ children }) => (
  <div className="w-screen h-screen bg-[#252558]">
    <Image
      src="/images/v2/login-bg.png"
      alt="login cover"
      className="fixed w-full h-screen bg-[#252558]"
      fill
    />
    <div className="w-full h-full flex items-center p-4 md:p-8 xl:px-36 xl:py-24">
      <BoxFancy className="container m-auto h-full xl:max-h-[calc(max(560px,75%))]">
        {children}
      </BoxFancy>
    </div>
  </div>
);

export default Login;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW")),
    },
  };
};
