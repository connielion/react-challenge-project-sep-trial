import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const reducer = {
  auth: authSlice,
};

const store = configureStore({
  reducer,
});

export default store;
