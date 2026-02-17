export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  gradient: string;
  shadow: string;
  border: string;
}

export interface Typography {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing: string;
}

export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Shadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Animations {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

export interface ThemeConfig {
  name: string;
  displayName: string;
  isDark: boolean;
  colors: ColorPalette;
  typography: Typography;
  spacing: Spacing;
  shadows: Shadows;
  animations: Animations;
}

export interface ThemePreset extends ThemeConfig {
  description: string;
  preview: string;
}

export const DEFAULT_PALETTE: ColorPalette = {
  primary: '#3b82f6',
  secondary: '#6366f1',
  accent: '#f59e0b',
  background: '#ffffff',
  text: '#1f2937',
  gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
  shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: '#e5e7eb'
};

export const DEFAULT_DARK_PALETTE: ColorPalette = {
  primary: '#60a5fa',
  secondary: '#818cf8',
  accent: '#fbbf24',
  background: '#1f2937',
  text: '#f3f4f6',
  gradient: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)',
  shadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  border: '#4b5563'
};

export const DEFAULT_TYPOGRAPHY: Typography = {
  fontFamily: 'Vazirmatn, Tahoma, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '1.5',
  letterSpacing: '0.5px'
};

export const DEFAULT_DARK_TYPOGRAPHY: Typography = {
  fontFamily: 'Vazirmatn, Tahoma, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '1.5',
  letterSpacing: '0.5px'
};

export const DEFAULT_SPACING: Spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px'
};

export const DEFAULT_DARK_SPACING: Spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px'
};

export const DEFAULT_SHADOWS: Shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
};

export const DEFAULT_DARK_SHADOWS: Shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
};

export const DEFAULT_ANIMATIONS: Animations = {
  duration: {
    fast: '0.15s',
    normal: '0.25s',
    slow: '0.35s'
  },
  easing: {
    easeIn: 'ease-in-out',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out'
  }
};

export const DEFAULT_DARK_ANIMATIONS: Animations = {
  duration: {
    fast: '0.15s',
    normal: '0.25s',
    slow: '0.35s'
  },
  easing: {
    easeIn: 'ease-in-out',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out'
  }
};

export const PRESET_PALETTES: ColorPalette[] = [
  { primary: '#3b82f6', secondary: '#6366f1', accent: '#f59e0b', background: '#ffffff', text: '#1f2937', gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)', shadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '#e5e7eb' },
  { primary: '#10b981', secondary: '#059669', accent: '#f59e0b', background: '#ffffff', text: '#1f2937', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', shadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '#e5e7eb' },
  { primary: '#ef4444', secondary: '#dc2626', accent: '#f59e0b', background: '#ffffff', text: '#1f2937', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', shadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '#e5e7eb' },
  { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#f59e0b', background: '#ffffff', text: '#1f2937', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', shadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '#e5e7eb' },
  { primary: '#ec4899', secondary: '#db2777', accent: '#f59e0b', background: '#ffffff', text: '#1f2937', gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', shadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '#e5e7eb' },
  { primary: '#f59e0b', secondary: '#d97706', accent: '#3b82f6', background: '#ffffff', text: '#1f2937', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', shadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '#e5e7eb' }
];

export const PRESET_DARK_PALETTES: ColorPalette[] = [
  { primary: '#60a5fa', secondary: '#818cf8', accent: '#fbbf24', background: '#1f2937', text: '#f3f4f6', gradient: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)', shadow: '0 4px 6px rgba(0, 0, 0, 0.3)', border: '#4b5563' },
  { primary: '#34d399', secondary: '#10b981', accent: '#fbbf24', background: '#1f2937', text: '#f3f4f6', gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)', shadow: '0 4px 6px rgba(0, 0, 0, 0.3)', border: '#4b5563' },
  { primary: '#f87171', secondary: '#ef4444', accent: '#fbbf24', background: '#1f2937', text: '#f3f4f6', gradient: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)', shadow: '0 4px 6px rgba(0, 0, 0, 0.3)', border: '#4b5563' },
  { primary: '#a78bfa', secondary: '#8b5cf6', accent: '#fbbf24', background: '#1f2937', text: '#f3f4f6', gradient: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)', shadow: '0 4px 6px rgba(0, 0, 0, 0.3)', border: '#4b5563' },
  { primary: '#f472b6', secondary: '#ec4899', accent: '#fbbf24', background: '#1f2937', text: '#f3f4f6', gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)', shadow: '0 4px 6px rgba(0, 0, 0, 0.3)', border: '#4b5563' },
  { primary: '#fbbf24', secondary: '#f59e0b', accent: '#60a5fa', background: '#1f2937', text: '#f3f4f6', gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', shadow: '0 4px 6px rgba(0, 0, 0, 0.3)', border: '#4b5563' }
];

export const DEFAULT_THEME: ThemeConfig = {
  name: 'minimal',
  displayName: 'مینیمال',
  isDark: false,
  colors: DEFAULT_PALETTE,
  typography: DEFAULT_TYPOGRAPHY,
  spacing: DEFAULT_SPACING,
  shadows: DEFAULT_SHADOWS,
  animations: DEFAULT_ANIMATIONS
};

export const THEMES: ThemePreset[] = [
  {
    name: 'scifi',
    displayName: 'Sci-Fi',
    isDark: true,
    description: 'تم با های نون و افسانهای معمولی',
    preview: '🚀',
    colors: {
      primary: '#00ffff',
      secondary: '#ff00ff',
      accent: '#ffff00',
      background: 'rgba(0, 20, 40, 0.9)',
      text: '#ffffff',
      gradient: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
      shadow: '0 0 20px rgba(0, 255, 255, 0.5)',
      border: 'rgba(0, 255, 255, 0.3)'
    },
    typography: {
      fontFamily: 'فالسفا وزیرمتن, Tahoma, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0.5px'
    },
    spacing: DEFAULT_SPACING,
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
    },
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'glassmorphism',
    displayName: 'شیشه‌ای',
    isDark: false,
    description: 'تم با افسانهای شیشه‌ای و بلور',
    preview: '💎',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: 'rgba(255, 255, 255, 0.1)',
      text: '#1f2937',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: 'rgba(255, 255, 255, 0.3)'
    },
    typography: {
      fontFamily: 'فالسفا وزیرمتن, Tahoma, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0.5px'
    },
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'hud',
    displayName: 'HUD',
    isDark: true,
    description: 'تم با های نمایش هد و اسکلن‌های سینی',
    preview: '🛠️',
    colors: {
      primary: '#00ff00',
      secondary: '#00cc00',
      accent: '#ffff00',
      background: 'rgba(0, 10, 0, 0.8)',
      text: '#00ff00',
      gradient: 'linear-gradient(135deg, #00ff00 0%, #00cc00 100%)',
      shadow: '0 0 10px rgba(0, 255, 0, 0.5)',
      border: '#00ff00'
    },
    typography: {
      fontFamily: 'فالسفا وزیرمتن, Tahoma, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0.5px'
    },
    spacing: DEFAULT_SPACING,
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
    },
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'win95',
    displayName: 'Windows 95',
    isDark: false,
    description: 'تم با سبک ویندوز 95 و افکت‌های کلاسیک',
    preview: '🖥️',
    colors: {
      primary: '#000080',
      secondary: '#808080',
      accent: '#ff0000',
      background: '#c0c0c0',
      text: '#000000',
      gradient: 'linear-gradient(135deg, #000080 0%, #808080 100%)',
      shadow: 'none',
      border: '#ffffff'
    },
    typography: {
      fontFamily: 'فالسفا وزیرمتن, Tahoma, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0.5px'
    },
    spacing: DEFAULT_SPACING,
    shadows: {
      sm: 'none',
      md: 'none',
      lg: 'none',
      xl: 'none'
    },
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'minimal',
    displayName: 'مینیمال',
    isDark: false,
    description: 'تم مبتنی با طراحی ساده و نور',
    preview: '✨',
    colors: {
      primary: '#3b82f6',
      secondary: '#6366f1',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
      shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '#e5e7eb'
    },
    typography: {
      fontFamily: 'فالسفا وزیرمتن, Tahoma, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0.5px'
    },
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'dark',
    displayName: 'تم تاریک',
    isDark: true,
    description: 'تم تاریک با رنگ‌های عمیق',
    preview: '🌑',
    colors: {
      primary: '#60a5fa',
      secondary: '#818cf8',
      accent: '#fbbf24',
      background: '#1f2937',
      text: '#f3f4f6',
      gradient: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)',
      shadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      border: '#4b5563'
    },
    typography: {
      fontFamily: 'فالسفا وزیرمتن, Tahoma, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0.5px'
    },
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_DARK_SHADOWS,
    animations: DEFAULT_DARK_ANIMATIONS
  },
  {
    name: 'light',
    displayName: 'تم روشن',
    isDark: false,
    description: 'تم روشن با رنگ‌های سبک',
    preview: '☀️',
    colors: {
      primary: '#3b82f6',
      secondary: '#6366f1',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
      shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '#e5e7eb'
    },
    typography: {
      fontFamily: 'فالسفا وزیرمتن, Tahoma, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0.5px'
    },
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  }
  ,
  {
    name: 'neon',
    displayName: 'Neon',
    isDark: true,
    description: 'تم نئونی با کنتراست بالا و درخشش رنگ‌ها',
    preview: '🟣',
    colors: {
      primary: '#a855f7',
      secondary: '#22d3ee',
      accent: '#f472b6',
      background: '#0b1020',
      text: '#f8fafc',
      gradient: 'linear-gradient(135deg, #a855f7 0%, #22d3ee 100%)',
      shadow: '0 0 24px rgba(168, 85, 247, 0.35)',
      border: 'rgba(34, 211, 238, 0.25)'
    },
    typography: DEFAULT_TYPOGRAPHY,
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_DARK_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'aurora',
    displayName: 'Aurora',
    isDark: true,
    description: 'تم شفق قطبی با گرادیان سبز/بنفش',
    preview: '🌌',
    colors: {
      primary: '#34d399',
      secondary: '#60a5fa',
      accent: '#a78bfa',
      background: '#071427',
      text: '#e5e7eb',
      gradient: 'linear-gradient(135deg, #34d399 0%, #a78bfa 100%)',
      shadow: '0 10px 40px rgba(52, 211, 153, 0.15)',
      border: 'rgba(96, 165, 250, 0.22)'
    },
    typography: DEFAULT_TYPOGRAPHY,
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_DARK_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'ocean',
    displayName: 'Ocean',
    isDark: false,
    description: 'تم اقیانوسی با آبی‌های آرام و پس‌زمینه روشن',
    preview: '🌊',
    colors: {
      primary: '#0284c7',
      secondary: '#06b6d4',
      accent: '#22c55e',
      background: '#f0f9ff',
      text: '#0f172a',
      gradient: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
      shadow: '0 8px 30px rgba(2, 132, 199, 0.15)',
      border: '#bae6fd'
    },
    typography: DEFAULT_TYPOGRAPHY,
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'forest',
    displayName: 'Forest',
    isDark: false,
    description: 'تم طبیعت با سبزهای گرم و حس ارگانیک',
    preview: '🌿',
    colors: {
      primary: '#16a34a',
      secondary: '#15803d',
      accent: '#f59e0b',
      background: '#f0fdf4',
      text: '#052e16',
      gradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
      shadow: '0 10px 28px rgba(22, 163, 74, 0.16)',
      border: '#bbf7d0'
    },
    typography: DEFAULT_TYPOGRAPHY,
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'sunset',
    displayName: 'Sunset',
    isDark: false,
    description: 'تم غروب با نارنجی/صورتی و گرادیان‌های گرم',
    preview: '🌅',
    colors: {
      primary: '#f97316',
      secondary: '#fb7185',
      accent: '#a855f7',
      background: '#fff7ed',
      text: '#431407',
      gradient: 'linear-gradient(135deg, #f97316 0%, #fb7185 100%)',
      shadow: '0 12px 40px rgba(249, 115, 22, 0.18)',
      border: '#fed7aa'
    },
    typography: DEFAULT_TYPOGRAPHY,
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'rose',
    displayName: 'Rose',
    isDark: false,
    description: 'تم رز با صورتی‌های ملایم و ظاهری دوستانه',
    preview: '🌹',
    colors: {
      primary: '#e11d48',
      secondary: '#fb7185',
      accent: '#f59e0b',
      background: '#fff1f2',
      text: '#4c0519',
      gradient: 'linear-gradient(135deg, #e11d48 0%, #fb7185 100%)',
      shadow: '0 10px 30px rgba(225, 29, 72, 0.14)',
      border: '#fecdd3'
    },
    typography: DEFAULT_TYPOGRAPHY,
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'terminal',
    displayName: 'Terminal',
    isDark: true,
    description: 'تم ترمینال با سبز فسفری و حس رترو',
    preview: '🟩',
    colors: {
      primary: '#22c55e',
      secondary: '#86efac',
      accent: '#eab308',
      background: '#040a06',
      text: '#bbf7d0',
      gradient: 'linear-gradient(135deg, #22c55e 0%, #86efac 100%)',
      shadow: '0 0 22px rgba(34, 197, 94, 0.25)',
      border: 'rgba(34, 197, 94, 0.25)'
    },
    typography: DEFAULT_TYPOGRAPHY,
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_DARK_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'mono',
    displayName: 'Monochrome',
    isDark: false,
    description: 'تم تک‌رنگ برای محیط‌های مینیمال و حرفه‌ای',
    preview: '⬛',
    colors: {
      primary: '#111827',
      secondary: '#374151',
      accent: '#6b7280',
      background: '#ffffff',
      text: '#111827',
      gradient: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
      shadow: '0 6px 20px rgba(17, 24, 39, 0.12)',
      border: '#e5e7eb'
    },
    typography: DEFAULT_TYPOGRAPHY,
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'pastel',
    displayName: 'Pastel',
    isDark: false,
    description: 'تم پاستلی با رنگ‌های نرم و کم‌کنتراست',
    preview: '🧁',
    colors: {
      primary: '#60a5fa',
      secondary: '#a78bfa',
      accent: '#fda4af',
      background: '#f8fafc',
      text: '#0f172a',
      gradient: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
      shadow: '0 10px 28px rgba(96, 165, 250, 0.14)',
      border: '#e2e8f0'
    },
    typography: DEFAULT_TYPOGRAPHY,
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'desert',
    displayName: 'Desert',
    isDark: false,
    description: 'تم کویری با رنگ‌های خاکی و گرم',
    preview: '🏜️',
    colors: {
      primary: '#b45309',
      secondary: '#d97706',
      accent: '#84cc16',
      background: '#fffbeb',
      text: '#451a03',
      gradient: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)',
      shadow: '0 12px 36px rgba(180, 83, 9, 0.16)',
      border: '#fde68a'
    },
    typography: DEFAULT_TYPOGRAPHY,
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'midnight',
    displayName: 'Midnight',
    isDark: true,
    description: 'تم نیمه‌شب با آبی بسیار تیره و درخشش کم',
    preview: '🌙',
    colors: {
      primary: '#60a5fa',
      secondary: '#1d4ed8',
      accent: '#fbbf24',
      background: '#020617',
      text: '#e2e8f0',
      gradient: 'linear-gradient(135deg, #1d4ed8 0%, #60a5fa 100%)',
      shadow: '0 14px 46px rgba(29, 78, 216, 0.18)',
      border: 'rgba(96, 165, 250, 0.18)'
    },
    typography: DEFAULT_TYPOGRAPHY,
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_DARK_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'paper',
    displayName: 'Paper',
    isDark: false,
    description: 'تم کاغذی با پس‌زمینه کرم و کنتراست ملایم',
    preview: '📄',
    colors: {
      primary: '#334155',
      secondary: '#64748b',
      accent: '#0ea5e9',
      background: '#fffaf0',
      text: '#0f172a',
      gradient: 'linear-gradient(135deg, #334155 0%, #64748b 100%)',
      shadow: '0 10px 24px rgba(51, 65, 85, 0.12)',
      border: '#e2e8f0'
    },
    typography: DEFAULT_TYPOGRAPHY,
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  }
];

export const ADDITIONAL_THEMES: ThemePreset[] = [
  {
    name: 'luxury',
    displayName: 'Luxury',
    isDark: false,
    description: 'تم لوکس با ماده‌های مندرب و طلایی ذهبی',
    preview: '💍',
    colors: {
      primary: '#d4af37',
      secondary: '#b8860b',
      accent: '#cd853f',
      background: '#f5f5f5',
      text: '#2c3e50',
      gradient: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
      shadow: '0 8px 32px rgba(212, 175, 55, 0.2)',
      border: '#e0e0e0'
    },
    typography: {
      fontFamily: 'فالسفا وزیرمتن, Tahoma, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0.5px'
    },
    spacing: DEFAULT_SPACING,
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'modern',
    displayName: 'Modern',
    isDark: false,
    description: 'تم مدرن با خطوط صاف و رنگ‌های زنده',
    preview: '🎨',
    colors: {
      primary: '#0066cc',
      secondary: '#0099ff',
      accent: '#ff6b35',
      background: '#ffffff',
      text: '#2c3e50',
      gradient: 'linear-gradient(135deg, #0066cc 0%, #0099ff 100%)',
      shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '#dee2e6'
    },
    typography: {
      fontFamily: 'فالسفا وزیرمتن, Tahoma, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0.5px'
    },
    spacing: DEFAULT_SPACING,
    shadows: DEFAULT_SHADOWS,
    animations: DEFAULT_ANIMATIONS
  },
  {
    name: 'gradient',
    displayName: 'Gradient',
    isDark: false,
    description: 'تم با رنگ‌های زنده و انتقالی رنگی',
    preview: '🌈',
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f093fb',
      background: '#ffffff',
      text: '#2c3e50',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      shadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
      border: 'rgba(255, 255, 255, 0.3)'
    },
    typography: {
      fontFamily: 'فالسفا وزیرمتن, Tahoma, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0.5px'
    },
    spacing: DEFAULT_SPACING,
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
    },
    animations: DEFAULT_ANIMATIONS
  }
];

export const ALL_THEMES: ThemePreset[] = [...THEMES, ...ADDITIONAL_THEMES];
