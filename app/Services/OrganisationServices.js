import Api from "./Api";

export async function login(payload) {
  return await Api().post("auth/login", payload);
}

export async function getAccessToken(refreshToken) {
  return await Api().post(`auth/access-token`, {
    refreshToken,
  });
}

// Details

export async function getOrganisationDetails() {
  return await Api().get("/details");
}

// Donated Items

export async function getAllDonatedItems(params) {
  return await Api().get("/donated-items", { params });
}
