import request from "./request";

export const test = async () => {
  return request("http://localhost:3001/api/", {
    method: "GET",
    credentials: "include",
  });
};
