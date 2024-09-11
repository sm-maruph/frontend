import axios from "axios";

const getUsers = async () => {
  const token = "Baerer " + JSON.parse(localStorage.getItem("token"));
  const response = await axios.get("http://localhost:3000/feed/getusers", {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};
const getTopContributers = async () => {
  const token = "Baerer " + JSON.parse(localStorage.getItem("token"));
  const response = await axios.get(
    "http://localhost:3000/feed/topcontributers",
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};

const voteUser = async (voteTo, isVote) => {
  try {
    const token = "Baerer " + JSON.parse(localStorage.getItem("token"));
    const response = await axios.post(
      "http://localhost:3000/feed/voteusers",
      { voteTo, isVote },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const getVotedOrNot = async (voteTo) => {
  try {
    const token = "Baerer " + JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(
      `http://localhost:3000/feed/getvoteornot/${voteTo}`,

      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data.isVote;
  } catch (error) {
    console.log(error.response.data.message);
    return error;
  }
};

export { getUsers, voteUser, getVotedOrNot, getTopContributers };
