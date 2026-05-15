import { cn } from '@lib/utils';

type AnyRecord = Record<string, unknown>;

type StyleGroup = {
  layout?: string;
  themeVariant?: string;
  backgroundType?: string;
  solidBackground?: string;
  gradientPreset?: string;
  overlay?: string;
  spacing?: string;
  alignment?: string;
  contentWidth?: string;
  containerWidth?: string;
  headingSize?: string;
  textSize?: string;
  fontWeight?: string;
  uppercaseHeadings?: boolean;
  gridLayout?: string;
  cardStyle?: string;
  mediaStyle?: string;
  borderRadius?: string;
  shadowStyle?: string;
  buttonStyle?: string;
  animationStyle?: string;
};

const spacingMap: Record<string, string> = {
  sm: 'py-8 md:py-10',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-20 md:py-32',
};

const themeMap: Record<string, string> = {
  dark: 'bg-dark-950 text-white',
  light: 'bg-white text-dark-950',
  'luxury-blue': 'bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white',
  glass: 'bg-white/5 backdrop-blur-md text-white border border-white/10',
  minimal: 'bg-dark-900 text-white',
  'modern-gradient': 'bg-gradient-to-r from-dark-900 via-blue-950 to-dark-950 text-white',
};

const solidBgMap: Record<string, string> = {
  'dark-950': 'bg-dark-950',
  'dark-900': 'bg-dark-900',
  white: 'bg-white text-dark-950',
  slate: 'bg-slate-900 text-white',
  accent: 'bg-premium-accent text-dark-950',
};

const gradientMap: Record<string, string> = {
  'dark-to-dark': 'bg-gradient-to-b from-dark-900 to-dark-950',
  'accent-to-blue': 'bg-gradient-to-r from-premium-accent/20 to-blue-500/20',
  'blue-to-cyan': 'bg-gradient-to-r from-blue-700/20 to-cyan-500/20',
  'dark-to-accent': 'bg-gradient-to-b from-dark-950 to-premium-accent/10',
};

const alignMap: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const contentWidthMap: Record<string, string> = {
  narrow: 'max-w-2xl',
  medium: 'max-w-4xl',
  wide: 'max-w-6xl',
  full: 'max-w-none',
};

const containerWidthMap: Record<string, string> = {
  default: '',
  narrow: 'max-w-4xl mx-auto',
  wide: 'max-w-7xl mx-auto',
  full: 'max-w-none w-full',
};

const headingSizeMap: Record<string, string> = {
  sm: 'text-2xl md:text-3xl',
  md: 'text-3xl md:text-4xl',
  lg: 'text-4xl md:text-5xl',
  xl: 'text-5xl md:text-6xl',
};

const textSizeMap: Record<string, string> = {
  sm: 'text-sm md:text-base',
  md: 'text-base md:text-lg',
  lg: 'text-lg md:text-xl',
};

const fontWeightMap: Record<string, string> = {
  normal: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const radiusMap: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-md',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full',
};

const shadowMap: Record<string, string> = {
  none: 'shadow-none',
  soft: 'shadow-md',
  medium: 'shadow-lg',
  strong: 'shadow-2xl',
  glow: 'shadow-[0_0_30px_rgba(56,189,248,0.25)]',
};

const overlayMap: Record<string, string> = {
  none: '',
  light: 'before:absolute before:inset-0 before:bg-black/20 before:pointer-events-none',
  medium: 'before:absolute before:inset-0 before:bg-black/35 before:pointer-events-none',
  dark: 'before:absolute before:inset-0 before:bg-black/55 before:pointer-events-none',
};

const visibilityMap: Record<string, string> = {
  all: '',
  'desktop-only': 'hidden lg:block',
  'tablet-only': 'hidden md:block lg:hidden',
  'mobile-only': 'block md:hidden',
  'hide-mobile': 'hidden md:block',
  'hide-desktop': 'block lg:hidden',
};

const gridMap: Record<string, string> = {
  '2-col': 'grid-cols-1 md:grid-cols-2',
  '3-col': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  '4-col': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

const mediaMap: Record<string, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  cinematic: 'object-cover saturate-110 contrast-110',
  rounded: 'object-cover rounded-xl',
  parallax: 'object-cover scale-110',
};

const cardMap: Record<string, string> = {
  default: 'border border-dark-700 bg-dark-900',
  elevated: 'border border-dark-700 bg-dark-900 shadow-xl',
  outlined: 'border-2 border-premium-accent/40 bg-dark-900',
  glass: 'border border-white/20 bg-white/5 backdrop-blur-md',
};

const buttonVariantMap: Record<string, 'primary' | 'outline' | 'ghost'> = {
  primary: 'primary',
  secondary: 'primary',
  outline: 'outline',
  ghost: 'ghost',
  gradient: 'primary',
};

export function getSectionStyle(block: AnyRecord) {
  const isVisible = block.isVisible !== false;
  const responsiveVisibility = typeof block.responsiveVisibility === 'string' ? block.responsiveVisibility : 'all';
  const style = (block.style as StyleGroup) || {};

  const sectionThemeClass =
    style.backgroundType === 'solid'
      ? solidBgMap[style.solidBackground || 'dark-950']
      : style.backgroundType === 'gradient'
        ? gradientMap[style.gradientPreset || 'dark-to-dark']
        : themeMap[style.themeVariant || 'dark'];

  const sectionClass = cn(
    'relative overflow-hidden',
    spacingMap[style.spacing || 'lg'],
    sectionThemeClass,
    overlayMap[style.overlay || 'none'],
    visibilityMap[responsiveVisibility],
  );

  return {
    isVisible,
    sectionClass,
    containerClass: cn(containerWidthMap[style.containerWidth || 'default']),
    contentClass: cn(alignMap[style.alignment || 'left'], contentWidthMap[style.contentWidth || 'wide']),
    headingClass: cn(
      headingSizeMap[style.headingSize || 'lg'],
      fontWeightMap[style.fontWeight || 'bold'],
      style.uppercaseHeadings ? 'uppercase tracking-wide' : '',
    ),
    textClass: cn(textSizeMap[style.textSize || 'md']),
    cardClass: cn(cardMap[style.cardStyle || 'default'], radiusMap[style.borderRadius || 'md'], shadowMap[style.shadowStyle || 'none']),
    gridClass: cn(gridMap[style.gridLayout || '3-col']),
    mediaClass: cn(mediaMap[style.mediaStyle || 'cover'], radiusMap[style.borderRadius || 'md']),
    buttonVariant: buttonVariantMap[style.buttonStyle || 'primary'] || 'primary',
  };
}
