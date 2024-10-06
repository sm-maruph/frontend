import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work"; // Icon for job entries
import SchoolIcon from "@mui/icons-material/School"; // Icon for internship entries
import RemoveIcon from "@mui/icons-material/Remove"; // Icon for remove action
import AddIcon from "@mui/icons-material/Add"; // Icon for add action
import DeleteIcon from "@mui/icons-material/Delete"; // Icon for individual remove action
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Auth/AuthContext";

import useFetch from "../../CustomHooks/useFetch";
import { useParams } from "react-router-dom";

const WorkHistory = () => {
  const auth = useContext(AuthContext);
  const userId = useParams().userId;
  const { data, isLoading, isError, error } = useFetch({
    url: "http://localhost:3000/myprofile/getintern",
    queryKey: ["getinternsip"],
    params: { userId },
  });
  const {
    data: jobs,
    isLoading: jobLoading,
    isError: jobisError,
    error: jobError,
  } = useFetch({
    url: "http://localhost:3000/myprofile/getjob",
    queryKey: ["getjob"],
    params: { userId },
  });

  console.log(jobError);

  // State for modals
  const [openInternshipModal, setOpenInternshipModal] = useState(false);
  const [openJobModal, setOpenJobModal] = useState(false);

  // State for new entry forms
  const [newInternship, setNewInternship] = useState({
    company_name: "",
    position: "",
    start: "",
    end: "",
  });

  const [newJob, setNewJob] = useState({
    job_title: "",
    company: "",
    start_date: "",
    end_date: "",
    reason_for_leaving: "",
  });

  // Function to open internship modal
  const handleOpenInternshipModal = () => {
    setOpenInternshipModal(true);
  };

  // Function to close internship modal
  const handleCloseInternshipModal = () => {
    setOpenInternshipModal(false);
  };

  // Function to open job modal
  const handleOpenJobModal = () => {
    setOpenJobModal(true);
  };

  // Function to close job modal
  const handleCloseJobModal = () => {
    setOpenJobModal(false);
  };
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const queryClient = useQueryClient();
  // Function to Add and Delete an internship
  const mutation = useFetch({
    url: "http://localhost:3000/myprofile/addintern",
    method: "POST",
  });
  const addInternship = () => {
    mutation.mutate(
      {
        params: {
          userId,
          company_name: newInternship.company_name,
          position: newInternship.position,
          start: newInternship.start,
          end: newInternship.end,
        },
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries(["getinternsip"]);
          queryClient.refetchQueries(["getinternsip"]);
          setSuccessMessage(data.message);
          setOpenSuccessPopup(true);
        },
        onError: (data) => {
          console.log(data);
        },
      }
    );
    handleCloseInternshipModal(); // Close modal after adding
    setNewInternship({ company_name: "", position: "", start: "", end: "" }); // Reset form
  };

  const deletion = useFetch({
    url: "http://localhost:3000/myprofile/deletintern",
    method: "DELETE",
  });
  const removeInternship = (id) => {
    deletion.mutate(
      {
        params: {
          id,
        },
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries(["getinternsip"]);
          queryClient.refetchQueries(["getinternsip"]);
          setSuccessMessage(data.message);
          setOpenSuccessPopup(true);

          reset();
        },
        onError: (data) => {
          console.log(data);
        },
      }
    );
  };
  // Function To Delete

  //Fuction for Job

  const jobDeletion = useFetch({
    url: "http://localhost:3000/myprofile/deletejobhistory",
    method: "DELETE",
  });
  const jobAddition = useFetch({
    url: "http://localhost:3000/myprofile/addjobhistory",
    method: "POST",
  });

  // Function to add a job history entry
  const addJobHistory = () => {
    jobAddition.mutate(
      {
        params: {
          uid: userId,
          job_title: newJob.job_title,
          company: newJob.company,
          start_date: newJob.start_date,
          EndDate: newJob.end_date,
        },
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries(["getjob"]);
          queryClient.refetchQueries(["getjob"]);
          setSuccessMessage(data.message);
          setOpenSuccessPopup(true);
        },
        onError: (data) => {
          console.log(data);
        },
      }
    );
    console.log(jobAddition.error);

    handleCloseJobModal(); // Close modal after adding
    setNewJob({
      job_title: "",
      company: "",
      start_date: "",
      end_date: "",
    }); // Reset form
  };

  // Function to remove an individual job history entry
  const removeJobHistory = (id) => {
    jobDeletion.mutate(
      {
        params: {
          id,
        },
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries(["getjob"]);
          queryClient.refetchQueries(["getjob"]);
          setSuccessMessage(data.message);
          setOpenSuccessPopup(true);
        },
        onError: (data) => {
          console.log(data);
        },
      }
    );
  };

  return (
    <Box sx={{ p: 3, borderRadius: 2, bgcolor: "#f5f5f5" }}>
      {/* Internships Section */}
      <Typography variant="h5" gutterBottom>
        Internships
      </Typography>
      {auth.id === userId && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenInternshipModal}
          sx={{ mb: 2 }}
        >
          Add Internship
        </Button>
      )}

      <List>
        {data?.map((internship) => (
          <ListItem key={internship.internship_id} sx={{ mb: 2 }}>
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h6">{internship.position}</Typography>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {internship.company_name} | {internship.start} -{" "}
                  {internship.end}
                </Typography>
              }
            />
            {auth.id === userId && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeInternship(internship.internship_id)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />

      {/* Job History Section */}
      <Typography variant="h5" gutterBottom>
        Job History
      </Typography>
      {auth.id === userId && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenJobModal}
          sx={{ mb: 2 }}
        >
          Add Job History
        </Button>
      )}

      <List>
        {jobs?.map((job) => (
          <ListItem key={job.history_id} sx={{ mb: 2 }}>
            <ListItemIcon>
              <WorkIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">{job.job_title}</Typography>}
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {job.company} | {job.start_date} - {job.EndDate}
                </Typography>
              }
            />
            {auth.id === userId && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeJobHistory(job.history_id)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>

      {/* Modal for Adding Internship */}
      <Dialog open={openInternshipModal} onClose={handleCloseInternshipModal}>
        <DialogTitle>Add Internship</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the internship.
          </DialogContentText>

          <TextField
            margin="dense"
            label="Company Name"
            fullWidth
            variant="outlined"
            value={newInternship.company_name}
            onChange={(e) =>
              setNewInternship({
                ...newInternship,
                company_name: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Position"
            fullWidth
            variant="outlined"
            value={newInternship.position}
            onChange={(e) =>
              setNewInternship({ ...newInternship, position: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Start Date"
            focused
            fullWidth
            type="date"
            variant="outlined"
            value={newInternship.start}
            onChange={(e) =>
              setNewInternship({ ...newInternship, start: e.target.value })
            }
          />
          <TextField
            focused
            margin="dense"
            label="End Date"
            fullWidth
            type="date"
            variant="outlined"
            value={newInternship.end}
            onChange={(e) =>
              setNewInternship({ ...newInternship, end: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInternshipModal} color="primary">
            Cancel
          </Button>
          <Button onClick={addInternship} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for Adding Job History */}
      <Dialog open={openJobModal} onClose={handleCloseJobModal}>
        <DialogTitle>Add Job History</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the job.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Job Title"
            fullWidth
            variant="outlined"
            value={newJob.job_title}
            onChange={(e) =>
              setNewJob({ ...newJob, job_title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Company"
            fullWidth
            variant="outlined"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            focused
            variant="outlined"
            value={newJob.start_date}
            onChange={(e) =>
              setNewJob({ ...newJob, start_date: e.target.value })
            }
          />
          <TextField
            focused
            margin="dense"
            label="End Date"
            type="date"
            fullWidth
            variant="outlined"
            value={newJob.end_date}
            onChange={(e) => setNewJob({ ...newJob, end_date: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJobModal} color="primary">
            Cancel
          </Button>
          <Button onClick={addJobHistory} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkHistory;
