import { Routes, Route } from "react-router-dom";
import React from "react";
import FeedHome from "./pages/FeedHome";
import Comment from "./components/Comment";
import UpdatePost from "./pages/UpdatePost";

const FeedMain = () => {
  return (
    <Routes>
      <Route path="/*" element={<FeedHome />} />
      <Route path="/comments/:postId" element={<Comment />} />
      <Route path="/update/:postId" element={<UpdatePost />} />
    </Routes>
  );
};

export default FeedMain;
