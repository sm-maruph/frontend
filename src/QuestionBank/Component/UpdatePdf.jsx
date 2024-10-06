import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useInput } from "../../CustomHooks/useInput";
import { updateQuestions } from "../Functions/postQuestions";

const UpdatePdf = ({
  id,
  courseName,
  courseCode,
  department,
  year,
  trimester,
  examType,
  open,
  handleClose,
}) => {
  const QueryClient = useQueryClient();

  const { state, handleChange, reset } = useInput({
    courseName: { value: courseName, isValid: true },
    courseCode: { value: courseCode, isValid: true },
    department: { value: department, isValid: true },
    year: { value: year, isValid: true },
    trimester: { value: trimester, isValid: true },
    examType: { value: examType, isValid: true },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      await updateQuestions(
        id,
        state.courseName.value,
        state.courseCode.value,
        state.department.value,
        state.year.value,
        state.trimester.value,
        state.examType.value
      );
    },
    onSuccess: async () => {
      await QueryClient.invalidateQueries(["getquestions1"]);
      QueryClient.refetchQueries(["getquestions1"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    mutation.mutate();
    handleClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          position="absolute"
          sx={{
            width: "500px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white.main",
            borderRadius: "4px",
          }}
          padding={4}
        >
          <Typography variant="h5">Update Question</Typography>

          <br />

          <TextField
            sx={{ marginTop: 2 }}
            value={state.courseName.value}
            onChange={handleChange}
            name="courseName"
            fullWidth
            label="Enter Course Name"
          />
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            value={state.courseCode.value}
            onChange={handleChange}
            name="courseCode"
            label="Enter Course Code"
          />

          <FormControl sx={{ marginTop: 2 }} fullWidth>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              name="department"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Department"
              value={state.department.value}
              onChange={handleChange}
            >
              <MenuItem value="CSE">CSE</MenuItem>
              <MenuItem value="EEE">EEE</MenuItem>
              <MenuItem value="BBA">BBA</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ marginTop: 2 }} fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              name="year"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Year"
              value={state.year.value}
              onChange={handleChange}
            >
              <MenuItem value="2020">2020</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ marginTop: 2 }} fullWidth>
            <InputLabel id="demo-simple-select-label">Trimester</InputLabel>
            <Select
              name="trimester"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Trimester"
              value={state.trimester.value}
              onChange={handleChange}
            >
              <MenuItem value="fall">Fall</MenuItem>
              <MenuItem value="summer">Summer</MenuItem>
              <MenuItem value="spring">Spring</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ marginTop: 2 }} fullWidth>
            <InputLabel id="demo-simple-select-label">Exam Type</InputLabel>
            <Select
              name="examType"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Exam Type"
              value={state.examType.value}
              onChange={handleChange}
            >
              <MenuItem value="mid">Mid</MenuItem>
              <MenuItem value="final">Final</MenuItem>
            </Select>
          </FormControl>

          <Button
            sx={{ marginTop: 2 }}
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            fullWidth
          >
            UPDATE
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default UpdatePdf;
