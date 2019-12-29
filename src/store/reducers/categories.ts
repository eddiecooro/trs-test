import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'store';
import { getPostsSuccess } from './posts';
import { Post } from '../../types';
import gate from 'gate';
import { Category } from '../../types';

type CategoriesState = Category[];

const initialState: CategoriesState = [];

const appSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    getCategoriesSuccess: (state, action: PayloadAction<Category[]>) =>
      action.payload.map(category => {
        return {
          posts: [],
          ...category,
          ...state.find(
            c => c.categoryIdentifier === category.categoryIdentifier,
          ),
        };
      }),
  },
  extraReducers: {
    [getPostsSuccess.type]: (state, action: PayloadAction<Post[]>) => {
      action.payload.forEach(post => {
        const category = state.find(
          v => v.categoryIdentifier === post.category,
        );
        if (category)
          category.posts = [...new Set([...(category.posts || []), post.id])];
      });
    },
  },
});

export const { getCategoriesSuccess } = appSlice.actions;

export default appSlice.reducer;

export const fetchCategories = (): AppThunk => async dispatch => {
  try {
    const result = await gate.getCategories();
    dispatch(getCategoriesSuccess(result.categories));
  } catch (err) {
    // Pass
  }
};
