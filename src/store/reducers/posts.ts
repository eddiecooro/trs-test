import { createSlice } from '@reduxjs/toolkit';

interface Post {
  id: number;
  category: string;
  title: string;
  description: string;
  bookmarked: boolean;
}

type PostsState = { [index: number]: Post };

const initialState: PostsState = {};

const appSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    postsRecieved: () => {},
  },
});

export const { postsRecieved } = appSlice.actions;

export default appSlice.reducer;
