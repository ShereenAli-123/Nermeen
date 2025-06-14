
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  id: string;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  onHomeClick?: () => void;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  items,
  showHome = true,
  onHomeClick
}) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-noka-text" dir="rtl">
      {showHome && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={onHomeClick}
            className="h-auto p-1 hover:bg-noka-beige-light text-noka-green-dark hover:text-noka-gold transition-colors"
          >
            <Home className="w-4 h-4" />
          </Button>
          <ChevronRight className="w-4 h-4 text-noka-green-medium" />
        </>
      )}
      
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <Button
            variant="ghost"
            size="sm"
            onClick={item.onClick}
            disabled={!item.onClick || item.isActive}
            className={cn(
              "h-auto p-1 font-medium transition-colors",
              item.isActive ? "text-noka-gold font-bold" : "text-noka-green-dark hover:text-noka-gold",
              !item.onClick && "cursor-default"
            )}
          >
            {item.label}
          </Button>
          {index < items.length - 1 && (
            <ChevronRight className="w-4 h-4 text-noka-green-medium" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;
