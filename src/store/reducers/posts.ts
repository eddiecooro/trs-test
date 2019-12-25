import { createSlice } from 'redux-starter-kit';

interface PostsState {}

const initialState: PostsState = {};

const appSlice = createSlice({
  slice: 'posts',
  initialState: initialState,
  reducers: {},
});

export const {} = appSlice.actions;

export default appSlice.reducer;
