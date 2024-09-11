import React, { useContext } from "react";
import { Box, LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import Posts from "./Posts";
import { getPostsByUser } from "../Functions/getPosts";
import { AuthContext } from "../../Auth/AuthContext";

const Myposts = () => {
  const auth = useContext(AuthContext);
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["getpostbyUser", auth.id],
    queryFn: getPostsByUser,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <Box
        padding={6}
        marginTop={2}
        borderRadius={2}
        border="2px solid #EBEBEB"
      >
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box padding={6} marginTop={2} borderRadius={2} border="2px solid #EBEBEB">
      {data?.posts.map((item, index) => {
        return <Posts {...item} key={index} reactions />;
      })}
    </Box>
  );
};

export default Myposts;
