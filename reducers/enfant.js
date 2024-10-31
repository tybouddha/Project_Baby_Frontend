import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    projectId: null,
    prenom: null,
    token: null,
  },
};

export const enfantSlice = createSlice({
  name: "enfant",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(
        `- dans Redux: si enfant present dans la collection project 🔔`
      );
      state.value.projectId = action.payload.project._id;
      state.value.prenom = action.payload.prenom;
    },
  },
});

export const { actionEnfant } = enfantSlice.actions;
export default enfantSlice.reducer;
