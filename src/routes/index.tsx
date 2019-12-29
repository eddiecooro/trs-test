import React from 'react';
import { View } from 'react-native';
import createAppNavigator from './createAppNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from 'store/reducers/categories';
import { selectCategories } from 'store/selectors/category';
import CategoryScreen from 'view/pages/category';

const Navigator = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const categories = useSelector(selectCategories);
  const memoizedCategories = React.useMemo(() => categories, [
    categories.map(category => category.categoryIdentifier).join(','),
  ]);

  const routes = React.useMemo<Parameters<typeof createAppNavigator>[0]>(() => {
    function createRoute(
      category: typeof categories[0],
    ): Parameters<typeof createAppNavigator>[0][0] {
      return {
        navigationOptions: {
          title: category.categoryDisplayName,
        },
        params: {
          category: category.categoryIdentifier,
        },
        screen: CategoryScreen,
      };
    }
    return categories.reduce(
      (routes, category) => ({
        ...routes,
        [category.categoryIdentifier]: createRoute(category),
      }),
      {},
    );
  }, [memoizedCategories]);

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
