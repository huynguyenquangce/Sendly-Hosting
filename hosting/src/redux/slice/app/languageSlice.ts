import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "../../../i18n";

interface LanguageState {
  currentLanguage: string;
}

const initialState: LanguageState = {
  currentLanguage: i18n.language || "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
      i18n.changeLanguage(action.payload);
      localStorage.setItem("lang", action.payload);
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
