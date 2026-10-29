import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from '../styles/responsiveSize';
import styles from '../Components/styles';
const icons = ['home', 'apps', 'receipt', 'account-outline'];
export default function CustomBottomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={[styles.bottomBar, {bottom: Math.max(inset.bottom, scale(16))}]}
    >
      {state.routes.map((route, i) => {
        const active = state.index === i;
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="tab"
            accessibilityLabel={route.name}
            accessibilityState={{selected: active}}
            style={[styles.tab, active && styles.tabActive]}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!event.defaultPrevented) navigation.navigate(route.name);
            }}
          >
            <Icon
              name={icons[i]}
              size={scale(24)}
              color={active ? '#eee' : '#aaa'}
            />
            <Text style={[styles.tabText, active && styles.tabTextActive]}>
              {route.name}
            </Text>
            {i === 3 && <View style={styles.accountDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
