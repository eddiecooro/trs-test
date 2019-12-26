import { RootState } from 'store';

export const selectTodos = (state: RootState) => state.posts;
