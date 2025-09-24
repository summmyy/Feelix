# Felix - Emotional Processing App

Felix is a React Native app built with Expo that helps users process their emotions through AI-powered conversations, breathing exercises, and personalized resources.

## Features

### 🤖 AI Chatbot
- Emotional processing companion named Felix
- Intelligent responses based on user's emotional state
- Breathing exercise recommendations
- Mood tracking and analysis

### 📚 Resources Tab
- Mood-based video and activity recommendations
- Filter by emotion (anxious, sad, angry, etc.)
- Filter by type (video, activity, meditation)
- Personalized content suggestions

### 👤 Profile Tab
- User profile management
- Color scheme customization (5 themes available)
- Notification preferences
- Usage statistics and journey tracking
- Sign out functionality

## Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: Expo Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth
- **Styling**: Custom theme system with LinearGradient
- **State Management**: React Context API

## Project Structure

```
feelix/
├── app/                    # App screens (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Chat screen (Felix AI)
│   │   ├── resources.tsx  # Resources tab
│   │   └── profile.tsx    # Profile tab
│   ├── login.tsx          # Authentication screen
│   └── _layout.tsx        # Root layout with auth routing
├── components/            # Reusable UI components
├── constants/             # Theme and color definitions
├── contexts/              # React Context providers
│   └── AuthContext.tsx    # Authentication context
├── lib/                   # Utility libraries
│   ├── config.ts          # App configuration
│   └── supabase.ts        # Supabase client and helpers
├── prisma/                # Database schema and migrations
│   └── schema.prisma      # Database models
└── hooks/                 # Custom React hooks
```

## Database Schema

The app uses Prisma with PostgreSQL and includes models for:

- **User**: Profile information and preferences
- **Conversation**: Chat sessions with Felix
- **Message**: Individual chat messages
- **MoodEntry**: User's emotional state tracking
- **Resource**: Videos, activities, and exercises
- **UserResource**: User's interaction with resources
- **JournalEntry**: Personal journal entries
- **BreathingSession**: Breathing exercise sessions
- **UserStats**: Usage statistics and progress

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. Create a PostgreSQL database
2. Set up your database URL in `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/feelix_db"
```

3. Run Prisma migrations:

```bash
npx prisma migrate dev
npx prisma generate
```

### 3. Supabase Setup

1. Create a Supabase project
2. Add your Supabase credentials to `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/feelix_db"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI API (optional - for enhanced AI responses)
OPENAI_API_KEY=your_openai_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run the App

```bash
npm start
```

## Color Themes

The app includes 5 customizable color schemes:

1. **Default**: Coral red, teal, and blue
2. **Ocean**: Various shades of blue and teal
3. **Sunset**: Warm oranges and reds
4. **Forest**: Natural greens
5. **Lavender**: Soft purples

## Key Features Implementation

### Authentication Flow
- Login/signup screen with form validation
- Automatic routing based on auth state
- Profile creation and management
- Secure sign out with confirmation

### AI Chat Interface
- Real-time messaging with Felix
- Typing indicators and timestamps
- Mood-based response generation
- Breathing exercise recommendations
- Message history persistence

### Resource Management
- Dynamic filtering by mood and type
- Interactive resource cards
- User progress tracking
- Personalized recommendations

### Profile Customization
- Real-time theme switching
- Notification preferences
- Usage statistics display
- Profile editing with validation

## Future Enhancements

- Real AI integration (OpenAI API)
- Push notifications for breathing reminders
- Advanced mood analytics and insights
- Social features and sharing
- Offline mode support
- Voice interaction with Felix

## Development Notes

- All screens use the glossy black theme by default
- LinearGradient is used throughout for visual appeal
- Haptic feedback on tab interactions
- Responsive design for different screen sizes
- TypeScript for type safety
- ESLint for code quality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
