
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Droplets, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Users,
  Car,
  Wrench,
  Filter,
  Download,
  Printer,
  Calendar,
  MapPin,
  BarChart3,
  Activity,
  FileText,
  Eye,
  Map
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line } from 'recharts';

interface MainDashboardProps {
  userRole: string;
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red';
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  trendValue, 
  color = 'blue',
  onClick 
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    red: 'bg-red-50 border-red-200'
  };

  const iconColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600'
  };

  return (
    <Card 
      className={`${colorClasses[color]} transition-all hover:shadow-lg cursor-pointer`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${iconColorClasses[color]}`}>
            {icon}
          </div>
          {trend && trendValue && (
            <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm font-medium">{trendValue}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const MainDashboard: React.FC<MainDashboardProps> = ({ userRole }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStation, setSelectedStation] = useState('all');

  // Sample data for charts
  const dailyConsumptionData = [
    { name: 'السبت', consumption: 2100000 },
    { name: 'الأحد', consumption: 1950000 },
    { name: 'الاثنين', consumption: 2250000 },
    { name: 'الثلاثاء', consumption: 2000000 },
    { name: 'الأربعاء', consumption: 1850000 },
    { name: 'الخميس', consumption: 2150000 },
    { name: 'الجمعة', consumption: 1750000 }
  ];

  const monthlyConsumptionData = [
    { month: 'يناير', consumption: 58500000 },
    { month: 'فبراير', consumption: 52300000 },
    { month: 'مارس', consumption: 61200000 },
    { month: 'أبريل', consumption: 59800000 },
    { month: 'مايو', consumption: 64500000 },
    { month: 'يونيو', consumption: 67200000 }
  ];

  const stationComparisonData = [
    { name: 'المحطة الرئيسية', consumption: 850000, efficiency: 95 },
    { name: 'محطة الشرق', consumption: 620000, efficiency: 87 },
    { name: 'محطة الغرب', consumption: 580000, efficiency: 92 },
    { name: 'محطة الشمال', consumption: 460000, efficiency: 89 },
    { name: 'محطة الجنوب', consumption: 390000, efficiency: 94 }
  ];

  const maintenanceReports = [
    { id: 1, station: 'المحطة الرئيسية', type: 'صيانة دورية', status: 'مكتملة', date: '2024-01-10', reportFile: 'report_001.pdf' },
    { id: 2, station: 'محطة الشرق', type: 'إصلاح عطل', status: 'قيد التنفيذ', date: '2024-01-12', reportFile: 'report_002.pdf' },
    { id: 3, station: 'محطة الغرب', type: 'فحص دوري', status: 'مرفوضة', date: '2024-01-08', reportFile: 'report_003.pdf' },
    { id: 4, station: 'محطة الشمال', type: 'صيانة طارئة', status: 'مكتملة', date: '2024-01-15', reportFile: 'report_004.pdf' }
  ];

  // Role-based data visibility
  const getVisibleData = () => {
    switch (userRole) {
      case 'president':
        return {
          canViewAllAgencies: true,
          canViewAllRegions: true,
          canExportData: true
        };
      case 'vice_president':
      case 'department_head':
        return {
          canViewAllAgencies: false,
          canViewAllRegions: true,
          canExportData: true
        };
      default:
        return {
          canViewAllAgencies: false,
          canViewAllRegions: false,
          canExportData: false
        };
    }
  };

  const permissions = getVisibleData();

  const handleExportData = () => {
    console.log('Exporting data...');
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleDrillDown = (type: string, data?: any) => {
    console.log(`Drill down to ${type}`, data);
  };

  const getMaintenanceStatusBadge = (status: string) => {
    switch (status) {
      case 'مكتملة':
        return <Badge className="bg-green-100 text-green-800">مكتملة</Badge>;
      case 'قيد التنفيذ':
        return <Badge className="bg-yellow-100 text-yellow-800">قيد التنفيذ</Badge>;
      case 'مرفوضة':
        return <Badge className="bg-red-100 text-red-800">مرفوضة</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const downloadReport = (reportFile: string) => {
    console.log(`Downloading report: ${reportFile}`);
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">لوحة التحكم - إدارة مياه الشرب</h1>
          <p className="text-gray-600">نظرة شاملة على أداء شبكة المياه والمؤشرات الرئيسية</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">
            آخر تحديث: اليوم {new Date().toLocaleTimeString('ar-EG')}
          </Badge>
          {permissions.canExportData && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExportData} className="gap-2">
                <Download className="w-4 h-4" />
                تصدير
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrintReport} className="gap-2">
                <Printer className="w-4 h-4" />
                طباعة
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            خيارات التصفية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">الفترة الزمنية</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفترة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">اليوم</SelectItem>
                  <SelectItem value="week">هذا الأسبوع</SelectItem>
                  <SelectItem value="month">هذا الشهر</SelectItem>
                  <SelectItem value="quarter">هذا الربع</SelectItem>
                  <SelectItem value="year">هذا العام</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {permissions.canViewAllRegions && (
              <div className="space-y-2">
                <label className="text-sm font-medium">المنطقة</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنطقة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المناطق</SelectItem>
                    <SelectItem value="east">المنطقة الشرقية</SelectItem>
                    <SelectItem value="west">المنطقة الغربية</SelectItem>
                    <SelectItem value="north">المنطقة الشمالية</SelectItem>
                    <SelectItem value="south">المنطقة الجنوبية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">المحطة</label>
              <Select value={selectedStation} onValueChange={setSelectedStation}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المحطة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المحطات</SelectItem>
                  <SelectItem value="main">المحطة الرئيسية</SelectItem>
                  <SelectItem value="east">محطة الشرق</SelectItem>
                  <SelectItem value="west">محطة الغرب</SelectItem>
                  <SelectItem value="north">محطة الشمال</SelectItem>
                  <SelectItem value="south">محطة الجنوب</SelectItem>
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

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="الاستهلاك اليومي"
          value="1,950,000"
          description="متر مكعب اليوم"
          icon={<Droplets className="w-5 h-5" />}
          trend="down"
          trendValue="5%"
          color="blue"
          onClick={() => handleDrillDown('daily-consumption')}
        />
        
        <StatCard
          title="المحطات النشطة"
          value="24"
          description="من إجمالي 26 محطة"
          icon={<Activity className="w-5 h-5" />}
          trend="up"
          trendValue="2"
          color="green"
          onClick={() => handleDrillDown('active-stations')}
        />
        
        <StatCard
          title="تقارير الصيانة"
          value="12"
          description="مكتملة هذا الشهر"
          icon={<Wrench className="w-5 h-5" />}
          color="yellow"
          onClick={() => handleDrillDown('maintenance-reports')}
        />
        
        <StatCard
          title="الأعطال الطارئة"
          value="3"
          description="تحتاج تدخل فوري"
          icon={<AlertTriangle className="w-5 h-5" />}
          trend="down"
          trendValue="1"
          color="red"
          onClick={() => handleDrillDown('emergency-issues')}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Daily Consumption Chart */}
        <Card>
          <CardHeader>
            <CardTitle>استهلاك المياه اليومي</CardTitle>
            <CardDescription>الاستهلاك الفعلي لآخر 7 أيام (متر مكعب)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                consumption: {
                  label: "الاستهلاك",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyConsumptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="consumption"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Consumption Trend */}
        <Card>
          <CardHeader>
            <CardTitle>اتجاه الاستهلاك الشهري</CardTitle>
            <CardDescription>تحليل الاتجاهات الشهرية لآخر 6 أشهر</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                consumption: {
                  label: "الاستهلاك",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyConsumptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="consumption"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Station Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>مقارنة استهلاك المحطات</CardTitle>
          <CardDescription>أعلى وأقل المحطات استهلاكًا مع مؤشرات الكفاءة</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              consumption: {
                label: "الاستهلاك",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stationComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="consumption" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* GIS and Network Monitoring */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* GIS Interactive Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="w-5 h-5" />
              نظم المعلومات الجغرافية (GIS)
            </CardTitle>
            <CardDescription>خريطة تفاعلية لمواقع المحطات وخطوط الشبكة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:from-blue-100 hover:to-green-100 transition-colors"
                 onClick={() => handleDrillDown('gis-map')}>
              <div className="text-center">
                <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-700">خريطة تفاعلية</h3>
                <p className="text-sm text-gray-500">انقر لعرض الخريطة التفصيلية</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">26 محطة</Badge>
                  <Badge variant="outline">45 نقطة توزيع</Badge>
                  <Badge variant="outline">12 خط رئيسي</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Monitoring Status */}
        <Card>
          <CardHeader>
            <CardTitle>مراقبة الشبكة</CardTitle>
            <CardDescription>حالة شبكة المياه في الوقت الفعلي</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">92%</p>
                  <p className="text-sm text-green-700">كفاءة الشبكة</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">24/26</p>
                  <p className="text-sm text-blue-700">محطات نشطة</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>ضغط الشبكة</span>
                  <span className="text-green-600">طبيعي</span>
                </div>
                <Progress value={85} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>جودة المياه</span>
                  <span className="text-green-600">ممتازة</span>
                </div>
                <Progress value={96} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>معدل التدفق</span>
                  <span className="text-yellow-600">متوسط</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Reports Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                تقارير الصيانة
              </CardTitle>
              <CardDescription>جدول بتقارير الصيانة مع إمكانية التحميل</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-100 text-green-800">مكتملة: 8</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">قيد التنفيذ: 3</Badge>
              <Badge className="bg-red-100 text-red-800">مرفوضة: 1</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المحطة</TableHead>
                <TableHead>نوع الصيانة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>التقرير</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.station}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{getMaintenanceStatusBadge(report.status)}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => downloadReport(report.reportFile)}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {report.reportFile}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDrillDown('maintenance-detail', report)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainDashboard;
