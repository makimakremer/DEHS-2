import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

type BadgeVariant = 'primary' | 'accent' | 'secondary' | 'neutral' | 'success';

interface BadgeProps {
  variant?: BadgeVariant;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

const variants = {
  primary: 'bg-primary-100 text-primary-700 border-primary-200',
  accent: 'bg-accent-100 text-accent-700 border-accent-200',
  secondary: 'bg-secondary-100 text-secondary-700 border-secondary-200',
  neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  success: 'bg-green-100 text-green-700 border-green-200',
};

export function Badge({ variant = 'primary', icon: Icon, children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${variants[variant]} ${className}`}>
      {Icon && <Icon size={14} />}
      {children}
    </span>
  );
}
