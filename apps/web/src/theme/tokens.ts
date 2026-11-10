/**
 * HAVEN — Elderly Care & Facility Management System
 * Design System Tokens
 * 
 * "A safer, smarter and more caring place for every resident."
 * Visual direction: premium, welcoming, calm, minimal, modern, and information-rich.
 * Intentionally departs from cold, sterile clinical aesthetics toward warm hospitality & dignity.
 */

export const HAVEN_COLORS = {
  // Primary brand palette
  brand: {
    offwhite: '#F7F6F2',
    greige: '#D7D0C5',
    taupe: '#A99A89',
    mocha: '#79675A',
    charcoal: '#393633',
  },

  // Extended tonal range for layered surfaces and accessible contrast
  neutral: {
    cream: '#FCFAF6',
    surface: '#F7F6F2',
    surfaceSubtle: '#F0ECE4',
    borderLight: '#E8E3DB',
    border: '#D7D0C5',
    borderDark: '#BCB1A3',
    muted: '#736E67',
    textSecondary: '#5E5953',
    textPrimary: '#393633',
    charcoalDark: '#22201E',
  },

  // Calming, gentle status tones (non-clinical, serene)
  status: {
    success: {
      main: '#3E7356',
      soft: '#EBF4EE',
      border: '#BCD8C6',
      text: '#2A513C',
    },
    warning: {
      main: '#B26A28',
      soft: '#FDF3E7',
      border: '#EDD0B1',
      text: '#834C1A',
    },
    danger: {
      main: '#A9433B',
      soft: '#FBF0EF',
      border: '#EEC3C0',
      text: '#7A2E28',
    },
    info: {
      main: '#466D85',
      soft: '#EDF4F8',
      border: '#BDD4E4',
      text: '#2F4D60',
    },
  },
} as const;

export const HAVEN_RADII = {
  none: '0px',
  xs: '4px',
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
  '2xl': '28px',
  full: '9999px',
} as const;

export const HAVEN_SHADOWS = {
  sm: '0 1px 2px 0 rgba(57, 54, 51, 0.05)',
  card: '0 2px 8px -2px rgba(57, 54, 51, 0.06), 0 1px 4px -1px rgba(57, 54, 51, 0.04)',
  hover: '0 12px 24px -6px rgba(57, 54, 51, 0.08), 0 4px 12px -2px rgba(57, 54, 51, 0.04)',
  modal: '0 24px 48px -12px rgba(57, 54, 51, 0.18), 0 12px 24px -6px rgba(57, 54, 51, 0.1)',
} as const;

export const HAVEN_TRANSITIONS = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export type HavenColorToken = typeof HAVEN_COLORS;
