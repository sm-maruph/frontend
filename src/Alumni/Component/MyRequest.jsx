import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  IconButton,
  Grid,
  Button,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import customImage from "../Image/250929134_4408229885970439_9204173520367789220_n.jpg";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // Import the request icon
import useFetch from "../../CustomHooks/useFetch";
import { Link } from "react-router-dom"; // Import Link from React Router
import RevertRequest from "./RevertRequest";


const MyRequest = () => {
  const { data, isLoading, isError, error } = useFetch({
    url: "http://localhost:3000/alumni/getpendingposts",
    queryKey: ["alumnimyrequestpostinfo"],
  });

  // Handle loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          width: "60%",
          margin: "4rem auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <LinearProgress sx={{ width: "100%" }} />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Loading Connected Alumni Profiles...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return <Typography>Error: {error.message}</Typography>;
  }

  // Handle no results found
  if (data.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", padding: 2 }}>
        Ops!You have not attemt any request.
      </Typography>
    );
  }

 console.log(data);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          padding: "2px 15px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#780000",
          color: "White",
          marginBottom: 2,
        }}
      >
        <PersonAddIcon sx={{ marginRight: 1 }} />
        {data.length} Requests
      </Typography>

      <Container sx={{
          padding: 2,
          minHeight: "90vh",
          overflowY: "auto",
          border: "2px solid #00000030",
          borderRadius: "8px",
        }}>
        <Grid container spacing={2}>
          {data.map((alumni) => (
            <Grid item key={alumni.id} xs={12} sm={6} md={4}>
               <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s",
                  borderRadius: "15px",
                  boxShadow: 3,
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Link
                  to={`/myprofile/${alumni.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Avatar
                    src={`http://localhost:3000/${alumni.profile_picture}`}
                    alt={alumni.first_name}
                    sx={{
                      margin: "16px auto",
                      width: "100px",
                      height: "100px",
                    }}
                  />
                </Link>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "150px",
                    textAlign: "center",
                  }}
                >
                  <Link
                    to={`/myprofile/${alumni.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          marginBottom: 1,
                          color: "primary.main",
                        }}
                      >
                        {alumni.first_name} {alumni.last_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {alumni.batch || "Batch Not Updated"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {alumni.department_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {alumni.company || "Workplace unknown"}
                      </Typography>
                    </div>
                  </Link>
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <IconButton
                      onClick={() => handleEmail(alumni.id)}
                      aria-label="email"
                    >
                      <EmailIcon />
                    </IconButton>
                    <RevertRequest id ={alumni.id} />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MyRequest;
