import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import Screen from '../../Components/Screen';
import ServiceGrid from '../../Components/ServiceGrid';
import SearchBar from '../../Components/SearchBar';
import PromoRail from '../../Components/PromoRail';
import ActionSheet from '../../Components/ActionSheet';
import images from '../../constants/imagePath';
import shared from '../../Components/styles';
import styles from './styles';
export default function Home({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const [department, setDepartment] = useState('Uber');
  const [panel, setPanel] = useState<string | null>(null);
  const plan = () => navigation.navigate('PlanRide', {service: department});
  return (
    <Screen>
      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.top}>
          <TouchableOpacity
            accessibilityLabel="Choose pickup location"
            onPress={() => setPanel('Pickup location')}
            style={styles.inline}
          >
            <Icon name="map-marker-outline" color="#ccc" size={18} />
            <Text style={styles.topText}>Home⌄</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="Open inbox"
            style={styles.inline}
            onPress={() => setPanel('Inbox')}
          >
            <Icon name="bell-outline" size={16} color="#ccc" />
            <Text style={styles.topText}>Inbox</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sticky}>
          <View style={styles.departments}>
            {['Uber', 'Parcel', 'Travel'].map((name, i) => (
              <TouchableOpacity
                key={name}
                accessibilityRole="tab"
                accessibilityLabel={`Department ${name}`}
                accessibilityState={{selected: department === name}}
                onPress={() => setDepartment(name)}
                style={[
                  styles.department,
                  department === name && styles.departmentSelected,
                ]}
              >
                {i === 0 && (
                  <Image
                    source={images.trip}
                    style={styles.departmentCar}
                    resizeMode="contain"
                  />
                )}
                <Text style={styles.departmentEmoji}>
                  {['', '🛍️', '🧳'][i]}
                </Text>
                <Text
                  style={[
                    styles.departmentText,
                    department === name && styles.departmentActive,
                  ]}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.search}>
            <SearchBar
              delivery={department !== 'Uber'}
              onPress={plan}
              onLater={() =>
                navigation.navigate('PlanRide', {service: 'Reserve'})
              }
            />
          </View>
        </View>
        {department === 'Uber' ? (
          <View style={styles.feed}>
            <Text style={styles.forYou}>
              For you <Text style={shared.muted}> ›</Text>
            </Text>
            <ServiceGrid />
            <PromoRail
              title="Ride as you like it"
              cards={[
                {
                  title: 'Try Black',
                  subtitle: 'Elevated rides with top drivers',
                  image: images.blackEvening,
                },
                {
                  title: 'Book Rentals',
                  subtitle: 'Travel stress-free at your own pace',
                  image: images.rentals,
                },
              ]}
              onPress={plan}
            />
            <PromoRail
              title="Uber Black has arrived"
              cards={[
                {
                  title: 'Pre-book Black',
                  subtitle: 'Get premium rides on time',
                  image: images.blackDay,
                },
                {
                  title: 'Try Black Rentals',
                  subtitle: 'Premium rides, your way',
                  image: images.blackEvening,
                },
              ]}
              onPress={plan}
            />
            <PromoRail
              title="Do more by the hour"
              cards={[
                {
                  title: 'Stop, explore, go',
                  subtitle: 'Discover a new city with ease',
                  image: images.cityRide,
                },
                {
                  title: 'Your day, your way',
                  subtitle: 'One ride, all your stops',
                  image: images.blackDay,
                },
              ]}
              onPress={plan}
            />
            <TouchableOpacity
              accessibilityLabel="Book Intercity offer"
              style={styles.offer}
              onPress={plan}
            >
              <View style={styles.offerWords}>
                <Text style={styles.offerTitle}>
                  Enjoy 7% off XL+ Intercity
                </Text>
                <View style={styles.bookPill}>
                  <Text style={shared.text}>Book now</Text>
                </View>
              </View>
              <Image
                source={images.intercity}
                style={styles.offerCar}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ) : department === 'Parcel' ? (
          <View style={styles.feed}>
            <View style={styles.parcelHeading}>
              <View>
                <Text style={shared.heading}>On-demand delivery</Text>
                <Text style={shared.muted}>Fast, affordable couriers</Text>
              </View>
              <Image source={images.intercity} style={styles.smallCar} />
            </View>
            <View style={styles.deliveryBox}>
              {['Send', 'Receive'].map((item, i) => (
                <TouchableOpacity
                  accessibilityLabel={`${item} parcel`}
                  key={item}
                  style={styles.deliveryRow}
                  onPress={plan}
                >
                  <View style={styles.deliveryIcon}>
                    <Icon
                      name={i ? 'arrow-u-left-top' : 'arrow-u-right-top'}
                      size={23}
                    />
                  </View>
                  <Text style={[shared.text, shared.flex]}>{item}</Text>
                  <Icon name="chevron-right" color="#aaa" size={20} />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={[shared.heading, styles.section]}>
              Your tasks done fast
            </Text>
            <View style={styles.chips}>
              {[
                'Send documents',
                'Forgot an item?',
                'Pick up vendor supplies',
                'Deliver customer orders',
                'Receive supplies',
                'Send a gift',
              ].map(label => (
                <TouchableOpacity
                  key={label}
                  onPress={plan}
                  style={styles.chip}
                >
                  <Icon name="package-variant-closed" size={13} color="#ccc" />
                  <Text style={styles.chipText}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.business}>
              <Text style={shared.heading}>
                Delivery for personal and business needs
              </Text>
              <Text style={styles.businessText}>
                From everyday essentials to important packages.
              </Text>
              <TouchableOpacity onPress={plan} style={styles.bookPill}>
                <Text style={shared.text}>Get started →</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.feed}>
            <Text style={styles.travelTitle}>Intercity Travel</Text>
            <Text style={styles.travelSubtitle}>Plan your next trip now</Text>
            {[
              {
                name: 'Buses',
                offer: '25% off',
                one: 'Comfortable overnight travel',
                two: 'Instant booking confirmation',
                image: images.bus,
              },
              {
                name: 'Trains',
                offer: '10% credits back',
                one: 'Zero service fee',
                two: '3X refund if unconfirmed',
                image: images.train,
              },
            ].map(item => (
              <TouchableOpacity
                key={item.name}
                accessibilityLabel={`Book ${item.name}`}
                style={styles.travelCard}
                onPress={plan}
              >
                <View style={styles.inline}>
                  <Text style={styles.travelCardTitle}>{item.name}</Text>
                  <Text style={styles.travelDiscount}>◆ {item.offer}</Text>
                </View>
                <Text style={styles.travelLine}>♧ {item.one}</Text>
                <Text style={styles.travelLine}>ϟ {item.two}</Text>
                <Image
                  source={item.image}
                  style={styles.travelImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
            <Text style={styles.terms}>
              Explore buses and trains in this UI demo. No booking or personal
              data is sent to a travel provider.
            </Text>
          </View>
        )}
      </ScrollView>
      <ActionSheet title={panel} onClose={() => setPanel(null)}>
        <Text style={shared.text}>
          {panel === 'Inbox'
            ? 'You’re all caught up. Trip updates will appear here.'
            : 'Home · Mumbai, Maharashtra'}
        </Text>
        {panel === 'Pickup location' && (
          <TouchableOpacity
            style={shared.button}
            onPress={() => {
              setPanel(null);
              plan();
            }}
          >
            <Text style={shared.buttonText}>Edit pickup</Text>
          </TouchableOpacity>
        )}
      </ActionSheet>
    </Screen>
  );
}
