import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
export default function SearchBar({
  delivery = false,
  onPress,
  onLater,
}: {
  delivery?: boolean;
  onPress: () => void;
  onLater: () => void;
}) {
  return (
    <View style={styles.searchBar}>
      <TouchableOpacity
        accessibilityLabel={delivery ? 'Deliver to?' : 'Where to?'}
        onPress={onPress}
        style={styles.searchMain}
      >
        <Icon name="magnify" size={26} color="#b6b6b4" />
        <Text style={styles.searchText}>
          {delivery ? 'Deliver to?' : 'Where to?'}
        </Text>
      </TouchableOpacity>
      {!delivery && (
        <TouchableOpacity
          accessibilityLabel="Schedule a ride"
          style={styles.later}
          onPress={onLater}
        >
          <Icon name="calendar-blank-outline" color="#ccc" size={20} />
          <Text style={styles.laterText}>Later</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
