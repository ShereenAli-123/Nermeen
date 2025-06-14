
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Droplets, 
  Factory, 
  Activity, 
  BarChart3,
  TrendingUp,
  MapPin,
  Settings,
  FileText,
  Plus
} from 'lucide-react';
import WastewaterDashboard from './WastewaterDashboard';
import TreatmentPlantsTable from './TreatmentPlantsTable';
import PumpingStationsManagement from './PumpingStationsManagement';
import TreatmentPlantEntry from './TreatmentPlantEntry';
import PumpingStationEntry from './PumpingStationEntry';

interface WastewaterManagementProps {
  userRole?: string;
}

const WastewaterManagement: React.FC<WastewaterManagementProps> = ({ userRole = 'admin' }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // إحصائيات سريعة شاملة
  const overallStats = {
    treatmentPlants: 6,
    pumpingStations: 5,
    totalCapacity: 540, // ألف م³/يوم
    actualProduction: 463,
    operatingUnits: 9,
    underMaintenance: 2,
    efficiency: 86,
    coverage: 95
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* العنوان الرئيسي */}
      <Card className="bg-noka-gradient text-white border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Droplets className="w-8 h-8" />
            النظام المتكامل لإدارة الصرف الصحي
          </CardTitle>
          <CardDescription className="text-noka-beige-light">
            منصة شاملة لإدارة ومراقبة محطات المعالجة ومحطات الرفع في جميع المحافظات
          </CardDescription>
        </CardHeader>
      </Card>

      {/* الإحصائيات الإجمالية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-noka-green-dark bg-noka-cream">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-noka-green-dark">{overallStats.treatmentPlants}</p>
                <p className="text-noka-green-medium">محطات المعالجة</p>
              </div>
              <Factory className="w-12 h-12 text-noka-green-medium" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-noka-gold bg-noka-beige-light">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-noka-green-dark">{overallStats.pumpingStations}</p>
                <p className="text-noka-green-medium">محطات الرفع</p>
              </div>
              <Activity className="w-12 h-12 text-noka-gold" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-noka-beige bg-noka-cream">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-noka-green-dark">{overallStats.totalCapacity}</p>
                <p className="text-noka-green-medium">الطاقة الإجمالية (ألف م³/يوم)</p>
              </div>
              <BarChart3 className="w-12 h-12 text-noka-green-light" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-noka-gold-light bg-noka-beige-light">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-noka-green-dark">{overallStats.efficiency}%</p>
                <p className="text-noka-green-medium">كفاءة التشغيل</p>
              </div>
              <TrendingUp className="w-12 h-12 text-noka-gold-light" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* معلومات تفصيلية سريعة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-noka-beige">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-noka-green-dark">
              <Settings className="w-5 h-5" />
              حالة التشغيل الإجمالية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-noka-beige-light rounded-lg">
                <span className="font-medium text-noka-green-dark">وحدات تعمل بكفاءة</span>
                <Badge className="bg-noka-green-light text-white text-lg">
                  {overallStats.operatingUnits} وحدة
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-noka-cream rounded-lg">
                <span className="font-medium text-noka-green-dark">وحدات تحت الصيانة</span>
                <Badge className="bg-noka-gold text-white text-lg">
                  {overallStats.underMaintenance} وحدة
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-noka-beige rounded-lg">
                <span className="font-medium text-noka-green-dark">الإنتاج الفعلي اليومي</span>
                <Badge variant="outline" className="text-lg font-bold border-noka-gold text-noka-green-dark">
                  {overallStats.actualProduction} ألف م³
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-noka-beige">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-noka-green-dark">
              <MapPin className="w-5 h-5" />
              التغطية الجغرافية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-noka-green-dark">نسبة التغطية الإجمالية</span>
                <Badge className="bg-noka-green-medium text-white text-lg">
                  {overallStats.coverage}%
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-noka-green-dark">المحافظات المغطاة</span>
                <Badge variant="outline" className="border-noka-gold text-noka-green-dark">5 محافظات</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-noka-green-dark">المدن المخدومة</span>
                <Badge variant="outline" className="border-noka-gold text-noka-green-dark">6 مدن</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-noka-green-dark">عدد الشركات المنفذة</span>
                <Badge variant="outline" className="border-noka-gold text-noka-green-dark">8 شركات</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-noka-beige-light">
          <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-noka-green-dark data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="treatment" className="flex items-center gap-2 data-[state=active]:bg-noka-green-dark data-[state=active]:text-white">
            <Factory className="w-4 h-4" />
            محطات المعالجة
          </TabsTrigger>
          <TabsTrigger value="pumping" className="flex items-center gap-2 data-[state=active]:bg-noka-green-dark data-[state=active]:text-white">
            <Activity className="w-4 h-4" />
            محطات الرفع
          </TabsTrigger>
          <TabsTrigger value="treatment-entry" className="flex items-center gap-2 data-[state=active]:bg-noka-green-dark data-[state=active]:text-white">
            <Plus className="w-4 h-4" />
            إدخال محطة معالجة
          </TabsTrigger>
          <TabsTrigger value="pumping-entry" className="flex items-center gap-2 data-[state=active]:bg-noka-green-dark data-[state=active]:text-white">
            <Plus className="w-4 h-4" />
            إدخال محطة رفع
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <WastewaterDashboard userRole={userRole} />
        </TabsContent>

        <TabsContent value="treatment" className="space-y-6">
          <TreatmentPlantsTable userRole={userRole} />
        </TabsContent>

        <TabsContent value="pumping" className="space-y-6">
          <PumpingStationsManagement userRole={userRole} />
        </TabsContent>

        <TabsContent value="treatment-entry" className="space-y-6">
          <TreatmentPlantEntry userRole={userRole} />
        </TabsContent>

        <TabsContent value="pumping-entry" className="space-y-6">
          <PumpingStationEntry userRole={userRole} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WastewaterManagement;
