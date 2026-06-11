import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider, SectionCard, SectionTitle } from './../Common';
import COLORS from '../../../../../constants/colors';
import { FONT_FAMILY } from '../../../../../constants/fonts';
import { DrawerParamList } from '../../../../../types/Navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import CommonDialog from '../../../../../components/common/CommonDialog';
interface Chip {
  label: string;
  proficiency: string[];
}
const ChipTag: React.FC<{
  label: string;
  color?: string;
  textColor?: string;
  proficiency: string[];
  updateLanguage: (id: number) => void;
  deleteLanguage: (id: number) => void;
  i: number;
}> = ({ label, proficiency, updateLanguage, deleteLanguage, i }) => (
  <View style={styles.Chip}>
    <View style={{ flexDirection: 'row', gap: 6, width: '80%' }}>
      <Icon name="circle" size={5} color={COLORS.cyan600} style={{ top: 6 }} />
      <View>
        <Text style={[styles.ChipText]}>{label}</Text>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          {proficiency.map((p, i) => (
            <Text key={i} style={[styles.ChipMiniText]}>
              {p}
            </Text>
          ))}
        </View>
      </View>
    </View>

    <View style={{ flexDirection: 'row', gap: 6, top: 6 }}>
      <TouchableOpacity
        onPress={() => {
          updateLanguage(i);
        }}
      >
        <Icon name="pencil" size={16} color={COLORS.primary} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteLanguage(i)}>
        <Icon name="delete" size={16} color="#f14f4fff" />
      </TouchableOpacity>
    </View>
  </View>
);

const LanguagesSection = () => {
  const languages: Chip[] = [
    { label: 'English', proficiency: ['Read', 'Write', 'Speak'] },
    { label: 'Hindi', proficiency: ['Read', 'Write', 'Speak'] },
    { label: 'Marathi', proficiency: ['Read', 'Write', 'Speak'] },
  ];

  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const [dialog, setDialog] = useState({
    visible: false,
    title: '',
    description: '',
    onSave: () => {},
    saveText: '',
    cancelText: '',
  });

  const updateLanguage = (id: number) => {
    navigation.navigate('EditProfile', {
      EDIT: true,
      ADD: false,
      title: 'Languages',
    });
  };

  const deleteLanguage = (id: number) => {
    setDialog({
      visible: true,
      title: 'Delete Language',
      description: 'Are you sure you want to delete this language?',
      saveText: 'Delete',
      cancelText: 'Cancel',
      onSave: () => {
        setDialog(prev => ({ ...prev, visible: false }));
      },
    });
  };
  return (
    <SectionCard>
      <SectionTitle title="Languages" addbtn />
      <CommonDialog
        open={dialog.visible}
        title={dialog.title}
        description={dialog.description}
        onSave={dialog.onSave}
        saveText={dialog.saveText}
        cancelText={dialog.cancelText}
        onOpenChange={visible => setDialog(prev => ({ ...prev, visible }))}
        hideFooter={false}
      />
      <Divider />
      <View style={styles.chipRow}>
        {languages.map((l, i) => (
          <ChipTag
            i={i}
            key={i}
            label={l.label}
            proficiency={l.proficiency}
            updateLanguage={updateLanguage}
            deleteLanguage={deleteLanguage}
          />
        ))}
      </View>
    </SectionCard>
  );
};

export default LanguagesSection;

const styles = StyleSheet.create({
  chipRow: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    gap: 12,
  },
  chipCol: {
    flexDirection: 'column',
    gap: 8,
  },
  Chip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#85b6dfff',
  },
  ChipText: {
    fontFamily: FONT_FAMILY.PMedium,
    fontSize: 12,
    color: COLORS.gray600,
  },
  ChipMiniText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 10,
    color: COLORS.gray600,
  },
});
