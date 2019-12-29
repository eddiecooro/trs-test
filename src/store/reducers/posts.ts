import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'store';
import gate from 'gate';
import { fromEntries } from 'helpers/util';

export interface Post {
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
    getPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        ...fromEntries(action.payload.map(post => [post.id, post])),
      };
    },
  },
});

export const { getPostsSuccess } = appSlice.actions;

export default appSlice.reducer;

export const fetchCategoryPosts = (
  categoryIdentifier: string,
): AppThunk => async dispatch => {
  try {
    const res = await gate.getCategoryPosts(categoryIdentifier);
    dispatch(getPostsSuccess(res.posts));
  } catch (e) {
    // Pass
  }
};
