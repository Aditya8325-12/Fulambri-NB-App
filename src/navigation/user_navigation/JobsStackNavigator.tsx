import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobDetailsScreen from '../../screens/user/Jobs/JobDetailsScreen';
import ApplyJobScreen from '../../screens/user/Jobs/ApplyJobScreen';
import ApplicationSubmitScreen from '../../screens/user/Jobs/ApplicationSubmitScreen';
import SaveJobScreen from '../../screens/user/Jobs/SaveJobScreen';

export type JobsStackParamList = {
  JobDetailsScreen: undefined;
  ApplyJob: { job?: any };
  ApplicationSubmit: undefined;
  SaveJob: undefined;
};

const Stack = createNativeStackNavigator<JobsStackParamList>();

const JobsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="JobDetailsScreen" component={JobDetailsScreen} />
      <Stack.Screen name="ApplyJob" component={ApplyJobScreen} />
      <Stack.Screen
        name="ApplicationSubmit"
        component={ApplicationSubmitScreen}
      />
      <Stack.Screen name="SaveJob" component={SaveJobScreen} />
    </Stack.Navigator>
  );
};

export default JobsStackNavigator;
