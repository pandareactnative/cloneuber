import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RouteMap from '../../Components/RouteMap';
import ActionSheet from '../../Components/ActionSheet';
import {useRide} from '../../store/RideContext';
import {searchPlaces, Place} from '../../constants/rides';
import {RootStackParamList} from '../../navigation/types';
import shared from '../../Components/styles';
import styles from './styles';
export default function PlanRide({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'PlanRide'>) {
  const {
    pickup,
    setPickup,
    setDestination,
    schedule,
    setSchedule,
    stop,
    setStop,
    rider,
    setRider,
  } = useRide();
  const [query, setQuery] = useState('');
  const [extra, setExtra] = useState(!!stop);
  const [panel, setPanel] = useState<string | null>(
    route.params?.service === 'Reserve' ? 'Schedule a ride' : null,
  );
  const [day, setDay] = useState('Today');
  const [hour, setHour] = useState('10:30 PM');
  const inset = useSafeAreaInsets();
  const choose = (place: Place) => {
    setDestination(place);
    navigation.navigate('RideOptions');
  };
  const results = searchPlaces(query);
  return (
    <View style={styles.container}>
      <RouteMap />
      <KeyboardAvoidingView
        style={[styles.keyboard, {paddingTop: inset.top}]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.sheet}>
          <View style={shared.handle} />
          <View style={styles.header}>
            <TouchableOpacity
              accessibilityLabel="Go back"
              onPress={navigation.goBack}
            >
              <Icon name="arrow-left" size={25} color="#eee" />
            </TouchableOpacity>
            <Text style={styles.title}>Plan your ride</Text>
            <View style={styles.spacer} />
          </View>
          <View style={styles.pills}>
            <TouchableOpacity
              accessibilityLabel="Pickup time"
              onPress={() => setPanel('Schedule a ride')}
              style={styles.pill}
            >
              <Icon name="clock-outline" color="#eee" size={18} />
              <Text style={shared.text}>{schedule}</Text>
              <Icon name="chevron-down" size={16} color="#ccc" />
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel="Choose rider"
              style={styles.pill}
              onPress={() => setPanel('Who is riding?')}
            >
              <Icon name="account-outline" size={19} color="#eee" />
              <Text style={shared.text}>{rider}</Text>
              <Icon name="chevron-down" size={16} color="#ccc" />
            </TouchableOpacity>
          </View>
          <View style={styles.fieldsRow}>
            <View style={styles.fields}>
              <View style={styles.routeLine} />
              <View style={styles.fieldRow}>
                <Icon name="circle-slice-8" size={16} color="#eee" />
                <TextInput
                  accessibilityLabel="Pickup location"
                  value={pickup}
                  onChangeText={setPickup}
                  style={styles.input}
                  placeholderTextColor="#aaa"
                  keyboardAppearance="dark"
                />
              </View>
              <View style={styles.fieldRow}>
                <Icon name="stop" size={16} color="#eee" />
                <TextInput
                  accessibilityLabel="Destination"
                  autoFocus
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Where to?"
                  style={styles.input}
                  placeholderTextColor="#aaa"
                  keyboardAppearance="dark"
                  returnKeyType="search"
                  onSubmitEditing={() => {
                    if (results[0]) choose(results[0]);
                  }}
                />
                {!!query && (
                  <TouchableOpacity
                    accessibilityLabel="Clear destination"
                    onPress={() => setQuery('')}
                  >
                    <Icon name="close-circle-outline" color="#ccc" size={18} />
                  </TouchableOpacity>
                )}
              </View>
              {extra && (
                <TextInput
                  accessibilityLabel="Additional stop"
                  placeholder="Add a stop"
                  placeholderTextColor="#aaa"
                  value={stop}
                  onChangeText={setStop}
                  style={styles.input}
                  keyboardAppearance="dark"
                />
              )}
            </View>
            <TouchableOpacity
              accessibilityLabel={extra ? 'Remove stop' : 'Add stop'}
              onPress={() => {
                if (extra) setStop('');
                setExtra(!extra);
              }}
              style={styles.add}
            >
              <Icon name={extra ? 'minus' : 'plus'} size={25} color="#eee" />
            </TouchableOpacity>
          </View>
          <View style={styles.shortcuts}>
            {[
              ['briefcase-outline', 'Add Work'],
              ['star-outline', 'Saved places'],
            ].map(([icon, label]) => (
              <TouchableOpacity
                key={label}
                accessibilityLabel={label}
                style={styles.shortcut}
                onPress={() => setPanel(label)}
              >
                <Icon
                  name={icon}
                  size={20}
                  color={label === 'Add Work' ? '#438bdf' : '#ccc'}
                />
                <Text style={shared.text}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {results.length ? (
              results.map(place => (
                <TouchableOpacity
                  key={place.name}
                  accessibilityLabel={`Destination ${place.name}`}
                  style={styles.place}
                  onPress={() => choose(place)}
                >
                  <View style={styles.distance}>
                    <Icon name="map-marker-outline" color="#eee" size={24} />
                    <Text style={styles.km}>{place.distance}</Text>
                  </View>
                  <View style={styles.placeWords}>
                    <Text style={styles.placeName} numberOfLines={1}>
                      {place.name}
                    </Text>
                    <Text numberOfLines={1} style={styles.address}>
                      {place.address}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.empty}>
                No places found. Try Dadar, Bandra or Terminal 2.
              </Text>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      <ActionSheet title={panel} onClose={() => setPanel(null)}>
        {panel === 'Schedule a ride' ? (
          <>
            <Text style={shared.muted}>Choose a pickup day and time</Text>
            <View style={styles.pills}>
              {['Today', 'Tomorrow'].map(value => (
                <TouchableOpacity
                  key={value}
                  style={[styles.pill, day === value && styles.selected]}
                  onPress={() => setDay(value)}
                >
                  <Text style={shared.text}>{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.pills}>
              {['10:30 PM', '11:00 PM', '11:30 PM'].map(value => (
                <TouchableOpacity
                  key={value}
                  style={[styles.pill, hour === value && styles.selected]}
                  onPress={() => setHour(value)}
                >
                  <Text style={shared.text}>{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              accessibilityLabel="Confirm pickup time"
              style={shared.button}
              onPress={() => {
                setSchedule(`${day}, ${hour}`);
                setPanel(null);
              }}
            >
              <Text style={shared.buttonText}>Confirm pickup time</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={shared.row}
              onPress={() => {
                setSchedule('Pickup now');
                setPanel(null);
              }}
            >
              <Text style={shared.text}>Ride now instead</Text>
            </TouchableOpacity>
          </>
        ) : panel === 'Who is riding?' ? (
          ['For me', 'For someone else'].map(value => (
            <TouchableOpacity
              key={value}
              style={shared.row}
              onPress={() => {
                setRider(value);
                setPanel(null);
              }}
            >
              <Icon name="account-outline" size={24} color="#eee" />
              <Text style={shared.text}>{value}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <>
            <Text style={shared.muted}>Choose a sample saved location</Text>
            {searchPlaces('').map(place => (
              <TouchableOpacity
                key={place.name}
                style={shared.row}
                onPress={() => {
                  setPanel(null);
                  choose(place);
                }}
              >
                <Text style={shared.text}>{place.name}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ActionSheet>
    </View>
  );
}
