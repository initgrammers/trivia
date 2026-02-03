/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

// Vivid Educational Color Palette
export const TriviaColors = {
  primary: '#8B5CF6',
  primaryDark: '#7C3AED',
  secondary: '#3B82F6',
  secondaryDark: '#2563EB',
  success: '#10B981',
  successDark: '#059669',
  error: '#EF4444',
  errorDark: '#DC2626',
  warning: '#F59E0B',
  warningDark: '#D97706',
  
  // Category colors
  ciencias: '#06B6D4',
  historia: '#F59E0B',
  geografia: '#10B981',
  arte: '#EC4899',
  deportes: '#EF4444',
  musica: '#8B5CF6',
  
  // Gradients
  gradientPurple: ['#8B5CF6', '#7C3AED'],
  gradientBlue: ['#3B82F6', '#2563EB'],
  gradientGreen: ['#10B981', '#059669'],
  gradientOrange: ['#F59E0B', '#D97706'],
  gradientPink: ['#EC4899', '#DB2777'],
  
  // Backgrounds
  bgLight: '#F8FAFC',
  bgDark: '#0F172A',
  cardLight: '#FFFFFF',
  cardDark: '#1E293B',
  
  // Text
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textLight: '#FFFFFF',
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
