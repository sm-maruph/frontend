import React, { useState,useContext } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@mui/material";
import ProfileCards from "./ProfileCards";
import MyList from "./MyList";
import RequestedAlumni from "./RequestedAlumni";
import MyRequest from "./MyRequest";
import {AuthContext} from "../../Auth/AuthContext";
// Main tabbed component
const TabbedComponent = ({ searchQuery, batch, department }) => {
  const auth = useContext(AuthContext);
  const [value, setValue] = useState(0);
  console.log(auth);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="All Profiles" />
        <Tab label="Connected Alumni" />

        {auth.user_type !== 'student' && <Tab label="Pending Request" />}

        <Tab label="My Request" />
      </Tabs>
      <Box sx={{ p: 1 }}>
        {value === 0 && (
          <ProfileCards 
          searchQuery={searchQuery} 
          batch={batch} 
          department={department}  
          />
        )}
        {value === 1 && <MyList />}
        {value === 2 && <RequestedAlumni />}
        {value === 3 && <MyRequest />}
      </Box>
    </Box>
  );
};

export default TabbedComponent;
