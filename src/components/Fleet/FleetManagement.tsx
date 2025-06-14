import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Car,
  Plus,
  MapPin,
  Activity,
  Fuel,
  Settings,
  Calendar,
  BarChart3,
  Truck,
  Wrench,
  Route,
  FileText,
  Upload,
  Building2
} from 'lucide-react';
import VehicleMaintenanceEntry from './VehicleMaintenanceEntry';
import LicensedVehicles from './LicensedVehicles';
import VehicleEntry from './VehicleEntry';
import MaintenanceDataUpload from './MaintenanceDataUpload';
import MaintenanceStatementUpload from './MaintenanceStatementUpload';

const FleetManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('vehicles');
  const [showMaintenanceEntry, setShowMaintenanceEntry] = useState(false);
  const [showLicensedVehicles, setShowLicensedVehicles] = useState(false);
  const [showVehicleEntry, setShowVehicleEntry] = useState(false);
  const [showMaintenanceDataUpload, setShowMaintenanceDataUpload] = useState(false);
  const [showMaintenanceStatementUpload, setShowMaintenanceStatementUpload] = useState(false);

  const vehicles = [
    {
      id: 1,
      name: 'شاحنة الصيانة الرئيسية',
      plateNumber: 'أ ن م 1234',
      type: 'شاحنة صيانة',
      driver: 'محمد أحمد',
      status: 'في الطريق',
      location: 'المنطقة الشرقية',
      fuelLevel: 75,
      mileage: '85,450 كم',
      lastMaintenance: '2024-05-15'
    },
    {
      id: 2,
      name: 'سيارة المتابعة الفنية',
      plateNumber: 'ب ص ل 5678',
      type: 'سيارة ركوب',
      driver: 'فاطمة علي',
      status: 'متاح',
      location: 'المقر الرئيسي',
      fuelLevel: 60,
      mileage: '45,200 كم',
      lastMaintenance: '2024-06-01'
    },
    {
      id: 3,
      name: 'شاحنة المعدات الثقيلة',
      plateNumber: 'ج هـ و 9012',
      type: 'شاحنة معدات',
      driver: 'أحمد محمود',
      status: 'في الصيانة',
      location: 'ورشة الصيانة',
      fuelLevel: 40,
      mileage: '120,800 كم',
      lastMaintenance: '2024-06-10'
    }
  ];

  const trips = [
    {
      id: 1,
      vehicle: 'شاحنة الصيانة الرئيسية',
      driver: 'محمد أحمد',
      destination: 'محطة معالجة الشرقية',
      startTime: '08:30',
      estimatedTime: '2.5 ساعة',
      purpose: 'صيانة دورية',
      status: 'جاري'
    },
    {
      id: 2,
      vehicle: 'سيارة المتابعة الفنية',
      driver: 'فاطمة علي',
      destination: 'شبكة المياه الجنوبية',
      startTime: '10:00',
      estimatedTime: '1.5 ساعة',
      purpose: 'فحص فني',
      status: 'مجدول'
    }
  ];

  const maintenanceSchedule = [
    {
      vehicle: 'شاحنة الصيانة الرئيسية',
      nextService: '2024-08-15',
      type: 'صيانة دورية',
      mileage: '90,000 كم'
    },
    {
      vehicle: 'سيارة المتابعة الفنية',
      nextService: '2024-09-01',
      type: 'تغيير زيت',
      mileage: '50,000 كم'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'متاح':
        return 'bg-green-100 text-green-800';
      case 'في الطريق':
        return 'bg-blue-100 text-blue-800';
      case 'في الصيانة':
        return 'bg-yellow-100 text-yellow-800';
      case 'جاري':
        return 'bg-blue-100 text-blue-800';
      case 'مجدول':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (showMaintenanceEntry) {
    return (
      <VehicleMaintenanceEntry 
        onBack={() => setShowMaintenanceEntry(false)} 
      />
    );
  }

  if (showLicensedVehicles) {
    return (
      <LicensedVehicles 
        onBack={() => setShowLicensedVehicles(false)} 
      />
    );
  }

  if (showVehicleEntry) {
    return (
      <VehicleEntry 
        onBack={() => setShowVehicleEntry(false)} 
      />
    );
  }

  if (showMaintenanceDataUpload) {
    return (
      <MaintenanceDataUpload />
    );
  }

  if (showMaintenanceStatementUpload) {
    return (
      <MaintenanceStatementUpload 
        onBack={() => setShowMaintenanceStatementUpload(false)} 
      />
    );
  }

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">إدارة الحركة</h1>
          <p className="text-gray-600">متابعة وإدارة أسطول المركبات</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowMaintenanceStatementUpload(true)} variant="outline" className="gap-2">
            <Building2 className="w-4 h-4" />
            بيان صيانة مجمع
          </Button>
          <Button onClick={() => setShowMaintenanceDataUpload(true)} variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            رفع بيانات الصيانة
          </Button>
          <Button onClick={() => setShowLicensedVehicles(true)} variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            السيارات المرخصة
          </Button>
          <Button onClick={() => setShowMaintenanceEntry(true)} variant="outline" className="gap-2">
            <Wrench className="w-4 h-4" />
            إضافة صيانة
          </Button>
          <Button onClick={() => setShowVehicleEntry(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            إضافة مركبة جديدة
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="vehicles">المركبات</TabsTrigger>
          <TabsTrigger value="trips">الرحلات</TabsTrigger>
          <TabsTrigger value="maintenance">الصيانة</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="space-y-6">
          <div className="grid gap-6">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        {vehicle.type === 'سيارة ركوب' ? 
                          <Car className="w-6 h-6 text-blue-600" /> : 
                          <Truck className="w-6 h-6 text-blue-600" />
                        }
                      </div>
                      <div>
                        <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                        <CardDescription>{vehicle.plateNumber} - {vehicle.type}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(vehicle.status)}>
                      {vehicle.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">السائق</p>
                      <p className="font-medium">{vehicle.driver}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">الموقع الحالي</p>
                      <p className="font-medium">{vehicle.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">مستوى الوقود</p>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${vehicle.fuelLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{vehicle.fuelLevel}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">المسافة المقطوعة</p>
                      <p className="font-medium">{vehicle.mileage}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="gap-2">
                      <MapPin className="w-4 h-4" />
                      تتبع الموقع
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Route className="w-4 h-4" />
                      تخطيط رحلة
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Settings className="w-4 h-4" />
                      إعدادات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trips" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>الرحلات اليومية</CardTitle>
                  <CardDescription>جدول الرحلات المجدولة والجارية</CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  جدولة رحلة جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trips.map((trip) => (
                  <div key={trip.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{trip.vehicle}</h3>
                      <p className="text-sm text-gray-600">السائق: {trip.driver}</p>
                      <p className="text-sm text-gray-600">الوجهة: {trip.destination}</p>
                      <p className="text-sm text-gray-500">الغرض: {trip.purpose}</p>
                    </div>
                    <div className="text-center">
                      <Badge className={getStatusColor(trip.status)}>
                        {trip.status}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">وقت البداية: {trip.startTime}</p>
                      <p className="text-sm text-gray-500">المدة المتوقعة: {trip.estimatedTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>جدول الصيانة القادمة</CardTitle>
              <CardDescription>مواعيد الصيانة المجدولة للمركبات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceSchedule.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{schedule.vehicle}</h3>
                      <p className="text-sm text-gray-600">نوع الصيانة: {schedule.type}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{schedule.nextService}</p>
                      <p className="text-sm text-gray-500">عند: {schedule.mileage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إجمالي المركبات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-sm text-gray-600">مركبة نشطة</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>الرحلات اليومية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-sm text-gray-600">رحلة مجدولة</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>استهلاك الوقود</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,400</div>
                <p className="text-sm text-gray-600">لتر هذا الشهر</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FleetManagement;
