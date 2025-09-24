import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, processLock} from '@supabase/supabase-js';
import { config } from './config';

const supabaseUrl = config.supabase.url;
const supabaseKey = config.supabase.key;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
});

// Auth helpers
export const auth = {
  async signUp(email: string, password: string, name?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || '',
        },
      },
    });
    return { data, error };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    return { data, error };
  },
};

// Database helpers
export const db = {
  // User operations
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Conversation operations
  async getConversations(userId: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        messages (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async createConversation(userId: string, title?: string) {
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user_id: userId,
        title: title || 'New Conversation',
      })
      .select()
      .single();
    return { data, error };
  },

  async addMessage(conversationId: string, text: string, isUser: boolean, mood?: string) {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        text,
        is_user: isUser,
        mood,
      })
      .select()
      .single();
    return { data, error };
  },

  // Mood tracking
  async addMoodEntry(userId: string, mood: string, intensity: number, notes?: string, triggers?: string[]) {
    const { data, error } = await supabase
      .from('mood_entries')
      .insert({
        user_id: userId,
        mood,
        intensity,
        notes,
        triggers: triggers || [],
      })
      .select()
      .single();
    return { data, error };
  },

  async getMoodEntries(userId: string, limit = 30) {
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    return { data, error };
  },

  // Resources
  async getResources(moodTags?: string[], type?: string) {
    let query = supabase
      .from('resources')
      .select('*')
      .eq('is_active', true);

    if (moodTags && moodTags.length > 0) {
      query = query.overlaps('mood_tags', moodTags);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    return { data, error };
  },

  async getUserResources(userId: string) {
    const { data, error } = await supabase
      .from('user_resources')
      .select(`
        *,
        resources (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async markResourceComplete(userId: string, resourceId: string, rating?: number, notes?: string) {
    const { data, error } = await supabase
      .from('user_resources')
      .upsert({
        user_id: userId,
        resource_id: resourceId,
        completed: true,
        rating,
        notes,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();
    return { data, error };
  },

  // Journal entries
  async getJournalEntries(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('is_private', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    return { data, error };
  },

  async createJournalEntry(userId: string, title: string, content: string, mood?: string, tags?: string[]) {
    const { data, error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: userId,
        title,
        content,
        mood,
        tags: tags || [],
      })
      .select()
      .single();
    return { data, error };
  },

  // Breathing sessions
  async addBreathingSession(userId: string, exerciseType: string, duration: number, completed: boolean, notes?: string) {
    const { data, error } = await supabase
      .from('breathing_sessions')
      .insert({
        user_id: userId,
        exercise_type: exerciseType,
        duration,
        completed,
        notes,
      })
      .select()
      .single();
    return { data, error };
  },

  // User stats
  async getUserStats(userId: string) {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();
    return { data, error };
  },

  async updateUserStats(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('user_stats')
      .upsert({
        user_id: userId,
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    return { data, error };
  },
};
