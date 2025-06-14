
import React, { useState } from 'react';
import { Bell, User, LogOut, Menu, Settings, HelpCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import BreadcrumbNavigation from '@/components/UI/BreadcrumbNavigation';
import ActionButton from '@/components/UI/ActionButton';
import StatusIndicator from '@/components/UI/StatusIndicator';

interface HeaderEnhancedProps {
  username: string;
  userRole: string;
  onLogout: () => void;
  currentRoute?: string;
  onSearch?: (query: string) => void;
  onRouteChange?: (route: string) => void;
}

const roleLabels: Record<string, string> = {
  admin: 'مدير النظام',
  president: 'رئيس الهيئة',
  vice_president: 'نائب رئيس الجهاز',
  department_head: 'مدير الإدارة',
  employee: 'موظف إدخال البيانات',
  contractor: 'ممثل شركة الصيانة',
  gis_officer: 'مسؤول نظم المعلومات الجغرافية'
};

const HeaderEnhanced: React.FC<HeaderEnhancedProps> = ({ 
  username, 
  userRole, 
  onLogout,
  currentRoute = 'dashboard',
  onSearch,
  onRouteChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getBreadcrumbItems = () => {
    const routeMap: Record<string, string> = {
      'dashboard': 'لوحة التحكم',
      'water': 'إدارة المياه',
      'wastewater': 'الصرف الصحي',
      'irrigation': 'وحدة الري',
      'projects': 'المشروعات',
      'fleet': 'إدارة الحركة',
      'cameras': 'وحدة الكاميرات',
      'gis': 'نظم المعلومات الجغرافية',
      'reports': 'التقارير والتحليلات',
      'users': 'إدارة المستخدمين'
    };

    return [
      {
        id: currentRoute,
        label: routeMap[currentRoute] || 'صفحة غير محددة',
        isActive: true,
        onClick: () => onRouteChange?.(currentRoute)
      }
    ];
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
      setShowSearch(false);
    }
  };

  const handleSearchClick = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
      setShowSearch(false);
    }
  };

  const handleHomeClick = () => {
    onRouteChange?.('dashboard');
  };

  const handleHelpClick = () => {
    alert('سيتم إضافة نظام المساعدة قريباً');
  };

  const handleSettingsClick = () => {
    alert('سيتم إضافة صفحة الإعدادات قريباً');
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="bg-white shadow-lg border-b-2 border-noka-beige sticky top-0 z-40" dir="rtl">
      <div className="flex items-center justify-between px-8 py-4">
        {/* معلومات المستخدم والتنقل - الجانب الأيمن */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-noka-gradient rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <h2 className="font-bold text-lg text-noka-green-dark hover:text-noka-gold transition-colors cursor-pointer">
                {username}
              </h2>
              <div className="flex items-center gap-2">
                <StatusIndicator 
                  status="active" 
                  label={roleLabels[userRole]} 
                  size="sm"
                  showIcon={false}
                />
              </div>
            </div>
          </div>
          
          {/* Breadcrumb Navigation */}
          <div className="hidden md:block">
            <BreadcrumbNavigation 
              items={getBreadcrumbItems()}
              onHomeClick={handleHomeClick}
            />
          </div>
        </div>
        
        {/* البحث والإجراءات - الجانب الأيسر */}
        <div className="flex items-center gap-4">
          {/* شريط البحث */}
          {showSearch ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2 animate-in slide-in-from-left-5">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="البحث في النظام..."
                className="w-64 h-9 border-noka-gold focus:border-noka-green-dark focus:ring-noka-green-dark"
                autoFocus
                onBlur={() => !searchQuery && setShowSearch(false)}
              />
              <ActionButton
                variant="primary"
                size="sm"
                icon={Search}
                onClick={handleSearchClick}
                className="bg-noka-green-dark hover:bg-noka-green-medium text-white"
              >
                بحث
              </ActionButton>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(false)}
                className="text-noka-green-dark hover:bg-noka-beige-light hover:text-noka-green-dark"
              >
                إلغاء
              </Button>
            </form>
          ) : (
            <ActionButton
              variant="secondary"
              size="sm"
              icon={Search}
              onClick={() => setShowSearch(true)}
              className="bg-noka-gold hover:bg-noka-gold-light text-noka-green-dark"
            >
              بحث
            </ActionButton>
          )}
          
          {/* المساعدة */}
          <ActionButton
            variant="secondary"
            size="sm"
            icon={HelpCircle}
            onClick={handleHelpClick}
            className="bg-noka-gold hover:bg-noka-gold-light text-noka-green-dark"
          >
            مساعدة
          </ActionButton>
          
          {/* الإعدادات */}
          <ActionButton
            variant="secondary"
            size="sm"
            icon={Settings}
            onClick={handleSettingsClick}
            className="bg-noka-gold hover:bg-noka-gold-light text-noka-green-dark"
          >
            إعدادات
          </ActionButton>
          
          {/* الإشعارات */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleNotificationsClick}
              className="relative hover:bg-noka-beige-light p-3 rounded-xl transition-all duration-200 text-noka-green-dark hover:text-noka-gold"
            >
              <Bell className="w-6 h-6 text-noka-green-dark hover:text-noka-gold transition-colors" />
              <Badge className="absolute -top-1 -right-1 bg-noka-gold text-noka-green-dark text-xs min-w-[20px] h-5 flex items-center justify-center animate-pulse">
                3
              </Badge>
            </Button>
            
            {/* قائمة الإشعارات */}
            {showNotifications && (
              <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-noka-beige z-50 animate-in slide-in-from-top-5">
                <div className="p-4 border-b border-noka-beige">
                  <h3 className="font-bold text-noka-green-dark">الإشعارات</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-3 hover:bg-noka-beige-light cursor-pointer border-b border-noka-beige/50 transition-colors">
                    <p className="text-sm text-noka-text hover:text-noka-green-dark">تم إضافة محطة جديدة بنجاح</p>
                    <span className="text-xs text-noka-green-medium">منذ 5 دقائق</span>
                  </div>
                  <div className="p-3 hover:bg-noka-beige-light cursor-pointer border-b border-noka-beige/50 transition-colors">
                    <p className="text-sm text-noka-text hover:text-noka-green-dark">تحديث في بيانات استهلاك المياه</p>
                    <span className="text-xs text-noka-green-medium">منذ 15 دقيقة</span>
                  </div>
                  <div className="p-3 hover:bg-noka-beige-light cursor-pointer transition-colors">
                    <p className="text-sm text-noka-text hover:text-noka-green-dark">تقرير شهري جاهز للمراجعة</p>
                    <span className="text-xs text-noka-green-medium">منذ ساعة</span>
                  </div>
                </div>
                <div className="p-3 border-t border-noka-beige">
                  <Button variant="ghost" size="sm" className="w-full text-noka-green-dark hover:bg-noka-beige-light hover:text-noka-gold">
                    عرض جميع الإشعارات
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* تسجيل الخروج */}
          <ActionButton
            variant="danger"
            size="sm"
            icon={LogOut}
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            تسجيل الخروج
          </ActionButton>
        </div>
      </div>
    </header>
  );
};

export default HeaderEnhanced;
