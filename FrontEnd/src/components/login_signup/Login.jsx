import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { auth, db } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "../../reducer/Slice/userSlice";

const JFinanceLogo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="black" />
    <path
      d="M16.84 24V19.4C16.84 18.2 17.84 17.2 19 17.2H21C22.16 17.2 23.12 16.24 23.12 15V11C23.12 9.34 21.78 8 20.12 8H12C10.34 8 9 9.34 9 11V21C9 22.66 10.34 24 12 24H16.84Z"
      fill="white"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg
    className="w-5 h-5 mr-3"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44.5 24.3H42.5V24.3C42.5 23.1 42.4 22 42.2 20.9H24V28.9H35.4C34.8 31.4 33.1 33.5 30.6 35.1V40.1H37.3C41.8 36.1 44.5 30.6 44.5 24.3Z"
      fill="#4285F4"
    />
    <path
      d="M24 45C30.2 45 35.4 42.8 38.6 39.1L32.1 34.1C30 35.5 27.2 36.5 24 36.5C17.6 36.5 12.2 32.1 10.4 26.1H3.6V31.1C6.6 39.2 14.6 45 24 45Z"
      fill="#34A853"
    />
    <path
      d="M10.4 26.1C10 24.9 9.8 23.7 9.8 22.5C9.8 21.3 10 20.1 10.4 18.9V13.9H3.6C1.6 17.1 0.5 20.7 0.5 24.5C0.5 28.3 1.6 31.9 3.6 35.1L10.4 26.1Z"
      fill="#FBBC05"
    />
    <path
      d="M24 8.5C27.3 8.5 30.1 9.6 32.4 11.8L38.8 5.4C35.4 2.3 30.2 0 24 0C14.6 0 6.6 5.8 3.6 13.9L10.4 18.9C12.2 12.9 17.6 8.5 24 8.5Z"
      fill="#EA4335"
    />
  </svg>
);

const EyeIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a10.05 10.05 0 013.543-5.175M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c1.554 0 3.042.44 4.354 1.243m2.93 2.93a10.05 10.05 0 012.258 2.827-10.05 10.05 0 01-12.43 4.493M1 1l22 22"
    />
  </svg>
);

// --- Main App Component ---

const Login = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, handleSubmit } = useForm();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const loginhandler = async (credentials) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const firebaseUser = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      const userProfile = userDoc.data();

      const completeUserData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        isAuthenticated: true,

        name: userProfile.name,
        referralId: userProfile.referralId,
        totalDonations: userProfile.totalDonations || 0,
      };

      dispatch(setUser(completeUserData));

      console.log(userProfile);

      Navigate("/topics");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center font-sans p-4">
      <div className="relative flex w-full max-w-4xl bg-white/90 dark:bg-gray-900/80 rounded-3xl shadow-2xl overflow-hidden my-8 backdrop-blur-md">
        {/* Left Panel: Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <h1 className="ml-3 text-2xl font-bold text-gray-800 dark:text-white">
              PING
            </h1>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mb-8">
            Please enter log in details below
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit(loginhandler)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/70 dark:bg-gray-800/70 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition backdrop-blur-sm"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                {...register("password")}
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/70 dark:bg-gray-800/70 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition backdrop-blur-sm"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
              >
                {passwordVisible ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Sign in
            </button>
          </form>

          <div className="flex items-center my-8">
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            <span className="mx-4 text-gray-400 dark:text-gray-500 text-sm">
              or continue
            </span>
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          </div>

          <button className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-md cursor-pointer">
            <GoogleIcon />
            Log in with Google
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-indigo-600 font-semibold hover:text-indigo-500 hover:underline transition-colors"
            >
              Sign Up
            </a>
          </p>
        </div>

        {/* Right Panel: Illustration */}
        <div className="hidden md:flex w-1/2 p-12 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white flex-col items-center justify-center relative overflow-hidden rounded-r-3xl">
          {/* Abstract shapes */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500 rounded-full opacity-20 animate-pulse-slow"></div>
          <div className="absolute -bottom-16 -left-12 w-40 h-40 bg-green-400 rounded-full opacity-10 animate-pulse-slow"></div>

          <h2 className="text-3xl font-bold text-center mb-3 z-10">
            Learn Anytime, Anywhere
          </h2>
          <p className="text-center text-gray-400 max-w-xs z-10">
            Access your courses, track progress, and grow your skills from any
            device
          </p>

          <div className="flex space-x-2 mt-8 z-10">
            <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce-slow"></div>
            <div className="w-2 h-2 rounded-full bg-white animate-bounce-slow delay-200"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce-slow delay-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
