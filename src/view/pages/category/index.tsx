import React from 'react';
import { View, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { selectPostsByCategory } from 'store/selectors/post';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoryPosts } from 'store/reducers/posts';

interface Props extends NavigationInjectedProps {}

const CategoryScreen = (props: Props) => {
  const dispatch = useDispatch();
  const category = props.navigation.getParam('category');
  const posts = useSelector(selectPostsByCategory(category));

  React.useEffect(() => {
    dispatch(fetchCategoryPosts(category));
  }, []);

  return (
    <View>
      <Text>{category}</Text>
      <Text>{JSON.stringify(posts)}</Text>
    </View>
  );
};

export default CategoryScreen;
