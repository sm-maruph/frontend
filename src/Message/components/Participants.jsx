import React from "react";
import { Avatar } from "@mui/material";

import ProfilePicture from "../../Shared/NameAvatar";

import "./Participants.css";
const Participants = () => {
  return (
    <div className="dp">
      <Avatar src="./profileImage.webp" sx={{ height: 50, width: 50 }} />
      <div style={{ marginLeft: "20px" }}>
        <h5 style={{ margin: 0 }}>Nadib Ahsan</h5>
        <p style={{ margin: 0 }}>Lorem ipsum dolor sit ashd asdas bdkasjdk</p>
      </div>

      <p className="time">12:34 PM</p>
    </div>
  );
};

export default Participants;
