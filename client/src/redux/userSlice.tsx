import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'currentUser',
    initialState: {
        isLoggedIn: false,
        currentUser: null,
        likedPosts: [],
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
        setLikedPosts(state, action) {
            state.likedPosts = action.payload;
        },
    },
});

export const { setCurrentUser, clearCurrentUser, setLikedPosts } =
    userSlice.actions;
export default userSlice.reducer;
