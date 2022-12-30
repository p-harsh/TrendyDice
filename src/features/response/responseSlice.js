import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
};

// Could have also used thunk for fetching the data asynchronously but I think less use of redux the fast the app will be

export const responseSlice = createSlice({
    name: 'response',
    initialState,
    reducers: {
        update: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { update } = responseSlice.actions;

// get value of data using useSelector
export const selectData = (state) => state.response.data;

export default responseSlice.reducer;
