import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Home, Services, Activity, Account} from '../Screens';
import {BottomTabParamList} from './types';
import CustomBottomTabBar from './CustomBottomTabBar';
import names from './navigationStrings';
const Tab = createBottomTabNavigator<BottomTabParamList>();
const renderTabs = (props: BottomTabBarProps) => (
  <CustomBottomTabBar {...props} />
);
export default function TabRoutes() {
  return (
    <Tab.Navigator
      tabBar={renderTabs}
      screenOptions={{
        headerShown: false,
        sceneStyle: {backgroundColor: '#1d1d1c'},
      }}
    >
      <Tab.Screen name={names.HOME} component={Home} />
      <Tab.Screen name={names.SERVICES} component={Services} />
      <Tab.Screen name={names.ACTIVITY} component={Activity} />
      <Tab.Screen name={names.ACCOUNT} component={Account} />
    </Tab.Navigator>
  );
}
