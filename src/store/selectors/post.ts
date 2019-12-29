import { RootState } from 'store';
import { selectCategory } from './category';

export const selectPosts = (state: RootState) => state.posts;
export const selectPostsByCategory = (category: string) => (state: RootState) =>
  selectCategory(category)(state)?.posts?.map(
    postId => selectPosts(state)[postId],
  );
