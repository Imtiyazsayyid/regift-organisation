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

export async function getSingleDonatedItem(id) {
  return await Api().get(`/donated-item/${id}`);
}

// Categories

export async function getAllCategories(params) {
  return await Api().get("/categories", { params });
}

// Cart

export async function getAllCartItems(params) {
  return await Api().get("/cart-items", { params });
}

export async function saveCartItem(payload) {
  return await Api().post("/cart-items", payload);
}

export async function getSingleCartItem(id) {
  return await Api().get(`/cart-item/${id}`);
}

export async function deleteCartItem(id) {
  return await Api().delete(`/cart-item/${id}`);
}
