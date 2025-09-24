// Configuration file for Felix app
export const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/feelix_db',
  },
  
  // Supabase
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    key: process.env.EXPO_PUBLIC_SUPABASE_KEY || '',
  },
  
  // AI API
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
  },
  
  // App
  app: {
    url: process.env.EXPO_PUBLIC_APP_URL || 'http://localhost:3000',
  },
};
