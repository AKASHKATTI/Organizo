import React from "react";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateTaskPage from "./pages/CreateTaskPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import EditTaskPage from "./pages/EditTaskPage";
import ViewTask from "./pages/ViewTask";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./AuthContext.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          
          <Route path="/create-task" element={<CreateTaskPage />} />
          <Route path="/view-task/:slug" element={<ViewTask />} />
          <Route path="/edit-task/:slug" element={<EditTaskPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;