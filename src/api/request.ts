//封装fetch请求，统一处理重定向
export default async function request(url: string, options: any = {}) {
  const response = await fetch(url, options);
  if (response.status === 302) {
    //重定向到登录页面
    window.location.href = (await response.json()).redirectUrl;
  }
  return response.json();
}
