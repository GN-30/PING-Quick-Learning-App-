// src/pages/TopicSelection.js

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Make sure this path is correct for your project
import { updateUserTopics } from "../../reducer/Slice/userSlice";

// --- Hardcoded list of topics ---
const TOPICS = [
  "Artificial Intelligence",
  "History",
  "Science",
  "Technology",
  "Philosophy",
  "Art",
  "Economics",
  "Health & Wellness",
  "Space Exploration",
  "Psychology",
  "Literature",
  "Geopolitics",
  "Climate Change",
  "Quantum Physics",
  "Stoicism",
];

const Topic = () => {
  // Local state to track selections before submitting. This makes the UI feel instant.
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user info and loading status directly from the Redux store
  const { uid, loading } = useSelector((state) => state.user);

  // --- Handle clicking on a topic button ---
  const handleTopicClick = (topic) => {
    // Check if the topic is already in our local 'selected' array
    if (selected.includes(topic)) {
      // If it is, filter it out (this is how you deselect)
      setSelected(selected.filter((t) => t !== topic));
    } else {
      // If it's not, add it to the array (this is how you select)
      setSelected([...selected, topic]);
    }
  };

  // --- Handle submitting the selected topics ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!uid) {
      console.error("No user found to update topics for.");
      return;
    }
    // Simple validation: make sure the user selects at least a few topics.
    if (selected.length < 3) {
      alert("Please select at least 3 topics to continue.");
      return;
    }

    // Dispatch our async thunk with the userId and the selected topics
    dispatch(updateUserTopics({ userId: uid, topics: selected }))
      .unwrap() // .unwrap() is a Redux Toolkit helper that makes promises easier to handle
      .then(() => {
        console.log("Topics updated successfully!");
        // Navigate to the main feed or dashboard after a successful update
        navigate("/feed");
      })
      .catch((error) => {
        console.error("Failed to update topics:", error);
        alert("Could not save your topics. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-3xl text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 drop-shadow-lg">
          Welcome to KnowledgeSphere
        </h1>
        <p className="text-lg text-gray-300 mb-10">
          What sparks your curiosity? Choose a few topics to personalize your
          feed.
        </p>

        {/* Topic Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {TOPICS.map((topic) => {
            const isSelected = selected.includes(topic);
            return (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`
              px-5 py-2.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer
              ${
                isSelected
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white ring-2 ring-blue-300 "
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
              }
            `}
              >
                {topic}
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full max-w-xs bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Topic;
