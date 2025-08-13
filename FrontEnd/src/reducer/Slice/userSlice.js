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
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer