"use client";

import { Image } from "@nextui-org/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { getUserInfo, logout } from "@/api/login";
import { useUserStore } from "@/providers/user-store-provider";
import { User } from "@/store/user";

export default function Home() {
  const [userInfo, setUserInfo] = useState<User | any>({});
  const { setUser } = useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      user: state.user,
    }))
  );
  const router = useRouter();
  const handleGetUserInfo = async () => {
    const res = await getUserInfo();
    if (!res?.user?.id) {
      router.push("/login");
      return;
    }
    setUser(res);
    setUserInfo(res.user);
  };

  const handleLogout = async () => {
    logout().then(() => {
      router.push("/login");
    });
  };

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  if (!userInfo?.id) return <div>loading...</div>;

  return (
    <div className="w-screen h-screen bg-red-300 flex flex-col">
      <header className="flex h-12 w-full  items-center justify-between px-8">
        <div className="text-white  text-lg">next</div>
        <div className="flex items-center gap-2">
          <Dropdown className=" bg-white">
            <DropdownTrigger>
              {userInfo?.avatar ? (
                <Image
                  width={32}
                  height={32}
                  src={userInfo.avatar}
                  alt="next"
                  className="opacity-100"
                ></Image>
              ) : (
                <Image
                  width={32}
                  height={32}
                  src="https://nextui.org/images/album-cover.png"
                  alt="next"
                  className="opacity-100"
                ></Image>
              )}
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                onPress={handleLogout}
              >
                退出登录
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <span className="text-white  text-lg">
            {userInfo?.nickName || userInfo?.userName || "我是奶龙"}
          </span>
        </div>
      </header>
      <main className="flex  flex-col items-center justify-center gap-4 flex-1">
        <div className="text-white text-2xl">
          {userInfo?.id ? "Welcome to Next.js!" : "Hello Next"}
        </div>
      </main>
    </div>
  );
}
