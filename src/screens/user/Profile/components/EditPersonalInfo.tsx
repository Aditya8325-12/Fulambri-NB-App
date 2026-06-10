import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  launchImageLibrary,
  launchCamera,
  type ImagePickerResponse,
} from 'react-native-image-picker';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Profilestyles } from '../Styles/ProfileStyle';
import Input from '../../../../components/common/Input';
import COLORS from '../../../../constants/colors';
import { FONT_FAMILY } from '../../../../constants/fonts';
import Button from '../../../../components/common/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

interface PersonalInfoProps {
  EDIT?: boolean;
  ADD?: boolean;
}

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

const EditPersonalInfo = ({ EDIT, ADD }: PersonalInfoProps) => {
  const [avatarUri, setAvatarUri] = useState(
    'https://i.pravatar.cc/100?img=68',
  );
  const [gender, setGender] = useState<string>('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();
  const handlePickImage = () => {
    Alert.alert('Update Profile Photo', 'Choose a source', [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera(
            { mediaType: 'photo', quality: 0.8, saveToPhotos: false },
            (response: ImagePickerResponse) => {
              if (
                !response.didCancel &&
                !response.errorCode &&
                response.assets?.[0]?.uri
              ) {
                setAvatarUri(response.assets[0].uri!);
              }
            },
          );
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary(
            { mediaType: 'photo', quality: 0.8, selectionLimit: 1 },
            (response: ImagePickerResponse) => {
              if (
                !response.didCancel &&
                !response.errorCode &&
                response.assets?.[0]?.uri
              ) {
                setAvatarUri(response.assets[0].uri!);
              }
            },
          );
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleDateChange = (
    _event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    // On Android the picker closes itself; on iOS keep it open until dismissed
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const formattedDob = dob
    ? `${String(dob.getDate()).padStart(2, '0')} / ${String(
        dob.getMonth() + 1,
      ).padStart(2, '0')} / ${dob.getFullYear()}`
    : '';

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      {/* ── Avatar Hero ─────────────────────────── */}

      <View style={Profilestyles.profileHero}>
        <View style={{ position: 'relative', marginBottom: 12 }}>
          <View style={[Profilestyles.avatarWrapper, { marginBottom: 0 }]}>
            <Image source={{ uri: avatarUri }} style={Profilestyles.avatar} />
          </View>

          <TouchableOpacity
            style={styles.cameraBtn}
            onPress={handlePickImage}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#22D3EE', '#0891B2']}
              style={styles.cameraBtnGradient}
            >
              <Ionicons name="camera" size={15} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Text style={Profilestyles.profileName}>Abhishek Kulkarni</Text>
        <Text style={Profilestyles.profileRole}>Senior Software Engineer</Text>
      </View>

      {/* ── Form Card ───────────────────────────── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personal Information</Text>

        <Input
          label="Full Name"
          placeholder="Enter your full name"
          height={48}
          required
          type="default"
          value={name}
          onChange={setName}
        />

        <Input
          label="Professional Title"
          placeholder="e.g. Senior Software Engineer"
          height={48}
          required
          type="default"
          value={title}
          onChange={setTitle}
        />

        <Input
          label="Location"
          placeholder="City, State, Country"
          height={48}
          required
          type="default"
          value={location}
          onChange={setLocation}
          icon={
            <Ionicons
              name="location-outline"
              size={18}
              color={COLORS.gray500}
            />
          }
        />

        {/* ── Date of Birth Picker ── */}
        <View style={styles.dobWrapper}>
          <Text style={styles.dobLabel}>
            Date of Birth <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dobField}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons
              name="calendar-outline"
              size={18}
              color={COLORS.gray500}
              style={styles.dobIcon}
            />
            <Text
              style={[styles.dobValue, !formattedDob && styles.dobPlaceholder]}
            >
              {formattedDob || 'DD / MM / YYYY'}
            </Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.gray400} />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dob ?? new Date(2000, 0, 1)}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              maximumDate={new Date()}
              onChange={handleDateChange}
            />
          )}

          {/* iOS — inline confirm button */}
          {showDatePicker && Platform.OS === 'ios' && (
            <TouchableOpacity
              style={styles.dobConfirmBtn}
              onPress={() => setShowDatePicker(false)}
            >
              <Text style={styles.dobConfirmText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>

        <Input
          label="Email Address"
          placeholder="you@example.com"
          height={48}
          required
          type="email-address"
          value={email}
          onChange={setEmail}
          icon={
            <Ionicons name="mail-outline" size={18} color={COLORS.gray500} />
          }
        />

        <Input
          label="Phone Number"
          placeholder="+91 00000 00000"
          height={48}
          required
          type="number-pad"
          value={phone}
          onChange={setPhone}
          icon={
            <Ionicons name="call-outline" size={18} color={COLORS.gray500} />
          }
        />

        {/* ── Gender Selector ── */}
        <View style={styles.genderWrapper}>
          <Text style={styles.genderLabel}>
            Gender <Text style={styles.requiredStar}>*</Text>
          </Text>
          <View style={styles.genderRow}>
            {GENDER_OPTIONS.map(option => {
              const isSelected = gender === option;
              return (
                <View key={option}>
                  <Button
                    variant={!isSelected ? 'outline' : 'primary'}
                    label={option}
                    size="sm"
                    width={100}
                    onPress={() => setGender(option)}
                    icon={
                      isSelected && (
                        <Ionicons
                          name="checkmark-circle"
                          size={15}
                          color="#fff"
                          style={{ marginRight: 4 }}
                        />
                      )
                    }
                    iconPosition="start"
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* ── Save Button ─────────────────────────── */}
      <View style={{ marginVertical: 10 }}>
        <Button
          variant="gradient"
          label="Save Changes"
          size="lg"
          icon={<Icon name="check" size={18} color={COLORS.white} />}
          iconPosition="start"
          onPress={handleSave}
        />
      </View>
    </View>
  );
};

export default EditPersonalInfo;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  /* Hero */
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cameraBtnGradient: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Form Card */
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 4,
    letterSpacing: 0.2,
  },

  /* Date of Birth */
  dobWrapper: {
    gap: 6,
  },
  dobLabel: {
    fontSize: 14,
    color: COLORS.textNormal,
    fontWeight: '500',
  },
  dobField: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: 6,
    // backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
  },
  dobIcon: {
    marginRight: 8,
  },
  dobValue: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray800,
    fontFamily: FONT_FAMILY.IMedium,
  },
  dobPlaceholder: {
    color: COLORS.gray400,
    fontFamily: FONT_FAMILY.IMedium,
  },
  dobConfirmBtn: {
    alignSelf: 'flex-end',
    marginTop: 4,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  dobConfirmText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '700',
  },

  /* Gender */
  genderWrapper: {
    gap: 8,
  },
  genderLabel: {
    fontSize: 14,
    color: COLORS.textNormal,
    fontWeight: '500',
  },
  requiredStar: {
    color: COLORS.danger,
    fontWeight: '700',
  },
  genderRow: {
    flexDirection: 'row',
    gap: 10,
  },
  genderChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    backgroundColor: COLORS.background,
  },
  genderChipSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  genderChipText: {
    fontSize: 13,
    color: COLORS.gray600,
    fontWeight: '500',
  },
  genderChipTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },

  /* Save Button */
  saveWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 8,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.4,
  },
});
