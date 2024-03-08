import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// First, create the thunk
export const fetchListUsers = createAsyncThunk(
    'users/fetchUser',
    async () => {
        const res = await fetch('http://localhost:8000/users');
        const data = await res.json();
        return data;
    },
)

interface IUserPayload {
    name: string,
    email: string
}

export const createNewUser = createAsyncThunk(
    'users/createNewUser',
    async (payload: IUserPayload, thunkAPI) => {
        const res = await fetch('http://localhost:8000/users', {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                name: payload.name
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json();
        if (data && data.id) {
            //create  succeed
            thunkAPI.dispatch(fetchListUsers());
        }
        return data;
    },
)

interface IUser {
    id: number,
    name: string,
    email: string
}

const initialState: {
    listUsers: IUser[],
    isCreateSuccess: boolean
} = {
    listUsers: [],
    isCreateSuccess: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetCreate(state) {
            state.isCreateSuccess = false;
        }
    },

    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchListUsers.fulfilled, (state, action) => {
            // Add user to the state array
            state.listUsers = action.payload;
        }),

            builder.addCase(createNewUser.fulfilled, (state) => {
                state.isCreateSuccess = true;
            })
    },

})

// Action creators are generated for each case reducer function
export const { resetCreate } = userSlice.actions

export default userSlice.reducer