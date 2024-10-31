import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    projectId: null,
    username: null,
    prenom: null,
    email: null,
    documentsArr: [],
    carnetBebeArr: [],
    rdvArr: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(`- dans Redux: loginUser 🔔`);
      state.value.token = action.payload.token;
      state.value.projectId = action.payload.project._id;
      state.value.tokenProject = action.payload.project.token;
      console.log(`- dans Redux: loginUser fini 🏁`);
    },
    logoutUser: (state) => {
      console.log(`- dans Redux: logoutUser 🔔`);
      state.value.token = null;
      state.value.username = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
