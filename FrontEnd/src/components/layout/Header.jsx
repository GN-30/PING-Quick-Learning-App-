import React, { useState } from "react";
import { Link } from "react-router-dom";
import Chatbot from "../../Chatbot/Chatbot";
import LogoutWrapper from "../../Wrapper/Logoutwrapper";

const Header = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      <header className="py-6 px-6 sm:px-10 md:px-16 flex justify-between items-center bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-lg">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-teal-400 rounded-full shadow-md"></div>
          <a
            href="#"
            className="text-lg font-bold text-white hover:text-blue-400 transition-colors duration-300"
          >
            PING
          </a>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300"
          >
            Our Pricing
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300"
          >
            How it works
          </a>
          <Link
            to="signup"
            className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300"
          >
            Signup
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4 cursor-pointer">
          <LogoutWrapper>
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 transform hover:scale-105 pointer-events-auto"
            >
              Login
            </Link>
          </LogoutWrapper>

          <button
            className="bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => setShowChatbot((prev) => !prev)}
          >
            {showChatbot ? "Close Chatbot" : "Open Chatbot"}
          </button>
        </div>
      </header>

      {showChatbot && <Chatbot />}
    </>
  );
};

export default Header;
