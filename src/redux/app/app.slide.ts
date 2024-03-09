import { createSlice } from '@reduxjs/toolkit'

const initialState: {
    mode: string
} = {
    mode: "light"
}

export const appSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeMode(state, action) {
            state.mode = action.payload;
        }
    },

})

// Action creators are generated for each case reducer function
export const { changeMode } = appSlice.actions

export default appSlice.reducer