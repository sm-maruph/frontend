import React, { useState, useCallback, useEffect, useContext } from "react";
import Header from "./Shared/Header";
import Message from "./Message/pages/Message";
import { AuthContext } from "./Auth/AuthContext";

import Footer from "./Shared/Footer";
import Home from "./Home/Home";
import About from "./About/About";
import Market from "./Marketplace/Pages/Market";
import MainProfile from "../src/Profile/Pages/MainProfile";
import MainQuestionBank from "./QuestionBank/MainQuestionBank";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import Find from "./Marketplace/Pages/Find";
import IndividualProduct from "./Marketplace/Pages/IndividualProduct";
import Addproduct from "./Marketplace/Components/Addproduct";
import Notification from "./Shared/Notification";
import Feed from "./Feed/Feed";
const queryClient = new QueryClient();
const App = () => {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [email, setEmail] = useState(null);
  let [id, setId] = useState(null);
  let [name, setName] = useState(null);
  let [profilePicture, setProfilePicture] = useState(null);
  let [role, setRole] = useState(null);
  useEffect(() => {
    var token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      auth.login(user);
    }
  }, []);

  const login = useCallback((user) => {
    setIsLoggedIn(true);
    setEmail(user.email);
    setId(user.id);
    setProfilePicture(user.profilePicture);
    setName(user.firstName + " " + user.lastName);
    setRole(user.role);
  }, []);
  const logout = useCallback((user) => {
    setIsLoggedIn(false);
    setEmail(null);
    setId(null);
    setProfilePicture(null);
    setName(null);
    setRole(null);
    localStorage.removeItem("token");
  }, []);

  const auth = useContext(AuthContext);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthContext.Provider
          value={{
            isLoggedIn: isLoggedIn,
            email: email,
            id: id,
            name: name,
            profilePicture: profilePicture,
            role: role,
            login: login,
            logout: logout,
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notification" element={<Notification />} />

            <Route path="/feed/*" element={<Feed />} />
            <Route path="/inbox" element={<Message />} />

            <Route path="/market" element={<Market />} />
            <Route path="/alumni" element={<Find />} />
            <Route path="/individual" element={<Addproduct />} />

            <Route path="/market" element={<MainQuestionBank />} />
          
            <Route path="/myprofile" element={<MainProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/question/*" element={<MainQuestionBank />} />
          </Routes>
          <Footer />
        </AuthContext.Provider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
