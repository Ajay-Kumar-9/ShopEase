"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "@/redux/wishListSlice"; // ✅ import wishlist slice

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";


const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

// 🧠 Combine all reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer, // ✅ include wishlist
});

// ✅ Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "wishlist"], // ✅ persist both cart and wishlist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🎯 Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 🔁 Persistor for wrapping app
export const persistor = persistStore(store);

// 🧾 Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
