import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  IconButton,
  LinearProgress,
  Grid,
  Button,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PendingActionsIcon from "@mui/icons-material/PendingActions"; // Importing PendingActions icon
import useFetch from "../../CustomHooks/useFetch";
import { Link } from "react-router-dom"; // Import Link from React Router
import RequestAcceptButton from "./RequestAcceptButton";
import RevertRequest from "./RevertRequest";

const RequestedAlumni = () => {
  const { data, isLoading, isError, error } = useFetch({
    url: "http://localhost:3000/alumni/getconnectingposts",
    queryKey: ["alumniconnectingrequestpostinfo"],
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
          Loading My Connecting Requests...
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
        No alumni found matching your criteria.
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
        <PendingActionsIcon sx={{ marginRight: 1 }} />
        {data.length} Pending
      </Typography>

      <Container
        sx={{
          padding: 2,
          minHeight: "90vh",
          overflowY: "auto",
          border: "2px solid #00000030",
          borderRadius: "8px",
        }}
      >
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
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <IconButton
                      onClick={() => handleEmail(alumni.id)}
                      aria-label="email"
                      color="primary"
                    >
                      <EmailIcon />
                    </IconButton>

                    <IconButton aria-label="accept" color="success">
                      <RequestAcceptButton id={alumni.id} />
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

export default RequestedAlumni;
