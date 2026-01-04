import { createSlice } from "@reduxjs/toolkit";
import {
  persistLogin,
  clearLogin,
  isAuthenticated,
  getToken
} from "../utils/auth";

const initialState = {
  isAuthenticated: isAuthenticated(),
  token: getToken(),
  user: JSON.parse(localStorage.getItem("user")) || null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;

      state.isAuthenticated = true;
      state.user = user;
      state.token = token;

      persistLogin(token, user);
      
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      clearLogin();
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;