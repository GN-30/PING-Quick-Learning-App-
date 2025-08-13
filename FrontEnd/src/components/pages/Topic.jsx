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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Welcome to KnowledgeSphere
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          What sparks your curiosity? Choose a few topics to personalize your
          feed.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {TOPICS.map((topic) => {
            const isSelected = selected.includes(topic);
            return (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`
                  px-4 py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-200 ease-in-out transform hover:scale-105
                  ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-400" // Style for selected
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600" // Style for not selected
                  }
                `}
              >
                {topic}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading} // Disable the button while the thunk is running
          className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Topic;
