import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ImageSourcePropType,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function PromoRail({
  title,
  cards,
  onPress,
}: {
  title: string;
  cards: {title: string; subtitle: string; image: ImageSourcePropType}[];
  onPress: () => void;
}) {
  return (
    <View style={styles.promoSection}>
      <Text style={styles.heading}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.promoRail}
        decelerationRate="fast"
        snapToInterval={280}
      >
        {cards.map(card => (
          <TouchableOpacity
            key={card.title}
            accessibilityLabel={card.title}
            onPress={onPress}
            style={styles.promoCard}
          >
            {card.title === 'Book Rentals' ? (
              <View style={[styles.promoPhoto, styles.rentalArt]}>
                <View style={styles.clockFace}>
                  <Icon name="clock-outline" size={130} color="#161616" />
                </View>
              </View>
            ) : (
              <Image source={card.image} style={styles.promoPhoto} />
            )}
            <Text style={styles.promoTitle}>{card.title}</Text>
            <Text style={styles.promoSubtitle}>{card.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
