import { useState } from "react";
import Icon, { IconName } from "@/components/shared/Icon";
import Badge from "@/components/shared/Badge";
import { cn } from "@/lib/utils";
import { UserInfoForm } from "@/features/user";
import useAuth from "@/hooks/context/useAuth";
import Modal from "./Modal";
import Image from "./Image";

enum HeaderActions {
  CHAT = "CHAT",
  NOTIFICATION = "NOTIFICATION",
  PROFILE = "PROFILE",
}

interface ButtonProps {
  type: HeaderActions;
  iconName: IconName;
  isActive: boolean;
  onClick: () => void;
}

interface HeaderProps {
  className?: string;
  isChatVisible: boolean;
  onClickChatButton: () => void;
}

export default function Header({
  className,
  isChatVisible,
  onClickChatButton,
}: Readonly<HeaderProps>) {
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);
  const { currentUser } = useAuth();

  const buttons: ButtonProps[] = [
    {
      iconName: "Chat",
      type: HeaderActions.CHAT,
      isActive: isChatVisible,
      onClick: onClickChatButton,
    },
    {
      iconName: "Notification",
      type: HeaderActions.NOTIFICATION,
      isActive: false,
      onClick: () => {},
    },
    {
      iconName: "Player",
      type: HeaderActions.PROFILE,
      isActive: isUserInfoVisible,
      onClick: () => {
        setIsUserInfoVisible(true);
      },
    },
  ];

  return (
    <header
      className={cn(
        "flex items-center justify-between px-6 py-2 bg-white/8 glass-shadow backdrop-blur-3xl",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="logo" width={40} height={40} priority />
        <h2 className="text-primary-100 text-2xl">遊戲微服務大平台</h2>
      </div>
      <div className="header___actions flex gap-5">
        {buttons.map(({ type, iconName, isActive, onClick }) => (
          <Badge
            dot
            key={type}
            placement="top-right"
            className={cn("top-1 right-1")}
          >
            <button
              className={cn("p-2.5", isActive && "text-white")}
              onClick={onClick}
            >
              <Icon name={iconName} className="w-5 h-5" />
            </button>
          </Badge>
        ))}
      </div>
      {isUserInfoVisible && currentUser && (
        <Modal
          title="修改暱稱"
          isOpen={isUserInfoVisible}
          onClose={() => setIsUserInfoVisible(false)}
          size="medium"
        >
          <UserInfoForm
            userInfo={currentUser}
            onCancel={() => setIsUserInfoVisible(false)}
            onSuccess={() => setIsUserInfoVisible(false)}
          />
        </Modal>
      )}
    </header>
  );
}
