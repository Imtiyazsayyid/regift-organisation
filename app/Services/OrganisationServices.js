import Api from "./Api";

export async function login(payload) {
  return await Api().post("auth/login", payload);
}

export async function getAccessToken(refreshToken) {
  return await Api().post(`auth/access-token`, {
    refreshToken,
  });
}

export async function register(payload) {
  return await Api().post("register", payload);
}

export async function deleteOrganisation(params) {
  return await Api().get("/delete", { params });
}

export async function sendOTP(payload) {
  return await Api().post("send-otp", payload);
}

export async function verifyOTP(payload) {
  return await Api().post("verify-otp", payload);
}

export async function resetPassword(payload) {
  return await Api().post("reset-password", payload);
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

// Oganisations

export async function saveOrganisation(payload) {
  return await Api().post("/organisations", payload);
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

// Order

export async function getAllOrders(params) {
  return await Api().get("/orders", { params });
}

export async function saveOrder(payload) {
  return await Api().post("/orders", payload);
}

export async function deleteOrder(id) {
  return await Api().delete(`/order/${id}`);
}
