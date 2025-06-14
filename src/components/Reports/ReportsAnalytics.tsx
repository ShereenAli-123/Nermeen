import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3,
  Download,
  Filter,
  Calendar,
  FileText,
  TrendingUp,
  TrendingDown,
  PieChart,
  LineChart,
  Building2
} from 'lucide-react';
import ExecutiveReports from './ExecutiveReports';

const ReportsAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const reportTemplates = [
    {
      id: 1,
      name: 'تقرير الاستهلاك الشهري',
      category: 'المياه',
      description: 'تقرير شامل عن استهلاك المياه الشهري',
      lastGenerated: '2024-06-01',
      frequency: 'شهري'
    },
    {
      id: 2,
      name: 'تقرير كفاءة المحطات',
      category: 'التشغيل',
      description: 'تحليل أداء وكفاءة محطات المعالجة',
      lastGenerated: '2024-06-10',
      frequency: 'أسبوعي'
    },
    {
      id: 3,
      name: 'تقرير المشروعات',
      category: 'المشروعات',
      description: 'متابعة تقدم المشروعات والميزانيات',
      lastGenerated: '2024-06-12',
      frequency: 'أسبوعي'
    },
    {
      id: 4,
      name: 'تقرير الصيانة',
      category: 'الصيانة',
      description: 'تقرير أعمال الصيانة والأعطال',
      lastGenerated: '2024-06-08',
      frequency: 'يومي'
    }
  ];

  const kpiData = [
    {
      title: 'إجمالي الإنتاج',
      value: '2.5M',
      unit: 'متر مكعب',
      change: '+5.2%',
      trend: 'up'
    },
    {
      title: 'متوسط الكفاءة',
      value: '87%',
      unit: 'كفاءة عامة',
      change: '+2.1%',
      trend: 'up'
    },
    {
      title: 'استهلاك الطاقة',
      value: '45,000',
      unit: 'كيلو واط/ساعة',
      change: '-3.5%',
      trend: 'down'
    },
    {
      title: 'تكلفة التشغيل',
      value: '2.8M',
      unit: 'جنيه مصري',
      change: '-1.2%',
      trend: 'down'
    }
  ];

  const chartData = [
    { month: 'يناير', production: 2100000, consumption: 1950000 },
    { month: 'فبراير', production: 2200000, consumption: 2050000 },
    { month: 'مارس', production: 2350000, consumption: 2150000 },
    { month: 'إبريل', production: 2400000, consumption: 2200000 },
    { month: 'مايو', production: 2500000, consumption: 2300000 },
    { month: 'يونيو', production: 2550000, consumption: 2400000 }
  ];

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">التقارير والتحليلات</h1>
          <p className="text-gray-600">التقارير الإدارية والتحليلات الإحصائية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            فلترة
          </Button>
          <Button className="gap-2">
            <FileText className="w-4 h-4" />
            تقرير جديد
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="templates">القوالب</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="executive">التقارير التنفيذية</TabsTrigger>
          <TabsTrigger value="custom">مخصص</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                      <p className="text-xs text-gray-500">{kpi.unit}</p>
                    </div>
                    <div className={`flex items-center gap-1 ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.trend === 'up' ? 
                        <TrendingUp className="w-4 h-4" /> : 
                        <TrendingDown className="w-4 h-4" />
                      }
                      <span className="text-sm font-medium">{kpi.change}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>الإنتاج مقابل الاستهلاك</CardTitle>
                <CardDescription>مقارنة شهرية للإنتاج والاستهلاك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">مخطط بياني تفاعلي</p>
                    <p className="text-sm text-gray-500">الإنتاج والاستهلاك</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع استهلاك الطاقة</CardTitle>
                <CardDescription>توزيع استهلاك الطاقة حسب المحطات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">مخطط دائري</p>
                    <p className="text-sm text-gray-500">توزيع الاستهلاك</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">التكرار</p>
                      <p className="font-medium">{template.frequency}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">آخر إنشاء</p>
                      <p className="font-medium">{template.lastGenerated}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">الفئة</p>
                      <p className="font-medium">{template.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="gap-2">
                      <FileText className="w-4 h-4" />
                      إنشاء تقرير
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      تحميل آخر نسخة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>اتجاهات الأداء</CardTitle>
                <CardDescription>تحليل اتجاهات الأداء على مدار الوقت</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">مخطط خطي تفاعلي</p>
                    <p className="text-sm text-gray-500">اتجاهات الأداء</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الإحصائيات السريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">محطات نشطة</p>
                    <p className="text-2xl font-bold text-blue-800">24/26</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600">كفاءة المعالجة</p>
                    <p className="text-2xl font-bold text-green-800">92%</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-600">طلبات الصيانة</p>
                    <p className="text-2xl font-bold text-yellow-800">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="executive" className="space-y-6">
          <ExecutiveReports />
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إنشاء تقرير مخصص</CardTitle>
              <CardDescription>قم بإنشاء تقرير مخصص حسب احتياجاتك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">نوع البيانات</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>استهلاك المياه</option>
                    <option>إنتاج المحطات</option>
                    <option>كفاءة التشغيل</option>
                    <option>تكاليف الصيانة</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">الفترة الزمنية</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>آخر شهر</option>
                    <option>آخر 3 أشهر</option>
                    <option>آخر 6 أشهر</option>
                    <option>آخر سنة</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">نوع التقرير</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>تقرير تفصيلي</option>
                    <option>ملخص تنفيذي</option>
                    <option>تحليل إحصائي</option>
                    <option>مقارنة زمنية</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">تنسيق الملف</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>Word</option>
                    <option>PowerPoint</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="gap-2">
                  <FileText className="w-4 h-4" />
                  إنشاء التقرير
                </Button>
                <Button variant="outline" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  جدولة تلقائية
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsAnalytics;
