import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  authToken: localStorage.getItem("authToken") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.authToken = action.payload.token;
    },
    logout: (state) => {
      state.currentUser = null;
      state.authToken = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
