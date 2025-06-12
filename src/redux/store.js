import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { combineReducers } from 'redux';
import crownsReducer from './slices/crownsSlice';
import settingsReducer from './slices/settingsSlice';
import themeReducer from './slices/themeSlice';

const rootReducer = combineReducers({
  crowns: crownsReducer,
  settings: settingsReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
