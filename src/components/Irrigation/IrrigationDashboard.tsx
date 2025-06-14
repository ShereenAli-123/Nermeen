
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, Gauge, MapPin, TrendingUp, AlertTriangle, CheckCircle, Users, Calendar } from 'lucide-react';

interface IrrigationDashboardProps {
  userRole?: string;
}

const IrrigationDashboard: React.FC<IrrigationDashboardProps> = ({ userRole }) => {
  // بيانات تجريبية للعرض
  const systemStats = {
    totalStations: 156,
    activeStations: 142,
    inactiveStations: 14,
    dailyConsumption: 45678,
    weeklyConsumption: 312456,
    monthlyConsumption: 1234567,
    efficiency: 87.5,
    alertsCount: 8
  };

  const recentData = [
    { station: 'محطة الري الشرقية', consumption: 1234, status: 'نشط', lastUpdate: '2025-01-14 09:30' },
    { station: 'محطة الري الغربية', consumption: 2156, status: 'نشط', lastUpdate: '2025-01-14 08:45' },
    { station: 'محطة الري الشمالية', consumption: 1876, status: 'متوقف', lastUpdate: '2025-01-13 16:20' },
    { station: 'محطة الري الجنوبية', consumption: 3421, status: 'نشط', lastUpdate: '2025-01-14 10:15' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'text-green-600 bg-green-100';
      case 'متوقف': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم منظومة الري</h1>
          <p className="text-gray-600 mt-2">إدارة ومراقبة شبكة الري وتحليل الاستهلاكات</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          آخر تحديث: {new Date().toLocaleString('ar-EG')}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-r-4 border-r-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المحطات</CardTitle>
            <MapPin className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{systemStats.totalStations}</div>
            <p className="text-xs text-gray-600">محطة ري مسجلة</p>
          </CardContent>
        </Card>

        <Card className="border-r-4 border-r-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المحطات النشطة</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemStats.activeStations}</div>
            <p className="text-xs text-gray-600">
              {((systemStats.activeStations / systemStats.totalStations) * 100).toFixed(1)}% من الإجمالي
            </p>
          </CardContent>
        </Card>

        <Card className="border-r-4 border-r-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الاستهلاك اليومي</CardTitle>
            <Droplets className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {systemStats.dailyConsumption.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">متر مكعب</p>
          </CardContent>
        </Card>

        <Card className="border-r-4 border-r-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">كفاءة النظام</CardTitle>
            <Gauge className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{systemStats.efficiency}%</div>
            <p className="text-xs text-gray-600">معدل الكفاءة العام</p>
          </CardContent>
        </Card>
      </div>

      {/* Consumption Summary and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consumption Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              ملخص الاستهلاكات
            </CardTitle>
            <CardDescription>إحصائيات الاستهلاك للفترات المختلفة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">الاستهلاك اليومي</span>
              <span className="text-blue-600 font-bold">
                {systemStats.dailyConsumption.toLocaleString()} م³
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">الاستهلاك الأسبوعي</span>
              <span className="text-green-600 font-bold">
                {systemStats.weeklyConsumption.toLocaleString()} م³
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="font-medium">الاستهلاك الشهري</span>
              <span className="text-purple-600 font-bold">
                {systemStats.monthlyConsumption.toLocaleString()} م³
              </span>
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              تنبيهات النظام
              {systemStats.alertsCount > 0 && (
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                  {systemStats.alertsCount}
                </span>
              )}
            </CardTitle>
            <CardDescription>التنبيهات والإشعارات الحالية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <div>
                <p className="font-medium text-red-800">محطة الري الشمالية متوقفة</p>
                <p className="text-sm text-red-600">منذ ساعتين</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">ارتفاع في الاستهلاك - المحطة الشرقية</p>
                <p className="text-sm text-yellow-600">منذ 30 دقيقة</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <div>
                <p className="font-medium text-orange-800">صيانة مجدولة - المحطة الغربية</p>
                <p className="text-sm text-orange-600">غداً الساعة 2:00 ص</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Station Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            آخر بيانات المحطات
          </CardTitle>
          <CardDescription>أحدث قراءات الاستهلاك وحالة المحطات</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-3 px-4 font-medium">المحطة</th>
                  <th className="text-right py-3 px-4 font-medium">الاستهلاك (م³)</th>
                  <th className="text-right py-3 px-4 font-medium">الحالة</th>
                  <th className="text-right py-3 px-4 font-medium">آخر تحديث</th>
                </tr>
              </thead>
              <tbody>
                {recentData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{item.station}</td>
                    <td className="py-3 px-4">{item.consumption.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{item.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {(userRole === 'admin' || userRole === 'department_head' || userRole === 'employee') && (
        <Card>
          <CardHeader>
            <CardTitle>الإجراءات السريعة</CardTitle>
            <CardDescription>أدوات سريعة لإدارة منظومة الري</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                <Droplets className="w-6 h-6 text-blue-600 mb-2" />
                <p className="font-medium text-blue-800">إدخال بيانات جديدة</p>
                <p className="text-sm text-blue-600">إضافة قراءات استهلاك</p>
              </button>
              <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
                <p className="font-medium text-green-800">عرض التقارير</p>
                <p className="text-sm text-green-600">تحليل الاستهلاكات</p>
              </button>
              <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
                <MapPin className="w-6 h-6 text-purple-600 mb-2" />
                <p className="font-medium text-purple-800">إدارة المحطات</p>
                <p className="text-sm text-purple-600">تحديث بيانات المحطات</p>
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IrrigationDashboard;
