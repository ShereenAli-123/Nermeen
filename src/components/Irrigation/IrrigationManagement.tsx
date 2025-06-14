
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge, Settings, Droplets, MapPin, Building, Plus, FileText } from 'lucide-react';
import IrrigationDashboard from './IrrigationDashboard';
import IrrigationPumpingStations from './IrrigationPumpingStations';
import IrrigationTreatmentStations from './IrrigationTreatmentStations';
import IrrigationPumpingStationEntry from './IrrigationPumpingStationEntry';
import IrrigationStationEntry from './IrrigationStationEntry';

interface IrrigationManagementProps {
  userRole?: string;
}

type ViewType = 'dashboard' | 'pumping-stations' | 'treatment-stations' | 'pumping-station-entry' | 'irrigation-station-entry' | 'monitoring' | 'reports';

const IrrigationManagement: React.FC<IrrigationManagementProps> = ({ userRole }) => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <IrrigationDashboard userRole={userRole} />;
      case 'pumping-stations':
        return <IrrigationPumpingStations userRole={userRole} />;
      case 'treatment-stations':
        return <IrrigationTreatmentStations userRole={userRole} />;
      case 'pumping-station-entry':
        return <IrrigationPumpingStationEntry userRole={userRole} />;
      case 'irrigation-station-entry':
        return <IrrigationStationEntry userRole={userRole} />;
      case 'monitoring':
        return (
          <div className="p-6" dir="rtl">
            <h2 className="text-2xl font-bold mb-4">مراقبة الشبكة</h2>
            <p className="text-gray-600">سيتم تطوير هذا القسم قريباً...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6" dir="rtl">
            <h2 className="text-2xl font-bold mb-4">التقارير</h2>
            <p className="text-gray-600">سيتم تطوير هذا القسم قريباً...</p>
          </div>
        );
      default:
        return <IrrigationDashboard userRole={userRole} />;
    }
  };

  const renderNavigationBar = () => (
    <div className="border-b bg-white">
      <div className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <Button
            variant={activeView === 'dashboard' ? 'default' : 'ghost'}
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-2"
          >
            <Gauge className="w-4 h-4" />
            لوحة التحكم
          </Button>
          <Button
            variant={activeView === 'pumping-stations' ? 'default' : 'ghost'}
            onClick={() => setActiveView('pumping-stations')}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            محطات الرفع
          </Button>
          <Button
            variant={activeView === 'treatment-stations' ? 'default' : 'ghost'}
            onClick={() => setActiveView('treatment-stations')}
            className="flex items-center gap-2"
          >
            <Building className="w-4 h-4" />
            محطات المعالجة
          </Button>
          <Button
            variant={activeView === 'pumping-station-entry' ? 'default' : 'ghost'}
            onClick={() => setActiveView('pumping-station-entry')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            إدخال محطة رفع
          </Button>
          <Button
            variant={activeView === 'irrigation-station-entry' ? 'default' : 'ghost'}
            onClick={() => setActiveView('irrigation-station-entry')}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            إدخال محطة ري
          </Button>
          <Button
            variant={activeView === 'monitoring' ? 'default' : 'ghost'}
            onClick={() => setActiveView('monitoring')}
            className="flex items-center gap-2"
          >
            <Droplets className="w-4 h-4" />
            مراقبة الشبكة
          </Button>
          <Button
            variant={activeView === 'reports' ? 'default' : 'ghost'}
            onClick={() => setActiveView('reports')}
            className="flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            التقارير
          </Button>
        </div>
      </div>
    </div>
  );

  // For non-dashboard views, show navigation bar and content
  if (activeView !== 'dashboard') {
    return (
      <div dir="rtl">
        {renderNavigationBar()}
        {renderContent()}
      </div>
    );
  }

  // For dashboard view, show main dashboard with navigation cards
  return (
    <div dir="rtl">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة منظومة الري</h1>
          <p className="text-gray-600 mt-2">نظام شامل لإدارة ومراقبة منظومة الري</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-r-4 border-r-blue-500"
            onClick={() => setActiveView('dashboard')}
          >
            <CardHeader className="text-center">
              <Gauge className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-blue-600">لوحة التحكم</CardTitle>
              <CardDescription>نظرة عامة على النظام</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                إحصائيات شاملة ومؤشرات الأداء
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-r-4 border-r-green-500"
            onClick={() => setActiveView('pumping-stations')}
          >
            <CardHeader className="text-center">
              <Settings className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-green-600">محطات الرفع</CardTitle>
              <CardDescription>إدارة محطات رفع الري</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                مراقبة وإدارة محطات الرفع
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-r-4 border-r-indigo-500"
            onClick={() => setActiveView('treatment-stations')}
          >
            <CardHeader className="text-center">
              <Building className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
              <CardTitle className="text-indigo-600">محطات المعالجة</CardTitle>
              <CardDescription>إدارة محطات المعالجة</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                مراقبة وإدارة محطات المعالجة
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-r-4 border-r-emerald-500"
            onClick={() => setActiveView('pumping-station-entry')}
          >
            <CardHeader className="text-center">
              <Plus className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <CardTitle className="text-emerald-600">إدخال محطة رفع</CardTitle>
              <CardDescription>إضافة محطة رفع جديدة</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                إدخال بيانات محطة رفع جديدة
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-r-4 border-r-cyan-500"
            onClick={() => setActiveView('irrigation-station-entry')}
          >
            <CardHeader className="text-center">
              <FileText className="w-12 h-12 text-cyan-600 mx-auto mb-2" />
              <CardTitle className="text-cyan-600">إدخال محطة ري</CardTitle>
              <CardDescription>إضافة محطة ري جديدة</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                إدخال بيانات محطة ري جديدة
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-r-4 border-r-orange-500"
            onClick={() => setActiveView('monitoring')}
          >
            <CardHeader className="text-center">
              <Droplets className="w-12 h-12 text-orange-600 mx-auto mb-2" />
              <CardTitle className="text-orange-600">مراقبة الشبكة</CardTitle>
              <CardDescription>مراقبة شبكة التوزيع</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                متابعة حالة الشبكة والضغوط
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-r-4 border-r-purple-500"
            onClick={() => setActiveView('reports')}
          >
            <CardHeader className="text-center">
              <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-purple-600">التقارير</CardTitle>
              <CardDescription>تقارير وتحليلات</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                تقارير شاملة عن الأداء
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Content */}
        <IrrigationDashboard userRole={userRole} />
      </div>
    </div>
  );
};

export default IrrigationManagement;
