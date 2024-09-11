import axios from "axios";
const deleteComment = async (id) => {
  console.log(id);
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.delete(
    `http://localhost:3000/feed/deletecomment/${id}`,
    {
      headers: {
        Authorization: "Baerer " + token,
      },
    }
  );
  console.log("done");
  return response.data;
};

const deletePost = async (id) => {
  console.log(id);
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.delete(
    `http://localhost:3000/feed/deletepost/${id}`,
    {
      headers: {
        Authorization: "Baerer " + token,
      },
    }
  );
  console.log("done");
  return response.data;
};

export { deleteComment, deletePost };
