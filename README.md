PING
Scroll Smarter, Not Harder. KnowledgeSphere is an AI-powered content platform that transforms learning into an addictive, personalized experience. It replaces mindless scrolling with an infinite reel of fascinating facts and foundational knowledge, tailored to your unique interests.

Key Features
Personalized Feed: Onboarding is simple. Choose your topics of interest, and your entire feed is instantly customized.

AI-Powered Fact Reel: Press the Down Arrow key to get a fresh, insightful fact about one of your chosen topics, generated in real-time by the Mistral Mixtral 8x7B AI model.

Sourced & Credible: Every piece of knowledge is accompanied by a source URL, ensuring the information is verifiable and comes from a reputable place.

Modern & Fast UI: Built with React and Redux for a seamless and responsive user experience.

Secure Authentication: User accounts are securely managed using Firebase Authentication.

How It Works
The user experience is designed to be as simple and intuitive as possible:

Sign Up: Create a secure account using your email and password.

Select Topics: You're greeted with a list of topics. Choose at least three that spark your curiosity. This fuels the AI engine.

Start Learning: You're taken to your personalized feed. Press the ArrowDown key.

Instant Knowledge: The app picks one of your topics at random, calls the Mistral AI to generate a fascinating insight, and displays it on your screen.

Keep Scrolling: Continue pressing the down arrow for an endless stream of knowledge!

Tech Stack
Frontend: React, Vite, Redux Toolkit, Tailwind CSS

Backend & Authentication: Firebase (Authentication & Firestore)

AI Model: Mistral: Mixtral 8x7B Instruct via the Together.ai API

🚀 Setup and Installation
To get this project running locally, follow these steps:

1. Clone the Repository
git clone https://github.com/GN-30/PING-Quick-Learning-App-

2. Install Dependencies
Install all the necessary packages for the project.

npm install

3. Set Up Environment Variables
This is the most crucial step. The application requires API keys from both Firebase and your Mistral API provider to function.

Create a new file in the root directory of the project named .env.

Copy the following content into the .env file and fill in your unique keys. Do not use quotes around the keys.

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_MEASUREMENT_ID=your_firebase_measurement_id

# Mistral AI Configuration
VITE_MISTRAL_API_KEY=your_mistral_api_key

You can find your Firebase configuration details in your Firebase project settings.

4. Start the Development Server
Once the dependencies are installed and your environment variables are set, you can start the app.

npm run dev

The application should now be running on http://localhost:5173 (or another port if 5173 is in use).

Usage
Sign Up / Login to your account.

If you are a new user, select your topics of interest.

On the main feed page, press the ArrowDown key on your keyboard to fetch a new fact.

🔮 Future Work
This project has a solid foundation, but there's always room to grow. Here are some potential features for the future:

"Go Deeper" Button: Allow users to request a more detailed explanation or related sub-topics for any fact.

Save & Bookmark: Implement a feature to save favorite facts to a personal library.

Visual Feed: Integrate an image generation API to create a unique cover image for each fact card.

Social Features: Add user profiles and the ability to follow other users to see what they're learning.

Contributing
Contributions are welcome! If you have suggestions for improvements or want to add new features, please feel free to open an issue or submit a pull request.
