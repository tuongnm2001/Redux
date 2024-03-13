import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchListBlogs = createAsyncThunk(
    'blogs/fetchBlogs',
    async () => {
        const res = await fetch('http://localhost:8000/blogs');
        const data = await res.json();
        return data;
    }

)

interface PayloadBlogs {
    title: string,
    author: string,
    content: string
}

export const createNewBlog = createAsyncThunk(
    'blogs/createNewBlog',
    async (payload: PayloadBlogs, thunkAPI) => {
        const res = await fetch('http://localhost:8000/blogs', {
            method: 'POST',
            body: JSON.stringify({
                title: payload.title,
                author: payload.author,
                content: payload.content,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json();
        if (data && data.id) {
            //create  succeed
            thunkAPI.dispatch(fetchListBlogs());
        }
        return data;
    }
)

interface dataUpdate {
    id: string
    title: string,
    author: string,
    content: string,
}

export const updateBlog = createAsyncThunk(
    'users/updateBlog',
    async (dataUpdateBlog: dataUpdate, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/blogs/${dataUpdateBlog.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: dataUpdateBlog.title,
                author: dataUpdateBlog.author,
                content: dataUpdateBlog.content
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();

        if (data && data.id) {
            thunkAPI.dispatch(fetchListBlogs());
        }
        return data;
    }
)

interface idBlogs {
    id: number
}

export const deleteBlog = createAsyncThunk(
    'users/deleteBlog',
    async (userId: idBlogs, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/blogs/${userId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();

        if (userId) {
            thunkAPI.dispatch(fetchListBlogs());
        }
        return data;
    }
)


interface Blogs {
    id: number,
    title: string,
    author: string,
    content: string,
}

const initialState: {
    listBlogs: Blogs[],
    isCreateBlog: boolean,
    isDelBlog: boolean,
    isEditBlog: boolean,
} = {
    listBlogs: [],
    isCreateBlog: false,
    isDelBlog: false,
    isEditBlog: false
}

export const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        resetCreateBlog(state) {
            state.isCreateBlog = false;
        },
        resetDelBlog(state) {
            state.isDelBlog = false;
        },
        resetEditBlog(state) {
            state.isEditBlog = false;
        },
    },

    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchListBlogs.fulfilled, (state, action) => {
            // Add user to the state array
            state.listBlogs = action.payload;
        }),
            builder.addCase(createNewBlog.fulfilled, (state) => {
                // Add user to the state array
                state.isCreateBlog = true;
            }),
            builder.addCase(updateBlog.fulfilled, (state) => {
                // Add user to the state array
                state.isEditBlog = true;
            }),
            builder.addCase(deleteBlog.fulfilled, (state) => {
                // Add user to the state array
                state.isDelBlog = true;
            })
    }
})

// Action creators are generated for each case reducer function
export const { resetCreateBlog } = blogSlice.actions
export const { resetDelBlog } = blogSlice.actions
export const { resetEditBlog } = blogSlice.actions

export default blogSlice.reducer