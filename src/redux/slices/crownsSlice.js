import { createSlice } from '@reduxjs/toolkit';

const today = new Date().toISOString().split('T')[0];

const crownsSlice = createSlice({
    name: 'crowns',
    initialState: {
        history: {},
    },
    reducers: {
        addCrownForToday: (state, action) => {
            const { crownType } = action.payload;
            state.history[today] = crownType;
        },
        clearCrowns: (state) => {
            state.history = {};
        },
    },
});

export const { addCrownForToday , clearCrowns} = crownsSlice.actions;

export default crownsSlice.reducer;
