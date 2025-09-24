/**
 * Felix - Emotional Processing App Theme
 * Glossy black design with white font and accent colors
 */

import { Platform } from 'react-native';

// Glossy black theme with white font and accent colors
const primaryAccent = '#FF6B6B'; // Coral red for emotional warmth
const secondaryAccent = '#4ECDC4'; // Teal for calm and balance
const tertiaryAccent = '#45B7D1'; // Blue for trust and stability

export const Colors = {
  light: {
    text: '#FFFFFF',
    background: '#0A0A0A',
    surface: '#1A1A1A',
    surfaceVariant: '#2A2A2A',
    tint: primaryAccent,
    accent: primaryAccent,
    secondaryAccent: secondaryAccent,
    tertiaryAccent: tertiaryAccent,
    icon: '#FFFFFF',
    tabIconDefault: '#666666',
    tabIconSelected: primaryAccent,
    border: '#333333',
    card: '#1A1A1A',
    input: '#2A2A2A',
    placeholder: '#888888',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
  dark: {
    text: '#FFFFFF',
    background: '#0A0A0A',
    surface: '#1A1A1A',
    surfaceVariant: '#2A2A2A',
    tint: primaryAccent,
    accent: primaryAccent,
    secondaryAccent: secondaryAccent,
    tertiaryAccent: tertiaryAccent,
    icon: '#FFFFFF',
    tabIconDefault: '#666666',
    tabIconSelected: primaryAccent,
    border: '#333333',
    card: '#1A1A1A',
    input: '#2A2A2A',
    placeholder: '#888888',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
};

// Custom color schemes for user customization
export const ColorSchemes = {
  default: {
    primary: primaryAccent,
    secondary: secondaryAccent,
    tertiary: tertiaryAccent,
  },
  ocean: {
    primary: '#4ECDC4',
    secondary: '#45B7D1',
    tertiary: '#96CEB4',
  },
  sunset: {
    primary: '#FF6B6B',
    secondary: '#FFA726',
    tertiary: '#FF8A65',
  },
  forest: {
    primary: '#66BB6A',
    secondary: '#81C784',
    tertiary: '#A5D6A7',
  },
  lavender: {
    primary: '#BA68C8',
    secondary: '#CE93D8',
    tertiary: '#E1BEE7',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
