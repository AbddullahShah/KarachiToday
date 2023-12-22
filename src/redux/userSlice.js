import { createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

const userSlice = createSlice({
  name: 'user',
  initialState: { isLogin: false, isOnboard: true, userData: {}, savedID: [] },
  reducers: {
    setUser(state, action) {
      state.isLogin = false;
      state.userData = action.payload;
    },
    setisLogin(state, action) {
      state.isLogin = action.payload;
    },
    setSavedID(state, action) {
      state.savedID = action.payload;
    },
    skipOnboard(state) {
      state.isOnboard = false;
    },
    logoutUser(state, action) {
      state.isLogin = false;
      state.userData = {};
    },
  },
});

export const { setUser, setisLogin, skipOnboard, logoutUser, setSavedID } = userSlice.actions;
export default userSlice.reducer;
