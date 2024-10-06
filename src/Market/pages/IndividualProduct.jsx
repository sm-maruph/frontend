import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
import {
  Container,
  Box,
  Grid,
  Avatar,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import NameAvatar from "../../Shared/NameAvatar";
import UpdateProduct from "../Component/UpdateProduct";
import MessageButton from "../../Shared/MessageButton";
import useFetch from "../../CustomHooks/useFetch";
import Slider from "react-slick"; // Import the carousel component
import "slick-carousel/slick/slick.css"; // Import slick styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles
import moment from "moment"; // To format the date
import { useQueryClient } from "@tanstack/react-query";
import Success from "../../Shared/Success";

const IndividualProduct = () => {
  const queryClient = useQueryClient();
  const itemId = useParams().itemId;
  const { data, isLoading, isError, error } = useFetch({
    url: "http://localhost:3000/marketplace/getproductinfo",
    queryKey: ["individualproduct"],
    params: { id: itemId },
  });

  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const deleteMutation = useFetch({
    url: "http://localhost:3000/marketplace/deletepost",
    method: "DELETE",
    params: { itemId, uid: data?.uid },
  });
  const mutationStatus = useFetch({
    url: "http://localhost:3000/marketplace/updatetosold",
    method: "PUT",
    params: { itemId, uid: data?.uid },
  });
  const changeStatus = () => {
    mutationStatus.mutate(undefined, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["individualproduct"]);
        queryClient.refetchQueries(["individualproduct"]);
        setSuccessMessage(data.message);
        setOpenSuccessPopup(true);
        console.log(data);
      },
      onError: (data) => {
        console.log(data);
      },
    });
    // Reset form
  };
  const deletePost = () => {
    deleteMutation.mutate(undefined, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["individualproduct"]);
        queryClient.refetchQueries(["individualproduct"]);
        setSuccessMessage(data.message);
        setOpenSuccessPopup(true);
        console.log(data);
      },
      onError: (data) => {
        console.log(data);
      },
    });
    // Reset form
  };

  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false); // This should always be called

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  // Slider settings for the carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (isLoading) {
    <CircularProgress />;
  }
  if (!data) {
    return (
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh" // Center the message vertically
          sx={{
            backgroundColor: "#f9f9f9", // Light background for contrast
            borderRadius: 2,
            padding: 3,
            boxShadow: 3, // Slight shadow for depth
          }}
        >
          <Typography variant="h4" color="error" gutterBottom>
            Product Not Found
          </Typography>
          <Typography variant="body1" color="#5F5F5F" align="center">
            Sorry, the product you are looking for does not exist or has been
            removed.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.history.back()} // Navigate back to the previous page
            sx={{ marginTop: 2 }}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    );
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
      <UpdateProduct open={open} id={itemId} handleClose={handleClose} />
      <Container>
        <Grid container marginTop={2} spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ borderRadius: 2, padding: 2 }}>
              {/* Image Carousel */}
              <Slider className="custom-slider" {...sliderSettings}>
                {data.image_url && data.image_url.length > 0 ? (
                  data.image_url.map((image, index) => (
                    <Avatar
                      key={index}
                      src={"http://localhost:3000/" + image}
                      variant="rounded"
                      sx={{ width: "100%", height: 400 }} // Adjust height for better visual
                    />
                  ))
                ) : (
                  <Avatar
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/800px-No_image_available.svg.png"
                    variant="rounded"
                    sx={{ width: "100%", height: 400 }} // Adjust height for better visual
                  />
                )}
              </Slider>
              <Box padding={2}>
                <Typography variant="subtitle1" color="#5F5F5F" gutterBottom>
                  {data.created_at} {/* Formatted date */}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {data.title}
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  Tk {data.price}
                </Typography>
              </Box>
            </Paper>
            <Paper
              elevation={3}
              sx={{ borderRadius: 2, marginTop: 2, padding: 2 }}
            >
              <Typography variant="h5" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" color="initial">
                {data.description}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ borderRadius: 2, padding: 2 }}>
              <NameAvatar
                src={`http://localhost:3000/${data.profile_picture}`}
                name={data.first_name + " " + data.last_name}
              />
            </Paper>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "primary.main",
                marginTop: 2,
                padding: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                borderRadius="50%"
                backgroundColor="#EDF2F4"
                height={80}
                width={80}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <SmartphoneIcon fontSize="large" color="primary" />
              </Box>
              <Typography marginLeft={2} variant="h6" color="white.main">
                {data.phone ? data.phone : "No Phone Number "}
              </Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{ borderRadius: 2, marginTop: 2, padding: 2 }}
            >
              <Typography variant="h5" color="initial">
                Address
              </Typography>
              <hr />
              <Typography
                textAlign="justify"
                variant="body1"
                sx={{ marginRight: 1, mb: 5 }}
              >
                {data.address}
              </Typography>
              {auth.isLoggedIn && auth.id !== data.uid && (
                <MessageButton id={data.uid} />
              )}
              {auth.id === data.uid && (
                <>
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    sx={{ marginLeft: 2 }}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={deletePost}
                    variant="outlined"
                    color="secondary"
                    sx={{ marginLeft: 2 }}
                  >
                    Delete
                  </Button>
                  <Box alignItems="center" marginTop={2}>
                    {data.status !== "sold" ? (
                      <Button
                        variant="outlined"
                        sx={{
                          marginLeft: 2,
                          // Match button text color with border
                        }}
                        onClick={changeStatus}
                      >
                        Mark As Sold
                      </Button>
                    ) : (
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ marginLeft: 2 }}
                      >
                        <strong>Sold</strong> {/* Use strong for emphasis */}
                      </Typography>
                    )}
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default IndividualProduct;
