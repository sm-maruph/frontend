import React from "react";
import { Routes, Route } from "react-router-dom";
import QuestionBank from "./Pages/QuestionBank";

const MainQuestionBank = () => {
  return (
    <Routes>
      <Route path="/" element={<QuestionBank />} />
    </Routes>
  );
};

export default MainQuestionBank;
