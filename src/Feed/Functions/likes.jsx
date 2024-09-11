import axios from "axios";
const postLike = async (postId, isLiked) => {
  console.log("likes ar on the way");
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.post(
    `http://localhost:3000/feed/like`,
    { postId, isLiked },
    {
      headers: {
        Authorization: "Baerer " + token,
      },
    }
  );

  return response.data;
};

const commentLike = async (commentId, isLiked) => {
  console.log("comment Liking");
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await axios.post(
      `http://localhost:3000/feed/commentlikes/${commentId}`,
      { isLiked },
      {
        headers: {
          Authorization: "Baerer " + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};
const getCommentLikes = async (commentId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.get(
    `http://localhost:3000/feed/getcommentlikes/${commentId}`,

    {
      headers: {
        Authorization: "Baerer " + token,
      },
    }
  );

  return response.data;
};
const getPostLikes = async (postId) => {
  console.log("getting Post Likes");
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.get(
    `http://localhost:3000/feed/getLikes/${postId}`,

    {
      headers: {
        Authorization: "Baerer " + token,
      },
    }
  );

  return response.data;
};

export { postLike, commentLike, getPostLikes, getCommentLikes };
