import React, { useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import NameAvatar from "../../Shared/NameAvatar";
import { AuthContext } from "../../Auth/AuthContext";
import SmallDetails from "./SmallDetails";
import { getUserInfo } from "../Functions/getUserInfo";

const User = () => {
  const auth = useContext(AuthContext);
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["getuserinfo", auth.id],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5,
  });

  console.log(data);
  return (
    <Box
      padding={6}
      marginTop={2}
      marginBottom={2}
      borderRadius={2}
      border="2px solid #EBEBEB"
    >
      <NameAvatar
        src={`http://localhost:3000/${auth.profilePicture}`}
        name={auth.name}
        subtitle={`@nadibahsan`}
      />
      <hr />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SmallDetails title="post" content={data?.posts} />
        </Grid>
        <Grid item xs={6}>
          <SmallDetails title="Comments" content={data?.comment} />
        </Grid>
        <Grid item xs={6}>
          <SmallDetails title="Votes" content={data?.votes} />
        </Grid>
        <Grid item xs={6}>
          <SmallDetails title="rank" content={data?.rank} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default User;
