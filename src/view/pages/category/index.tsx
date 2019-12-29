import React from 'react';
import {
  View,
  StyleSheet,
  TextStyle,
  ViewStyle,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import { NavigationInjectedProps, FlatList } from 'react-navigation';
import { selectPostsByCategory } from 'store/selectors/post';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoryPosts } from 'store/reducers/posts';
import { Post } from 'src/types';
import { selectCategory } from 'store/selectors/category';
import Text from 'view/components/Text';
import PostItem from './PostItem';
import { Title } from 'react-native-paper';
import { TapOutsideProvider } from 'helpers/TapOutside';

interface Props extends NavigationInjectedProps {}

const CategoryScreen = (props: Props) => {
  const dispatch = useDispatch();
  const categoryIdentifier = props.navigation.getParam('category');
  const posts = useSelector(selectPostsByCategory(categoryIdentifier));
  const category = useSelector(selectCategory(categoryIdentifier));

  const [refreshing, setRefreshing] = React.useState(false);
  const refresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchCategoryPosts(categoryIdentifier));
    setTimeout(() => setRefreshing(false), 2000);
  }, [categoryIdentifier]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  const renderPostItem = React.useCallback<ListRenderItem<Post>>(({ item }) => {
    return <PostItem post={item} />;
  }, []);

  return (
    <TapOutsideProvider>
      {responder => (
        <View onStartShouldSetResponder={responder} style={styles.container}>
          <Title style={styles.title}>{category?.categoryDisplayName}</Title>
          <FlatList
            keyExtractor={item => String(item.id)}
            refreshControl={
              <RefreshControl
                onRefresh={refresh}
                refreshing={refreshing}></RefreshControl>
            }
            style={styles.flatlist}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            data={posts || null}
            renderItem={renderPostItem}></FlatList>
        </View>
      )}
    </TapOutsideProvider>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create<{
  title: TextStyle;
  container: ViewStyle;
  contentContainer: ViewStyle;
  flatlist: ViewStyle;
}>({
  flatlist: {
    flex: 1,
  },
  title: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    textAlign: 'right',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 10,
  },
});
