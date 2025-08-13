import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' // CHANGE 1: Import createAsyncThunk
import { db } from '../../config/firebase'; // Make sure this path is correct for your project
import { doc, updateDoc } from 'firebase/firestore'; // CHANGE 2: Import firestore functions

// --- CHANGE 3: Define the Async Thunk ---
// This is the "special agent" function.
export const updateUserTopics = createAsyncThunk(
  'user/updateTopics', // This is a unique name for this action
  async ({ userId, topics }, { rejectWithValue }) => {
    try {
      // Get a reference to the user's document in Firestore
      const userDocRef = doc(db, 'users', userId);

      // Update the document with the new array of topics
      await updateDoc(userDocRef, {
        selectedTopics: topics,
      });

      // If successful, return the topics. This becomes the "payload" of the 'fulfilled' action.
      return topics;
    } catch (error) {
      // If there's an error, send back the error message.
      console.error("Error updating topics in Firestore: ", error);
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,

  uid: null,
  email: null,
  name: null,
  
  selectedTopics: [],

  createdAt: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.selectedTopics = action.payload.selectedTopics || []; 
      state.loading = false; 
      state.error = null; 
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.uid = null;
      state.email = null
      state.name = null
      state.selectedTopics = [];
      state.createdAt = null;
      state.error = null;
      state.loading = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  // --- CHANGE 4: Handle the thunk's status reports ---
  extraReducers: (builder) => {
    builder
      .addCase(updateUserTopics.pending, (state) => {
        // When the agent starts working, set loading to true.
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserTopics.fulfilled, (state, action) => {
        // When the agent succeeds:
        state.loading = false;
        // Update our Redux state with the topics from the successful payload.
        state.selectedTopics = action.payload;
      })
      .addCase(updateUserTopics.rejected, (state, action) => {
        // If the agent fails:
        state.loading = false;
        // Store the error message it sent back.
        state.error = action.payload;
      });
  },
})

export const { setUser,clearUser,setLoading,setError } = userSlice.actions

export default userSlice.reducer
