import React from 'react';
import { GestureResponderHandlers, View } from 'react-native';

type OnStartResponder = Required<
  GestureResponderHandlers
>['onStartShouldSetResponder'];
type Handler = (eventTarget: number) => void;
type Register = (handler: Handler) => () => void;

export const TapOutsideContext = React.createContext<{ register: Register }>({
  register: () => () => {},
});

interface Props {
  children: (responder: OnStartResponder) => React.ReactNode;
}

export const TapOutsideProvider = ({ children }: Props) => {
  const handlers = React.useRef<Handler[]>([]);

  const responder = React.useCallback<OnStartResponder>(event => {
    handlers.current.forEach(handler => {
      handler(event.target);
    });
    return false;
  }, []);

  const register = React.useCallback<Register>(handler => {
    handlers.current.push(handler);
    return () => {
      handlers.current = handlers.current.filter(h => h !== handler);
    };
  }, []);

  return (
    <TapOutsideContext.Provider value={{ register }}>
      {children(responder)}
    </TapOutsideContext.Provider>
  );
};

// export const useTapOutside = (onTapOutside: () => void) => {
//   const { register } = React.useContext(TapOutsideContext);

//   const handler = React.useCallback<Handler>(() => {}, [onTapOutside])
//   React.useEffect(() => {
//     const unregister = register(onTapOutside);
//     return () => unregister();
//   }, [onTapOutside]);

//   return
// };

export const useTapOutside = (enabled: boolean, onTapOutside: () => void) => {
  const childrenId = React.useRef<number[]>([]);

  const handler = React.useCallback<Handler>(
    eventTarget => {
      if (childrenId.current.includes(eventTarget)) return;
      else onTapOutside();
    },
    [onTapOutside],
  );
  const { register } = React.useContext(TapOutsideContext);
  React.useEffect(() => {
    let unregister: ReturnType<typeof register>;
    if (enabled) {
      unregister = register(handler);
    }
    return () => unregister && unregister();
  }, [handler, enabled]);

  const getChildrenNativeTags = React.useCallback((el: any) => {
    return el?._children?.reduce((childrenNativeTags: any[], child: any) => {
      return child?._nativeTag
        ? [
            ...childrenNativeTags,
            child._nativeTag,
            ...getChildrenNativeTags(child),
          ]
        : childrenNativeTags;
    }, []);
  }, []);

  const ref = React.useCallback(element => {
    if (element) {
      const nativeTags = getChildrenNativeTags(element);
      if (nativeTags) childrenId.current = nativeTags;
      else childrenId.current = [];
    }
  }, []);

  return ref;
};
