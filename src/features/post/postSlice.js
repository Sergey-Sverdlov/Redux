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
        const post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        dispatch(removePost(post.data.id))
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
        }

    },
    extraReducers: {
        [getPosts.fulfilled]: () => console.log('fulfilled'),
        [getPosts.pending]: () => console.log('pending'),
        [getPosts.rejected]: () => console.log('rejected')
    }
})

export const {setPosts} = postSlice.actions
export const {removePost} = postSlice.actions
export default postSlice.reducer
