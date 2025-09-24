import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  mood?: string;
}

interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds
  pattern: '4-4-4-4' | '4-7-8' | 'box';
}

const breathingExercises: BreathingExercise[] = [
  {
    id: '1',
    name: 'Box Breathing',
    description: 'Inhale for 4, hold for 4, exhale for 4, hold for 4',
    duration: 120,
    pattern: 'box',
  },
  {
    id: '2',
    name: '4-7-8 Technique',
    description: 'Inhale for 4, hold for 7, exhale for 8',
    duration: 90,
    pattern: '4-7-8',
  },
  {
    id: '3',
    name: 'Equal Breathing',
    description: 'Equal inhale and exhale for 4 counts each',
    duration: 60,
    pattern: '4-4-4-4',
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Felix, your emotional processing companion. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBreathingOptions, setShowBreathingOptions] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple keyword-based responses (in a real app, you'd use an AI API)
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
      return "I hear that you're feeling anxious. That's completely valid. Would you like to try a breathing exercise together? It can help calm your nervous system.";
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('down')) {
      return "I'm sorry you're feeling sad right now. Sadness is a natural emotion, and it's okay to feel it. Would you like to talk about what's on your mind, or would you prefer to try a gentle activity?";
    }
    
    if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated')) {
      return "Anger can be intense to experience. Let's take a moment to breathe together and then explore what might be underneath this feeling.";
    }
    
    if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
      return "It sounds like you're feeling drained. Rest is important for emotional well-being. Would you like to try a gentle breathing exercise or meditation?";
    }
    
    if (lowerMessage.includes('breathing') || lowerMessage.includes('breathe')) {
      setShowBreathingOptions(true);
      return "Great idea! Breathing exercises can be incredibly helpful. Let me show you some options to choose from.";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're very welcome! I'm here whenever you need support. Remember, it's okay to feel your feelings fully.";
    }
    
    // Default empathetic response
    return "Thank you for sharing that with me. I'm here to listen and support you. What would feel most helpful right now - talking more about how you're feeling, or trying a calming exercise?";
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(userMessage.text),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  const startBreathingExercise = (exercise: BreathingExercise) => {
    setShowBreathingOptions(false);
    const breathingMessage: Message = {
      id: Date.now().toString(),
      text: `Let's start ${exercise.name}. ${exercise.description}. I'll guide you through it step by step.`,
      isUser: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, breathingMessage]);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isUser ? styles.userMessageContainer : styles.aiMessageContainer,
      ]}
    >
      <LinearGradient
        colors={
          message.isUser
            ? [Colors.dark.accent, Colors.dark.secondaryAccent]
            : [Colors.dark.surface, Colors.dark.surfaceVariant]
        }
        style={[
          styles.messageBubble,
          message.isUser ? styles.userMessageBubble : styles.aiMessageBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            message.isUser ? styles.userMessageText : styles.aiMessageText,
          ]}
        >
          {message.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            message.isUser ? styles.userTimestamp : styles.aiTimestamp,
          ]}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
      {/* Header */}
      <LinearGradient
        colors={[Colors.dark.background, Colors.dark.surface]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.aiAvatar}>
            <Text style={styles.aiAvatarText}>F</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>Felix</Text>
            <Text style={styles.headerSubtitle}>Your emotional companion</Text>
          </View>
          <TouchableOpacity
            style={styles.breathingButton}
            onPress={() => setShowBreathingOptions(!showBreathingOptions)}
          >
            <IconSymbol name="wind" size={20} color={Colors.dark.accent} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Breathing Options Modal */}
      {showBreathingOptions && (
        <View style={styles.breathingModal}>
          <Text style={styles.breathingModalTitle}>Choose a Breathing Exercise</Text>
          {breathingExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.breathingOption}
              onPress={() => startBreathingExercise(exercise)}
            >
              <Text style={styles.breathingOptionName}>{exercise.name}</Text>
              <Text style={styles.breathingOptionDescription}>{exercise.description}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowBreathingOptions(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}
        
        {isTyping && (
          <View style={[styles.messageContainer, styles.aiMessageContainer]}>
            <View style={[styles.messageBubble, styles.aiMessageBubble]}>
              <View style={styles.typingIndicator}>
                <View style={[styles.typingDot, styles.typingDot1]} />
                <View style={[styles.typingDot, styles.typingDot2]} />
                <View style={[styles.typingDot, styles.typingDot3]} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="How are you feeling today?"
          placeholderTextColor={Colors.dark.placeholder}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, inputText.trim() === '' && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={inputText.trim() === ''}
        >
          <LinearGradient
            colors={
              inputText.trim() === ''
                ? [Colors.dark.surfaceVariant, Colors.dark.surfaceVariant]
                : [Colors.dark.accent, Colors.dark.secondaryAccent]
            }
            style={styles.sendButtonGradient}
          >
            <IconSymbol name="arrow.up" size={20} color={Colors.dark.background} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.dark.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aiAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.dark.placeholder,
  },
  breathingButton: {
    marginLeft: 'auto',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathingModal: {
    position: 'absolute',
    top: 140,
    left: 20,
    right: 20,
    backgroundColor: Colors.dark.surface,
    borderRadius: 16,
    padding: 20,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  breathingModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  breathingOption: {
    backgroundColor: Colors.dark.surfaceVariant,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  breathingOptionName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  breathingOptionDescription: {
    fontSize: 14,
    color: Colors.dark.placeholder,
  },
  closeButton: {
    backgroundColor: Colors.dark.accent,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  closeButtonText: {
    color: Colors.dark.background,
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesContent: {
    paddingVertical: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  aiMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 16,
    borderRadius: 20,
  },
  userMessageBubble: {
    borderBottomRightRadius: 4,
  },
  aiMessageBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: Colors.dark.background,
  },
  aiMessageText: {
    color: Colors.dark.text,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  userTimestamp: {
    color: Colors.dark.background,
    opacity: 0.7,
  },
  aiTimestamp: {
    color: Colors.dark.placeholder,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.placeholder,
  },
  typingDot1: {
    opacity: 0.4,
  },
  typingDot2: {
    opacity: 0.7,
  },
  typingDot3: {
    opacity: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.dark.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.dark.input,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.dark.text,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});