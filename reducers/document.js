import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    nom: null,
    practicien: null,
    photos: [],
    modalOuvert: false,
  },
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    changeDocumentModalStatus: (state) => {
      state.value.modalOuvert = !state.value.modalOuvert;
    },
    addPhoto: (state, action) => {
      state.value.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.value.photos = state.value.photos.filter(
        (data) => data !== action.payload
      );
    },
  },
});

export const { changeDocumentModalStatus, addPhoto, removePhoto } =
  documentSlice.actions;
export default documentSlice.reducer;
