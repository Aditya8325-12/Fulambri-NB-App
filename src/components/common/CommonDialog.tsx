import React, { ReactNode, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import Button from './Button';
import COLORS from '../../constants/colors';
import TYPOGRAPHY from '../../theme/typography';

interface CommonDialogProps {
  trigger?: ReactNode; // Button or element to open dialog
  title: string;
  description?: string;
  children?: ReactNode; // Form or custom dialog content
  onSave?: () => void | Promise<void | boolean> | boolean;
  saveText?: string;
  cancelText?: string;
  open?: boolean; // Controlled open state
  style?: StyleProp<ViewStyle>; // Custom style for the Dialog container
  onOpenChange?: (open: boolean) => void; // Controlled setOpen
  hideFooter?: boolean;
}

export default function CommonDialog({
  trigger,
  title,
  description,
  children,
  onSave,
  saveText = 'Save',
  cancelText = 'Cancel',
  open: controlledOpen,
  style,
  onOpenChange: controlledOnOpenChange,
  hideFooter = false,
}: CommonDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen =
    controlledOnOpenChange !== undefined
      ? controlledOnOpenChange
      : setInternalOpen;

  const handleSave = async () => {
    if (!onSave) return;
    try {
      setLoading(true);
      const result = await onSave();
      // Only close if it doesn't explicitly return false
      if (result !== false) {
        setOpen(false);
      }
    } catch (error) {
      console.error('Save error in CommonDialog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    if (!loading) {
      setOpen(false);
    }
  };

  return (
    <>
      {trigger && (
        <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7}>
          {trigger}
        </TouchableOpacity>
      )}

      <Portal>
        <Dialog
          visible={open}
          onDismiss={handleDismiss}
          style={[styles.dialog, style]}
          dismissable={!loading}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {description ? (
              <Text style={styles.description}>{description}</Text>
            ) : null}
          </View>

          {/* Scrollable Content Area */}
          {children && (
            <ScrollView
              style={styles.contentContainer}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
            >
              {children}
            </ScrollView>
          )}

          {/* Footer Actions */}
          {!hideFooter && (
            <View style={styles.footer}>
              <View style={styles.buttonWrapper}>
                <Button
                  variant="outline"
                  onPress={handleDismiss}
                  disabled={loading}
                  label={cancelText}
                  height={44}
                />
              </View>

              {onSave && (
                <View style={styles.buttonWrapper}>
                  <Button
                    variant="default" // standard primary color
                    onPress={handleSave}
                    disabled={loading}
                    loading={loading}
                    label={saveText}
                    height={44}
                  />
                </View>
              )}
            </View>
          )}
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: COLORS.white,
    borderRadius: 6,
    maxHeight: '85%',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    ...TYPOGRAPHY.subHeading,
    color: COLORS.gray800,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
    fontSize: 14,
    lineHeight: 20,
  },
  contentContainer: {
    maxHeight: 320,
    marginVertical: 8,
  },
  content: {
    paddingBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    gap: 12,
  },
  buttonWrapper: {
    flex: 1,
  },
});

// ================= USAGE EXAMPLE =================

/*
import CommonDialog from './components/common/CommonDialog';
import { TextInput } from 'react-native';
import React, { useState } from 'react';

export default function Example() {
  const [name, setName] = useState('');

  const handleSave = () => {
    console.log('Saved name:', name);
    // Return false to keep dialog open on validation failure, or let it close automatically
    if (!name) return false; 
  };

  return (
    <CommonDialog
      trigger={<Text style={{ color: '#2dd4bf' }}>Edit Profile</Text>}
      title="Edit Profile"
      description="Update your profile information below."
      onSave={handleSave}
      saveText="Apply"
      cancelText="Close"
    >
      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4, marginTop: 10 }}
      />
    </CommonDialog>
  );
}
*/