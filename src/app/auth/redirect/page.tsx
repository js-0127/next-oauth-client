"use client";
import { githubLogin } from "@/api/login";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
export default function Redirect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");
  
  const getTokenAndUserInfo = async (code: string) => {
    const res = await githubLogin(code);
    if (res?.status === 200) {
      router.push("/");
    }
  };
  useEffect(() => {
    if (code) {
      setTimeout(() => {
        getTokenAndUserInfo(code);
      }, 1000);
      return;
    }
  }, [code]);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-indigo-500">
      <div className="text-white text-2xl">
        您正在使用gitee登录中,请稍等......
      </div>
      ;
    </div>
  );
}
