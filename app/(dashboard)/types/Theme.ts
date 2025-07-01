export interface Theme {
  primary: string;
  background: string;
  sidebarBg: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  white: string;
  border: string;
}

export const lightTheme: Theme = {
  primary: '#FE7743',
  background: '#F8F9FA',
  sidebarBg: '#2C3A47',
  cardBg: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  white: '#FFFFFF',
  border: '#E5E7EB',
};

export const darkTheme: Theme = {
  primary: '#FE7743',
  background: '#111827',
  sidebarBg: '#1F2937',
  cardBg: '#1F2937',
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  white: '#FFFFFF',
  border: '#374151',
};