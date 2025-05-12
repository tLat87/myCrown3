import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    musicOn: false,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleMusic: (state) => {
            state.musicOn = !state.musicOn;
        },
        setMusic: (state, action) => {
            state.musicOn = action.payload;
        },
    },
});

export const { toggleMusic, setMusic } = settingsSlice.actions;

export default settingsSlice.reducer;
