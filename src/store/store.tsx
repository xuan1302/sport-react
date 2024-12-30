import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
import loadingReducer from './loadingSlice';
const rootReducer = {
    auth: authSlice,
    loading: loadingReducer,
}
const store = configureStore({
    reducer: rootReducer
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;