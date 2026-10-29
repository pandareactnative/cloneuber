import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {services} from '../constants/rides';
import {RootStackParamList} from '../navigation/types';
import styles from './styles';
export default function ServiceGrid({full = false}: {full?: boolean}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const rows = full
    ? [services.slice(0, 3), services.slice(3, 7), services.slice(7)]
    : [services.slice(0, 4), services.slice(4, 8)];
  return (
    <View style={styles.serviceGrid}>
      {rows.map((row, index) => (
        <View key={index} style={styles.serviceRow}>
          {row.map(item => (
            <TouchableOpacity
              key={item.name}
              accessibilityLabel={`Book ${item.name}`}
              style={[styles.serviceCell, full && styles.serviceFull]}
              onPress={() =>
                navigation.navigate('PlanRide', {service: item.name})
              }
            >
              <View style={[styles.serviceArt, full && styles.serviceArtFull]}>
                <Image
                  source={item.image}
                  style={styles.serviceImage}
                  resizeMode="contain"
                />
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {item.badge === 'Promo' ? 'Promo' : `◆ ${item.badge}`}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.serviceName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}
