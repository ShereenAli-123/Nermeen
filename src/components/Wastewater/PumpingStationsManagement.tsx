
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Zap,
  Settings,
  MapPin,
  BarChart3
} from 'lucide-react';
import PumpingStationsTable from './PumpingStationsTable';

interface PumpingStationsManagementProps {
  userRole?: string;
}

const PumpingStationsManagement: React.FC<PumpingStationsManagementProps> = ({ userRole = 'admin' }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // إحصائيات سريعة لمحطات الرفع
  const quickStats = {
    totalStations: 5,
    activeStations: 3,
    underMaintenance: 1,
    stopped: 1,
    totalCapacity: 139, // ألف م³/يوم
    actualProduction: 111,
    totalPumps: 12,
    workingPumps: 7,
    totalGenerators: 6,
    efficiency: 80
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* العنوان الرئيسي */}
      <Card className="bg-gradient-to-l from-blue-600 to-blue-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Activity className="w-8 h-8" />
            إدارة محطات رفع الصرف الصحي
          </CardTitle>
          <CardDescription className="text-blue-100">
            نظام شامل لإدارة ومراقبة محطات رفع الصرف الصحي في جميع المحافظات
          </CardDescription>
        </CardHeader>
      </Card>

      {/* الإحصائيات السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{quickStats.totalStations}</p>
                <p className="text-gray-600">إجمالي المحطات</p>
              </div>
              <Activity className="w-12 h-12 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{quickStats.activeStations}</p>
                <p className="text-gray-600">محطات تعمل</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600">{quickStats.underMaintenance}</p>
                <p className="text-gray-600">تحت الصيانة</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">{quickStats.stopped}</p>
                <p className="text-gray-600">محطات متوقفة</p>
              </div>
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* معلومات تفصيلية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              مؤشرات الأداء الرئيسية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">إجمالي الطاقة التصميمية</span>
                <Badge variant="outline" className="text-lg font-bold">
                  {quickStats.totalCapacity} ألف م³/يوم
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">الإنتاج الفعلي</span>
                <Badge variant="outline" className="text-lg font-bold text-green-600">
                  {quickStats.actualProduction} ألف م³/يوم
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">كفاءة التشغيل الإجمالية</span>
                <Badge className="bg-green-100 text-green-800 text-lg font-bold">
                  {quickStats.efficiency}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              معدات التشغيل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  إجمالي الطلمبات
                </span>
                <Badge variant="outline">{quickStats.totalPumps}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  طلمبات عاملة
                </span>
                <Badge className="bg-green-100 text-green-800">{quickStats.workingPumps}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  إجمالي المولدات
                </span>
                <Badge variant="outline">{quickStats.totalGenerators}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  المحافظات المغطاة
                </span>
                <Badge variant="outline">5</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="stations" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            جدول المحطات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>التوزيع الجغرافي للمحطات</CardTitle>
              <CardDescription>عرض المحطات حسب المحافظات والحالة التشغيلية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900">القاهرة</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>محطات تعمل</span>
                      <Badge className="bg-green-100 text-green-800">1</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900">الإسكندرية</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>محطات تعمل</span>
                      <Badge className="bg-green-100 text-green-800">1</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900">الدقهلية</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>تحت الصيانة</span>
                      <Badge className="bg-yellow-100 text-yellow-800">1</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stations" className="space-y-6">
          <PumpingStationsTable userRole={userRole} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PumpingStationsManagement;
