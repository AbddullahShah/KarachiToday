import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {isLogin: false, isOnboard: true, userData: {}},
  reducers: {
    setUser(state, action) {
      state.isLogin = true;
      state.userData = action.payload;
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

export const {setUser, skipOnboard, logoutUser} = userSlice.actions;
export default userSlice.reducer;
