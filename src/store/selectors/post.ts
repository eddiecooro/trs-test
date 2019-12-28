import { RootState } from 'store';
import { fromEntries } from 'helpers/util';

export const selectPosts = (state: RootState) => state.posts;
export const selectPostsByCategory = (state: RootState, category: string) =>
  fromEntries(
    Object.entries(selectPosts(state)).filter(
      ([_, post]) => post.category === category,
    ),
  );
