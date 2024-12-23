"use client";
import { useUserStore } from "@/store/user";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { getUserInfo } from "@/api/login";

export default function Home() {
  const [userInfo, setUserInfo] = useState<any>({});
  const { setUser } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser,
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
    console.log(res.user);
  };

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  if (!userInfo?.id) {
    return null;
  }

  return (
    <div className="w-screen h-screen bg-red-300 flex flex-col">
      <header className="flex h-12 w-full  items-center justify-between px-8">
        <div className="text-white  text-lg">next</div>
        <div className="flex items-center gap-2">
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
          <span className="text-white  text-lg">
            {userInfo?.userName || ""}
          </span>
        </div>
      </header>
      <main className="flex  flex-col items-center justify-center gap-4 flex-1">
        <div className="text-white text-2xl">Welcome to Next.js!</div>
      </main>
    </div>
  );
}
