
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Calendar,
  Settings,
  Droplets,
  Clock,
  Zap,
  Save,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StationOperationalUpdateProps {
  stationId: number;
  stationName: string;
  onBack: () => void;
}

interface StationData {
  // البيانات الثابتة (غير قابلة للتعديل)
  stationName: string;
  location: string;
  designCapacity: number;
  totalPumps: number;
  
  // البيانات المتغيرة (قابلة للتعديل)
  actualFlow: string;
  operatingHours: string;
  workingPumps: string;
  operatingNotes: string;
}

const StationOperationalUpdate: React.FC<StationOperationalUpdateProps> = ({
  stationId,
  stationName,
  onBack
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<StationData>({
    // البيانات الثابتة
    stationName: stationName,
    location: 'القاهرة - المنطقة الشرقية',
    designCapacity: 25000,
    totalPumps: 4,
    
    // البيانات المتغيرة
    actualFlow: '',
    operatingHours: '',
    workingPumps: '',
    operatingNotes: ''
  });

  const handleInputChange = (field: keyof StationData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['actualFlow', 'operatingHours', 'workingPumps'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof StationData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال جميع القيم الإلزامية",
        variant: "destructive"
      });
      return false;
    }

    // التحقق من صحة البيانات
    const workingPumps = parseInt(formData.workingPumps);
    if (workingPumps > formData.totalPumps) {
      toast({
        title: "خطأ في البيانات",
        description: "عدد الطلمبات العاملة لا يمكن أن يكون أكبر من إجمالي الطلمبات",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // محاكاة إرسال البيانات
      console.log('Submitting operational update:', {
        stationId,
        date: new Date().toISOString(),
        ...formData,
        status: 'قيد المراجعة',
        submittedBy: 'موظف التشغيل',
        submissionTime: new Date().toISOString()
      });

      // انتظار قصير لمحاكاة الإرسال
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "تم إرسال البيانات بنجاح",
        description: "تم إرسال البيانات للمراجعة، بانتظار اعتماد المدير",
        variant: "default"
      });

      // العودة للقائمة الرئيسية
      setTimeout(() => {
        onBack();
      }, 2000);

    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال البيانات، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const currentDate = new Date().toLocaleDateString('ar-EG');

  return (
    <div className="space-y-6 p-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">تحديث البيانات التشغيلية</h1>
          <p className="text-gray-600">{stationName}</p>
        </div>
      </div>

      {/* معلومات التاريخ */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-medium text-blue-800">تاريخ التحديث</h3>
              <p className="text-blue-700">{currentDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* البيانات الثابتة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              البيانات الثابتة
            </CardTitle>
            <CardDescription>هذه البيانات غير قابلة للتعديل</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">اسم المحطة</Label>
              <Input 
                value={formData.stationName} 
                disabled 
                className="bg-gray-100"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700">الموقع</Label>
              <Input 
                value={formData.location} 
                disabled 
                className="bg-gray-100"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700">الطاقة التصميمية (م³/يوم)</Label>
              <Input 
                value={formData.designCapacity.toLocaleString()} 
                disabled 
                className="bg-gray-100"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700">إجمالي الطلمبات</Label>
              <Input 
                value={formData.totalPumps} 
                disabled 
                className="bg-gray-100"
              />
            </div>
          </CardContent>
        </Card>

        {/* البيانات المتغيرة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              البيانات التشغيلية اليومية
            </CardTitle>
            <CardDescription>قم بإدخال القيم التشغيلية الحالية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="actualFlow" className="text-sm font-medium text-gray-700">
                كمية التصرف الفعلي (م³/يوم) *
              </Label>
              <Input 
                id="actualFlow"
                type="number"
                value={formData.actualFlow}
                onChange={(e) => handleInputChange('actualFlow', e.target.value)}
                placeholder="مثال: 4100"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="operatingHours" className="text-sm font-medium text-gray-700">
                عدد ساعات التشغيل *
              </Label>
              <Input 
                id="operatingHours"
                type="number"
                step="0.1"
                value={formData.operatingHours}
                onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                placeholder="مثال: 6.5"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="workingPumps" className="text-sm font-medium text-gray-700">
                عدد الطلمبات العاملة *
              </Label>
              <Input 
                id="workingPumps"
                type="number"
                value={formData.workingPumps}
                onChange={(e) => handleInputChange('workingPumps', e.target.value)}
                placeholder={`أقصى عدد: ${formData.totalPumps}`}
                max={formData.totalPumps}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="operatingNotes" className="text-sm font-medium text-gray-700">
                ملاحظات التشغيل (اختياري)
              </Label>
              <Textarea 
                id="operatingNotes"
                value={formData.operatingNotes}
                onChange={(e) => handleInputChange('operatingNotes', e.target.value)}
                placeholder="مثال: تشويش في وحدة التحكم"
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تنبيه مهم */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800">ملاحظة مهمة</h3>
              <p className="text-sm text-yellow-700 mt-1">
                البيانات التي ستدخلها ستكون في حالة "قيد المراجعة" ولن تظهر في التقارير الرسمية حتى يتم اعتمادها من قبل المدير.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* أزرار الإجراءات */}
      <div className="flex gap-3 pt-4">
        <Button 
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          {loading ? (
            <Clock className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {loading ? 'جاري الإرسال...' : 'حفظ وإرسال للمراجعة'}
        </Button>
        
        <Button variant="outline" onClick={onBack}>
          إلغاء
        </Button>
      </div>
    </div>
  );
};

export default StationOperationalUpdate;
