import React from "react";
import { Box, Typography } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getTopContributers } from "../Functions/user";
import NameAvatar from "../../Shared/NameAvatar";

const Top = () => {
  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["topusers"],
    queryFn: getTopContributers,
  });

  return (
    <Box
      padding={6}
      marginTop={2}
      marginBottom={2}
      borderRadius={2}
      border="2px solid #EBEBEB"
    >
      <Typography gutterBottom variant="h5" textTransform="uppercase">
        Top Contributers
      </Typography>
      <hr />
      {data?.users.map((item) => {
        return (
          <NameAvatar
            src={`http://localhost:3000/${item.profile_picture}`}
            name={item.first_name + " " + item.last_name}
            subtitle={`Total Votes ${item.totalVotes}`}
          />
        );
      })}
    </Box>
  );
};

export default Top;
