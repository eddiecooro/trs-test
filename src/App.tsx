import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import { store, persistor } from 'store';
import Loading from 'view/components/Loading';
import Navigator from 'routes';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <PaperProvider>
        <Navigator />
      </PaperProvider>
    </PersistGate>
  </Provider>
);

export default App;
