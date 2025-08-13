import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,

  uid: null,
  email: null,
  name: null,
  
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
      state.loading = false; 
      state.error = null; 
    },
    clearUser: (state) => {
      
      state.isAuthenticated = false;
      state.uid = null;
      state.email = null
      state.name = null
     
      
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
})

// Action creators are generated for each case reducer function
export const { setUser,clearUser,setLoading,setError } = userSlice.actions

export default userSlice.reducer