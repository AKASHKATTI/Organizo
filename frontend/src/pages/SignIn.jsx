import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/Button";
import { LOGIN } from "../utils/API_Paths";
import { AuthContext } from "../AuthContext.jsx";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(LOGIN, {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setUser(data.user); // Instantly update the user state
      navigate("/");
    } catch (error) {
      console.error("Sign-in failed:", error);
      alert(error.response?.data?.message || "Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing In..." : "Sign In"}</Button>
        </form>
        <p className="mt-6 text-center text-sm">Don't have an account? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link></p>
      </div>
    </div>
  );
};

export default SignIn;