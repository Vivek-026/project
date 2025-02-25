import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [], // Initial state with an empty array
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
  },
});

export const { setCards } = cardsSlice.actions;
export default cardsSlice.reducer;