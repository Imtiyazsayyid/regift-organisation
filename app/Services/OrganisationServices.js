import Api from "./Api";

export async function login(payload) {
  return await Api().post("auth/login", payload);
}

export async function getAccessToken(refreshToken) {
  return await Api().post(`auth/access-token`, {
    refreshToken,
  });
}
