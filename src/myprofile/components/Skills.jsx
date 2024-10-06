import {
  Box,
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useContext } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Using an icon for skills
import DeleteIcon from "@mui/icons-material/Delete"; // Icon for delete action
import AddIcon from "@mui/icons-material/Add"; // Icon for add action
import React, { useState } from "react";
import useFetch from "../../CustomHooks/useFetch";
import { useParams } from "react-router-dom";
import { useInput } from "../../CustomHooks/useInput";
import { AuthContext } from "../../Auth/AuthContext";

import Success from "../../Shared/Success";
import Popup from "../../Shared/Popup";
import { useQueryClient } from "@tanstack/react-query";

const Skills = () => {
  const auth = useContext(AuthContext);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const queryClient = useQueryClient();
  const userId = useParams().userId;
  const { data, isLoading, isError, error } = useFetch({
    url: "http://localhost:3000/myprofile/getskills",
    queryKey: ["getskils"],
    params: { userId },
  });
  const { state, handleChange, reset } = useInput({
    skill: { value: "", isValid: true },
  });

  const [skills, setSkills] = useState(["Graphic Design", "Branding", "AI"]);
  const [open, setOpen] = useState(false); // State to manage modal open/close
  const [newSkill, setNewSkill] = useState(""); // State to hold the new skill input

  // Function to open the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
    // Reset the input field
  };

  const mutation = useFetch({
    url: "http://localhost:3000/myprofile/addskill",
    params: { userId },
    data: { skill: state.skill.value },
    method: "POST",
  });
  const mutationDelete = useFetch({
    url: "http://localhost:3000/myprofile/removeskill",
    method: "delete",
  });

  const addSkill = () => {
    mutation.mutate(undefined, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["getskils"]);
        queryClient.refetchQueries(["getskils"]);
        setSuccessMessage(data.message);
        setOpenSuccessPopup(true);
        setOpen(false);

        reset();
      },
    });
  };

  // Function to remove a skill by index
  const removeSkill = (index) => {
    mutationDelete.mutate(
      { params: { skill_id: index } },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries(["getskils"]);
          queryClient.refetchQueries(["getskils"]);
          setSuccessMessage(data.message);
          setOpenSuccessPopup(true);

          reset();
        },
      }
    );
  };
  if (isLoading || mutation.isPending || mutationDelete.isPending) {
    return <CircularProgress />;
  }

  return (
    <>
      <Popup
        open={mutation.isError}
        onClose={() => {
          mutation.reset();
        }}
        errorMessage={mutation.error?.response.data.message}
        status={mutation.error?.response.status}
      />
      <Popup
        open={mutationDelete.isError}
        onClose={() => {
          mutationDelete.reset();
        }}
        errorMessage={mutationDelete.error?.response.data.message}
        status={mutationDelete.error?.response.status}
      />
      <Grid item xs={12} container marginTop={5} alignItems="center">
        {/* Skills Title and Divider */}
        <Typography
          variant="h6" // Upgraded from subtitle to h6 for better visibility
          color="secondary"
          sx={{ marginRight: 2 }}
        >
          Skills
        </Typography>
        <Divider
          sx={{
            flexGrow: 1, // This will take up remaining space and align the Divider
            marginLeft: 2, // Added margin for better spacing
            borderColor: "secondary.main",
          }}
        />
        {auth.id === userId && (
          <IconButton onClick={handleOpen} color="secondary">
            <AddIcon />
          </IconButton>
        )}
      </Grid>

      {/* Skills List */}
      <Grid item xs={12}>
        <Box marginTop={3} width="100%">
          <List>
            {data?.map((skill, index) => (
              <ListItem key={index} disableGutters>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "secondary.main" }} />
                </ListItemIcon>
                <ListItemText
                  primary={skill.skill_name}
                  primaryTypographyProps={{ variant: "body1", fontWeight: 500 }}
                />
                {auth.id === userId && (
                  <IconButton
                    onClick={() => removeSkill(skill.skill_id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>

      {/* Add Skill Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Skill</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="skill"
            margin="dense"
            label="Skill"
            type="text"
            fullWidth
            variant="outlined"
            value={state.skill.value}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addSkill} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Skills;
