export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface ThemeConfig {
  name: string;
  displayName: string;
  isDark: boolean;
  colors: ColorPalette;
}

export interface ThemePreset {
  name: string;
  displayName: string;
  isDark: boolean;
  colors: ColorPalette;
}

export const DEFAULT_PALETTE: ColorPalette = {
  primary: '#3b82f6',
  secondary: '#6366f1',
  accent: '#f59e0b',
  background: '#ffffff',
  text: '#1f2937'
};

export const DEFAULT_DARK_PALETTE: ColorPalette = {
  primary: '#60a5fa',
  secondary: '#818cf8',
  accent: '#fbbf24',
  background: '#1f2937',
  text: '#f3f4f6'
};

export const PRESET_PALETTES: ColorPalette[] = [
  { primary: '#3b82f6', secondary: '#6366f1', accent: '#f59e0b', background: '#ffffff', text: '#1f2937' },
  { primary: '#10b981', secondary: '#059669', accent: '#f59e0b', background: '#ffffff', text: '#1f2937' },
  { primary: '#ef4444', secondary: '#dc2626', accent: '#f59e0b', background: '#ffffff', text: '#1f2937' },
  { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#f59e0b', background: '#ffffff', text: '#1f2937' },
  { primary: '#ec4899', secondary: '#db2777', accent: '#f59e0b', background: '#ffffff', text: '#1f2937' },
  { primary: '#f59e0b', secondary: '#d97706', accent: '#3b82f6', background: '#ffffff', text: '#1f2937' }
];

export const PRESET_DARK_PALETTES: ColorPalette[] = [
  { primary: '#60a5fa', secondary: '#818cf8', accent: '#fbbf24', background: '#1f2937', text: '#f3f4f6' },
  { primary: '#34d399', secondary: '#10b981', accent: '#fbbf24', background: '#1f2937', text: '#f3f4f6' },
  { primary: '#f87171', secondary: '#ef4444', accent: '#fbbf24', background: '#1f2937', text: '#f3f4f6' },
  { primary: '#a78bfa', secondary: '#8b5cf6', accent: '#fbbf24', background: '#1f2937', text: '#f3f4f6' },
  { primary: '#f472b6', secondary: '#ec4899', accent: '#fbbf24', background: '#1f2937', text: '#f3f4f6' },
  { primary: '#fbbf24', secondary: '#f59e0b', accent: '#60a5fa', background: '#1f2937', text: '#f3f4f6' }
];

export const DEFAULT_THEME: ThemeConfig = {
  name: 'minimal',
  displayName: 'مینیمال',
  isDark: false,
  colors: DEFAULT_PALETTE
};

export const THEMES: ThemePreset[] = [
  {
    name: 'scifi',
    displayName: 'Sci-Fi',
    isDark: true,
    colors: {
      primary: '#00ffff',
      secondary: '#ff00ff',
      accent: '#ffff00',
      background: 'rgba(0, 20, 40, 0.9)',
      text: '#ffffff'
    }
  },
  {
    name: 'glassmorphism',
    displayName: 'شیشه‌ای',
    isDark: false,
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: 'rgba(255, 255, 255, 0.1)',
      text: '#1f2937'
    }
  },
  {
    name: 'hud',
    displayName: 'HUD',
    isDark: true,
    colors: {
      primary: '#00ff00',
      secondary: '#00cc00',
      accent: '#ffff00',
      background: 'rgba(0, 10, 0, 0.8)',
      text: '#00ff00'
    }
  },
  {
    name: 'win95',
    displayName: 'Windows 95',
    isDark: false,
    colors: {
      primary: '#000080',
      secondary: '#808080',
      accent: '#ff0000',
      background: '#c0c0c0',
      text: '#000000'
    }
  },
  {
    name: 'minimal',
    displayName: 'مینیمال',
    isDark: false,
    colors: {
      primary: '#3b82f6',
      secondary: '#6366f1',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    }
  },
  {
    name: 'dark',
    displayName: 'تم تاریک',
    isDark: true,
    colors: {
      primary: '#60a5fa',
      secondary: '#818cf8',
      accent: '#fbbf24',
      background: '#1f2937',
      text: '#f3f4f6'
    }
  },
  {
    name: 'light',
    displayName: 'تم روشن',
    isDark: false,
    colors: {
      primary: '#3b82f6',
      secondary: '#6366f1',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    }
  }
];
