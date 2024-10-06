import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
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
} from "@mui/material";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School"; // Icon for degree entries
import GroupIcon from "@mui/icons-material/Group"; // Icon for club entries
import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon
import useFetch from "../../CustomHooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// Sample data for degrees and club memberships

const EducationAndClubs = () => {
  const userId = useParams().userId;
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const queryClient = useQueryClient();

  // Modal state for degrees
  const [openDegreeModal, setOpenDegreeModal] = useState(false);
  const [newDegree, setNewDegree] = useState({
    degree_name: "",
    institution: "",
    type: "",
    end: "",
  });

  // Modal state for clubs
  const [openClubModal, setOpenClubModal] = useState(false);
  const [newClub, setNewClub] = useState({
    club_name: "",
    position: "",
  });

  // Functions to open and close the degree modal
  const handleOpenDegreeModal = () => setOpenDegreeModal(true);
  const handleCloseDegreeModal = () => setOpenDegreeModal(false);

  // Function to add a new degree

  // Functions to open and close the club modal
  const handleOpenClubModal = () => setOpenClubModal(true);
  const handleCloseClubModal = () => setOpenClubModal(false);

  // Function to add a new club

  // Function to delete a degree

  // Function to delete a club

  //degree section
  const {
    data: degree,
    isError: degreeIsError,
    error: degreeError,
    isLoading: degreeIsLoading,
  } = useFetch({
    url: "http://localhost:3000/myprofile/userdegree",
    queryKey: ["getdegree"],
    params: { userId },
  });
  const degreeAddMutation = useFetch({
    url: "http://localhost:3000/myprofile/adddegree",
    method: "POST",
  });
  const addDegree = () => {
    degreeAddMutation.mutate(
      {
        params: {
          userId,
          degree_name: newDegree.degree_name,
          Institution: newDegree.institution,
          EndDate: newDegree.end,
          DegreeType: newDegree.type,
        },
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries(["getdegree"]);
          queryClient.refetchQueries(["getdegree"]);
          setSuccessMessage(data.message);
          setOpenSuccessPopup(true);
        },
        onError: (data) => {
          console.log(data);
        },
      }
    );
    // Reset form
    setNewDegree({
      degree_name: "",
      institution: "",
      end: "",
      type: "",
    });
    handleCloseDegreeModal();
  };

  const deleteDegreeMutation = useFetch({
    url: "http://localhost:3000/myprofile/deletedegree",
    method: "DELETE",
  });

  const deleteDegree = (id) => {
    deleteDegreeMutation.mutate(
      {
        params: {
          id,
        },
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries(["getdegree"]);
          queryClient.refetchQueries(["getdegree"]);
          setSuccessMessage(data.message);
          setOpenSuccessPopup(true);
        },
        onError: (data) => {
          console.log(data);
        },
      }
    );
  };

  // club sections
  const {
    data: club,
    isError: clubIsError,
    error: clubError,
    isLoading: clubIsLoading,
  } = useFetch({
    url: "http://localhost:3000/myprofile/getclub",
    queryKey: ["getclub"],
    params: { userId },
  });

  const clubAddMutation = useFetch({
    url: "http://localhost:3000/myprofile/addclub",
    method: "POST",
  });

  const addClub = () => {
    clubAddMutation.mutate(
      {
        params: {
          uid: userId,
          club_id: newClub.club_name,
          position_id: newClub.position,
        },
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries(["getclub"]);
          queryClient.refetchQueries(["getclub"]);
          setSuccessMessage(data.message);
          setOpenSuccessPopup(true);
        },
        onError: (data) => {
          console.log(data);
        },
      }
    );
    setNewClub({ club_name: "", position: "" });
    handleCloseClubModal();
  };
  const clubDeleteMutation = useFetch({
    url: "http://localhost:3000/myprofile/deleteclub",
    method: "DELETE",
  });
  const deleteClub = (id) => {
    clubDeleteMutation.mutate(
      {
        params: {
          id,
        },
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries(["getclub"]);
          queryClient.refetchQueries(["getclub"]);
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
      {/* Degrees Section */}
      <Typography variant="h5" gutterBottom>
        Degrees
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDegreeModal}
      >
        Add Degree
      </Button>
      <List>
        {degree?.map((degree) => (
          <ListItem key={degree.degree_id} sx={{ mb: 2 }}>
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h6">{degree.degree_name}</Typography>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {degree.Institution} | {degree.EndDate}
                </Typography>
              }
            />
            <IconButton
              onClick={() => deleteDegree(degree.degree_id)}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />

      {/* Clubs Section */}
      <Typography variant="h5" gutterBottom>
        Clubs
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenClubModal}>
        Add Club
      </Button>
      <List>
        {club?.map((club) => (
          <ListItem key={club.id} sx={{ mb: 2 }}>
            <ListItemIcon>
              <GroupIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">{club.club_name}</Typography>}
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {club.position_name}
                </Typography>
              }
            />
            <IconButton onClick={() => deleteClub(club.id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Degree Modal */}
      <Dialog open={openDegreeModal} onClose={handleCloseDegreeModal}>
        <DialogTitle>Add Degree</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Degree Name"
            fullWidth
            variant="outlined"
            value={newDegree.degree_name}
            onChange={(e) =>
              setNewDegree({ ...newDegree, degree_name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Institution"
            fullWidth
            variant="outlined"
            value={newDegree.institution}
            onChange={(e) =>
              setNewDegree({ ...newDegree, institution: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Type of your Degree</InputLabel>
            <Select
              label="Type of your Degree"
              value={newDegree.type}
              onChange={(e) =>
                setNewDegree({ ...newDegree, type: e.target.value })
              }
            >
              <MenuItem value="underGraduate">Undergraduate</MenuItem>
              <MenuItem value="postGraduate">Postgraduate</MenuItem>
              <MenuItem value="graduate">Graduate</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            focused
            label="End Year"
            type="date"
            fullWidth
            variant="outlined"
            value={newDegree.end}
            onChange={(e) =>
              setNewDegree({ ...newDegree, end: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDegreeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={addDegree} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Club Modal */}
      <Dialog open={openClubModal} onClose={handleCloseClubModal}>
        <DialogTitle>Add Club</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Club Name</InputLabel>
            <Select
              label="Club Name"
              value={newClub.club_name}
              onChange={(e) =>
                setNewClub({ ...newClub, club_name: e.target.value })
              }
            >
              <MenuItem value="1">UIU Computer Club</MenuItem>
              <MenuItem value="2">Debate Club</MenuItem>
              <MenuItem value="3">Cultural Club</MenuItem>
              <MenuItem value="4">Sports Club</MenuItem>
              <MenuItem value="5">Business Club</MenuItem>
              <MenuItem value="6">Photography Club</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Position</InputLabel>
            <Select
              label="Position"
              value={newClub.position}
              onChange={(e) =>
                setNewClub({ ...newClub, position: e.target.value })
              }
            >
              <MenuItem value="1">President</MenuItem>
              <MenuItem value="2">Secretary</MenuItem>
              <MenuItem value="3">Treasurer</MenuItem>
              <MenuItem value="4">Vice President</MenuItem>
              <MenuItem value="5">Event Coordinator</MenuItem>
              <MenuItem value="6">Public Relations Officer</MenuItem>
              <MenuItem value="7">Technical Lead</MenuItem>
              <MenuItem value="8">Membership Coordinator</MenuItem>
              <MenuItem value="9">General Member</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClubModal} color="primary">
            Cancel
          </Button>
          <Button onClick={addClub} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EducationAndClubs;
