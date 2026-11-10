/**
 * HAVEN — Elderly Care & Facility Management System
 * Design System Tokens v2.0 (Royal Blue & Ice Blue)
 * 
 * Visual direction: light, clean, premium, calm, welcoming, modern.
 * Font: Plus Jakarta Sans.
 * Exact approved brand, neutral, and status color tokens.
 */

export const HAVEN_COLORS = {
  // Approved exact brand tokens
  brand: {
    navy900: '#173B70', // Brand, major headings
    blue700: '#2457C5', // Primary buttons, active navigation, interactive focus
    blue500: '#3979D8', // Links, charts, interactive highlights
    blue100: '#E4EDFF', // Selected states, secondary actions
    blue50: '#F4F8FF',  // Main application background

    // Backwards-compatible semantic aliases
    offwhite: '#F4F8FF',
    greige: '#E6ECF4',
    taupe: '#3979D8',
    mocha: '#2457C5',
    charcoal: '#172B4D',
  },

  // Approved exact neutral tokens
  neutral: {
    white: '#FFFFFF',    // Sidebar, topbar, cards, dialogs
    slate50: '#F8FAFC',  // Subtle sections
    slate100: '#F1F5F9', // Neutral separators
    slate500: '#64748B', // Secondary text
    slate700: '#334155', // Body text
    slate900: '#172B4D', // Primary text
    border: '#E6ECF4',   // Structural borders

    // Backwards-compatible semantic aliases
    cream: '#FFFFFF',
    surface: '#F4F8FF',
    surfaceSubtle: '#F8FAFC',
    borderLight: '#F1F5F9',
    borderDark: '#CBD5E1',
    muted: '#64748B',
    textSecondary: '#64748B',
    textPrimary: '#172B4D',
    charcoalDark: '#0F1E36',
  },

  // Approved exact status tokens (background / foreground)
  status: {
    success: {
      main: '#16856B',
      soft: '#E8F5EF',
      border: '#C8E8DC',
      text: '#16856B',
    },
    information: {
      main: '#2457C5',
      soft: '#EAF2FF',
      border: '#C8DCFF',
      text: '#2457C5',
    },
    // info alias for backwards compatibility
    info: {
      main: '#2457C5',
      soft: '#EAF2FF',
      border: '#C8DCFF',
      text: '#2457C5',
    },
    warning: {
      main: '#A96B12',
      soft: '#FFF5E5',
      border: '#FCE2BA',
      text: '#A96B12',
    },
    critical: {
      main: '#C84D45',
      soft: '#FDEDEC',
      border: '#F9CBC7',
      text: '#C84D45',
    },
    // danger alias for backwards compatibility
    danger: {
      main: '#C84D45',
      soft: '#FDEDEC',
      border: '#F9CBC7',
      text: '#C84D45',
    },
    neutral: {
      main: '#64748B',
      soft: '#F1F5F9',
      border: '#E2E8F0',
      text: '#64748B',
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

// Light, clean, subtle slate/navy shadows
export const HAVEN_SHADOWS = {
  sm: '0 1px 2px 0 rgba(23, 43, 77, 0.04)',
  card: '0 1px 3px 0 rgba(23, 43, 77, 0.05), 0 1px 2px -1px rgba(23, 43, 77, 0.03)',
  hover: '0 10px 20px -5px rgba(23, 43, 77, 0.08), 0 4px 8px -2px rgba(23, 43, 77, 0.04)',
  modal: '0 20px 35px -10px rgba(23, 43, 77, 0.16), 0 8px 16px -4px rgba(23, 43, 77, 0.08)',
  popover: '0 12px 28px -6px rgba(23, 43, 77, 0.12), 0 4px 10px -2px rgba(23, 43, 77, 0.06)',
} as const;

export const HAVEN_TRANSITIONS = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export type HavenColorToken = typeof HAVEN_COLORS;
