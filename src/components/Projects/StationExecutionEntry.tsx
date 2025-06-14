
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, RotateCcw, Save } from 'lucide-react';

interface StationExecutionData {
  stationType: string;
  city: string;
  stationName: string;
  companyName: string;
  assignmentOrderNumber: string;
  assignmentOrderDate: string;
  siteHandoverDate: string;
  contractualStartDate: string;
  plannedCompletionDate: string;
  modifiedCompletionDate: string;
}

const StationExecutionEntry: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<StationExecutionData>({
    stationType: '',
    city: '',
    stationName: '',
    companyName: '',
    assignmentOrderNumber: '',
    assignmentOrderDate: '',
    siteHandoverDate: '',
    contractualStartDate: '',
    plannedCompletionDate: '',
    modifiedCompletionDate: ''
  });

  // Sample data based on the image
  const stationTypes = [
    'محطة رفع صرف صحي',
    'محطة رفع ري',
    'محطة معالجة صرف صحي',
    'محطة ري'
  ];

  const cities = [
    'حدائق أكتوبر',
    'القاهرة',
    'الجيزة',
    'الإسكندرية',
    'أسوان',
    'الأقصر'
  ];

  const handleInputChange = (field: keyof StationExecutionData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'stationType',
      'city', 
      'stationName',
      'companyName',
      'assignmentOrderNumber',
      'assignmentOrderDate',
      'siteHandoverDate',
      'contractualStartDate',
      'plannedCompletionDate'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "خطأ",
        description: "يرجى تعبئة جميع الحقول الإلزامية",
        variant: "destructive"
      });
      return false;
    }

    // Validate station name length
    if (formData.stationName.length < 3 || formData.stationName.length > 50) {
      toast({
        title: "خطأ",
        description: "اسم المحطة يجب أن يكون بين 3 و 50 حرفاً",
        variant: "destructive"
      });
      return false;
    }

    // Validate date sequence
    const assignmentDate = new Date(formData.assignmentOrderDate);
    const handoverDate = new Date(formData.siteHandoverDate);
    const startDate = new Date(formData.contractualStartDate);
    const plannedDate = new Date(formData.plannedCompletionDate);

    if (handoverDate < assignmentDate) {
      toast({
        title: "خطأ",
        description: "تاريخ استلام الموقع لا يمكن أن يكون قبل تاريخ أمر الإسناد",
        variant: "destructive"
      });
      return false;
    }

    if (startDate < handoverDate) {
      toast({
        title: "خطأ", 
        description: "تاريخ بدء التعاقدي لا يمكن أن يكون قبل تاريخ استلام الموقع",
        variant: "destructive"
      });
      return false;
    }

    if (plannedDate < startDate) {
      toast({
        title: "خطأ",
        description: "تاريخ النهو المخطط لا يمكن أن يكون قبل تاريخ بدء التعاقدي",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const checkDuplicateStation = () => {
    // Simulate checking for duplicate station names in the same city
    // In a real application, this would check against the database
    const existingStations = [
      { name: 'محطة مياه الشرب', city: 'حدائق أكتوبر' },
      { name: 'محطة الصرف الرئيسية', city: 'القاهرة' }
    ];

    const isDuplicate = existingStations.some(
      station => station.name === formData.stationName && station.city === formData.city
    );

    if (isDuplicate) {
      toast({
        title: "خطأ",
        description: "اسم المحطة مسجل مسبقاً",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm() || !checkDuplicateStation()) {
      return;
    }

    // Simulate saving data
    console.log('حفظ بيانات المحطة:', formData);
    
    toast({
      title: "نجح",
      description: "تم حفظ بيانات محطة المياه بنجاح",
      variant: "default"
    });
  };

  const handleReset = () => {
    setFormData({
      stationType: '',
      city: '',
      stationName: '',
      companyName: '',
      assignmentOrderNumber: '',
      assignmentOrderDate: '',
      siteHandoverDate: '',
      contractualStartDate: '',
      plannedCompletionDate: '',
      modifiedCompletionDate: ''
    });
    
    toast({
      title: "تم الإلغاء",
      description: "تم إعادة تعيين النموذج",
      variant: "default"
    });
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">إضافة مشروع المحطات الجاري تنفيذها</h1>
          <p className="text-gray-600">إدخال كافة بيانات محطة جديدة لحفظها في النظام</p>
        </div>
      </div>

      <Card className="border-r-4 border-r-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <Plus className="w-5 h-5" />
            بيانات المحطة الجديدة
          </CardTitle>
          <CardDescription>
            إدخال جميع البيانات المطلوبة للمحطة الجاري تنفيذها
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* البيانات الأساسية */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="stationType">نوع المحطة *</Label>
              <Select value={formData.stationType} onValueChange={(value) => handleInputChange('stationType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع المحطة" />
                </SelectTrigger>
                <SelectContent>
                  {stationTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">المدينة *</Label>
              <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stationName">اسم المحطة / المشروع *</Label>
              <Input
                id="stationName"
                value={formData.stationName}
                onChange={(e) => handleInputChange('stationName', e.target.value)}
                placeholder="مثال: محطة مياه الشرب"
                maxLength={50}
              />
            </div>
          </div>

          {/* بيانات الشركة والإسناد */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-yellow-50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="companyName">اسم الشركة *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="مثال: المقاولون العرب"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignmentOrderNumber">رقم أمر الإسناد *</Label>
              <Input
                id="assignmentOrderNumber"
                value={formData.assignmentOrderNumber}
                onChange={(e) => handleInputChange('assignmentOrderNumber', e.target.value)}
                placeholder="مثال: 12345"
              />
            </div>
          </div>

          {/* التواريخ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-green-50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="assignmentOrderDate">تاريخ أمر الإسناد *</Label>
              <Input
                id="assignmentOrderDate"
                type="date"
                value={formData.assignmentOrderDate}
                onChange={(e) => handleInputChange('assignmentOrderDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteHandoverDate">تاريخ استلام الموقع *</Label>
              <Input
                id="siteHandoverDate"
                type="date"
                value={formData.siteHandoverDate}
                onChange={(e) => handleInputChange('siteHandoverDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractualStartDate">تاريخ بدء التعاقدي *</Label>
              <Input
                id="contractualStartDate"
                type="date"
                value={formData.contractualStartDate}
                onChange={(e) => handleInputChange('contractualStartDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plannedCompletionDate">تاريخ النهو المخطط *</Label>
              <Input
                id="plannedCompletionDate"
                type="date"
                value={formData.plannedCompletionDate}
                onChange={(e) => handleInputChange('plannedCompletionDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modifiedCompletionDate">تاريخ النهو المعدل</Label>
              <Input
                id="modifiedCompletionDate"
                type="date"
                value={formData.modifiedCompletionDate}
                onChange={(e) => handleInputChange('modifiedCompletionDate', e.target.value)}
              />
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={handleSave} className="gap-2 bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4" />
              حفظ البيانات
            </Button>
            <Button onClick={handleReset} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              إلغاء
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StationExecutionEntry;
