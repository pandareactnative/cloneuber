import {NavigatorScreenParams} from '@react-navigation/native';
export type BottomTabParamList = {
  Home: undefined;
  Services: undefined;
  Activity: undefined;
  Account: undefined;
};
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<BottomTabParamList> | undefined;
  PlanRide: {service?: string} | undefined;
  RideOptions: undefined;
};
