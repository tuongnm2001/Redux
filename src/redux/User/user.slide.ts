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

interface IUser {
    id: number,
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

interface userUpdatePayload {
    id: string,
    name: string,
    email: string
}

export const updateNewUser = createAsyncThunk(
    'users/updateNewUser',
    async (dataUpdate: userUpdatePayload, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/users/${dataUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                email: dataUpdate.email,
                name: dataUpdate.name
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();

        if (data && data.id) {
            thunkAPI.dispatch(fetchListUsers());
        }
        return data;
    }
)

interface userDeletePayload {
    id: string
}

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId: userDeletePayload, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/users/${userId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();

        if (userId) {
            thunkAPI.dispatch(fetchListUsers());
        }
        return data;
    }
)

const initialState: {
    listUsers: IUser[],
    isCreateSuccess: boolean,
    isUpdateSuccess: boolean,
    isDelSuccess: boolean,

} = {
    listUsers: [],
    isCreateSuccess: false,
    isUpdateSuccess: false,
    isDelSuccess: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetCreate(state) {
            state.isCreateSuccess = false;
        },
        resetUpdate(state) {
            state.isUpdateSuccess = false;
        },
        resetDelete(state) {
            state.isDelSuccess = false;
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
            }),

            builder.addCase(updateNewUser.fulfilled, (state) => {
                state.isUpdateSuccess = true;
            }),

            builder.addCase(deleteUser.fulfilled, (state) => {
                state.isDelSuccess = true;
            })
    },

})

// Action creators are generated for each case reducer function
export const { resetCreate } = userSlice.actions
export const { resetUpdate } = userSlice.actions
export const { resetDelete } = userSlice.actions

export default userSlice.reducer