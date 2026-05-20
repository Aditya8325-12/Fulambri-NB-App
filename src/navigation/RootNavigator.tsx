import React, { useEffect, useState } from 'react';
import Splash from '../screens/Splash';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const RootNavigator = () => {
  const [loading, setloading] = useState(true);
  const isLogin = false;

  const role = 'USER';

  useEffect(() => {
    const timer = setTimeout(() => {
      setloading(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) return <Splash />;

  return (
    <NavigationContainer>
      {isLogin ? <AppNavigator role={role} /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
