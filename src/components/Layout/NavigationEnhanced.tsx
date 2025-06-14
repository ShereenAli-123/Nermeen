
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  hasNotification?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

interface NavigationEnhancedProps {
  items: NavigationItem[];
  variant?: 'primary' | 'secondary';
  orientation?: 'horizontal' | 'vertical';
}

const NavigationEnhanced: React.FC<NavigationEnhancedProps> = ({
  items,
  variant = 'primary',
  orientation = 'vertical'
}) => {
  return (
    <nav className={cn(
      "flex gap-2",
      orientation === 'horizontal' ? "flex-row" : "flex-col"
    )}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant={item.isActive ? "default" : "ghost"}
            onClick={item.onClick}
            disabled={item.disabled}
            className={cn(
              "justify-start gap-3 h-auto p-3 transition-all duration-200",
              item.isActive && variant === 'primary' && "bg-noka-gold text-noka-green-dark shadow-md",
              !item.isActive && "hover:bg-noka-green-medium/40 text-white hover:text-white",
              item.disabled && "opacity-50 cursor-not-allowed",
              orientation === 'horizontal' && "flex-1"
            )}
          >
            <Icon className={cn(
              "w-5 h-5",
              item.isActive ? "text-noka-green-dark" : "text-white"
            )} />
            <span className="font-medium text-white">{item.label}</span>
            {item.hasNotification && (
              <Badge className="ml-auto bg-noka-gold text-noka-green-dark">!</Badge>
            )}
          </Button>
        );
      })}
    </nav>
  );
};

export default NavigationEnhanced;
