
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ActionButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ElementType;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  badge?: string | number;
  fullWidth?: boolean;
  className?: string;
  animated?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  children,
  onClick,
  disabled = false,
  loading = false,
  badge,
  fullWidth = false,
  className,
  animated = true
}) => {
  const variantStyles = {
    primary: "bg-noka-green-dark hover:bg-noka-green-medium text-white hover:shadow-lg",
    secondary: "bg-noka-gold hover:bg-noka-gold-light text-noka-green-dark hover:shadow-lg",
    success: "bg-green-600 hover:bg-green-700 text-white hover:shadow-lg",
    warning: "bg-yellow-600 hover:bg-yellow-700 text-white hover:shadow-lg",
    danger: "bg-red-600 hover:bg-red-700 text-white hover:shadow-lg"
  };

  const sizeStyles = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4",
    lg: "h-12 px-6 text-lg"
  };

  const handleClick = () => {
    if (onClick && !disabled && !loading) {
      onClick();
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || loading}
      className={cn(
        "relative transition-all duration-200 font-medium rounded-xl shadow-sm",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        "flex items-center gap-2",
        animated && "hover:scale-105 active:scale-95",
        disabled && "opacity-50 cursor-not-allowed hover:scale-100",
        loading && "cursor-wait",
        className
      )}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className={cn(
          "w-4 h-4 transition-transform",
          animated && "group-hover:scale-110"
        )} />
      )}
      
      <span className={cn(
        "transition-all",
        animated && "group-hover:font-semibold"
      )}>
        {children}
      </span>
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={cn(
          "w-4 h-4 transition-transform",
          animated && "group-hover:scale-110"
        )} />
      )}
      
      {badge && (
        <Badge className={cn(
          "ml-2 bg-white text-noka-green-dark text-xs transition-all",
          animated && "group-hover:scale-110"
        )}>
          {badge}
        </Badge>
      )}
      
      {/* تأثير الموجة عند النقر */}
      {animated && (
        <span className="absolute inset-0 rounded-xl overflow-hidden">
          <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150"></span>
        </span>
      )}
    </Button>
  );
};

export default ActionButton;
