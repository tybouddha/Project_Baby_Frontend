import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    projectId: null,
    username: null,
    prenom: null,
    email: null,
    documents: [],
    carnetBebe: [],
    rdv: [],
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
      state.value.username = action.payload.username;
      state.value.prenom = action.payload.prenom;
      state.value.documents = action.payload.documents;
      state.value.carnetBebe = action.payload.carnetBebe;
      state.value.rdv = action.payload.rdv;
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
