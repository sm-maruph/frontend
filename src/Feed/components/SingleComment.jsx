import React from "react";
import { Box, Typography } from "@mui/material";

import NameAvatar from "../../Shared/NameAvatar";
import Image from "./Image";
import Reactions from "./Reactions";
import { getCommentLikes, commentLike } from "../Functions/likes";
const SingleComment = ({
  IsDelete,
  id,
  uid,
  pid,
  commentId,
  created_at,
  first_name,
  last_name,
  profile_picture,
  image_url,
  content,
}) => {
  return (
    <Box marginTop={2}>
      <hr />
      <NameAvatar
        name={first_name + " " + last_name}
        src={`http://localhost:3000/${profile_picture}`}
        subtitle={created_at}
      />
      <Typography variant="body2" sx={{ lineHeight: 2 }} marginLeft={7.4}>
        {content}
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {JSON.parse(image_url).map((item, index) => {
          return <Image src={`http://localhost:3000/${item}`} key={index} />;
        })}
      </Box>
      <Box marginLeft={7}>
        <Reactions
          id={commentId}
          getLikes={getCommentLikes}
          delete={IsDelete ? true : false}
          giveLike={commentLike}
        />
      </Box>
    </Box>
  );
};

export default SingleComment;
