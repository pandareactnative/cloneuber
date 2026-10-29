import React from 'react';
import {StatusBar, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';
export default function Screen({children}: {children: React.ReactNode}) {
  const inset = useSafeAreaInsets();
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, []),
  );
  return (
    <View style={[styles.screen, {paddingTop: inset.top}]}>{children}</View>
  );
}
