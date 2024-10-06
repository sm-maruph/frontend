import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import CardContainer from "./CardContainer";
import AddTolet from "./AddTolet";
import MyTolet from "./MyTolet";
import Bookmark from "./Bookmark";

// Main tabbed component
const TabbedComponent = ({ data, loading, fetch }) => {
  const [isSub, setIsSub] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect to watch for isSub change
  useEffect(() => {
    if (isSub) {
      setValue(0); // Redirect to 'Advertisement' tab when isSub is true
      setIsSub(false); // Reset isSub after redirecting
    }
  }, [isSub]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Advertisement" />
        <Tab label="My Advertisement" />
        <Tab label="Saved To-Let" />
        <Tab label="Post Advertisement" />
      </Tabs>
      <Box sx={{ p: 1 }}>
        {value === 0 && <CardContainer data={data} loading={loading} />}
        {value === 1 && <MyTolet />}
        {value === 2 && <Bookmark data={data} />}
        {value === 3 && <AddTolet fetch={fetch} isSub={setIsSub} />} {/* Pass setIsSub to AddTolet */}
        
      </Box>
    </Box>
  );
};

export default TabbedComponent;
