import React from "react";
import { Container, TextField, Grid, Button } from "@mui/material";

import ProfilePicture from "../../Shared/NameAvatar";
import Participants from "../components/Participants";
import Conversation from "../components/Conversation";
import SendIcon from "@mui/icons-material/Send";
import "./Message.css";

const Message = () => {
  return (
    <Container>
      <Grid container sx={{ marginTop: "50px" }}>
        <Grid xs={4} item className="message-search">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Search Conversation"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={8}>
          <ProfilePicture />
        </Grid>
        <Grid item xs={4}>
          <div className="chats">
            <Participants />
            <Participants />
            <Participants />
            <Participants />
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className="conversation">
            <Conversation />
          </div>
          <div className="message-input">
            <Grid container>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  label="Write a Message"
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginLeft: "5px", height: "55px" }}
                >
                  <SendIcon />
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Message;
