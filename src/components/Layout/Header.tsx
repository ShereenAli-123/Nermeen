
import React from 'react';
import { Bell, User, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  username: string;
  userRole: string;
  onLogout: () => void;
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

const Header: React.FC<HeaderProps> = ({ username, userRole, onLogout }) => {
  return (
    <header className="bg-white shadow-lg border-b-2 border-noka-beige sticky top-0 z-40" dir="rtl">
      <div className="flex items-center justify-between px-8 py-4">
        {/* معلومات المستخدم - الجانب الأيمن */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-noka-gradient rounded-full flex items-center justify-center shadow-md">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <h2 className="font-bold text-lg text-noka-text">{username}</h2>
              <p className="text-sm text-noka-text font-medium opacity-70">{roleLabels[userRole]}</p>
            </div>
          </div>
        </div>
        
        {/* الإجراءات - الجانب الأيسر */}
        <div className="flex items-center gap-4">
          {/* الإشعارات */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative hover:bg-noka-beige-light p-3 rounded-xl transition-all duration-200"
          >
            <Bell className="w-6 h-6 text-noka-text" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-noka-gold rounded-full text-xs text-white flex items-center justify-center font-bold shadow-md">
              3
            </span>
          </Button>
          
          {/* تسجيل الخروج */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onLogout} 
            className="gap-3 border-2 border-noka-gold text-noka-gold hover:bg-noka-gold hover:text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
