import React from 'react';
import { View } from 'react-native';
import createAppNavigator from './createAppNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from 'store/reducers/categories';
import { selectCategories } from 'store/selectors/category';

const Navigator = () => {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  React.useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const routes = React.useMemo<Parameters<typeof createAppNavigator>[0]>(() => {
    function createRoute(category: typeof categories[0]) {
      return {
        navigationOptions: {
          title: category.categoryDisplayName,
        },
        screen: () => <View style={{ flex: 1, height: 50 }}></View>,
      };
    }
    return categories.reduce(
      (routes, category) => ({
        ...routes,
        [category.categoryIdentifier]: createRoute(category),
      }),
      {},
    );
  }, [categories]);

  const AppNavigator = React.useMemo(
    () =>
      createAppNavigator(
        routes,
        categories[0] && categories[0].categoryIdentifier,
      ),
    [routes],
  );

  return <AppNavigator />;
};

export default Navigator;
