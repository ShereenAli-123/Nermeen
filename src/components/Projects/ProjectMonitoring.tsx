import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  FileText, 
  Activity, 
  TrendingUp,
  MapPin,
  Calendar,
  Plus,
  Folder,
  Edit3,
  Settings
} from 'lucide-react';
import ProjectEntryForm from './ProjectEntryForm';
import ExecutiveStatusUpdate from './ExecutiveStatusUpdate';
import StationExecutionEntry from './StationExecutionEntry';

interface ProjectMonitoringProps {
  userRole?: string;
}

const ProjectMonitoring: React.FC<ProjectMonitoringProps> = ({ userRole = 'admin' }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // إحصائيات سريعة
  const quickStats = {
    totalProjects: 28,
    activeProjects: 15,
    underReview: 8,
    completed: 5,
    totalBudget: 2500, // مليون جنيه
    completionRate: 67
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* العنوان الرئيسي */}
      <Card className="bg-gradient-to-l from-blue-600 to-blue-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Folder className="w-8 h-8" />
            إدارة ومتابعة المشاريع
          </CardTitle>
          <CardDescription className="text-blue-100">
            منصة شاملة لإدارة مشاريع المحطات الجاري طرحها ومتابعة المواقف التنفيذية
          </CardDescription>
        </CardHeader>
      </Card>

      {/* الإحصائيات السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{quickStats.totalProjects}</p>
                <p className="text-gray-600">إجمالي المشاريع</p>
              </div>
              <FileText className="w-12 h-12 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{quickStats.activeProjects}</p>
                <p className="text-gray-600">مشاريع نشطة</p>
              </div>
              <Activity className="w-12 h-12 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600">{quickStats.underReview}</p>
                <p className="text-gray-600">تحت المراجعة</p>
              </div>
              <Calendar className="w-12 h-12 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">{quickStats.completionRate}%</p>
                <p className="text-gray-600">معدل الإنجاز</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* معلومات تفصيلية سريعة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              توزيع المشاريع حسب الحالة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <span className="font-medium">مشاريع نشطة</span>
                <Badge className="bg-green-100 text-green-800 text-lg">
                  {quickStats.activeProjects} مشروع
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <span className="font-medium">تحت المراجعة</span>
                <Badge className="bg-yellow-100 text-yellow-800 text-lg">
                  {quickStats.underReview} مشروع
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <span className="font-medium">مكتملة</span>
                <Badge className="bg-blue-100 text-blue-800 text-lg">
                  {quickStats.completed} مشروع
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              المعلومات المالية والتنفيذية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>إجمالي الميزانية</span>
                <Badge className="bg-green-100 text-green-800 text-lg">
                  {quickStats.totalBudget} مليون جنيه
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span>المحافظات المشمولة</span>
                <Badge variant="outline">5 محافظات</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span>الشركات المنفذة</span>
                <Badge variant="outline">12 شركة</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span>المدن المستهدفة</span>
                <Badge variant="outline">8 مدن</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="entry" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            إدخال مشروع جديد
          </TabsTrigger>
          <TabsTrigger value="execution-entry" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            المحطات الجاري تنفيذها
          </TabsTrigger>
          <TabsTrigger value="update" className="flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            تحديث الموقف التنفيذي
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            متابعة المشاريع
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>نظرة عامة على المشاريع</CardTitle>
              <CardDescription>عرض شامل لحالة جميع المشاريع الجاري طرحها</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900">مشاريع الصرف الصحي</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>محطات معالجة</span>
                      <Badge className="bg-blue-100 text-blue-800">8</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>محطات رفع</span>
                      <Badge className="bg-green-100 text-green-800">5</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900">مشاريع الري</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>محطات رفع ري</span>
                      <Badge className="bg-purple-100 text-purple-800">7</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>محطات معالجة مياه</span>
                      <Badge className="bg-orange-100 text-orange-800">8</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900">الحالة الإجمالية</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>معدل الإنجاز</span>
                      <Badge className="bg-green-100 text-green-800">{quickStats.completionRate}%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entry" className="space-y-6">
          <ProjectEntryForm />
        </TabsContent>

        <TabsContent value="execution-entry" className="space-y-6">
          <StationExecutionEntry />
        </TabsContent>

        <TabsContent value="update" className="space-y-6">
          <ExecutiveStatusUpdate />
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>متابعة المشاريع</CardTitle>
              <CardDescription>جدول تفصيلي لجميع المشاريع الجاري طرحها وحالتها التنفيذية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>سيتم إضافة جدول متابعة المشاريع هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectMonitoring;
