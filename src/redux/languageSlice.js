import {createSlice} from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {selectedLang: 0, isSelectedLang: false},
  reducers: {
    setLanguage(state, action) {
      state.selectedLang = action.payload;
      state.isSelectedLang = true;
    },
  },
});

export const {setLanguage} = languageSlice.actions;
export default languageSlice.reducer;
