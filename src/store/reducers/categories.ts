import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fromEntries } from 'helpers/util';
import { AppThunk } from 'store';
import gate from 'gate';

interface Category {
  categoryIdentifier: string;
  categoryDisplayName: string;
}
type CategoriesState = Category[];

const initialState: CategoriesState = [];

const appSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    getCategoriesSuccess: (state, action: PayloadAction<Category[]>) =>
      action.payload,
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
