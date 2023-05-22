import { GetStaticProps } from "next";
import { useState } from "react";

import Button from "@/shared/components/Button";
import useUser from "@/shared/hooks/useUser";
import UserInfoModal from "@/core/lobby/components/UserInfoModal";
import UpdateUserInfoModal from "@/core/lobby/components/UpdateUserInfoModal";

export default function Home() {
  const { logout } = useUser();

  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [showUpdateUserInfoModal, setShowUpdateUserInfoModal] = useState(true);

  return (
    <>
      <h1>遊戲大廳！</h1>
      <Button onClick={logout}>登出</Button>
      {showUserInfoModal && <UserInfoModal isOpen={showUserInfoModal} />}

      {showUpdateUserInfoModal && (
        <UpdateUserInfoModal isOpen={showUpdateUserInfoModal} />
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
