
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Settings,
  Activity,
  FileText,
  Plus,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface MaintenanceRecord {
  id: number;
  stationName: string;
  stationType: string;
  maintenanceType: string;
  scheduledDate: string;
  actualDate?: string;
  status: string;
  priority: string;
  description: string;
  cost: number;
  technician: string;
  company: string;
  governorate: string;
  nextMaintenanceDate: string;
  notes?: string;
}

const MaintenanceManagement: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // بيانات الصيانة المستمدة من محطات الرفع الموجودة
  const maintenanceRecords: MaintenanceRecord[] = [
    {
      id: 1,
      stationName: 'محطة رفع شرق القاهرة',
      stationType: 'محطة رفع صرف صحي',
      maintenanceType: 'صيانة دورية',
      scheduledDate: '2024-07-15',
      actualDate: '2024-07-16',
      status: 'مكتملة',
      priority: 'عادية',
      description: 'صيانة شاملة للطلمبات والمولدات',
      cost: 25000,
      technician: 'أحمد محمد',
      company: 'شركة المياه الدولية',
      governorate: 'القاهرة',
      nextMaintenanceDate: '2025-01-15',
      notes: 'تم استبدال قطع غيار الطلمبة الثانية'
    },
    {
      id: 2,
      stationName: 'محطة رفع الإسكندرية الشرقية',
      stationType: 'محطة رفع صرف صحي',
      maintenanceType: 'صيانة طارئة',
      scheduledDate: '2024-06-20',
      actualDate: '2024-06-20',
      status: 'مكتملة',
      priority: 'عالية',
      description: 'إصلاح عطل في جهاز قياس التدفق',
      cost: 8500,
      technician: 'سامي علي',
      company: 'شركة الإسكندرية للمياه',
      governorate: 'الإسكندرية',
      nextMaintenanceDate: '2024-08-10',
      notes: 'تم إصلاح جهاز القياس ولكنه يحتاج متابعة'
    },
    {
      id: 3,
      stationName: 'محطة رفع المنصورة المركزية',
      stationType: 'محطة رفع صرف صحي',
      maintenanceType: 'صيانة دورية',
      scheduledDate: '2024-06-01',
      status: 'جارية',
      priority: 'عالية',
      description: 'صيانة شاملة وإصلاح أعطال متعددة',
      cost: 45000,
      technician: 'محمد حسن',
      company: 'شركة الدقهلية للصرف',
      governorate: 'الدقهلية',
      nextMaintenanceDate: '2024-12-01',
      notes: 'صيانة معقدة تتطلب وقت إضافي'
    },
    {
      id: 4,
      stationName: 'محطة رفع أسوان الجنوبية',
      stationType: 'محطة رفع صرف صحي',
      maintenanceType: 'صيانة وقائية',
      scheduledDate: '2024-07-20',
      status: 'مجدولة',
      priority: 'عادية',
      description: 'فحص وصيانة المولدات والأنظمة الكهربائية',
      cost: 18000,
      technician: 'عبد الرحمن أحمد',
      company: 'شركة الصعيد للمياه',
      governorate: 'أسوان',
      nextMaintenanceDate: '2025-01-20'
    },
    {
      id: 5,
      stationName: 'محطة رفع طنطا الغربية',
      stationType: 'محطة رفع صرف صحي',
      maintenanceType: 'صيانة طارئة',
      scheduledDate: '2024-06-15',
      status: 'متأخرة',
      priority: 'حرجة',
      description: 'إصلاح عطل كامل في المحطة',
      cost: 75000,
      technician: 'خالد محمود',
      company: 'شركة الغربية للصيانة',
      governorate: 'الغربية',
      nextMaintenanceDate: '2024-09-15',
      notes: 'المحطة متوقفة تماماً وتحتاج تدخل عاجل'
    }
  ];

  // إحصائيات الصيانة
  const maintenanceStats = {
    totalRecords: maintenanceRecords.length,
    completed: maintenanceRecords.filter(r => r.status === 'مكتملة').length,
    ongoing: maintenanceRecords.filter(r => r.status === 'جارية').length,
    scheduled: maintenanceRecords.filter(r => r.status === 'مجدولة').length,
    overdue: maintenanceRecords.filter(r => r.status === 'متأخرة').length,
    totalCost: maintenanceRecords.reduce((sum, r) => sum + r.cost, 0),
    averageCost: Math.round(maintenanceRecords.reduce((sum, r) => sum + r.cost, 0) / maintenanceRecords.length)
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'مكتملة':
        return <Badge className="bg-green-100 text-green-800">مكتملة</Badge>;
      case 'جارية':
        return <Badge className="bg-blue-100 text-blue-800">جارية</Badge>;
      case 'مجدولة':
        return <Badge className="bg-yellow-100 text-yellow-800">مجدولة</Badge>;
      case 'متأخرة':
        return <Badge variant="destructive">متأخرة</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'حرجة':
        return <Badge className="bg-red-100 text-red-800">حرجة</Badge>;
      case 'عالية':
        return <Badge className="bg-orange-100 text-orange-800">عالية</Badge>;
      case 'عادية':
        return <Badge className="bg-gray-100 text-gray-800">عادية</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const filteredRecords = maintenanceRecords.filter(record => {
    const matchesSearch = searchTerm === '' || 
      record.stationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.technician.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || record.priority === filterPriority;
    const matchesType = filterType === 'all' || record.maintenanceType === filterType;

    return matchesSearch && matchesStatus && matchesPriority && matchesType;
  });

  const handleExport = () => {
    toast({
      title: "تصدير البيانات",
      description: "تم تصدير بيانات الصيانة بنجاح",
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* العنوان الرئيسي */}
      <Card className="bg-gradient-to-l from-orange-600 to-orange-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Wrench className="w-8 h-8" />
            إدارة بيانات الصيانة
          </CardTitle>
          <CardDescription className="text-orange-100">
            نظام شامل لإدارة ومتابعة أعمال الصيانة لجميع المحطات والمشاريع
          </CardDescription>
        </CardHeader>
      </Card>

      {/* الإحصائيات السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{maintenanceStats.totalRecords}</p>
                <p className="text-gray-600">إجمالي أعمال الصيانة</p>
              </div>
              <FileText className="w-12 h-12 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{maintenanceStats.completed}</p>
                <p className="text-gray-600">أعمال مكتملة</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">{maintenanceStats.overdue}</p>
                <p className="text-gray-600">أعمال متأخرة</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">{maintenanceStats.averageCost.toLocaleString()}</p>
                <p className="text-gray-600">متوسط التكلفة (جنيه)</p>
              </div>
              <Settings className="w-12 h-12 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            سجلات الصيانة
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            جدولة الصيانة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>توزيع أعمال الصيانة حسب الحالة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span className="font-medium">أعمال مكتملة</span>
                    <Badge className="bg-green-100 text-green-800 text-lg">
                      {maintenanceStats.completed} عمل
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium">أعمال جارية</span>
                    <Badge className="bg-blue-100 text-blue-800 text-lg">
                      {maintenanceStats.ongoing} عمل
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <span className="font-medium">أعمال مجدولة</span>
                    <Badge className="bg-yellow-100 text-yellow-800 text-lg">
                      {maintenanceStats.scheduled} عمل
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <span className="font-medium">أعمال متأخرة</span>
                    <Badge className="bg-red-100 text-red-800 text-lg">
                      {maintenanceStats.overdue} عمل
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>المعلومات المالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>إجمالي تكلفة الصيانة</span>
                    <Badge className="bg-blue-100 text-blue-800 text-lg">
                      {maintenanceStats.totalCost.toLocaleString()} جنيه
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>متوسط تكلفة العمل</span>
                    <Badge variant="outline" className="text-lg">
                      {maintenanceStats.averageCost.toLocaleString()} جنيه
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>عدد الشركات المنفذة</span>
                    <Badge variant="outline">5 شركات</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>عدد الفنيين</span>
                    <Badge variant="outline">5 فنيين</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>سجلات أعمال الصيانة</CardTitle>
                  <CardDescription>
                    عرض تفصيلي لجميع أعمال الصيانة ({filteredRecords.length} من {maintenanceRecords.length} سجل)
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleExport} variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    تصدير
                  </Button>
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة صيانة
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* شريط البحث والفلترة */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="البحث في سجلات الصيانة..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    فلترة متقدمة
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="مكتملة">مكتملة</SelectItem>
                      <SelectItem value="جارية">جارية</SelectItem>
                      <SelectItem value="مجدولة">مجدولة</SelectItem>
                      <SelectItem value="متأخرة">متأخرة</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="الأولوية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأولويات</SelectItem>
                      <SelectItem value="حرجة">حرجة</SelectItem>
                      <SelectItem value="عالية">عالية</SelectItem>
                      <SelectItem value="عادية">عادية</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="نوع الصيانة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأنواع</SelectItem>
                      <SelectItem value="صيانة دورية">صيانة دورية</SelectItem>
                      <SelectItem value="صيانة طارئة">صيانة طارئة</SelectItem>
                      <SelectItem value="صيانة وقائية">صيانة وقائية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* الجدول */}
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead>اسم المحطة</TableHead>
                        <TableHead>نوع الصيانة</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الأولوية</TableHead>
                        <TableHead>التاريخ المجدول</TableHead>
                        <TableHead>التاريخ الفعلي</TableHead>
                        <TableHead>التكلفة</TableHead>
                        <TableHead>الفني المسؤول</TableHead>
                        <TableHead>الشركة</TableHead>
                        <TableHead>المحافظة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.map((record) => (
                        <TableRow key={record.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">
                            <div>
                              <div className="font-semibold">{record.stationName}</div>
                              <div className="text-sm text-gray-500">{record.stationType}</div>
                            </div>
                          </TableCell>
                          <TableCell>{record.maintenanceType}</TableCell>
                          <TableCell>{getStatusBadge(record.status)}</TableCell>
                          <TableCell>{getPriorityBadge(record.priority)}</TableCell>
                          <TableCell>{record.scheduledDate}</TableCell>
                          <TableCell>{record.actualDate || '-'}</TableCell>
                          <TableCell>
                            <div className="text-center">
                              <div className="font-bold text-blue-600">{record.cost.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">جنيه</div>
                            </div>
                          </TableCell>
                          <TableCell>{record.technician}</TableCell>
                          <TableCell className="text-sm">{record.company}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{record.governorate}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>جدولة أعمال الصيانة</CardTitle>
              <CardDescription>الأعمال المجدولة والقادمة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceRecords
                  .filter(r => r.status === 'مجدولة' || r.status === 'متأخرة')
                  .map((record) => (
                    <div key={record.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{record.stationName}</h3>
                          <p className="text-sm text-gray-600">{record.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm">
                              <Clock className="w-4 h-4 inline ml-1" />
                              {record.scheduledDate}
                            </span>
                            <span className="text-sm">
                              <Wrench className="w-4 h-4 inline ml-1" />
                              {record.technician}
                            </span>
                          </div>
                        </div>
                        <div className="text-left">
                          {getStatusBadge(record.status)}
                          <div className="mt-2">
                            {getPriorityBadge(record.priority)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceManagement;
