import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'currentUser',
    initialState: {
        isLoggedIn: false,
        currentUser: null,
    },
    reducers: {
        setCurrentUser(state, action) {
            state.isLoggedIn = true;
            state.currentUser = action.payload;
        },
        clearCurrentUser(state) {
            state.isLoggedIn = false;
            state.currentUser = null;
        },
    },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
