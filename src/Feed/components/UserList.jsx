import React, { useContext } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "../../Auth/AuthContext";
import NameAvatar from "../../Shared/NameAvatar";
import { getUsers, voteUser } from "../Functions/user";
import Voting from "./Voting";

const UserList = () => {
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["getusers"],
    queryFn: getUsers,
  });

  return (
    <Box padding={6} marginTop={2} borderRadius={2} border="2px solid #EBEBEB">
      {data &&
        data.users.map((item, index) => {
          return (
            <>
              <Box display="flex" alignItems="center" key={index + 10} gap={2}>
                <NameAvatar
                  src={`http://localhost:3000/${item.profile_picture}`}
                  name={item.first_name + " " + item.last_name}
                />
                <Voting to={item.id} from={auth.id} />
              </Box>
            </>
          );
        })}
    </Box>
  );
};

export default UserList;
