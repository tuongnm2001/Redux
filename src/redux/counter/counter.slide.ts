import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    value: number
}

const initialState = {
    value: 20,
    name: "Trent Alexander-Arnold",
    address: {
        province: "CanTho",
        code: "65"
    }

}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },

        decrement: (state) => {
            state.value -= 1
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer