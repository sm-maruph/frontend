import axios from "axios";
const updatePost = async (title, description, postId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.put(
    `http://localhost:3000/feed/update/${postId}`,
    { title, description },
    {
      headers: {
        Authorization: "Baerer " + token,
      },
    }
  );

  return response;
};

export { updatePost };
