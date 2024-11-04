import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    projectId: null,
    username: null,
    email: null,
    tokenProject: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(`- dans Redux: loginUser 🔔`);
      state.value.token = action.payload.token;
      state.value.projectId = action.payload.projectId;
      state.value.tokenProject = action.payload.tokenProject;
      state.value.username = action.payload.username;
      console.log(`- dans Redux: loginUser fini 🏁`);
    },
    logoutUser: (state) => {
      console.log(`- dans Redux: logoutUser 🔔`);
      state.value.token = null;
      state.value.username = null;
      state.value.tokenProject = null;
      state.value.projectId = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
