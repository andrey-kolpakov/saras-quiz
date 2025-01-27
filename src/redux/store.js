// store.js
import { configureStore } from '@reduxjs/toolkit';
import cookieConsentReducer from './cookieConsentSlice';

export const store = configureStore({
    reducer: {
        cookieConsent: cookieConsentReducer,
    },
});
