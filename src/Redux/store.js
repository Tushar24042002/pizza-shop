import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducers/index';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['register'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    rootReducer: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
