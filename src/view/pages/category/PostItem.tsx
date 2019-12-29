import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Post } from 'src/types';
import Text from 'view/components/Text';
import {
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  ImageStyle,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Share from 'react-native-share';
import { useDispatch } from 'react-redux';
import { togglePostBookmark } from 'store/reducers/posts';
import More from './More';

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  const dispatch = useDispatch();
  const onBookmark = () => dispatch(togglePostBookmark(post.id));
  const share = () =>
    Share.open({
      url: 'https://example.com',
      title: `به اشتراک گذاری ${post.title}`,
      message: `${post.title}\n${post.description}`,
    });

  return (
    <View style={styles.card}>
      <ImageBackground
        style={styles.image}
        source={require('assets/images/karbala.jpg')}>
        <More />
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>
        <Text numberOfLines={3} style={styles.body}>
          {post.description}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onBookmark} hitSlop={{ top: 10, right: 10 }}>
          {post.bookmarked ? (
            <Icon size={25} name="bookmark"></Icon>
          ) : (
            <Icon size={25} name="bookmark-border"></Icon>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={share}>
          <Icon size={25} name="share"></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create<{
  title: TextStyle;
  body: TextStyle;
  card: ViewStyle;
  image: ImageStyle;
  content: ViewStyle;
  actions: ViewStyle;
}>({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    elevation: 2,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    width: '100%',
    minHeight: 20,
    margin: 5,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 220,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
  },
  body: {
    fontSize: 12,
    paddingVertical: 10,
    color: 'grey',
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
});
