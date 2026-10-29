import React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlanRide, RideOptions} from '../Screens';
import {RideProvider} from '../store/RideContext';
import {RootStackParamList} from './types';
import names from './navigationStrings';
import TabRoutes from './TabRoutes';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function Routes() {
  return (
    <RideProvider>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: '#1d1d1c'},
          }}
        >
          <Stack.Screen name={names.TABS} component={TabRoutes} />
          <Stack.Screen name={names.PLAN_RIDE} component={PlanRide} />
          <Stack.Screen name={names.RIDE_OPTIONS} component={RideOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </RideProvider>
  );
}
