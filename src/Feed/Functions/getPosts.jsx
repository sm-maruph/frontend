import axios from "axios";

const getPosts = async () => {
  const token = "Baerer " + JSON.parse(localStorage.getItem("token"));
  const response = await axios.get("http://localhost:3000/feed/getposts", {
    headers: {
      Authorization: token,
    },
  });

  return response;
};
const getPostsByUser = async () => {
  const token = "Baerer " + JSON.parse(localStorage.getItem("token"));
  try {
    const response = await axios.get(
      "http://localhost:3000/feed/getpostbyuser",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }

  return response;
};
const getPostsByKeyWord = async (key) => {
  const token = "Baerer " + JSON.parse(localStorage.getItem("token"));
  const response = await axios.post(
    "http://localhost:3000/feed/getpostsbykeyword",
    {
      key,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};

export default getPosts;
export { getPostsByUser, getPostsByKeyWord };
