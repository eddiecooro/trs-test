export type Diff<T, U> = T extends U ? 'never' : T;

export type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? T[P]
    : T[P] | undefined;
};

export interface Post {
  id: number;
  category: string;
  title: string;
  description: string;
  bookmarked: boolean;
}

export interface Category {
  categoryIdentifier: string;
  categoryDisplayName: string;
  posts?: Post['id'][];
}
