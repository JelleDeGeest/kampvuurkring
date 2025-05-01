// Type definitions for Lucide React icons

declare module 'lucide-react' {
  import { ComponentType } from 'react';

  export interface LucideProps {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
    className?: string;
    [key: string]: any;
  }

  export type LucideIcon = ComponentType<LucideProps>;
  
  // Common icons
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const Loader2: LucideIcon;
  export const Users: LucideIcon;
  export const MapPin: LucideIcon;
  export const Calendar: LucideIcon;
  export const Euro: LucideIcon;
  
  // Additional icons
  export const Compass: LucideIcon;
  export const Tent: LucideIcon;
  export const Mountain: LucideIcon;
  export const TreePine: LucideIcon;
  export const CaravanIcon: LucideIcon;
  export const LogIn: LucideIcon;
  export const CalendarDays: LucideIcon;
  export const Crown: LucideIcon;
  export const Rabbit: LucideIcon;
  export const Bike: LucideIcon;
  export const Sailboat: LucideIcon;
  export const Sparkles: LucideIcon;
} 