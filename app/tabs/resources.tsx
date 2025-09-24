import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'activity';
  mood: string[];
  thumbnail?: string;
  duration?: string;
  description: string;
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Guided Breathing for Anxiety',
    type: 'video',
    mood: ['anxious', 'stressed'],
    duration: '10 min',
    description: 'A calming breathing exercise to help you find peace and reduce anxiety.',
  },
  {
    id: '2',
    title: 'Gratitude Journaling',
    type: 'activity',
    mood: ['sad', 'overwhelmed'],
    description: 'Write down three things you\'re grateful for today to shift your perspective.',
  },
  {
    id: '3',
    title: 'Body Scan Meditation',
    type: 'video',
    mood: ['tired', 'tense'],
    duration: '15 min',
    description: 'Release tension and connect with your body through mindful awareness.',
  },
  {
    id: '4',
    title: 'Creative Expression',
    type: 'activity',
    mood: ['confused', 'frustrated'],
    description: 'Draw, paint, or create something to express what you\'re feeling.',
  },
  {
    id: '5',
    title: 'Loving Kindness Meditation',
    type: 'video',
    mood: ['lonely', 'angry'],
    duration: '12 min',
    description: 'Cultivate compassion for yourself and others through this gentle practice.',
  },
  {
    id: '6',
    title: 'Nature Connection',
    type: 'activity',
    mood: ['disconnected', 'numb'],
    description: 'Step outside and spend time in nature to ground yourself.',
  },
];

export default function ResourcesScreen() {
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'video' | 'activity'>('all');

  const moods = ['all', 'anxious', 'sad', 'angry', 'tired', 'lonely', 'confused', 'overwhelmed'];

  const filteredResources = mockResources.filter(resource => {
    const moodMatch = selectedMood === 'all' || resource.mood.includes(selectedMood);
    const typeMatch = selectedType === 'all' || resource.type === selectedType;
    return moodMatch && typeMatch;
  });

  const getMoodEmoji = (mood: string) => {
    const emojiMap: { [key: string]: string } = {
      anxious: '😰',
      sad: '😢',
      angry: '😠',
      tired: '😴',
      lonely: '😔',
      confused: '😕',
      overwhelmed: '😵',
    };
    return emojiMap[mood] || '😊';
  };

  const renderResourceCard = (resource: Resource) => (
    <TouchableOpacity key={resource.id} style={styles.resourceCard}>
      <LinearGradient
        colors={[Colors.dark.surface, Colors.dark.surfaceVariant]}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <View style={styles.typeIcon}>
            <IconSymbol
              name={resource.type === 'video' ? 'play.fill' : 'pencil.and.outline'}
              size={20}
              color={Colors.dark.accent}
            />
          </View>
          {resource.duration && (
            <Text style={styles.duration}>{resource.duration}</Text>
          )}
        </View>
        
        <Text style={styles.resourceTitle}>{resource.title}</Text>
        <Text style={styles.resourceDescription}>{resource.description}</Text>
        
        <View style={styles.moodTags}>
          {resource.mood.map((mood) => (
            <View key={mood} style={styles.moodTag}>
              <Text style={styles.moodEmoji}>{getMoodEmoji(mood)}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <LinearGradient
        colors={[Colors.dark.background, Colors.dark.surface]}
        style={styles.header}
      >
        <Text style={styles.title}>Resources</Text>
        <Text style={styles.subtitle}>Find support for your current mood</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Mood Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Filter by Mood</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moodScroll}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood}
                style={[
                  styles.moodButton,
                  selectedMood === mood && styles.moodButtonActive
                ]}
                onPress={() => setSelectedMood(mood)}
              >
                <Text style={styles.moodButtonText}>
                  {mood === 'all' ? 'All' : `${getMoodEmoji(mood)} ${mood.charAt(0).toUpperCase() + mood.slice(1)}`}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Type Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Filter by Type</Text>
          <View style={styles.typeButtons}>
            {(['all', 'video', 'activity'] as const).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  selectedType === type && styles.typeButtonActive
                ]}
                onPress={() => setSelectedType(type)}
              >
                <IconSymbol
                  name={
                    type === 'all' ? 'square.grid.2x2' :
                    type === 'video' ? 'play.rectangle' : 'pencil.and.outline'
                  }
                  size={16}
                  color={selectedType === type ? Colors.dark.background : Colors.dark.text}
                />
                <Text style={[
                  styles.typeButtonText,
                  selectedType === type && styles.typeButtonTextActive
                ]}>
                  {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Resources Grid */}
        <View style={styles.resourcesGrid}>
          {filteredResources.map(renderResourceCard)}
        </View>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.placeholder,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 12,
  },
  moodScroll: {
    flexDirection: 'row',
  },
  moodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.dark.surfaceVariant,
    marginRight: 8,
  },
  moodButtonActive: {
    backgroundColor: Colors.dark.accent,
  },
  moodButtonText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '500',
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.dark.surfaceVariant,
    gap: 6,
  },
  typeButtonActive: {
    backgroundColor: Colors.dark.accent,
  },
  typeButtonText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: Colors.dark.background,
  },
  resourcesGrid: {
    gap: 16,
    paddingBottom: 100,
  },
  resourceCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  duration: {
    color: Colors.dark.placeholder,
    fontSize: 12,
    fontWeight: '500',
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  resourceDescription: {
    fontSize: 14,
    color: Colors.dark.placeholder,
    lineHeight: 20,
    marginBottom: 12,
  },
  moodTags: {
    flexDirection: 'row',
    gap: 8,
  },
  moodTag: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 16,
  },
});
