import React, {useRef, useState} from 'react';
import {
  Image,
  PanResponder,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../navigation/types';
import {useRide} from '../../store/RideContext';
import {rides} from '../../constants/rides';
import RouteMap from '../../Components/RouteMap';
import ActionSheet from '../../Components/ActionSheet';
import shared from '../../Components/styles';
import styles from './styles';
import {height} from '../../styles/responsiveSize';
export default function RideOptions({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'RideOptions'>) {
  const {
    destination,
    pickup,
    selected,
    setSelected,
    payment,
    setPayment,
    confirmRide,
    schedule,
    stop,
    rider,
  } = useRide();
  const [expanded, setExpanded] = useState(false);
  const [panel, setPanel] = useState<string | null>(null);
  const inset = useSafeAreaInsets();
  const ride = rides.find(item => item.id === selected) || rides[0];
  const gesture = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 7,
      onPanResponderRelease: (_, g) => {
        if (g.dy < -25) setExpanded(true);
        if (g.dy > 25) setExpanded(false);
      },
    }),
  ).current;
  return (
    <View style={styles.container}>
      <View style={styles.mapArea}>
        <RouteMap route />
      </View>
      <View style={[styles.mapHeader, {top: inset.top + 10}]}>
        <TouchableOpacity
          accessibilityLabel="Go back"
          onPress={navigation.goBack}
          style={styles.back}
        >
          <Icon name="arrow-left" color="#eee" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Edit trip"
          style={styles.routePill}
          onPress={navigation.goBack}
        >
          <Text style={styles.pickup}>⊙ {pickup}</Text>
          <Text style={styles.destination}>{destination?.name || 'Dadar'}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.rideSheet,
          {top: expanded ? inset.top + 6 : height * 0.36},
        ]}
      >
        <View {...gesture.panHandlers}>
          <TouchableOpacity
            accessibilityLabel={
              expanded ? 'Collapse ride list' : 'Expand ride list'
            }
            onPress={() => setExpanded(!expanded)}
            style={styles.sheetTitle}
          >
            <View style={shared.handle} />
            <Text style={styles.title}>Choose a ride</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          <Text style={styles.listHeading}>Rides we think you’ll like</Text>
          {rides.map(item => (
            <TouchableOpacity
              key={item.id}
              accessibilityLabel={`Select ${item.name}`}
              accessibilityState={{selected: selected === item.id}}
              onPress={() => setSelected(item.id)}
              style={[styles.ride, selected === item.id && styles.selected]}
            >
              <Image
                source={item.image}
                style={styles.car}
                resizeMode="contain"
              />
              <View style={shared.flex}>
                <View style={styles.rideWords}>
                  <Text style={styles.rideName}>{item.name}</Text>
                  <Text style={styles.seats}>{item.seats} seats</Text>
                </View>
                <Text style={styles.arrival}>10:19 PM · {item.time}</Text>
                {selected === item.id ? (
                  <Text style={styles.description}>{item.description}</Text>
                ) : null}
                {item.badge && selected === item.id && (
                  <Text style={styles.faster}>ϟ {item.badge}</Text>
                )}
              </View>
              <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View
          style={[styles.footer, {paddingBottom: Math.max(inset.bottom, 16)}]}
        >
          <TouchableOpacity
            accessibilityLabel="Select payment method"
            style={styles.payment}
            onPress={() => setPanel('Payment method')}
          >
            <Icon name="credit-card-outline" size={24} color="#eee" />
            <Text style={[shared.text, shared.flex]}>{payment}</Text>
            <Icon name="chevron-right" size={23} color="#aaa" />
          </TouchableOpacity>
          <View style={styles.confirmRow}>
            <TouchableOpacity
              accessibilityLabel={`Choose ${ride.name}`}
              style={styles.confirm}
              onPress={() =>
                setPanel(
                  payment === 'Select payment method'
                    ? 'Payment method'
                    : 'Confirm demo ride',
                )
              }
            >
              <Text style={styles.confirmText}>Choose {ride.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel="Change scheduled pickup"
              style={styles.calendar}
              onPress={() => navigation.goBack()}
            >
              <Icon name="calendar-blank-outline" size={25} color="#eee" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ActionSheet title={panel} onClose={() => setPanel(null)}>
        {panel === 'Payment method' ? (
          ['Cash', 'Uber Cash'].map(value => (
            <TouchableOpacity
              accessibilityLabel={`Pay with ${value}`}
              key={value}
              style={shared.row}
              onPress={() => {
                setPayment(value);
                setPanel(null);
              }}
            >
              <Icon
                name={value === 'Cash' ? 'cash' : 'wallet-outline'}
                color="#eee"
                size={25}
              />
              <Text style={[shared.text, shared.flex]}>{value}</Text>
              {payment === value && (
                <Icon name="check-circle" size={23} color="#eee" />
              )}
            </TouchableOpacity>
          ))
        ) : (
          <>
            <Text style={shared.text}>
              {ride.name} · ₹{ride.price.toFixed(2)}
            </Text>
            <Text style={styles.summary}>
              {pickup} → {destination?.name}
              {'\n'}
              {schedule} · {payment} · {rider}
              {stop ? ` · Stop: ${stop}` : ''}
            </Text>
            <Text style={shared.muted}>
              This is a UI preview. No driver is requested and no payment is
              taken.
            </Text>
            <TouchableOpacity
              accessibilityLabel="Confirm demo ride"
              style={shared.button}
              onPress={() => {
                confirmRide();
                setPanel(null);
                navigation.navigate('Tabs', {screen: 'Activity'});
              }}
            >
              <Text style={shared.buttonText}>Confirm demo ride</Text>
            </TouchableOpacity>
          </>
        )}
      </ActionSheet>
    </View>
  );
}
