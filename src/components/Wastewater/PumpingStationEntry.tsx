
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Plus, FileText, BarChart3 } from 'lucide-react';
import PumpingStationForm from './PumpingStationForm';

interface PumpingStationEntryProps {
  userRole?: string;
}

const PumpingStationEntry: React.FC<PumpingStationEntryProps> = ({ userRole = 'admin' }) => {
  const [activeTab, setActiveTab] = useState('form');

  const handleFormSubmit = (data: any) => {
    console.log('تم إرسال بيانات محطة الرفع:', data);
    // يمكن إضافة منطق إضافي هنا مثل إرسال البيانات للخادم
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* العنوان الرئيسي */}
      <Card className="bg-gradient-to-l from-green-600 to-green-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Activity className="w-8 h-8" />
            إدخال بيانات محطة رفع صرف صحي
          </CardTitle>
          <CardDescription className="text-green-100">
            نظام إدخال وتوثيق البيانات الفنية والإدارية لمحطات رفع الصرف الصحي
          </CardDescription>
        </CardHeader>
      </Card>

      {/* الإرشادات السريعة */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5" />
            إرشادات الإدخال
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
              <h3 className="font-medium text-blue-900 mb-2">الحقول المطلوبة</h3>
              <p className="text-sm text-blue-700">جميع الحقول المميزة بعلامة (*) إجبارية ويجب ملؤها</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-l-green-500">
              <h3 className="font-medium text-green-900 mb-2">البيانات التلقائية</h3>
              <p className="text-sm text-green-700">المحافظة والمدينة تظهر تلقائياً حسب صلاحياتك</p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-l-orange-500">
              <h3 className="font-medium text-orange-900 mb-2">المرفقات المدعومة</h3>
              <p className="text-sm text-orange-700">PDF, Word, Excel فقط</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* التبويبات */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            نموذج الإدخال
          </TabsTrigger>
          <TabsTrigger value="guide" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            دليل الحقول
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="space-y-6">
          <PumpingStationForm onSubmit={handleFormSubmit} userRole={userRole} />
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>دليل الحقول المطلوبة</CardTitle>
              <CardDescription>شرح مفصل للحقول وطريقة ملئها</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                
                {/* البيانات الأساسية */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-600">البيانات الأساسية</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded">
                      <h4 className="font-medium">اسم المحطة</h4>
                      <p className="text-sm text-gray-600">اسم المحطة كما هو مسجل رسمياً</p>
                      <p className="text-sm text-green-600">مثال: محطة أكتوبر 5</p>
                    </div>
                    
                    <div className="p-3 border rounded">
                      <h4 className="font-medium">الطاقة التصميمية</h4>
                      <p className="text-sm text-gray-600">الطاقة الحالية وطاقة سنة الهدف</p>
                      <p className="text-sm text-green-600">مثال: 4000، 6000</p>
                    </div>
                  </div>
                </div>

                {/* خطوط الطرد */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">خطوط الطرد</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded">
                      <h4 className="font-medium">قطر خطوط الطرد</h4>
                      <p className="text-sm text-gray-600">القطر بالمليمتر</p>
                      <p className="text-sm text-green-600">مثال: 600 مم</p>
                    </div>
                    
                    <div className="p-3 border rounded">
                      <h4 className="font-medium">مادة الصنع</h4>
                      <p className="text-sm text-gray-600">نوع المادة المستخدمة</p>
                      <p className="text-sm text-green-600">مثال: GRP، زهر، بولي إيثيلين</p>
                    </div>
                  </div>
                </div>

                {/* بيانات المولدات */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-purple-600">بيانات المولدات</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded">
                      <h4 className="font-medium">قدرة المولد</h4>
                      <p className="text-sm text-gray-600">القدرة بوحدة KVA</p>
                      <p className="text-sm text-green-600">مثال: 750 KVA</p>
                    </div>
                    
                    <div className="p-3 border rounded">
                      <h4 className="font-medium">وجود تزامن</h4>
                      <p className="text-sm text-gray-600">هل يوجد نظام تزامن بين المولدات</p>
                      <p className="text-sm text-green-600">نعم أو لا</p>
                    </div>
                  </div>
                </div>

                {/* التواريخ المهمة */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-orange-600">التواريخ المهمة</h3>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>تاريخ الاستلام الابتدائي:</strong> تاريخ بدء التشغيل التجريبي</p>
                    <p className="text-sm"><strong>تاريخ الاستلام النهائي:</strong> تاريخ التسليم النهائي للمحطة</p>
                    <p className="text-sm"><strong>تاريخ استلام الموقع:</strong> تاريخ استلام الموقع من الشركة المنفذة</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PumpingStationEntry;
