import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from "react-native-toast-message"
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <PaperProvider>
          <RootNavigator />
          <Toast />
        </PaperProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
};

export default App;
