import React from 'react';
import { GestureResponderEvent, View } from 'react-native';

export const useTapOutside = (
  onTappedOutside: () => void,
): [React.Ref<View>, (event: GestureResponderEvent) => boolean] => {
  const childrenId = React.useRef<number[]>([]);

  function getChildrenNativeTags(el: any) {
    return el?._children?.reduce((childrenNativeTags: any[], child: any) => {
      if (!child?._children)
        return child?._nativeTag
          ? [...childrenNativeTags, child._nativeTag]
          : childrenNativeTags;
      else return [...childrenNativeTags, ...getChildrenNativeTags(child)];
    }, []);
  }
  return [
    element => {
      if (element) {
        const nativeTags = getChildrenNativeTags(element);
        if (nativeTags) childrenId.current = nativeTags;
        else childrenId.current = [];
      }
    },
    event => {
      event.persist();
      if (childrenId) {
        if (childrenId.current.includes(event.target)) {
          return true;
        }
        onTappedOutside();
        return false;
      }
      return true;
    },
  ];
};
