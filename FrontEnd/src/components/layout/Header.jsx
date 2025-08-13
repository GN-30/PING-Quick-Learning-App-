import React, { useState } from "react";
import { Link } from "react-router-dom";
import Chatbot from "../../Chatbot/Chatbot";
import LogoutWrapper from "../../Wrapper/Logoutwrapper";

const Header = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      <header className="py-6 px-4 sm:px-8 md:px-16 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-black rounded-full"></div>
          <a
            href="#"
            className="ml-4 text-sm font-medium text-gray-600 hover:text-black"
          >
            / hello@knowledgesphere.app
          </a>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            Our Pricing
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            How it works
          </a>
          <Link
            to="signup"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            Signup
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <LogoutWrapper>
            <Link
              to="/login"
              className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
            >
              Login
            </Link>
          </LogoutWrapper>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-800 transition"
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
