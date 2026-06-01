import React, { useEffect, useState } from 'react';
import Splash from '../screens/Splash';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setLoggedIn } from '../redux/fetatures/auth/authSlice';
const RootNavigator = () => {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const role = 'USER';

  useEffect(() => {
    const init = async () => {
      const data = await AsyncStorage.getItem("userData")
      if (data === "USER") {
        dispatch(setLoggedIn(true));
      }
      setTimeout(() => {
        setloading(false)
      }, 3000);
    }
    init();
  }, []);


  if (loading) return <Splash />;

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator role={role} /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
