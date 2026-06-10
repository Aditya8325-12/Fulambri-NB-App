import { Text, TouchableOpacity, View } from 'react-native';
import { Profilestyles } from '../Styles/ProfileStyle';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DrawerParamList } from '../../../../types/Navigation';
import COLORS from '../../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const SectionCard: React.FC<{
  children: React.ReactNode;
  style?: object;
}> = ({ children, style }) => (
  <View style={[Profilestyles.card, style]}>{children}</View>
);

export const SectionTitle: React.FC<{
  title: string;
  editable?: boolean;
  addbtn?: boolean;
}> = ({ title, editable, addbtn }) => {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const onEditClick = () => {
    navigation.navigate('EditProfile', {
      EDIT: true,
      ADD: false,
      title: title,
    });
  };

  const onAddClick = () => {
    navigation.navigate('EditProfile', {
      EDIT: false,
      ADD: true,
      title: title,
    });
  };

  return (
    <View style={Profilestyles.sectionTitleRow}>
      <Text style={Profilestyles.sectionTitle}>{title}</Text>
      {editable && (
        <TouchableOpacity style={Profilestyles.Chip} onPress={onEditClick}>
          <Icon name="pencil" size={16} color={COLORS.primary} />
          <Text style={Profilestyles.ChipText}>Edit</Text>
        </TouchableOpacity>
      )}
      {addbtn && (
        <TouchableOpacity style={Profilestyles.Chip} onPress={onAddClick}>
          <Icon name="plus" size={16} color={COLORS.primary} />
          <Text style={Profilestyles.ChipText}>Add {title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export const AddButton: React.FC<{ label: string }> = ({ label }) => (
  <TouchableOpacity style={Profilestyles.addButton} activeOpacity={0.8}>
    <Text style={Profilestyles.addButtonText}>+ {label}</Text>
  </TouchableOpacity>
);

export const ChipTag: React.FC<{
  label: string;
  color?: string;
  textColor?: string;
}> = ({ label }) => (
  <View style={[Profilestyles.chip]}>
    <Text style={[Profilestyles.chipText, { color: COLORS.info }]}>
      {label}
    </Text>
  </View>
);

export const Divider = () => (
  <View
    style={{
      height: 0.6,
      backgroundColor: COLORS.gray400,
      marginTop: 8,
      marginBottom: 16,
    }}
  ></View>
);
