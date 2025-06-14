
import React, { useState } from 'react';
import { 
  Home,
  Settings,
  Users,
  Monitor,
  Calendar,
  BarChart3,
  MapPin,
  Car,
  Camera,
  FileText,
  CheckSquare,
  TrendingUp,
  Plus,
  Network,
  Edit,
  Zap,
  ChevronDown,
  ChevronRight,
  Droplets,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ActionButton from '@/components/UI/ActionButton';

interface SidebarEnhancedProps {
  activeRoute: string;
  onRouteChange: (route: string) => void;
  userRole: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const menuItems = [
  {
    id: 'dashboard',
    label: 'لوحة التحكم الرئيسية',
    icon: Home,
    roles: ['admin', 'president', 'vice_president', 'department_head', 'employee'],
    category: 'main'
  },
  {
    id: 'water',
    label: 'شبكة المياه',
    icon: Droplets,
    roles: ['admin', 'president', 'vice_president', 'department_head', 'employee'],
    category: 'water'
  },
  {
    id: 'water-consumption-entry',
    label: 'إدخال استهلاكات المياه',
    icon: Plus,
    roles: ['admin', 'department_head', 'employee'],
    category: 'water'
  },
  {
    id: 'irrigation-consumption-entry',
    label: 'إدخال استهلاكات مياه الري',
    icon: Edit,
    roles: ['admin', 'department_head', 'employee'],
    category: 'water'
  },
  {
    id: 'network-monitoring-entry',
    label: 'إدخال بيانات مراقبة الشبكة',
    icon: Network,
    roles: ['admin', 'department_head', 'employee'],
    category: 'water'
  },
  {
    id: 'water-consumption-report',
    label: 'تقرير استهلاكات المياه',
    icon: TrendingUp,
    roles: ['admin', 'president', 'vice_president', 'department_head', 'employee'],
    category: 'water'
  },
  {
    id: 'irrigation-consumption-report',
    label: 'تقرير استهلاكات مياه الري',
    icon: BarChart3,
    roles: ['admin', 'president', 'vice_president', 'department_head', 'employee'],
    category: 'water'
  },
  {
    id: 'wastewater',
    label: 'الصرف الصحي',
    icon: Monitor,
    roles: ['admin', 'president', 'vice_president', 'department_head', 'employee'],
    category: 'infrastructure'
  },
  {
    id: 'irrigation',
    label: 'وحدة الري',
    icon: Settings,
    roles: ['admin', 'president', 'vice_president', 'department_head', 'employee'],
    category: 'infrastructure'
  },
  {
    id: 'projects',
    label: 'المشروعات',
    icon: Calendar,
    roles: ['admin', 'president', 'vice_president', 'department_head', 'employee'],
    category: 'management'
  },
  {
    id: 'fleet',
    label: 'إدارة الحركة',
    icon: Car,
    roles: ['admin', 'president', 'vice_president', 'department_head', 'employee'],
    category: 'management'
  },
  {
    id: 'cameras',
    label: 'وحدة الكاميرات',
    icon: Camera,
    roles: ['admin', 'president', 'vice_president', 'department_head'],
    category: 'monitoring'
  },
  {
    id: 'gis',
    label: 'نظم المعلومات الجغرافية',
    icon: MapPin,
    roles: ['admin', 'president', 'vice_president', 'department_head', 'gis_officer'],
    category: 'monitoring'
  },
  {
    id: 'reports',
    label: 'التقارير والتحليلات',
    icon: BarChart3,
    roles: ['admin', 'president', 'vice_president', 'department_head'],
    category: 'reports'
  },
  {
    id: 'approvals',
    label: 'المراجعة والاعتماد',
    icon: CheckSquare,
    roles: ['admin', 'department_head'],
    category: 'reports'
  },
  {
    id: 'users',
    label: 'إدارة المستخدمين',
    icon: Users,
    roles: ['admin'],
    category: 'admin'
  }
];

const quickActions = [
  {
    id: 'water-consumption-entry',
    label: 'إدخال استهلاك مياه',
    icon: Plus,
    roles: ['admin', 'department_head', 'employee'],
    module: 'water'
  },
  {
    id: 'irrigation-consumption-entry',
    label: 'إدخال استهلاك ري',
    icon: Edit,
    roles: ['admin', 'department_head', 'employee'],
    module: 'water'
  },
  {
    id: 'network-monitoring-entry',
    label: 'بيانات مراقبة شبكة',
    icon: Network,
    roles: ['admin', 'department_head', 'employee'],
    module: 'water'
  }
];

const categories = {
  main: 'الرئيسية',
  water: 'إدارة المياه',
  infrastructure: 'البنية التحتية',
  management: 'الإدارة والمشروعات',
  monitoring: 'المراقبة والتقنية',
  reports: 'التقارير والاعتمادات',
  admin: 'إدارة النظام'
};

const SidebarEnhanced: React.FC<SidebarEnhancedProps> = ({ 
  activeRoute, 
  onRouteChange, 
  userRole,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const [quickActionsExpanded, setQuickActionsExpanded] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    main: true,
    water: true,
    infrastructure: true,
    management: true,
    monitoring: true,
    reports: true,
    admin: true
  });
  
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  const filteredQuickActions = quickActions.filter(action => 
    action.roles.includes(userRole)
  );

  const groupedItems = filteredMenuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleRouteChange = (route: string) => {
    onRouteChange(route);
    console.log(`التنقل إلى: ${route}`);
  };

  const handleLogoClick = () => {
    onRouteChange('dashboard');
  };

  return (
    <div className={cn(
      "bg-noka-gradient text-white h-screen shadow-2xl border-l border-noka-green-medium/30 flex flex-col font-tajawal transition-all duration-300",
      isCollapsed ? "w-16" : "w-80"
    )} dir="rtl">
      {/* Header with enhanced logo and toggle */}
      <div className="p-6 border-b border-noka-green-medium/30 bg-gradient-to-l from-noka-green-dark to-noka-green-medium">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg p-1 hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/318645e1-659c-44c2-94b0-031071f869a5.png" 
                alt="شعار الهيئة القومية لمياه الشرب والصرف الصحي" 
                className="w-full h-full object-contain"
              />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-2xl font-bold text-noka-gold hover:text-white transition-colors cursor-pointer">نوكا</h1>
                <p className="text-noka-gold/80 text-sm hover:text-white/80 transition-colors">نظام إدارة المرافق المتكامل</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-noka-gold hover:text-white hover:bg-noka-green-medium/30 p-2 rounded-lg transition-all"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Quick Actions Section */}
      {!isCollapsed && filteredQuickActions.length > 0 && (
        <div className="p-4 border-b border-noka-green-medium/30 bg-noka-green-medium/20">
          <ActionButton
            variant="primary"
            size="sm"
            onClick={() => setQuickActionsExpanded(!quickActionsExpanded)}
            fullWidth
            icon={quickActionsExpanded ? ChevronDown : ChevronRight}
            iconPosition="right"
            className="justify-between bg-noka-gold text-noka-green-dark hover:bg-noka-gold-light transition-colors"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-noka-green-dark animate-pulse" />
              <span className="font-semibold text-noka-green-dark">العمليات السريعة</span>
            </div>
          </ActionButton>
          
          {quickActionsExpanded && (
            <div className="mt-2 space-y-1 animate-in slide-in-from-top-2">
              {filteredQuickActions.map((action) => {
                const Icon = action.icon;
                const isActive = activeRoute === action.id;
                return (
                  <ActionButton
                    key={action.id}
                    variant={isActive ? "success" : "secondary"}
                    size="sm"
                    onClick={() => handleRouteChange(action.id)}
                    fullWidth
                    icon={Icon}
                    className={cn(
                      "justify-start hover:scale-105 transition-all duration-200",
                      isActive ? "bg-noka-gold text-noka-green-dark shadow-lg" : "text-noka-gold hover:text-white hover:bg-noka-green-medium/50"
                    )}
                  >
                    <span className={isActive ? "text-noka-green-dark" : "text-noka-gold"}>{action.label}</span>
                  </ActionButton>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="space-y-2">
            <Button
              variant="ghost"
              onClick={() => toggleCategory(category)}
              className={cn(
                "w-full justify-between text-noka-gold text-xs font-bold uppercase tracking-wider px-3 py-2 border-b border-noka-green-medium/20 hover:text-white hover:bg-noka-green-medium/30 transition-all",
                isCollapsed && "justify-center"
              )}
            >
              {!isCollapsed && <span className="text-noka-gold">{categories[category as keyof typeof categories]}</span>}
              {!isCollapsed && (
                expandedCategories[category] ? 
                <ChevronDown className="w-4 h-4 transition-transform text-noka-gold" /> : 
                <ChevronRight className="w-4 h-4 transition-transform text-noka-gold" />
              )}
            </Button>
            
            {(expandedCategories[category] || isCollapsed) && (
              <div className="space-y-1 animate-in slide-in-from-top-2">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeRoute === item.id;
                  return (
                    <ActionButton
                      key={item.id}
                      variant={isActive ? "success" : "secondary"}
                      onClick={() => handleRouteChange(item.id)}
                      fullWidth
                      icon={Icon}
                      className={cn(
                        "justify-start transition-all duration-200 hover:scale-105 group",
                        isActive ? "bg-noka-gold text-noka-green-dark shadow-lg scale-[1.02] border-l-4 border-l-white" : "text-noka-gold hover:text-white hover:bg-noka-green-medium/40",
                        isCollapsed && "justify-center px-2"
                      )}
                    >
                      {!isCollapsed && (
                        <span className={cn(
                          "group-hover:translate-x-1 transition-transform font-medium",
                          isActive ? "text-noka-green-dark" : "text-noka-gold group-hover:text-white"
                        )}>
                          {item.label}
                        </span>
                      )}
                    </ActionButton>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Enhanced Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-noka-green-medium/30 bg-gradient-to-l from-noka-green-dark to-noka-green-medium">
          <div className="text-center">
            <p className="font-semibold text-noka-gold">نظام نوكا الإصدار 1.0</p>
            <p className="text-noka-gold/70 mt-1 text-xs">جميع الحقوق محفوظة © 2024</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarEnhanced;
