import { RootState } from 'store';

export const selectCategories = (state: RootState) => state.categories;
export const selectCategory = (identifier: string) => (state: RootState) =>
  selectCategories(state).find(cat => cat.categoryIdentifier === identifier);
