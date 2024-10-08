import React from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import HubIcon from "@mui/icons-material/Hub";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import StorefrontIcon from "@mui/icons-material/Storefront";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box position="relative" top={-82} zIndex={-2}>
      <Box position="relative">
        <img
          src="./design/UIU.jpg"
          style={{
            height: "102vh",
            width: "100%",
            position: "absolute",
            top: "0px",
            zIndex: "0",
          }}
          alt=""
        />
        <Box
          sx={{
            height: "102vh",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.692)",
            zIndex: 1,
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography
            variant="h4"
            sx={{ color: "white !important", fontStyle: "italic" }}
          >
            Welcome to our Website
          </Typography>
          <Typography variant="h1" sx={{ color: "white !important" }}>
            Solution Provider
          </Typography>
          <br />
          <br />

          <Button
            component={Link}
            to="./signup"
            variant="contained"
            sx={{ height: "60px", width: "200px", zIndex: 2 }}
          >
            Get Started
          </Button>
        </Box>
        <Box>
          <br />
          <br />
          <Typography variant="h2" textAlign="center">
            OUR SERVICES
          </Typography>
          <Typography variant="subtitle1" color="secondary" textAlign="center">
            Expert Solutions Tailored for You
          </Typography>

          <Container
            sx={{ marginTop: "50px", marginBottom: "50px" }}
            maxWidth="xl"
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              gap={20}
            >
              <Box className="services">
                <HubIcon
                  sx={{ height: "100px", width: "100px" }}
                  color="primary"
                />
                <br />
                <Typography variant="h4" color="secondary" textAlign="center">
                  Comunication
                </Typography>
                <br />
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  textAlign="justify"
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
                  dolor fugit iusto, ratione harum dolorum dignissimos totam!
                  Consequuntur, nisi dolorem! Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Magnam ea veniam itaque nostrum
                  aut magni quam, tempore dolore hic saepe.
                </Typography>
                <br />
                <br />
                <Button
                  variant="contained"
                  sx={{ height: "60px", width: "200px" }}
                >
                  VIEW
                </Button>
              </Box>
              <Box className="services">
                <ContentPasteSearchIcon
                  sx={{ height: "100px", width: "100px" }}
                  color="primary"
                />
                <br />
                <Typography variant="h4" color="secondary" textAlign="center">
                  Student Portal
                </Typography>
                <br />
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  textAlign="justify"
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
                  dolor fugit iusto, ratione harum dolorum dignissimos totam!
                  Consequuntur, nisi dolorem! Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Magnam ea veniam itaque nostrum
                  aut magni quam, tempore dolore hic saepe.
                </Typography>
                <br />
                <br />
                <Button
                  variant="contained"
                  sx={{ height: "60px", width: "200px" }}
                >
                  VIEW
                </Button>
              </Box>
              <Box className="services">
                <StorefrontIcon
                  sx={{ height: "100px", width: "100px" }}
                  color="primary"
                />
                <br />
                <Typography variant="h4" color="secondary" textAlign="center">
                  Market Place
                </Typography>
                <br />
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  textAlign="justify"
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
                  dolor fugit iusto, ratione harum dolorum dignissimos totam!
                  Consequuntur, nisi dolorem! Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Magnam ea veniam itaque nostrum
                  aut magni quam, tempore dolore hic saepe.
                </Typography>
                <br />
                <br />
                <Button
                  variant="contained"
                  sx={{ height: "60px", width: "200px" }}
                >
                  VIEW
                </Button>
              </Box>
            </Box>
          </Container>
          <Box
            component="div"
            marginTop={10}
            sx={{
              backgroundColor: "#011627 !important",
              height: "600px",
              width: "100%",
              paddingTop: "200px",
            }}
          >
            <Container maxWidth="xl">
              <br />
              <br />
              <Typography
                variant="h3"
                sx={{ color: "white !important" }}
                textAlign="center"
              >
                We will help you to grow
              </Typography>
              <br />
              <br />
              <br />
              <br />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flex="row"
                gap={15}
              >
                <Box>
                  <Typography
                    variant="h1"
                    sx={{ color: "white !important" }}
                    textAlign="center"
                  >
                    1000+
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: "white !important" }}
                    textAlign="center"
                  >
                    Students
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h1"
                    sx={{ color: "white !important" }}
                    textAlign="center"
                  >
                    2000+
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: "white !important" }}
                    textAlign="center"
                  >
                    Resources
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h1"
                    sx={{ color: "white !important" }}
                    textAlign="center"
                  >
                    990+
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: "white !important" }}
                    textAlign="center"
                  >
                    Alumni
                  </Typography>
                </Box>
              </Box>
            </Container>
          </Box>

          <Box
            sx={{
              backgroundColor: "#EDF2F4 !important",
              height: "700px",
              width: "100%",
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box display="flex" alignItems="center" gap={0}>
              <img
                src="./profileImage.webp"
                style={{ height: "500px", width: "600px" }}
                alt=""
              />
              <div
                style={{
                  height: "350px",
                  width: "10px",
                  backgroundColor: "#780000",
                }}
              ></div>
              <Box
                sx={{
                  height: "500px",
                  width: "600px",
                  backgroundColor: "#EDF2F4",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h3" color="primary">
                  OUR GOAL
                </Typography>
                <Typography variant="subtitle1" padding={8} textAlign="justify">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Placeat vel asperiores reprehenderit incidunt! Ut dolorem
                  nobis necessitatibus, dolore enim recusandae. Lorem ipsum
                  dolor sit amet consectetur, adipisicing elit. Adipisci
                  explicabo deserunt voluptatum illo provident tempora
                  perspiciatis eaque dignissimos. Quia nisi facilis, temporibus
                  possimus consequatur cumque ea eum officiis eos. Quae et
                  deleniti nihil perspiciatis amet odit qui cumque dolores
                  fugit.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
