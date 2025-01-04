import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export const UserSignUp = async (data) => API.post("/user/register", data);
export const UserSignIn = async (data) => API.post("/user/login", data);

export const getHome = async (token) =>
  API.get("/user/home", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getUser = async (token) =>
  API.get("/user/getuser", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const resetPassword = async (token, newPassword) =>
  API.post(
    "/user/reset-password",
    { newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getLeaderboard = async (token,game) => 
    API.get(`/leaderboard/${game}`,{headers: {
      Authorization: `Bearer ${token}`,
    },})


