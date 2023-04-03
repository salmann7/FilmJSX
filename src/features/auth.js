import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: '',
    isAuthenticated: false,
    sessionId: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.sessionId = localStorage.getItem('session_id');
        }
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;