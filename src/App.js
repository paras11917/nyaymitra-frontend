import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import '../src/pages/Styles.css'
import Home from "./pages/Home";
import Post from "./pages/Post";
import UserPage from "./pages/UserPage";
import LawyerPage from "./pages/LawyerPage";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import LawyerLogin from "./pages/LawyerLogin";
import LawyerRegister from "./pages/LawyerRegister";
import Chat from "./pages/ChatL";
import Chatbot from "./pages/Chatbot";
import Connect from "./pages/Connect";
import ChatL from "./pages/ChatL";
import ChatU from "./pages/ChatU";
import Navigation from "./pages/Navigation";
import Updates from "./components/Updates";
import CaseStatusTracking from "./components/CaseStatusTracking";
import Community from "./pages/Community";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="user/login" element={<UserLogin />} />
          <Route path="user/register" element={<UserRegister />} />
          <Route path="lawyer/login" element={<LawyerLogin />} />
          <Route path="lawyer/register" element={<LawyerRegister />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/user/userpage" element={<UserPage />} />
          <Route path="/lawyer/lawyerpage" element={<LawyerPage />} />
          <Route path="/chatl" element={<ChatL />} />
          <Route path="/chatu" element={<ChatU />} />

          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/connect" element={<Connect />} />

          <Route path="/updates" element={<Updates />} />
          <Route path="/tracking" element={<CaseStatusTracking />} />
          <Route path="/community" element={<Community />} />



        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
