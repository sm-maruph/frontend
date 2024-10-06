import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Question from "./Question";
import getQuestions from "../Functions/getQuestions";
const QuestionWall = ({ search, department, trimester, examType, year }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "getquestions1",
      search.value,
      department,
      year,
      trimester,
      examType,
    ],
    queryFn: async () => {
      return await getQuestions(
        search.value,
        department,
        year,
        trimester,
        examType
      );
    },
    enabled: true,
  });
  console.log(error);
  console.log(data);
  return (
    <Box
      padding={6}
      marginTop={2}
      borderRadius={2}
      display="flex"
      flexDirection="column"
      gap={2}
      border="2px solid #EBEBEB"
    >
      {data ? (
        data?.map((item, index) => {
          return <Question key={index} {...item} />;
        })
      ) : (
        <Typography variant="h5" textAlign="center">
          No Question Found
        </Typography>
      )}
    </Box>
  );
};

export default QuestionWall;
