
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Droplets, 
  AlertTriangle, 
  CheckCircle, 
  Settings,
  TrendingUp,
  MapPin,
  Activity,
  Wrench,
  Eye,
  Edit,
  Plus,
  Filter,
  Download
} from 'lucide-react';

interface WaterManagementProps {
  userRole: string;
}

const WaterManagement: React.FC<WaterManagementProps> = ({ userRole }) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Sample data for water stations
  const waterStations = [
    {
      id: 1,
      name: 'محطة المياه الرئيسية',
      region: 'المركز',
      status: 'نشطة',
      capacity: '500,000 م³/يوم',
      currentFlow: '420,000 م³/يوم',
      efficiency: 95,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10',
      alerts: 0
    },
    {
      id: 2,
      name: 'محطة المياه الشرقية',
      region: 'الشرق',
      status: 'نشطة',
      capacity: '300,000 م³/يوم',
      currentFlow: '260,000 م³/يوم',
      efficiency: 87,
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-02-05',
      alerts: 2
    },
    {
      id: 3,
      name: 'محطة المياه الغربية',
      region: 'الغرب',
      status: 'صيانة',
      capacity: '400,000 م³/يوم',
      currentFlow: '0 م³/يوم',
      efficiency: 0,
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-01-15',
      alerts: 1
    },
    {
      id: 4,
      name: 'محطة المياه الشمالية',
      region: 'الشمال',
      status: 'نشطة',
      capacity: '250,000 م³/يوم',
      currentFlow: '230,000 م³/يوم',
      efficiency: 92,
      lastMaintenance: '2024-01-08',
      nextMaintenance: '2024-02-08',
      alerts: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'نشطة':
        return <Badge className="bg-green-100 text-green-800">نشطة</Badge>;
      case 'صيانة':
        return <Badge className="bg-yellow-100 text-yellow-800">صيانة</Badge>;
      case 'معطلة':
        return <Badge className="bg-red-100 text-red-800">معطلة</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const canEdit = ['admin', 'department_head'].includes(userRole);
  const canAdd = ['admin', 'department_head'].includes(userRole);

  return (
    <div className="space-y-6 p-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">إدارة شبكة المياه</h1>
          <p className="text-gray-600">مراقبة وإدارة محطات المياه وشبكات التوزيع</p>
        </div>
        <div className="flex gap-2">
          {canAdd && (
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة محطة جديدة
            </Button>
          )}
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير البيانات
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 mb-1">إجمالي المحطات</p>
                <p className="text-2xl font-bold text-blue-900">4</p>
              </div>
              <Droplets className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 mb-1">المحطات النشطة</p>
                <p className="text-2xl font-bold text-green-900">3</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 mb-1">تحت الصيانة</p>
                <p className="text-2xl font-bold text-yellow-900">1</p>
              </div>
              <Wrench className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 mb-1">إجمالي التنبيهات</p>
                <p className="text-2xl font-bold text-red-900">3</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            تصفية البيانات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">المنطقة</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنطقة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المناطق</SelectItem>
                  <SelectItem value="center">المركز</SelectItem>
                  <SelectItem value="east">الشرق</SelectItem>
                  <SelectItem value="west">الغرب</SelectItem>
                  <SelectItem value="north">الشمال</SelectItem>
                  <SelectItem value="south">الجنوب</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">حالة التشغيل</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشطة</SelectItem>
                  <SelectItem value="maintenance">صيانة</SelectItem>
                  <SelectItem value="inactive">معطلة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full">
                تطبيق التصفية
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stations Management */}
      <Tabs defaultValue="stations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stations">محطات المياه</TabsTrigger>
          <TabsTrigger value="network">شبكة التوزيع</TabsTrigger>
          <TabsTrigger value="quality">جودة المياه</TabsTrigger>
          <TabsTrigger value="consumption">الاستهلاك</TabsTrigger>
        </TabsList>

        <TabsContent value="stations">
          <Card>
            <CardHeader>
              <CardTitle>قائمة محطات المياه</CardTitle>
              <CardDescription>جميع محطات المياه ومعلومات التشغيل</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم المحطة</TableHead>
                    <TableHead>المنطقة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الطاقة الإنتاجية</TableHead>
                    <TableHead>التدفق الحالي</TableHead>
                    <TableHead>الكفاءة</TableHead>
                    <TableHead>آخر صيانة</TableHead>
                    <TableHead>التنبيهات</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {waterStations.map((station) => (
                    <TableRow key={station.id}>
                      <TableCell className="font-medium">{station.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          {station.region}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(station.status)}</TableCell>
                      <TableCell>{station.capacity}</TableCell>
                      <TableCell>{station.currentFlow}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${getEfficiencyColor(station.efficiency)}`}>
                          {station.efficiency}%
                        </span>
                      </TableCell>
                      <TableCell>{station.lastMaintenance}</TableCell>
                      <TableCell>
                        {station.alerts > 0 ? (
                          <Badge variant="destructive">{station.alerts}</Badge>
                        ) : (
                          <Badge variant="outline">0</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {canEdit && (
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network">
          <Card>
            <CardHeader>
              <CardTitle>شبكة التوزيع</CardTitle>
              <CardDescription>مراقبة شبكة أنابيب المياه ونقاط التوزيع</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">خريطة شبكة التوزيع</h3>
                <p className="text-gray-500">سيتم عرض خريطة تفاعلية لشبكة أنابيب المياه</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality">
          <Card>
            <CardHeader>
              <CardTitle>مراقبة جودة المياه</CardTitle>
              <CardDescription>تحليل جودة المياه والمعايير الصحية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { parameter: 'الكلور المتبقي', value: '0.5 ppm', status: 'طبيعي', target: '0.2-1.0 ppm' },
                  { parameter: 'درجة الحموضة', value: '7.2 pH', status: 'طبيعي', target: '6.5-8.5 pH' },
                  { parameter: 'العكارة', value: '0.8 NTU', status: 'طبيعي', target: '< 1.0 NTU' },
                  { parameter: 'البكتيريا', value: '0 CFU/100ml', status: 'طبيعي', target: '0 CFU/100ml' },
                  { parameter: 'الفلوريد', value: '0.7 ppm', status: 'طبيعي', target: '0.5-1.5 ppm' },
                  { parameter: 'النترات', value: '5 ppm', status: 'طبيعي', target: '< 10 ppm' }
                ].map((test, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{test.parameter}</h4>
                          <Badge className="bg-green-100 text-green-800">{test.status}</Badge>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{test.value}</p>
                        <p className="text-sm text-gray-500">المعدل المطلوب: {test.target}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consumption">
          <Card>
            <CardHeader>
              <CardTitle>تحليل الاستهلاك</CardTitle>
              <CardDescription>متابعة استهلاك المياه حسب المناطق والفترات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-blue-50">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="text-lg font-medium text-blue-900">الاستهلاك اليومي</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">1,950,000</p>
                        <p className="text-sm text-blue-600">متر مكعب</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-green-50">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h3 className="text-lg font-medium text-green-900">متوسط الاستهلاك الشهري</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">58,500,000</p>
                        <p className="text-sm text-green-600">متر مكعب</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WaterManagement;
