import {createSlice} from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {isLoader: false},
  reducers: {
    setLoader(state, action) {
      state.isLoader = action.payload;
    },
  },
});

export const {setLoader} = globalSlice.actions;
export default globalSlice.reducer;
