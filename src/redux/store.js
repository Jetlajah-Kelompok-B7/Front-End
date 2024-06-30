import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import TiketReducer from "./Reducers/TiketReducer";
import FilterHargaReducers from "./Reducers/FilterHargaReducers";
import reducersLogin from "./Reducers/reducersLogin";
import TiketReducerforSecure from "./Reducers/TiketReducerforSecure";
import DataBooking from "./Reducers/DataBooking";


const rootReducers = combineReducers({
  tiket: TiketReducer,
  filter: FilterHargaReducers,
  login: reducersLogin,
  tiket2: TiketReducerforSecure,
  booking: DataBooking,
});

const persistConfig = { key: "root", storage };

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);
