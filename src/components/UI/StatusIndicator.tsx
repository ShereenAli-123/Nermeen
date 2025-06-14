
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'pending' | 'warning' | 'error' | 'success';
  label: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  showIcon = true,
  size = 'md'
}) => {
  const statusConfig = {
    active: {
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: CheckCircle
    },
    success: {
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: CheckCircle
    },
    inactive: {
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: XCircle
    },
    error: {
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: XCircle
    },
    pending: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: Clock
    },
    warning: {
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: AlertCircle
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeStyles = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  return (
    <Badge className={cn(
      'flex items-center gap-1 font-medium border',
      config.color,
      sizeStyles[size]
    )}>
      {showIcon && <Icon className="w-3 h-3" />}
      {label}
    </Badge>
  );
};

export default StatusIndicator;
