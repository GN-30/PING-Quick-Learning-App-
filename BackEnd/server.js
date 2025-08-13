// This server acts as a proxy to the Gemini API, handling requests from a client.

console.log("server.js is starting...");

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json({ limit: '1mb' })); // Parse JSON bodies with a 1mb limit

// API key and model configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash-preview-05-20';

// Chat endpoint for POST requests
app.post('/chat', async (req, res) => {
  try {
    console.log("Received POST /chat with body:", req.body);

    if (!req.is('application/json')) {
      return res.status(415).json({ error: 'Content-Type must be application/json' });
    }

    const { message } = req.body || {};
    if (typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Missing "message" in request body' });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Server misconfigured: GEMINI_API_KEY not set' });
    }

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: message }]
        }
      ]
    };

    console.log("Sending to Gemini:", JSON.stringify(payload, null, 2));

    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    console.log("Gemini response:", JSON.stringify(geminiRes.data, null, 2));

    const reply =
      geminiRes?.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No reply';
    return res.json({ reply });

  } catch (err) {
    console.error(
      'Gemini API error:',
      err.response?.status,
      err.response?.data || err.message
    );
    return res.status(502).json({
      error: 'Upstream AI error',
      details: err.response?.data || err.message
    });
  }
});

// Simple GET to check server status
app.get('/chat', (_req, res) => {
  res.send('Chatbot endpoint is running. Use POST to /chat with JSON { "message": "..." }');
});

// 404 fallback for all other routes
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// Start the server
app.listen(PORT, () => {
  console.log(`Chatbot server running on http://localhost:${PORT}`);
});
