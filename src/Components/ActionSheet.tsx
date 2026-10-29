import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';
export default function ActionSheet({
  title,
  onClose,
  children,
}: {
  title: string | null;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const inset = useSafeAreaInsets();
  return (
    <Modal
      visible={!!title}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modal}>
        <Pressable
          accessibilityLabel="Dismiss sheet"
          style={styles.backdrop}
          onPress={onClose}
        />
        <View
          style={[styles.sheet, {paddingBottom: inset.bottom + 18}]}
          accessibilityViewIsModal
        >
          <View style={styles.handle} />
          <View style={styles.sheetHeader}>
            <Text style={styles.heading}>{title}</Text>
            <TouchableOpacity
              accessibilityLabel="Close sheet"
              onPress={onClose}
            >
              <Icon name="close" color="#eee" size={25} />
            </TouchableOpacity>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
