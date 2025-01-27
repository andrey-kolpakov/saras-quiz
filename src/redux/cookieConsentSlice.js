// cookieConsentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    consentGiven: false, // Начальное значение
};

const cookieConsentSlice = createSlice({
    name: 'cookieConsent',
    initialState,
    reducers: {
        giveConsent: (state) => {
            state.consentGiven = true;
        },
        revokeConsent: (state) => {
            state.consentGiven = false;
        },
    },
});

export const { giveConsent, revokeConsent } = cookieConsentSlice.actions;

export default cookieConsentSlice.reducer;
