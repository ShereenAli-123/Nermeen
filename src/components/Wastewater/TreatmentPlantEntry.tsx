
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  List, 
  Factory,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import TreatmentPlantForm from './TreatmentPlantForm';

interface TreatmentPlantEntryProps {
  userRole?: string;
}

const TreatmentPlantEntry: React.FC<TreatmentPlantEntryProps> = ({ userRole = 'admin' }) => {
  const [activeTab, setActiveTab] = useState('form');
  const [recentSubmissions, setRecentSubmissions] = useState([
    {
      id: 1,
      plantName: 'محطة معالجة شرق القاهرة',
      governorate: 'القاهرة',
      submittedAt: '2024-01-15',
      status: 'pending',
      submittedBy: 'أحمد محمد'
    },
    {
      id: 2,
      plantName: 'محطة معالجة غرب الجيزة',
      governorate: 'الجيزة',
      submittedAt: '2024-01-14',
      status: 'approved',
      submittedBy: 'فاطمة علي'
    },
    {
      id: 3,
      plantName: 'محطة معالجة الإسكندرية الجديدة',
      governorate: 'الإسكندرية',
      submittedAt: '2024-01-13',
      status: 'rejected',
      submittedBy: 'محمد حسن'
    }
  ]);

  const handleFormSubmit = (formData: any) => {
    // إضافة الطلب الجديد إلى القائمة
    const newSubmission = {
      id: recentSubmissions.length + 1,
      plantName: formData.plantName,
      governorate: formData.governorate,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending',
      submittedBy: 'المستخدم الحالي'
    };

    setRecentSubmissions([newSubmission, ...recentSubmissions]);
    setActiveTab('submissions');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="w-3 h-3 ml-1" />
            في انتظار الموافقة
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 ml-1" />
            تم الاعتماد
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="w-3 h-3 ml-1" />
            مرفوض
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const stats = {
    totalSubmissions: recentSubmissions.length,
    pendingApproval: recentSubmissions.filter(s => s.status === 'pending').length,
    approved: recentSubmissions.filter(s => s.status === 'approved').length,
    rejected: recentSubmissions.filter(s => s.status === 'rejected').length
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* العنوان الرئيسي */}
      <Card className="bg-gradient-to-l from-green-600 to-green-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Factory className="w-8 h-8" />
            إدخال بيانات محطات المعالجة
          </CardTitle>
          <CardDescription className="text-green-100">
            نظام شامل لإدخال وإدارة بيانات محطات المعالجة الجديدة
          </CardDescription>
        </CardHeader>
      </Card>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.totalSubmissions}</p>
                <p className="text-gray-600 text-sm">إجمالي الطلبات</p>
              </div>
              <List className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingApproval}</p>
                <p className="text-gray-600 text-sm">في انتظار الموافقة</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                <p className="text-gray-600 text-sm">تم الاعتماد</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                <p className="text-gray-600 text-sm">مرفوض</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            إدخال محطة جديدة
          </TabsTrigger>
          <TabsTrigger value="submissions" className="flex items-center gap-2">
            <List className="w-4 h-4" />
            الطلبات المرسلة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="space-y-6">
          <TreatmentPlantForm 
            userRole={userRole} 
            onSubmit={handleFormSubmit}
          />
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="w-5 h-5" />
                الطلبات المرسلة مؤخراً
              </CardTitle>
              <CardDescription>
                قائمة بجميع طلبات إدخال محطات المعالجة التي تم إرسالها
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentSubmissions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Factory className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>لا توجد طلبات مرسلة حتى الآن</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setActiveTab('form')}
                  >
                    إدخال محطة جديدة
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentSubmissions.map((submission) => (
                    <div 
                      key={submission.id} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Factory className="w-8 h-8 text-blue-500" />
                        <div>
                          <h3 className="font-semibold">{submission.plantName}</h3>
                          <p className="text-sm text-gray-600">
                            المحافظة: {submission.governorate} • 
                            تم الإرسال: {submission.submittedAt} • 
                            بواسطة: {submission.submittedBy}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(submission.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TreatmentPlantEntry;
