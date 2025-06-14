
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Car,
  Search,
  Filter,
  FileText,
  Calendar,
  Truck,
  ArrowLeft,
  Download
} from 'lucide-react';

interface LicensedVehiclesProps {
  onBack: () => void;
}

const LicensedVehicles: React.FC<LicensedVehiclesProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [typeFilter, setTypeFilter] = useState('الكل');

  const licensedVehicles = [
    {
      id: 1,
      plateNumber: 'أ ن م 1234',
      vehicleType: 'شاحنة صيانة',
      brand: 'مرسيدس',
      model: 'أكتروس',
      year: '2020',
      licenseNumber: 'TR-2024-001',
      licenseExpiry: '2024-12-31',
      insuranceExpiry: '2024-10-15',
      inspectionExpiry: '2024-11-20',
      status: 'نشط',
      driver: 'محمد أحمد',
      department: 'الصيانة',
      fuelType: 'ديزل',
      engineCapacity: '12.8 لتر',
      color: 'أبيض'
    },
    {
      id: 2,
      plateNumber: 'ب ص ل 5678',
      vehicleType: 'سيارة ركوب',
      brand: 'تويوتا',
      model: 'كامري',
      year: '2019',
      licenseNumber: 'CR-2024-002',
      licenseExpiry: '2024-08-30',
      insuranceExpiry: '2024-09-10',
      inspectionExpiry: '2024-10-05',
      status: 'منتهي الصلاحية',
      driver: 'فاطمة علي',
      department: 'الإدارة',
      fuelType: 'بنزين',
      engineCapacity: '2.5 لتر',
      color: 'أزرق'
    },
    {
      id: 3,
      plateNumber: 'ج هـ و 9012',
      vehicleType: 'شاحنة معدات',
      brand: 'فولفو',
      model: 'FH16',
      year: '2021',
      licenseNumber: 'EQ-2024-003',
      licenseExpiry: '2025-03-15',
      insuranceExpiry: '2024-12-20',
      inspectionExpiry: '2024-12-10',
      status: 'نشط',
      driver: 'أحمد محمود',
      department: 'المعدات',
      fuelType: 'ديزل',
      engineCapacity: '16.1 لتر',
      color: 'أصفر'
    },
    {
      id: 4,
      plateNumber: 'د ك ز 3456',
      vehicleType: 'سيارة نقل صغيرة',
      brand: 'إيسوزو',
      model: 'NPR',
      year: '2018',
      licenseNumber: 'ST-2024-004',
      licenseExpiry: '2024-07-20',
      insuranceExpiry: '2024-08-25',
      inspectionExpiry: '2024-09-15',
      status: 'منتهي الصلاحية',
      driver: 'سالم حسن',
      department: 'النقل',
      fuelType: 'ديزل',
      engineCapacity: '5.2 لتر',
      color: 'أحمر'
    },
    {
      id: 5,
      plateNumber: 'هـ م ن 7890',
      vehicleType: 'سيارة إسعاف',
      brand: 'فورد',
      model: 'ترانزيت',
      year: '2022',
      licenseNumber: 'AM-2024-005',
      licenseExpiry: '2025-01-10',
      insuranceExpiry: '2025-02-05',
      inspectionExpiry: '2025-01-25',
      status: 'نشط',
      driver: 'نور الدين محمد',
      department: 'الطوارئ',
      fuelType: 'ديزل',
      engineCapacity: '2.0 لتر',
      color: 'أبيض'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط':
        return 'bg-green-100 text-green-800';
      case 'منتهي الصلاحية':
        return 'bg-red-100 text-red-800';
      case 'قريب الانتهاء':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVehicleIcon = (type: string) => {
    return type.includes('سيارة') ? Car : Truck;
  };

  const isExpiringSoon = (date: string) => {
    const expiryDate = new Date(date);
    const today = new Date();
    const daysDiff = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 30 && daysDiff > 0;
  };

  const filteredVehicles = licensedVehicles.filter(vehicle => {
    const matchesSearch = vehicle.plateNumber.includes(searchTerm) ||
                         vehicle.vehicleType.includes(searchTerm) ||
                         vehicle.brand.includes(searchTerm) ||
                         vehicle.driver.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'الكل' || vehicle.status === statusFilter;
    const matchesType = typeFilter === 'الكل' || vehicle.vehicleType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const activeCount = licensedVehicles.filter(v => v.status === 'نشط').length;
  const expiredCount = licensedVehicles.filter(v => v.status === 'منتهي الصلاحية').length;
  const expiringSoonCount = licensedVehicles.filter(v => 
    isExpiringSoon(v.licenseExpiry) || isExpiringSoon(v.insuranceExpiry) || isExpiringSoon(v.inspectionExpiry)
  ).length;

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            العودة
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">السيارات المرخصة</h1>
            <p className="text-gray-600">عرض وإدارة تراخيص المركبات</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير البيانات
          </Button>
          <Button className="gap-2">
            <FileText className="w-4 h-4" />
            إضافة ترخيص جديد
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المركبات</p>
                <p className="text-2xl font-bold">{licensedVehicles.length}</p>
              </div>
              <Car className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">نشطة</p>
                <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">منتهية الصلاحية</p>
                <p className="text-2xl font-bold text-red-600">{expiredCount}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">قريبة الانتهاء</p>
                <p className="text-2xl font-bold text-yellow-600">{expiringSoonCount}</p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* أدوات البحث والفلترة */}
      <Card>
        <CardHeader>
          <CardTitle>البحث والفلترة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث برقم اللوحة، نوع المركبة، العلامة التجارية أو السائق..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="الكل">جميع الحالات</option>
                <option value="نشط">نشط</option>
                <option value="منتهي الصلاحية">منتهي الصلاحية</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="الكل">جميع الأنواع</option>
                <option value="شاحنة صيانة">شاحنة صيانة</option>
                <option value="سيارة ركوب">سيارة ركوب</option>
                <option value="شاحنة معدات">شاحنة معدات</option>
                <option value="سيارة نقل صغيرة">سيارة نقل صغيرة</option>
                <option value="سيارة إسعاف">سيارة إسعاف</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* جدول المركبات */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المركبات المرخصة</CardTitle>
          <CardDescription>
            عرض {filteredVehicles.length} من أصل {licensedVehicles.length} مركبة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المركبة</TableHead>
                  <TableHead>رقم الترخيص</TableHead>
                  <TableHead>السائق</TableHead>
                  <TableHead>انتهاء الترخيص</TableHead>
                  <TableHead>انتهاء التأمين</TableHead>
                  <TableHead>انتهاء الفحص</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => {
                  const Icon = getVehicleIcon(vehicle.vehicleType);
                  return (
                    <TableRow key={vehicle.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{vehicle.plateNumber}</p>
                            <p className="text-sm text-gray-600">{vehicle.vehicleType}</p>
                            <p className="text-xs text-gray-500">{vehicle.brand} {vehicle.model} - {vehicle.year}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{vehicle.licenseNumber}</p>
                        <p className="text-sm text-gray-600">{vehicle.department}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{vehicle.driver}</p>
                      </TableCell>
                      <TableCell>
                        <p className={`text-sm ${isExpiringSoon(vehicle.licenseExpiry) ? 'text-yellow-600 font-medium' : ''}`}>
                          {vehicle.licenseExpiry}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className={`text-sm ${isExpiringSoon(vehicle.insuranceExpiry) ? 'text-yellow-600 font-medium' : ''}`}>
                          {vehicle.insuranceExpiry}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className={`text-sm ${isExpiringSoon(vehicle.inspectionExpiry) ? 'text-yellow-600 font-medium' : ''}`}>
                          {vehicle.inspectionExpiry}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(vehicle.status)}>
                          {vehicle.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LicensedVehicles;
