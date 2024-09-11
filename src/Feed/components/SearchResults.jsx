import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostsByKeyWord } from "../Functions/getPosts";
import { Box, Typography, LinearProgress } from "@mui/material";

import Posts from "./Posts";

const SearchResults = () => {
  const location = useLocation();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["keySearch"],
    queryFn: async () => {
      return await getPostsByKeyWord(location.state);
    },
  });
  console.log(data);

  return (
    <>
      <Box
        padding={6}
        marginTop={2}
        marginBottom={2}
        borderRadius={2}
        border="2px solid #EBEBEB"
      >
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Typography variant="h4" color="secondary">
            {data?.posts.length === 0
              ? "No Results Found"
              : "Total " + data?.posts.length + " Found"}
          </Typography>
        )}
      </Box>
      {data?.posts.map((item, index) => {
        const regex = new RegExp(`(${location.state})`, "gi");
        const marked = item.title.replace(regex, `<mark>$1</mark>`);
        return (
          <Posts
            {...item}
            key={index}
            reactions
            title={<span dangerouslySetInnerHTML={{ __html: marked }} />}
          />
        );
      })}
    </>
  );
};

export default SearchResults;
