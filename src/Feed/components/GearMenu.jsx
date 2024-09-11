import React, { useState } from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const GearMenu = ({ open, handleClose, anchorEl, children }) => {
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {children}
      </Menu>
    </div>
  );
};

export default GearMenu;
