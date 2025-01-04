
import axios from 'axios';

export const fetchUsername = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.get(
      "http://localhost:5000/api/user/getuser",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.username;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};
