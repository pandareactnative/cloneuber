import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Screen from '../../Components/Screen';
import ActionSheet from '../../Components/ActionSheet';
import shared from '../../Components/styles';
import styles from './styles';
const entries = [
  ['cog-outline', 'Settings', ''],
  ['cellphone', 'Simple mode', 'A simplified app for older adults'],
  ['contacts-outline', 'Contacts', 'Manage all your contacts at Uber'],
  ['account-group-outline', 'Saved groups', ''],
  [
    'briefcase-outline',
    'Set up your business profile',
    'Automate work travel & meal expenses',
  ],
  ['account-tie-outline', 'Uber for Business', ''],
  ['account-outline', 'Manage Uber account', ''],
  ['information-outline', 'About', ''],
];
export default function Account() {
  const [panel, setPanel] = useState<string | null>(null);
  const [simple, setSimple] = useState(false);
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profile}>
          <View>
            <Text style={styles.title}>Your account</Text>
            <Text style={styles.rating}>★ 5.00</Text>
          </View>
          <View style={styles.avatar}>
            <Icon name="account-outline" color="#fff" size={35} />
          </View>
        </View>
        <View style={styles.cards}>
          {[
            ['lifebuoy', 'Help'],
            ['wallet-outline', 'Wallet'],
            ['shield-outline', 'Safety'],
            ['email-outline', 'Inbox'],
          ].map(([icon, label]) => (
            <TouchableOpacity
              key={label}
              accessibilityLabel={label}
              onPress={() => setPanel(label)}
              style={styles.card}
            >
              <Icon name={icon} size={26} color="#eee" />
              <Text style={styles.cardTitle}>{label}</Text>
              {label === 'Inbox' && <View style={styles.dot} />}
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          accessibilityLabel="Privacy check-up"
          style={styles.privacy}
          onPress={() => setPanel('Privacy check-up')}
        >
          <View style={shared.flex}>
            <Text style={styles.cardTitle}>Privacy check-up</Text>
            <Text style={styles.privacyText}>
              Take an interactive tour of your privacy settings
            </Text>
          </View>
          <Icon name="clipboard-lock-outline" color="#6b9dff" size={75} />
        </TouchableOpacity>
        {entries.map(([icon, label, subtitle]) => (
          <TouchableOpacity
            key={label}
            accessibilityLabel={label}
            onPress={() => setPanel(label)}
            style={styles.entry}
          >
            <Icon name={icon} color="#ccc" size={23} />
            <View style={shared.flex}>
              <Text style={styles.entryTitle}>{label}</Text>
              {!!subtitle && (
                <Text style={styles.entrySubtitle}>{subtitle}</Text>
              )}
            </View>
            {['Simple mode', 'Saved groups'].includes(label) && (
              <Text style={styles.newBadge}>NEW</Text>
            )}
          </TouchableOpacity>
        ))}
        <Text style={styles.version}>UI demo · No account connected</Text>
      </ScrollView>
      <ActionSheet title={panel} onClose={() => setPanel(null)}>
        {panel === 'Wallet' ? (
          <>
            <Text style={shared.muted}>Uber Cash</Text>
            <Text style={styles.title}>₹0.00</Text>
            <Text style={shared.muted}>
              Payment methods are available when choosing a ride.
            </Text>
          </>
        ) : panel === 'Simple mode' ? (
          <View style={shared.row}>
            <Text style={[shared.text, shared.flex]}>
              Simple mode preference
            </Text>
            <Switch
              accessibilityLabel="Simple mode preference"
              value={simple}
              onValueChange={setSimple}
            />
          </View>
        ) : (
          <Text style={shared.text}>
            {panel === 'Inbox'
              ? 'You’re all caught up.'
              : panel === 'Privacy check-up'
              ? 'This demo stores ride selections on your device for this session. No personal data is sent.'
              : `${panel} is shown as a local UI preview. No account or external service is connected.`}
          </Text>
        )}
      </ActionSheet>
    </Screen>
  );
}
