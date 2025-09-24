import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, ColorSchemes } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  currentMood: string;
  preferredColorScheme: keyof typeof ColorSchemes;
  notificationsEnabled: boolean;
  breathingReminders: boolean;
  journalPrompts: boolean;
}

export default function ProfileScreen() {
  const { user, profile: authProfile, updateProfile: updateProfileFromContext, signOut } = useAuth();

  const [profile, setProfile] = useState<UserProfile>({
    name: authProfile?.name || 'User',
    email: authProfile?.email || user?.email || '',
    currentMood: 'calm',
    preferredColorScheme: authProfile?.preferredColorScheme || 'default',
    notificationsEnabled: authProfile?.notificationsEnabled ?? true,
    breathingReminders: authProfile?.breathingReminders ?? true,
    journalPrompts: authProfile?.journalPrompts ?? false,
  });

  const [isEditing, setIsEditing] = useState(false);

  const getMoodEmoji = (mood: string) => {
    const emojiMap: { [key: string]: string } = {
      happy: '😊',
      calm: '😌',
      anxious: '😰',
      sad: '😢',
      excited: '🤩',
      tired: '😴',
      angry: '😠',
      grateful: '🙏',
    };
    return emojiMap[mood] || '😊';
  };

  const getMoodDescription = (mood: string) => {
    const descriptions: { [key: string]: string } = {
      happy: 'Feeling joyful and positive',
      calm: 'Peaceful and centered',
      anxious: 'Feeling worried or nervous',
      sad: 'Experiencing sadness',
      excited: 'Full of energy and anticipation',
      tired: 'Feeling low energy',
      angry: 'Feeling frustrated or mad',
      grateful: 'Appreciative and thankful',
    };
    return descriptions[mood] || 'Feeling good';
  };

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const saveProfile = async () => {
    try {
      await updateProfileFromContext(
        {
          name: profile.name,
          preferredColorScheme: profile.preferredColorScheme,
          notificationsEnabled: profile.notificationsEnabled,
          breathingReminders: profile.breathingReminders,
        journalPrompts: profile.journalPrompts,
      });
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const renderColorSchemeOption = (scheme: keyof typeof ColorSchemes, colors: any) => (
    <TouchableOpacity
      key={scheme}
      style={[
        styles.colorSchemeOption,
        profile.preferredColorScheme === scheme && styles.colorSchemeOptionActive
      ]}
      onPress={() => updateProfile('preferredColorScheme', scheme)}
    >
      <View style={styles.colorSwatches}>
        <View style={[styles.colorSwatch, { backgroundColor: colors.primary }]} />
        <View style={[styles.colorSwatch, { backgroundColor: colors.secondary }]} />
        <View style={[styles.colorSwatch, { backgroundColor: colors.tertiary }]} />
      </View>
      <Text style={[
        styles.colorSchemeName,
        profile.preferredColorScheme === scheme && styles.colorSchemeNameActive
      ]}>
        {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <LinearGradient
        colors={[Colors.dark.background, Colors.dark.surface]}
        style={styles.header}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{profile.name.charAt(0)}</Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileEmail}>{profile.email}</Text>
            <View style={styles.currentMood}>
              <Text style={styles.moodEmoji}>{getMoodEmoji(profile.currentMood)}</Text>
              <Text style={styles.moodText}>{getMoodDescription(profile.currentMood)}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <IconSymbol
              name={isEditing ? 'checkmark' : 'pencil'}
              size={20}
              color={Colors.dark.accent}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Settings</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={profile.name}
                onChangeText={(text) => updateProfile('name', text)}
                placeholder="Enter your name"
                placeholderTextColor={Colors.dark.placeholder}
              />
            ) : (
              <Text style={styles.settingValue}>{profile.name}</Text>
            )}
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={profile.email}
                onChangeText={(text) => updateProfile('email', text)}
                placeholder="Enter your email"
                placeholderTextColor={Colors.dark.placeholder}
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.settingValue}>{profile.email}</Text>
            )}
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Current Mood</Text>
            <Text style={styles.settingValue}>
              {getMoodEmoji(profile.currentMood)} {profile.currentMood.charAt(0).toUpperCase() + profile.currentMood.slice(1)}
            </Text>
          </View>
        </View>

        {/* Color Scheme Customization */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color Theme</Text>
          <Text style={styles.sectionDescription}>Choose your preferred color scheme</Text>
          
          <View style={styles.colorSchemesGrid}>
            {Object.entries(ColorSchemes).map(([scheme, colors]) =>
              renderColorSchemeOption(scheme as keyof typeof ColorSchemes, colors)
            )}
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.settingDescription}>Receive reminders and updates</Text>
            </View>
            <Switch
              value={profile.notificationsEnabled}
              onValueChange={(value) => updateProfile('notificationsEnabled', value)}
              trackColor={{ false: Colors.dark.surfaceVariant, true: Colors.dark.accent }}
              thumbColor={Colors.dark.text}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Breathing Reminders</Text>
              <Text style={styles.settingDescription}>Gentle reminders to practice breathing</Text>
            </View>
            <Switch
              value={profile.breathingReminders}
              onValueChange={(value) => updateProfile('breathingReminders', value)}
              trackColor={{ false: Colors.dark.surfaceVariant, true: Colors.dark.accent }}
              thumbColor={Colors.dark.text}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Journal Prompts</Text>
              <Text style={styles.settingDescription}>Daily prompts for reflection</Text>
            </View>
            <Switch
              value={profile.journalPrompts}
              onValueChange={(value) => updateProfile('journalPrompts', value)}
              trackColor={{ false: Colors.dark.surfaceVariant, true: Colors.dark.accent }}
              thumbColor={Colors.dark.text}
            />
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Journey</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>47</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Days Streak</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>23</Text>
              <Text style={styles.statLabel}>Resources Used</Text>
            </View>
          </View>
        </View>

        {/* Save Button */}
        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
            <LinearGradient
              colors={[Colors.dark.accent, Colors.dark.secondaryAccent]}
              style={styles.saveButtonGradient}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <View style={styles.signOutButtonContent}>
            <IconSymbol name="arrow.right.square" size={20} color={Colors.dark.error} />
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.dark.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.dark.background,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: Colors.dark.placeholder,
    marginBottom: 8,
  },
  currentMood: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  moodEmoji: {
    fontSize: 16,
  },
  moodText: {
    fontSize: 14,
    color: Colors.dark.placeholder,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.dark.placeholder,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.dark.placeholder,
  },
  settingValue: {
    fontSize: 16,
    color: Colors.dark.placeholder,
  },
  textInput: {
    fontSize: 16,
    color: Colors.dark.text,
    backgroundColor: Colors.dark.input,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 150,
  },
  colorSchemesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorSchemeOption: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.dark.surfaceVariant,
    minWidth: (width - 64) / 3,
  },
  colorSchemeOptionActive: {
    backgroundColor: Colors.dark.accent,
  },
  colorSwatches: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  colorSwatch: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  colorSchemeName: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.dark.text,
  },
  colorSchemeNameActive: {
    color: Colors.dark.background,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.dark.surfaceVariant,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.accent,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.dark.placeholder,
    textAlign: 'center',
  },
  saveButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.background,
  },
  signOutButton: {
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: Colors.dark.surfaceVariant,
    borderWidth: 1,
    borderColor: Colors.dark.error,
  },
  signOutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.error,
  },
});
