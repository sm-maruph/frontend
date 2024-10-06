import React, { useContext, useState } from "react";
import { Box, Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import deleteQuestions from "../Functions/deleteQuestion";
import { AuthContext } from "../../Auth/AuthContext";

import UpdatePdf from "./UpdatePdf";
import { Link } from "react-router-dom";

const Options = ({
  id,
  pdfPath,
  profile,
  userId,
  course,
  code,
  trimester,
  department,
  year,
  examType,
}) => {
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      deleteQuestions(id, pdfPath);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["getquestions1"]);
      queryClient.refetchQueries(["getquestions1"]);
    },
  });
  const handleDelete = () => {
    mutation.mutate();
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <UpdatePdf
        id={id}
        open={open}
        courseName={course}
        courseCode={code}
        department={department}
        year={year}
        trimester={trimester}
        examType={examType}
        handleClose={handleClose}
      />
      <Box display="flex" gap={1} marginBottom={3}>
        {auth.id === userId ? (
          <>
            <IconButton onClick={handleOpen}>
              <EditIcon></EditIcon>
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <></>
        )}

        <Avatar
          component={Link}
          to={`/myprofile/${userId}`}
          sx={{ marginLeft: "auto" }}
          src={`http://localhost:3000/${profile}`}
        />
      </Box>
    </>
  );
};

export default Options;
