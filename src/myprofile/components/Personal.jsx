import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Popup from "../../Shared/Popup";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import useFetch from "../../CustomHooks/useFetch";
import Loading from "../../Shared/Loading";
import { useQueryClient } from "@tanstack/react-query";
import { useInput } from "../../CustomHooks/useInput";
import Location from "../../Signup/Location";
import Success from "../../Shared/Success";
import { AuthContext } from "../../Auth/AuthContext";

const PersonalInformation = () => {
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const userId = useParams().userId;
  const { data, isLoading, isError, error } = useFetch({
    url: "http://localhost:3000/myprofile/getUserDetails",
    queryKey: ["gud"],
    params: { userId },
  });

  const { state, handleChange } = useInput({});

  const [open, setOpen] = useState(false); // Modal state
  const [fieldToEdit, setFieldToEdit] = useState(""); // Field being edited
  const [newValue, setNewValue] = useState(""); // New value for the field

  // Function to open the modal and set the field to edit
  const handleOpen = (field, value) => {
    setFieldToEdit(field);
    if (field === "Location") {
      setNewValue(null);
    } else {
      setNewValue(value);
    }
    // Set the current value in the modal's input field
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setFieldToEdit("");
    setNewValue("");
    setOpen(false);
  };
  const mutation = useFetch({
    url: "http://localhost:3000/myprofile/editUserDetails",
    method: "POST",
  });
  // Function to update personal information (to be implemented)
  const updatePersonalInfo = (e) => {
    // Implement your update logic here
    const { name } = e.target;
    if (name) {
      mutation.mutate(
        { params: { userId, city_id: newValue.id } },
        {
          onSuccess: async (data) => {
            await queryClient.invalidateQueries(["gud"]);
            queryClient.refetchQueries(["gud"]);

            setSuccessMessage(data.message);
            setOpenSuccessPopup(true);

            reset();
          },
        }
      );
    } else {
      mutation.mutate(
        { params: { userId, [fieldToEdit]: newValue } },
        {
          onSuccess: async (data) => {
            await queryClient.invalidateQueries(["gud"]);
            queryClient.refetchQueries(["gud"]);

            setSuccessMessage(data.message);
            setOpenSuccessPopup(true);

            reset();
          },
        }
      );
    }

    console.log(`Updating ${fieldToEdit} with value: ${newValue}`);
    handleClose();
  };

  if (isLoading || mutation.isPending) {
    return <CircularProgress />;
  }

  return (
    <>
      <Success
        open={openSuccessPopup}
        onClose={() => {
          setOpenSuccessPopup(false);
          handleClose();
        }}
        successMessage={successMessage}
      />
      <Popup
        open={mutation.isError}
        onClose={() => {
          mutation.reset();
        }}
        errorMessage={mutation.error?.response.data.message}
        status={mutation.error?.response.status}
      />
      <Box sx={{ padding: 4, bgcolor: "#f5f5f5", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Gender" secondary={data.gender} />
            {auth.id === userId && (
              <IconButton onClick={() => handleOpen("gender", data.gender)}>
                <EditIcon />
              </IconButton>
            )}
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Phone" secondary={data.phone_number} />
            {auth.id === userId && (
              <IconButton
                onClick={() => handleOpen("phone", data.phone_number)}
              >
                <EditIcon />
              </IconButton>
            )}
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email" secondary={data.email} />
            {auth.id === userId && (
              <IconButton onClick={() => handleOpen("email", data.email)}>
                <EditIcon />
              </IconButton>
            )}
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Address" secondary={data.address} />
            {auth.id === userId && (
              <IconButton onClick={() => handleOpen("address", data.address)}>
                <EditIcon />
              </IconButton>
            )}
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              primary="Location"
              secondary={data.city + " , " + data.country}
            />
            {auth.id === userId && (
              <IconButton
                onClick={() =>
                  handleOpen("Location", `${data.city}, ${data.country}`)
                }
              >
                <EditIcon />
              </IconButton>
            )}
          </ListItem>
        </List>

        {/* Edit Personal Information Modal */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit {fieldToEdit}</DialogTitle>
          <DialogContent>
            {fieldToEdit === "Location" ? (
              // Render Location Component for Location field
              <Box sx={{ width: 300, height: 500 }}>
                <Location
                  value={newValue}
                  change={(e, value) => setNewValue(value)}
                />
              </Box>
            ) : fieldToEdit === "gender" ? (
              // Render Select for Gender field
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  label="Gender"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  required
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            ) : (
              // Render TextField for other fields
              <TextField
                label={fieldToEdit}
                name={fieldToEdit.toLowerCase()}
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                variant="outlined"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              name={fieldToEdit === "Location" && "location"}
              onClick={updatePersonalInfo}
              color="primary"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default PersonalInformation;
