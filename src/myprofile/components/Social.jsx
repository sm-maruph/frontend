import React, { useState, useContext } from "react";
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
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
  Link,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DeleteIcon from "@mui/icons-material/Delete";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useParams } from "react-router-dom";
import useFetch from "../../CustomHooks/useFetch";

import { AuthContext } from "../../Auth/AuthContext";
import Success from "../../Shared/Success";
import Popup from "../../Shared/Popup";

const SocialMedia = () => {
  const queryClient = useQueryClient();
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const auth = useContext(AuthContext);
  const userId = useParams().userId;
  const { data, isLoading, isError, error } = useFetch({
    url: "http://localhost:3000/myprofile/getsocial",
    queryKey: ["getsocial"],
    params: { userId },
  });

  const [socialMedias, setSocialMedias] = useState([
    { type: "Facebook", url: "facebook.com/example" },
    { type: "Twitter", url: "@example" },
    { type: "LinkedIn", url: "linkedin.com/in/example" },
  ]);
  const [open, setOpen] = useState(false);
  const [newMediaType, setNewMediaType] = useState("");
  const [newMediaUrl, setNewMediaUrl] = useState("");

  const mutation = useFetch({
    url: "http://localhost:3000/myprofile/addsocial",
    method: "POST",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewMediaType("");
    setNewMediaUrl("");
  };

  const mutationDelete = useFetch({
    url: "http://localhost:3000/myprofile/deletesocial",
    method: "DELETE",
  });

  const addSocialMedia = () => {
    if (newMediaType.trim() && newMediaUrl.trim()) {
      mutation.mutate(
        {
          params: {
            userId,
            account_type: newMediaType,

            url: newMediaUrl,
          },
        },
        {
          onSuccess: async (data) => {
            await queryClient.invalidateQueries(["getsocial"]);
            queryClient.refetchQueries(["getsocial"]);
            setSuccessMessage(data.message);
            setOpenSuccessPopup(true);
            setOpen(false);
            handleClose();
          },
        }
      );
      handleClose();
    }
  };
  if (isLoading || mutation.isPending) {
    return <CircularProgress />;
  }

  const deleteSocialMedia = (index) => {
    mutationDelete.mutate(
      {
        params: {
          id: index,
        },
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries(["getsocial"]);
          queryClient.refetchQueries(["getsocial"]);
          setSuccessMessage(data.message);
          setOpenSuccessPopup(true);
          setOpen(false);
          handleClose();
        },
      }
    );
  };

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
      <Box sx={{ padding: 4, bgcolor: "#f5f5f5", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Social Media
        </Typography>
        {auth.id === userId && (
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Social Media
          </Button>
        )}

        {data === null ? (
          <Typography variant="h4" color="secondary" textAlign="center" mt={3}>
            No Social Media Account
          </Typography>
        ) : (
          <List>
            {data?.map((media, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {media.type.toLowerCase() === "facebook" && <FacebookIcon />}
                  {media.type.toLowerCase() === "twitter" && <TwitterIcon />}
                  {media.type.toLowerCase() === "linkedin" && <LinkedInIcon />}
                  {media.type.toLowerCase() === "instagram" && (
                    <InstagramIcon />
                  )}
                  {media.type.toLowerCase() === "whatsapp" && <WhatsAppIcon />}
                  {media.type.toLowerCase() === "github" && <GitHubIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={media.type}
                  secondary={<Link>{media.url}</Link>}
                />
                <IconButton onClick={() => deleteSocialMedia(media.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}

        {/* Add Social Media Modal */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Social Media</DialogTitle>
          <DialogContent>
            <Select
              fullWidth
              value={newMediaType}
              onChange={(e) => setNewMediaType(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                Select Media Type
              </MenuItem>
              <MenuItem value="Facebook">Facebook</MenuItem>
              <MenuItem value="Instagram">Instagram</MenuItem>
              <MenuItem value="Twitter">Twitter</MenuItem>
              <MenuItem value="LinkedIn">LinkedIn</MenuItem>
              <MenuItem value="WhatsApp">WhatsApp</MenuItem>
              <MenuItem value="Github">GitHub</MenuItem>
              {/* Add more media types as needed */}
            </Select>
            <TextField
              margin="dense"
              label="URL"
              type="text"
              fullWidth
              variant="outlined"
              value={newMediaUrl}
              onChange={(e) => setNewMediaUrl(e.target.value)}
              sx={{ marginTop: 2 }} // Add some spacing
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={addSocialMedia} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default SocialMedia;
