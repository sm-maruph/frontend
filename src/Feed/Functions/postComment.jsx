import axios from "axios";
const postComment = async (formData, postId) => {
  const token = "Baerer " + JSON.parse(localStorage.getItem("token"));
  const Data = new FormData();
  Data.append("content", formData.content);
  if (formData.imageFile) {
    Data.append("image", formData.imageFile);
  }

  return await axios.post(
    `http://localhost:3000/feed/comment/${postId}`,
    Data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }
  );
};

export default postComment;
