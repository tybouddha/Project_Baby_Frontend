import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    nom: null,
    practicien: null,
    notes: null,
    photos: [],
    modalOuvert: false,
  },
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    sauvgaurderDocumentInfos: (state, action) => {
      state.value.nom = action.payload.nom;
      state.value.practicien = action.payload.practicien;
      state.value.notes = action.payload.notes;
    },
    documentModalRestOuvert: (state) => {
      state.value.modalOuvert = true;
    },
    doucumentModalResterFermer: (state) => {
      state.value.modalOuvert = false;
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

export const {
  sauvgaurderDocumentInfos,
  documentModalRestOuvert,
  doucumentModalResterFermer,
  addPhoto,
  removePhoto,
} = documentSlice.actions;
export default documentSlice.reducer;
