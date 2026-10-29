import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Screen from '../../Components/Screen';
import {useRide} from '../../store/RideContext';
import shared from '../../Components/styles';
import styles from './styles';
export default function Activity() {
  const {trips} = useRide();
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Activity</Text>
        <Text style={shared.heading}>Your trips</Text>
        {trips.length ? (
          trips.map((trip, i) => (
            <View key={i} style={shared.row}>
              <Icon name="car" size={35} color="#eee" />
              <View style={shared.flex}>
                <Text style={shared.text}>{trip.destination}</Text>
                <Text style={shared.muted}>{trip.ride} · Demo trip</Text>
              </View>
              <Text style={shared.text}>₹{trip.price.toFixed(2)}</Text>
            </View>
          ))
        ) : (
          <View style={styles.empty}>
            <Icon name="receipt" size={65} color="#aaa" />
            <Text style={styles.emptyTitle}>No trips yet</Text>
            <Text style={shared.muted}>
              Your ride activity will appear here.
            </Text>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
