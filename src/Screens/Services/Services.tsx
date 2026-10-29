import React from 'react';
import {ScrollView, Text} from 'react-native';
import Screen from '../../Components/Screen';
import ServiceGrid from '../../Components/ServiceGrid';
import styles from './styles';
export default function Services() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Services</Text>
        <Text style={styles.subtitle}>Go anywhere, get anything</Text>
        <ServiceGrid full />
      </ScrollView>
    </Screen>
  );
}
