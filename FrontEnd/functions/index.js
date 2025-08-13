// functions/index.js

const functions = require("firebase-functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// --- IMPORTANT: Initialize the Gemini AI with your API Key ---
// For this to work, you must store your API key in the environment configuration.
// Run this command in your terminal from the functions directory:
// firebase functions:config:set gemini.key="YOUR_API_KEY"
// Then, you can access it securely like this:
const API_KEY = functions.config().gemini.key;

// If you prefer to test without setting the config, you can temporarily place the key here,
// but it's not recommended for production.
// const API_KEY = "YOUR_API_KEY"; // Replace with your actual key for testing only

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });


// --- This is our main callable function ---
exports.getFactForTopic = functions.https.onCall(async (data, context) => {
  // 1. Check if the user is authenticated. This is a security best practice.
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  // 2. Get the topic sent from your React app.
  const topic = data.topic;
  if (!topic) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with a 'topic' argument."
    );
  }

  console.log(`Received request for topic: ${topic}`);

  // 3. Construct the detailed prompt.
  const prompt = `Search the web for a significant development in ${topic} within the last month. Summarize it as a single, interesting fact and provide the source URL. Format the response as: FACT: [The fact]. SOURCE: [The source URL or name].`;

  try {
    // 4. Call the Gemini API.
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Response from Gemini:", text);

    // 5. Parse the response to separate the fact and the source.
    let fact = "Could not parse fact.";
    let source = "No source found.";

    if (text.includes("FACT:") && text.includes("SOURCE:")) {
      fact = text.split("FACT:")[1].split("SOURCE:")[0].trim();
      source = text.split("SOURCE:")[1].trim();
    } else {
      // If the format isn't perfect, just return the whole text as the fact.
      fact = text;
    }

    // 6. Return the structured data to your React app.
    return { fact, source };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to call Gemini API."
    );
  }
});