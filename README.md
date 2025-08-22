# PING

**Scroll Smarter, Not Harder.**  
KnowledgeSphere is an AI-powered content platform that transforms learning into an addictive, personalized experience. It replaces mindless scrolling with an infinite reel of fascinating facts and foundational knowledge, tailored to your unique interests.

---

## **Key Features**

- **Personalized Feed:** Choose your topics of interest, and your feed is instantly customized.  
- **AI-Powered Fact Reel:** Press the Down Arrow key to get a fresh, insightful fact generated in real-time by the **Mistral Mixtral 8x7B AI model**.  
- **Modern & Fast UI:** Built with **React** and **Redux** for a seamless user experience.  
- **Secure Authentication:** User accounts are securely managed using **Firebase Authentication**.

---

## **How It Works**

1. **Sign Up:** Create a secure account using your email and password.  
2. **Select Topics:** Choose at least three topics that spark your curiosity.  
3. **Start Learning:** Navigate to your personalized feed and press the **ArrowDown** key.  
4. **Instant Knowledge:** The app randomly picks a topic, calls the **Mistral AI**, and displays a fascinating insight.  
5. **Keep Scrolling:** Press the down arrow for an endless stream of knowledge!  

---

## **Tech Stack**

- **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS  
- **Backend & Authentication:** Firebase (Authentication & Firestore)  
- **AI Model:** Mistral Mixtral 8x7B Instruct via Together.ai API  

---

## **Setup and Installation**

### Clone the Repository
```bash
git clone https://github.com/GN-30/PING-Quick-Learning-App-

## **Install Dependencies**

```bash
npm install

Create a .env file in the root directory and add your API keys:

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

# Start the Development Server
npm run dev


