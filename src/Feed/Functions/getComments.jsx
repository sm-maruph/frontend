import axios from "axios";
const getComments = async (postId) => {
 
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.get(
    `http://localhost:3000/feed/getcomments/${postId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data.comments;
};
export default getComments;
