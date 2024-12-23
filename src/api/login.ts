import request from "./request";

export const login = async (email: string) => {
  return request("http://localhost:3001/api/auth/login", {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
};

//gitee登录，获取token
export const githubLogin = async (code: string) => {
  return fetch(`http://localhost:3001/api/auth/redirect?code=${code}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
};

//获取用户信息

export const getUserInfo = async () => {
  return request("http://localhost:3001/api/auth/userInfo", {
    method: "GET",
    credentials: "include",
    mode: "cors",
  });
};
