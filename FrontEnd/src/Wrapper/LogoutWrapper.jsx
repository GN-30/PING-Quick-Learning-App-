import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

import { clearUser } from "../reducer/Slice/userSlice";

const LogoutWrapper = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return isAuthenticated ? (
    <button
      onClick={handleLogout}
      className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
    >
      Logout
    </button>
  ) : (
    children
  );
};

export default LogoutWrapper;
