import { Box, LinearProgress } from "@mui/material";
import React from "react";
import PostField from "./PostField";
import Posts from "./Posts";
import { useQuery } from "@tanstack/react-query";
import getPosts from "../Functions/getPosts";
const Wall = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["getposts"],
    queryFn: getPosts,
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
  if (error) {
    return <h1>Error..</h1>;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <PostField />

      {data &&
        data.data.posts.map((item, index) => {
          return <Posts {...item} key={index} reactions />;
        })}
    </Box>
  );
};

export default Wall;
