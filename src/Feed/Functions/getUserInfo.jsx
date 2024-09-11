import axios from "axios";

const getUserInfo = async () => {
  const token = "Baerer " + JSON.parse(localStorage.getItem("token"));
  const response = await axios.get("http://localhost:3000/feed/getuserinfo", {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

export { getUserInfo };
