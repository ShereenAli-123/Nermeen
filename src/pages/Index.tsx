
import React, { useState } from 'react';
import LoginForm from '@/components/Auth/LoginForm';
import SidebarEnhanced from '@/components/Layout/SidebarEnhanced';
import HeaderEnhanced from '@/components/Layout/HeaderEnhanced';
import MainDashboard from '@/components/Dashboard/MainDashboard';
import WaterManagement from '@/components/Water/WaterManagement';
import WaterConsumptionEntry from '@/components/Water/WaterConsumptionEntry';
import IrrigationConsumptionEntry from '@/components/Water/IrrigationConsumptionEntry';
import NetworkMonitoringEntry from '@/components/Water/NetworkMonitoringEntry';
import WaterConsumptionReport from '@/components/Water/WaterConsumptionReport';
import IrrigationConsumptionReport from '@/components/Water/IrrigationConsumptionReport';
import WastewaterManagement from '@/components/Wastewater/WastewaterManagement';
import IrrigationManagement from '@/components/Irrigation/IrrigationManagement';
import ProjectMonitoring from '@/components/Projects/ProjectMonitoring';
import FleetManagement from '@/components/Fleet/FleetManagement';
import CameraManagement from '@/components/Cameras/CameraManagement';
import GISManagement from '@/components/GIS/GISManagement';
import ReportsAnalytics from '@/components/Reports/ReportsAnalytics';
import ApprovalWorkflow from '@/components/Approvals/ApprovalWorkflow';
import UserManagement from '@/components/Users/UserManagement';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: '', role: '' });
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();

  const handleLogin = (username: string, role: string) => {
    setCurrentUser({ username, role });
    setIsLoggedIn(true);
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: `مرحباً ${username}`,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ username: '', role: '' });
    setActiveRoute('dashboard');
    toast({
      title: "تم تسجيل الخروج",
      description: "نراك لاحقاً",
    });
  };

  const handleRouteChange = (route: string) => {
    console.log(`التنقل إلى الصفحة: ${route}`);
    setActiveRoute(route);
    
    // إضافة تأثير صوتي أو بصري عند التنقل
    const routeLabels: Record<string, string> = {
      'dashboard': 'لوحة التحكم',
      'water': 'إدارة المياه',
      'wastewater': 'الصرف الصحي',
      'irrigation': 'وحدة الري',
      'projects': 'المشروعات',
      'fleet': 'إدارة الحركة',
      'cameras': 'وحدة الكاميرات',
      'gis': 'نظم المعلومات الجغرافية',
      'reports': 'التقارير والتحليلات',
      'users': 'إدارة المستخدمين',
      'water-consumption-entry': 'إدخال استهلاكات المياه',
      'irrigation-consumption-entry': 'إدخال استهلاكات مياه الري',
      'network-monitoring-entry': 'إدخال بيانات مراقبة الشبكة',
      'water-consumption-report': 'تقرير استهلاكات المياه',
      'irrigation-consumption-report': 'تقرير استهلاكات مياه الري',
      'approvals': 'المراجعة والاعتماد'
    };

    toast({
      title: "تم التنقل بنجاح",
      description: `تم الانتقال إلى ${routeLabels[route] || route}`,
    });
  };

  const handleSearch = (query: string) => {
    console.log('البحث عن:', query);
    toast({
      title: "جاري البحث",
      description: `البحث عن: ${query}`,
    });
    
    // يمكن تنفيذ منطق البحث الفعلي هنا
    // مثلاً البحث في البيانات المحلية أو إرسال طلب للخادم
  };

  const renderContent = () => {
    switch (activeRoute) {
      case 'dashboard':
        return <MainDashboard userRole={currentUser.role} />;
      case 'water':
        return <WaterManagement userRole={currentUser.role} />;
      case 'water-consumption-entry':
        return <WaterConsumptionEntry userRole={currentUser.role} />;
      case 'irrigation-consumption-entry':
        return <IrrigationConsumptionEntry userRole={currentUser.role} />;
      case 'network-monitoring-entry':
        return <NetworkMonitoringEntry userRole={currentUser.role} />;
      case 'water-consumption-report':
        return <WaterConsumptionReport userRole={currentUser.role} />;
      case 'irrigation-consumption-report':
        return <IrrigationConsumptionReport userRole={currentUser.role} />;
      case 'wastewater':
        return <WastewaterManagement userRole={currentUser.role} />;
      case 'irrigation':
        return <IrrigationManagement userRole={currentUser.role} />;
      case 'projects':
        return <ProjectMonitoring />;
      case 'fleet':
        return <FleetManagement />;
      case 'cameras':
        return <CameraManagement />;
      case 'gis':
        return <GISManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'approvals':
        return <ApprovalWorkflow />;
      case 'users':
        return <UserManagement />;
      default:
        return <MainDashboard userRole={currentUser.role} />;
    }
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    toast({
      title: sidebarCollapsed ? "تم توسيع القائمة" : "تم طي القائمة",
      description: "تم تغيير حالة القائمة الجانبية",
    });
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-noka-cream flex w-full" dir="rtl">
      {/* القائمة الجانبية المحسنة - الجانب الأيمن */}
      <SidebarEnhanced
        activeRoute={activeRoute} 
        onRouteChange={handleRouteChange} 
        userRole={currentUser.role}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />
      
      {/* المحتوى الرئيسي - الجانب الأيسر */}
      <div className="flex-1 flex flex-col min-w-0">
        <HeaderEnhanced
          username={currentUser.username} 
          userRole={currentUser.role} 
          onLogout={handleLogout}
          currentRoute={activeRoute}
          onSearch={handleSearch}
          onRouteChange={handleRouteChange}
        />
        
        {/* المحتوى الرئيسي مع تأثيرات الانتقال */}
        <main className="flex-1 overflow-auto p-6 bg-noka-cream">
          <div className="max-w-7xl mx-auto animate-in fade-in-50 duration-500">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
