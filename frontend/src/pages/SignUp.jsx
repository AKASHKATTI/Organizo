import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {REGISTER } from "../utils/API_Paths";

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        REGISTER,
        {
          name : username ,
          email,
          password,
        }
      );

      console.log(response.data);

      // / Example: store token if backend returns one
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSignUp}
      className="flex flex-col max-w-md gap-4 mx-auto mt-10"
    >
      <div>
        <p>User Name</p>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </div>

      <div>
        <p>Email</p>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>

      <div>
        <p>Password</p>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>

      <p>
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-600 underline">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignUp;