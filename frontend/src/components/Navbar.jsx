import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import { Button } from "./ui/Button";

const Navbar = () => {
  const { user, logout  , setUser } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Organizo
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden font-medium text-gray-700 sm:block">
                Hello, {user.name}
              </span>
              <Button
                onClick={logout}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="hidden sm:block"
                onClick={() => navigate("/signin")}
              >
                Login
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;