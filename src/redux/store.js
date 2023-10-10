import {configureStore, combineReducers} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// slices imports
import userSlice from './userSlice';
import globalSlice from './globalSlice';
import languageSlice from './languageSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'language'],
};

let rootReducer = combineReducers({
  user: userSlice,
  globalState: globalSlice,
  language: languageSlice,
});

let reducerPersisted = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: reducerPersisted,
});
