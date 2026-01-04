import { TOKEN_KEY } from "../constants/constants";

export function persistLogin(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("user", JSON.stringify(user))
}

export function clearLogin() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("user");
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}