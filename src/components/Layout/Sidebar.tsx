
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
  Droplets
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeRoute: string;
  onRouteChange: (route: string) => void;
  userRole: string;
}

const menuItems = [
  {
    id: 'dashboard',
    label: 'لوحة التحكم الرئيسية',
    icon: Home,
    roles: ['admin', 'president', 'vice_president', 'department_head', 'employee'],
    category: 'main'
  },
  // قسم المياه
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
  // قسم الصرف والري
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
  // قسم المشروعات والإدارة
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
  // قسم المراقبة والتقنية
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
  // قسم التقارير والإدارة
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

// العمليات السريعة لكل وحدة
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

const Sidebar: React.FC<SidebarProps> = ({ activeRoute, onRouteChange, userRole }) => {
  const [quickActionsExpanded, setQuickActionsExpanded] = useState(true);
  
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

  return (
    <div className="w-80 bg-noka-gradient text-white h-screen shadow-2xl border-l border-noka-green-medium/30 flex flex-col font-tajawal" dir="rtl">
      {/* Header with new logo */}
      <div className="p-6 border-b border-noka-green-medium/30 bg-gradient-to-l from-noka-green-dark to-noka-green-medium">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg p-1">
            <img 
              src="/lovable-uploads/318645e1-659c-44c2-94b0-031071f869a5.png" 
              alt="شعار الهيئة القومية لمياه الشرب والصرف الصحي" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">نوكا</h1>
            <p className="text-white text-sm opacity-80">نظام إدارة المرافق المتكامل</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      {filteredQuickActions.length > 0 && (
        <div className="p-4 border-b border-noka-green-medium/30 bg-noka-green-medium/20">
          <Button
            variant="ghost"
            onClick={() => setQuickActionsExpanded(!quickActionsExpanded)}
            className="w-full flex items-center justify-between p-3 hover:bg-noka-green-medium/30 text-white"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-noka-gold" />
              <span className="font-semibold text-white">العمليات السريعة</span>
            </div>
            {quickActionsExpanded ? 
              <ChevronDown className="w-4 h-4 text-white" /> : 
              <ChevronRight className="w-4 h-4 text-white" />
            }
          </Button>
          
          {quickActionsExpanded && (
            <div className="mt-2 space-y-1">
              {filteredQuickActions.map((action) => {
                const Icon = action.icon;
                const isActive = activeRoute === action.id;
                return (
                  <button
                    key={action.id}
                    onClick={() => onRouteChange(action.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 text-right text-sm",
                      isActive
                        ? "bg-noka-gold text-noka-green-dark shadow-md"
                        : "hover:bg-noka-green-medium/40 text-white hover:text-white"
                    )}
                  >
                    <Icon className={cn(
                      "w-4 h-4",
                      isActive ? "text-noka-green-dark" : "text-white"
                    )} />
                    <span className="font-medium text-white">{action.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-white text-xs font-bold uppercase tracking-wider px-3 py-2 border-b border-noka-green-medium/20 opacity-80">
              {categories[category as keyof typeof categories]}
            </h3>
            <div className="space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onRouteChange(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-right group",
                      isActive
                        ? "bg-white text-noka-text shadow-lg border border-noka-gold/20 transform scale-[1.02]"
                        : "hover:bg-noka-green-medium/40 text-white hover:text-white hover:transform hover:scale-[1.01]"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-noka-green-dark" : "text-white group-hover:text-white"
                    )} />
                    <span className="font-medium text-sm leading-relaxed text-white">{item.label}</span>
                    {isActive && (
                      <div className="w-2 h-2 bg-noka-gold rounded-full mr-auto"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-noka-green-medium/30 bg-gradient-to-l from-noka-green-dark to-noka-green-medium">
        <div className="text-center text-white text-xs">
          <p className="font-semibold">نظام نوكا الإصدار 1.0</p>
          <p className="opacity-70 mt-1">جميع الحقوق محفوظة © 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
