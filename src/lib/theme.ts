import prisma from './prisma';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  accentLight: string;
  background: string;
  surface: string;
  textMain: string;
  textMuted: string;
  border: string;
  headerBg: string;
  footerBg: string;
  heroGradientStart?: string;
  heroGradientEnd?: string;
}

export interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
  fontSizeBase: string;
  lineHeight: string;
  fontWeightBold: string;
}

export interface ThemeLayout {
  containerWidth: string;
  cardRadius: string;
  buttonRadius: string;
  shadowStrength: string;
  headerStyle: string;
  footerStyle: string;
}

export interface FullThemeConfig {
  id: string;
  name: string;
  slug: string;
  version: number;
  colors: ThemeColors;
  typography: ThemeTypography;
  layout: ThemeLayout;
}

export const defaultColors: ThemeColors = {
  primary: '#1E40AF',
  primaryLight: '#3B82F6',
  secondary: '#0284C7',
  accent: '#EC4899',
  accentLight: '#F472B6',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  headerBg: '#0F172A',
  footerBg: '#0B1329',
  heroGradientStart: '#1E3A8A',
  heroGradientEnd: '#831843',
};

export const defaultTypography: ThemeTypography = {
  headingFont: 'Noto Sans Thai, sans-serif',
  bodyFont: 'Noto Sans Thai, sans-serif',
  fontSizeBase: '16px',
  lineHeight: '1.6',
  fontWeightBold: '700',
};

export const defaultLayout: ThemeLayout = {
  containerWidth: '1280px',
  cardRadius: '16px',
  buttonRadius: '12px',
  shadowStrength: 'medium',
  headerStyle: 'sticky',
  footerStyle: 'multi-column',
};

export async function getActiveTheme(): Promise<FullThemeConfig> {
  try {
    const active = await prisma.websiteTheme.findFirst({
      where: { isActive: true },
    });

    if (!active) {
      return {
        id: 'default',
        name: 'Modern Technology',
        slug: 'modern-technology',
        version: 1,
        colors: defaultColors,
        typography: defaultTypography,
        layout: defaultLayout,
      };
    }

    return {
      id: active.id,
      name: active.name,
      slug: active.slug,
      version: active.version,
      colors: { ...defaultColors, ...(active.colors ? JSON.parse(active.colors) : {}) },
      typography: { ...defaultTypography, ...(active.typography ? JSON.parse(active.typography) : {}) },
      layout: { ...defaultLayout, ...(active.layout ? JSON.parse(active.layout) : {}) },
    };
  } catch {
    return {
      id: 'default',
      name: 'Modern Technology',
      slug: 'modern-technology',
      version: 1,
      colors: defaultColors,
      typography: defaultTypography,
      layout: defaultLayout,
    };
  }
}

export function generateCssVariables(theme: FullThemeConfig): string {
  const c = theme.colors;
  const l = theme.layout;
  const t = theme.typography;

  return `
    :root {
      --color-primary: ${c.primary};
      --color-primary-light: ${c.primaryLight};
      --color-secondary: ${c.secondary};
      --color-accent: ${c.accent};
      --color-accent-light: ${c.accentLight};
      --color-bg: ${c.background};
      --color-surface: ${c.surface};
      --color-text-main: ${c.textMain};
      --color-text-muted: ${c.textMuted};
      --color-border: ${c.border};
      --color-header-bg: ${c.headerBg};
      --color-footer-bg: ${c.footerBg};
      --hero-grad-start: ${c.heroGradientStart || '#1E3A8A'};
      --hero-grad-end: ${c.heroGradientEnd || '#831843'};
      --radius-card: ${l.cardRadius};
      --radius-btn: ${l.buttonRadius};
      --container-max-w: ${l.containerWidth};
      --font-heading: ${t.headingFont};
      --font-body: ${t.bodyFont};
    }
  `;
}
