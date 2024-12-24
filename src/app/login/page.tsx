"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import GithubIcon from "@/components/Icons/GiteeIcon";
import WeChatIcon from "@/components/Icons/WeChatIcon";
import { useEffect, useState } from "react";
import { checkLogin, login } from "@/api/login";
import { useRouter } from "next/navigation";
import { CLIENT_ID, REDIRECT_URL } from "@/common/constant";
export default function Login() {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    setIsLoading(true);
    const res = await login(userName);
    if (res.status === 200) {
      setIsLoading(false);
      router.push("/");
    } else {
      setIsLoading(false);
    }
  };

  const performCheckLogin = async () => {
    try {
      await checkLogin();
    } catch (error) {
      console.error("Error checking login:", error);
    }
  };

  useEffect(() => {
    performCheckLogin();
  }, []);

  return (
    <div className="h-screen w-screen bg-[#e5e1ec] flex justify-center items-center">
      <div className="w-[500px] h-[500px] min-h-[540px] bg-white rounded-xl px-24 pt-10 flex flex-col gap-5">
        <div className="mt-9 flex flex-col gap-4 justify-center items-center">
          <h1 className="text-lg font-bold text-black">登录你的账号</h1>
          <div className="flex flex-col gap-4 items-center justify-center">
            <Input
              label="邮箱"
              type="email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              size="md"
              className="w-[400px] h-[44px] border-[#c4c7c7] rounded-md border-1 border-solid"
              classNames={{
                label: "text-black",
                inputWrapper: ["bg-white"],
              }}
            />
            <Button
              onPress={handleLogin}
              isLoading={isLoading}
              className="w-[400px] h-[44px] bg-indigo-600 text-white"
            >
              登录
            </Button>
          </div>
          <Divider className="mt-8 w-[400px]" />
          <div className="mt-2 flex flex-col justify-center items-center gap-2">
            <h3 className="text-black">第三方登录</h3>
            <div className="flex flex-col justify-center items-center gap-4">
              <Button
                startContent={<GithubIcon />}
                className="w-[400px] h-[44px] tracking-wider hover:bg-[#fafafa] bg-white border-[#c4c7c7] border-1 border-solid"
                onPress={() => {
                  window.open(
                    `https://gitee.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`
                  );
                }}
              >
                通过Gitee继续
              </Button>
              <Button
                startContent={<WeChatIcon />}
                className="w-[400px] h-[44px] tracking-wider hover:bg-[#fafafa] bg-white border-[#c4c7c7] border-1 border-solid"
              >
                通过微信继续
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
