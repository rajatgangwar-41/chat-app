import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

// reducer
const reducer = combineReducers({
    user: userSlice,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blackList: [appApi.reducerPath],
};

// persist store

const persistedReducer = persistReducer(persistConfig, reducer);

// create store

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware],
});

export default store;