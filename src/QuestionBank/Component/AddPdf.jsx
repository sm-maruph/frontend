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
import postQuestions from "../Functions/postQuestions";

const AddPdf = () => {
  const QueryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const pdfRef = useRef();
  const { state, handleChange, uploadImage, reset } = useInput({
    courseName: { value: "", isValid: true },
    courseCode: { value: "", isValid: true },
    department: { value: "CSE", isValid: true },
    year: { value: "2023", isValid: true },
    trimester: { value: "fall", isValid: true },
    examType: { value: "final", isValid: true },
    image: null,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      await postQuestions(
        state.courseName.value,
        state.courseCode.value,
        state.department.value,
        state.year.value,
        state.trimester.value,
        state.examType.value,
        state.image
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
          <Typography variant="h5">Add Question</Typography>
          <Box
            marginTop={2}
            border="2px dotted #EBEBEB"
            borderRadius={1}
            height={100}
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <PictureAsPdfIcon color="primary" sx={{ height: 50, width: 50 }} />
            <Typography>
              {state.image ? state.image[0].name : "Upload a PDF"}
            </Typography>
          </Box>
          <br />
          <input
            onChange={uploadImage}
            style={{ display: "none" }}
            type="file"
            name="pdf"
            ref={pdfRef}
            accept="application/pdf"
          />
          <Button
            variant="contained"
            onClick={() => {
              pdfRef.current.click();
            }}
            fullWidth
          >
            Choose A File
          </Button>

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
            Upload
          </Button>
        </Box>
      </Modal>
      <Box
        padding={6}
        borderRadius={2}
        border="2px solid #EBEBEB"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button variant="contained" onClick={handleOpen}>
          ADD QUESTION PDF
        </Button>
      </Box>
    </>
  );
};

export default AddPdf;
