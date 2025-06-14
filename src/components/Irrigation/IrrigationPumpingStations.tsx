
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  MapPin, 
  Settings, 
  Search, 
  Plus, 
  Filter,
  AlertTriangle,
  CheckCircle,
  Pause,
  Gauge,
  Droplets,
  Zap,
  Calendar,
  Edit,
  Eye
} from 'lucide-react';

interface IrrigationPumpingStationsProps {
  userRole?: string;
}

// بيانات تجريبية لمحطات الرفع
const pumpingStationsData = [
  {
    id: 1,
    name: 'محطة رفع الري الشرقية الرئيسية',
    location: 'المنطقة الشرقية - قطاع أ',
    status: 'active',
    capacity: 5000,
    currentFlow: 4200,
    efficiency: 84,
    lastMaintenance: '2025-01-10',
    nextMaintenance: '2025-02-10',
    operatingHours: 18.5,
    totalPumps: 4,
    activePumps: 3,
    coordinates: '24.7136, 46.6753'
  },
  {
    id: 2,
    name: 'محطة رفع الري الغربية',
    location: 'المنطقة الغربية - قطاع ب',
    status: 'maintenance',
    capacity: 3500,
    currentFlow: 0,
    efficiency: 0,
    lastMaintenance: '2025-01-13',
    nextMaintenance: '2025-02-13',
    operatingHours: 0,
    totalPumps: 3,
    activePumps: 0,
    coordinates: '24.7336, 46.6453'
  },
  {
    id: 3,
    name: 'محطة رفع الري الشمالية',
    location: 'المنطقة الشمالية - قطاع ج',
    status: 'active',
    capacity: 4200,
    currentFlow: 3800,
    efficiency: 90,
    lastMaintenance: '2025-01-08',
    nextMaintenance: '2025-02-08',
    operatingHours: 22.3,
    totalPumps: 3,
    activePumps: 3,
    coordinates: '24.7536, 46.6853'
  },
  {
    id: 4,
    name: 'محطة رفع الري الجنوبية',
    location: 'المنطقة الجنوبية - قطاع د',
    status: 'warning',
    capacity: 2800,
    currentFlow: 2100,
    efficiency: 75,
    lastMaintenance: '2024-12-15',
    nextMaintenance: '2025-01-15',
    operatingHours: 20.1,
    totalPumps: 2,
    activePumps: 2,
    coordinates: '24.6936, 46.6653'
  },
  {
    id: 5,
    name: 'محطة رفع الري المركزية',
    location: 'المنطقة المركزية - قطاع هـ',
    status: 'active',
    capacity: 6000,
    currentFlow: 5500,
    efficiency: 92,
    lastMaintenance: '2025-01-12',
    nextMaintenance: '2025-02-12',
    operatingHours: 24.0,
    totalPumps: 5,
    activePumps: 5,
    coordinates: '24.7236, 46.6753'
  }
];

const IrrigationPumpingStations: React.FC<IrrigationPumpingStationsProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // تصفية البيانات حسب البحث والحالة
  const filteredStations = pumpingStationsData.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || station.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // حساب الإحصائيات العامة
  const totalStations = pumpingStationsData.length;
  const activeStations = pumpingStationsData.filter(s => s.status === 'active').length;
  const maintenanceStations = pumpingStationsData.filter(s => s.status === 'maintenance').length;
  const warningStations = pumpingStationsData.filter(s => s.status === 'warning').length;
  const totalCapacity = pumpingStationsData.reduce((sum, s) => sum + s.capacity, 0);
  const currentTotalFlow = pumpingStationsData.reduce((sum, s) => sum + s.currentFlow, 0);
  const avgEfficiency = Math.round(pumpingStationsData.reduce((sum, s) => sum + s.efficiency, 0) / totalStations);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'offline': return <Pause className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'maintenance': return 'صيانة';
      case 'warning': return 'تحذير';
      case 'offline': return 'متوقف';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">محطات رفع الري</h1>
          <p className="text-gray-600 mt-2">إدارة ومراقبة محطات رفع مياه الري</p>
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
            <div className="text-2xl font-bold text-blue-600">{totalStations}</div>
            <p className="text-xs text-gray-600">محطة رفع مسجلة</p>
          </CardContent>
        </Card>

        <Card className="border-r-4 border-r-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المحطات النشطة</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeStations}</div>
            <p className="text-xs text-gray-600">
              {Math.round((activeStations / totalStations) * 100)}% من الإجمالي
            </p>
          </CardContent>
        </Card>

        <Card className="border-r-4 border-r-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">السعة الإجمالية</CardTitle>
            <Droplets className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {totalCapacity.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">متر مكعب/ساعة</p>
          </CardContent>
        </Card>

        <Card className="border-r-4 border-r-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط الكفاءة</CardTitle>
            <Gauge className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{avgEfficiency}%</div>
            <p className="text-xs text-gray-600">كفاءة التشغيل</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              التدفق الحالي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {currentTotalFlow.toLocaleString()}
            </div>
            <p className="text-gray-600">متر مكعب/ساعة</p>
            <div className="mt-2 text-sm text-gray-500">
              {Math.round((currentTotalFlow / totalCapacity) * 100)}% من السعة الإجمالية
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              حالة المحطات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>نشط</span>
              <Badge className="bg-green-100 text-green-800">{activeStations}</Badge>
            </div>
            <div className="flex justify-between">
              <span>صيانة</span>
              <Badge className="bg-blue-100 text-blue-800">{maintenanceStations}</Badge>
            </div>
            <div className="flex justify-between">
              <span>تحذير</span>
              <Badge className="bg-yellow-100 text-yellow-800">{warningStations}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              تنبيهات مهمة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
              محطة الري الجنوبية تحتاج صيانة
            </div>
            <div className="text-sm text-blue-700 bg-blue-50 p-2 rounded">
              محطة الري الغربية قيد الصيانة
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>البحث والتصفية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث في أسماء المحطات أو المواقع..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                size="sm"
              >
                الكل ({totalStations})
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('active')}
                size="sm"
              >
                نشط ({activeStations})
              </Button>
              <Button
                variant={statusFilter === 'maintenance' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('maintenance')}
                size="sm"
              >
                صيانة ({maintenanceStations})
              </Button>
              <Button
                variant={statusFilter === 'warning' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('warning')}
                size="sm"
              >
                تحذير ({warningStations})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stations Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>قائمة محطات رفع الري</CardTitle>
              <CardDescription>
                عرض تفصيلي لجميع محطات رفع مياه الري ({filteredStations.length} من {totalStations})
              </CardDescription>
            </div>
            {(userRole === 'admin' || userRole === 'department_head') && (
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                إضافة محطة جديدة
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اسم المحطة</TableHead>
                  <TableHead className="text-right">الموقع</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">السعة</TableHead>
                  <TableHead className="text-right">التدفق الحالي</TableHead>
                  <TableHead className="text-right">الكفاءة</TableHead>
                  <TableHead className="text-right">المضخات</TableHead>
                  <TableHead className="text-right">ساعات التشغيل</TableHead>
                  <TableHead className="text-right">آخر صيانة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStations.map((station) => (
                  <TableRow key={station.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{station.name}</TableCell>
                    <TableCell>{station.location}</TableCell>
                    <TableCell>
                      <Badge className={`flex items-center gap-1 w-fit ${getStatusColor(station.status)}`}>
                        {getStatusIcon(station.status)}
                        {getStatusText(station.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{station.capacity.toLocaleString()} م³/س</TableCell>
                    <TableCell>{station.currentFlow.toLocaleString()} م³/س</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{station.efficiency}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${station.efficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{station.activePumps}/{station.totalPumps}</TableCell>
                    <TableCell>{station.operatingHours} ساعة</TableCell>
                    <TableCell>{station.lastMaintenance}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {(userRole === 'admin' || userRole === 'department_head' || userRole === 'employee') && (
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {(userRole === 'admin' || userRole === 'department_head' || userRole === 'employee') && (
        <Card>
          <CardHeader>
            <CardTitle>الإجراءات السريعة</CardTitle>
            <CardDescription>أدوات سريعة لإدارة محطات رفع الري</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="p-4 h-auto flex flex-col items-center gap-2">
                <Plus className="w-6 h-6 text-blue-600" />
                <span className="font-medium">إضافة محطة</span>
              </Button>
              <Button variant="outline" className="p-4 h-auto flex flex-col items-center gap-2">
                <Settings className="w-6 h-6 text-green-600" />
                <span className="font-medium">جدولة صيانة</span>
              </Button>
              <Button variant="outline" className="p-4 h-auto flex flex-col items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-600" />
                <span className="font-medium">إدارة الطاقة</span>
              </Button>
              <Button variant="outline" className="p-4 h-auto flex flex-col items-center gap-2">
                <MapPin className="w-6 h-6 text-purple-600" />
                <span className="font-medium">عرض الخريطة</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IrrigationPumpingStations;
