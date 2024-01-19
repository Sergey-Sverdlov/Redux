import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
// https://jsonplaceholder.typicode.com/posts
const initialState = {
    posts: []
}
export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, {rejectWithValue, dispatch}) => {
        const result = await axios.get('https://jsonplaceholder.typicode.com/posts')
        dispatch(setPosts(result.data))
    }
)

export const removePostByID = createAsyncThunk(
    'posts/removePostByID',
    async (id, {rejectWithValue, dispatch}) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        dispatch(removePost(id))
    }
)
export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload)
        },

    },
    extraReducers: {
        [getPosts.fulfilled]: () => console.log('getPosts fulfilled'),
        [getPosts.pending]: () => console.log('getPosts pending'),
        [getPosts.rejected]: () => console.log('getPosts rejected'),

        [removePostByID.fulfilled]: () => console.log('removePostByID fulfilled'),
        [removePostByID.pending]: () => console.log('removePostByID pending'),
        [removePostByID.rejected]: () => console.log('removePostByID rejected'),
    }
})

export const {setPosts, removePost} = postSlice.actions
export default postSlice.reducer
