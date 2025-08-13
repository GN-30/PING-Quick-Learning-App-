import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";

// This component now uses the native fetch API, so the Google AI package is no longer needed.

const API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;
const MISTRAL_API_URL = "https://openrouter.ai/api/v1/chat/completions"; // Using Together.ai as a popular endpoint for Mixtral

const Feed = () => {
  const user = useSelector((state) => state.user);
  const { selectedTopics, name } = user;

  const [facts, setFacts] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(""); // State to show the current topic
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false);

  const fetchNewFact = useCallback(async () => {
    if (loadingRef.current || !selectedTopics || selectedTopics.length === 0) {
      return;
    }

    loadingRef.current = true;
    setIsLoading(true);

    const randomIndex = Math.floor(Math.random() * selectedTopics.length);
    const randomTopic = selectedTopics[randomIndex];
    setCurrentTopic(randomTopic); // Set the topic to display in the UI

    const maxRetries = 3;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const prompt = `
Act as a brilliant science communicator and captivating educator. Your goal is to provide a user with a single, memorable piece of knowledge about "${randomTopic}" that makes them feel smarter.

Find a fascinating, non-obvious, and foundational concept or a surprising recent discovery related to this topic. Avoid common knowledge or simple definitions. Instead, focus on the 'why' or 'how' behind a concept, a surprising connection to another field, or a key historical turning point that changed our understanding.

The explanation should be concise (around 150 words) and written in clear, engaging language for a curious adult.


Strictly format your entire response as:
FACT: [The fascinating fact or explanation].
`;

        const response = await fetch(MISTRAL_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "mistralai/mixtral-8x7b-instruct",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 256,
          }),
        });

        if (!response.ok) {
          // Throw an error to be caught by the catch block, including the status code
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const text = result.choices[0].message.content;

        let fact = "Could not parse fact.";
        let source = "No source found.";
        if (text.includes("FACT:") && text.includes("SOURCE:")) {
          fact = text.split("FACT:")[1].split("SOURCE:")[0].trim();
          source = text.split("SOURCE:")[1].trim();
        } else {
          fact = text;
        }

        setFacts((prevFacts) => [
          { fact, source, topic: randomTopic },
          ...prevFacts,
        ]);

        setIsLoading(false);
        loadingRef.current = false;
        return;
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error.message);

        if (error.message && error.message.includes("429")) {
          setFacts((prevFacts) => [
            {
              fact: "You've reached the daily request limit for this API. Please try again tomorrow!",
              source: "",
              topic: "API Limit Reached",
            },
            ...prevFacts,
          ]);
          setIsLoading(false);
          loadingRef.current = false;
          return;
        }

        if (attempt === maxRetries - 1) {
          console.error("All retry attempts failed.");
          setIsLoading(false);
          loadingRef.current = false;
        } else {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
  }, [selectedTopics]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        fetchNewFact();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fetchNewFact]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-3xl text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 drop-shadow-lg">
          Welcome, {name}
        </h1>

        {facts.length === 0 && !isLoading && (
          <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg backdrop-blur-md border border-gray-700 animate-pulse">
            <p className="text-lg text-gray-300">
              Press the{" "}
              <span className="font-bold text-blue-400">Down Arrow</span> key to
              get your first fact.
            </p>
          </div>
        )}

        {isLoading && facts.length === 0 && (
          <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg backdrop-blur-md border border-gray-700">
            <p className="text-lg text-gray-300">
              Searching for your first fact about{" "}
              <span className="font-semibold text-blue-400">
                {currentTopic}
              </span>
              ...
            </p>
          </div>
        )}

        {facts.length > 0 && (
          <div className="bg-gray-900/80 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:shadow-blue-500/20 transition-all duration-500 animate-fade-in">
            <p className="text-sm uppercase tracking-widest font-semibold text-blue-400 mb-3">
              Topic: {facts[0].topic}
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-4 text-gray-200">
              {facts[0].fact}
            </p>
            {facts[0].source && (
              <p className="text-sm text-gray-400">
                Source:{" "}
                <a
                  href={facts[0].source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-300 transition-colors"
                >
                  {facts[0].source}
                </a>
              </p>
            )}
            {isLoading && (
              <p className="text-sm text-gray-500 mt-4 animate-pulse">
                Searching for a fact about{" "}
                <span className="font-semibold">{currentTopic}</span>...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
