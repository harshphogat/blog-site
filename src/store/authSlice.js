import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  status: false,
  userData: null,
  allPost: null,
  userPost: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //function inside reducers are actions
    login: (state, action) => {
      state.status = true;
      console.log("STORE LOGIN DATA , ", action.payload.userData)
      state.userData = action.payload.userData;
    },
    logout: (state, action) => {
      state.status = false;
      state.userData = null;
      state.allPost = null;
      state.userPost = null;
    },
    getUserPost : (state,action) => {
      state.userPost = action.payload;
      console.log("USER POSTS IN STORE: ", action.payload);
    },
    getAllPost : (state, action) => {
      state.allPost = action.payload;
      console.log("ALL POST IN STORE : ", action.payload);
    }

  },
});

export const { login, logout, getAllPost, getUserPost } = authSlice.actions;

export default authSlice.reducer;
