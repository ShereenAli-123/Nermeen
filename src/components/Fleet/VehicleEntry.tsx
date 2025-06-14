
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Car, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VehicleEntryProps {
  onBack: () => void;
}

const VehicleEntry: React.FC<VehicleEntryProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    chassisNumber: '',
    plateNumber: '',
    vehicleType: '',
    manufactureYear: '',
    operatingHours: '',
    licenseExpiryDate: '',
    licenseIssueDate: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // مركبات موجودة للتحقق من التكرار
  const existingVehicles = [
    { chassisNumber: '7491 96400110504918', plateNumber: '7491 ق ن' },
    { chassisNumber: '8520 96400110504919', plateNumber: 'أ ن م 1234' },
    { chassisNumber: '9630 96400110504920', plateNumber: 'ب ص ل 5678' }
  ];

  // إنشاء قائمة السنوات من 2000 إلى العام الحالي + 1
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => currentYear + 1 - i);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // إزالة رسالة الخطأ عند بداية الكتابة
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // التحقق من الحقول المطلوبة
    if (!formData.chassisNumber.trim()) {
      newErrors.chassisNumber = 'رقم الشاسيه مطلوب';
    }
    if (!formData.plateNumber.trim()) {
      newErrors.plateNumber = 'رقم اللوحة مطلوب';
    }
    if (!formData.vehicleType.trim()) {
      newErrors.vehicleType = 'نوع المركبة مطلوب';
    }
    if (!formData.manufactureYear) {
      newErrors.manufactureYear = 'سنة الصنع مطلوبة';
    }

    // التحقق من التكرار
    const duplicateVehicle = existingVehicles.find(vehicle => 
      vehicle.chassisNumber === formData.chassisNumber.trim() || 
      vehicle.plateNumber === formData.plateNumber.trim()
    );

    if (duplicateVehicle) {
      if (duplicateVehicle.chassisNumber === formData.chassisNumber.trim()) {
        newErrors.chassisNumber = 'تم إدخال هذه المركبة مسبقًا لنفس رقم الشاسيه';
      }
      if (duplicateVehicle.plateNumber === formData.plateNumber.trim()) {
        newErrors.plateNumber = 'تم إدخال هذه المركبة مسبقًا لنفس رقم اللوحة';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateRemainingHours = () => {
    if (!formData.operatingHours) return null;
    const currentHours = parseInt(formData.operatingHours);
    const maintenanceInterval = 400; // كل 400 ساعة
    const nextMaintenanceHours = Math.ceil(currentHours / maintenanceInterval) * maintenanceInterval;
    return nextMaintenanceHours - currentHours;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال جميع الحقول المطلوبة والتأكد من صحة البيانات",
        variant: "destructive"
      });
      return;
    }

    // محاكاة حفظ البيانات
    console.log('Vehicle data to save:', formData);
    
    toast({
      title: "تم بنجاح",
      description: "تم حفظ بيانات المركبة بنجاح",
      variant: "default"
    });

    // إعادة تعيين النموذج
    setFormData({
      chassisNumber: '',
      plateNumber: '',
      vehicleType: '',
      manufactureYear: '',
      operatingHours: '',
      licenseExpiryDate: '',
      licenseIssueDate: ''
    });
  };

  const remainingHours = calculateRemainingHours();

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" size="sm" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          العودة
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">إدخال مركبة جديدة</h1>
          <p className="text-gray-600">إضافة مركبة جديدة إلى نظام إدارة الحركة</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle>بيانات المركبة</CardTitle>
              <CardDescription>أدخل جميع البيانات المطلوبة للمركبة الجديدة</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* رقم الشاسيه */}
              <div className="space-y-2">
                <Label htmlFor="chassisNumber" className="text-sm font-medium">
                  رقم الشاسيه <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="chassisNumber"
                  value={formData.chassisNumber}
                  onChange={(e) => handleInputChange('chassisNumber', e.target.value)}
                  placeholder="7491 96400110504918"
                  className={errors.chassisNumber ? 'border-red-500' : ''}
                />
                {errors.chassisNumber && (
                  <p className="text-sm text-red-500">{errors.chassisNumber}</p>
                )}
              </div>

              {/* رقم اللوحة */}
              <div className="space-y-2">
                <Label htmlFor="plateNumber" className="text-sm font-medium">
                  رقم اللوحة <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="plateNumber"
                  value={formData.plateNumber}
                  onChange={(e) => handleInputChange('plateNumber', e.target.value)}
                  placeholder="7491 ق ن"
                  className={errors.plateNumber ? 'border-red-500' : ''}
                />
                {errors.plateNumber && (
                  <p className="text-sm text-red-500">{errors.plateNumber}</p>
                )}
              </div>

              {/* نوع المركبة */}
              <div className="space-y-2">
                <Label htmlFor="vehicleType" className="text-sm font-medium">
                  نوع المركبة <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="vehicleType"
                  value={formData.vehicleType}
                  onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                  placeholder="مرسيدس نافوري"
                  className={errors.vehicleType ? 'border-red-500' : ''}
                />
                {errors.vehicleType && (
                  <p className="text-sm text-red-500">{errors.vehicleType}</p>
                )}
              </div>

              {/* سنة الصنع */}
              <div className="space-y-2">
                <Label htmlFor="manufactureYear" className="text-sm font-medium">
                  سنة الصنع <span className="text-red-500">*</span>
                </Label>
                <select
                  id="manufactureYear"
                  value={formData.manufactureYear}
                  onChange={(e) => handleInputChange('manufactureYear', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md bg-white ${errors.manufactureYear ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">اختر سنة الصنع</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.manufactureYear && (
                  <p className="text-sm text-red-500">{errors.manufactureYear}</p>
                )}
              </div>

              {/* عدد ساعات التشغيل */}
              <div className="space-y-2">
                <Label htmlFor="operatingHours" className="text-sm font-medium">
                  عدد ساعات تشغيل المركبة
                </Label>
                <Input
                  id="operatingHours"
                  type="number"
                  value={formData.operatingHours}
                  onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                  placeholder="300"
                  min="0"
                />
              </div>

              {/* عدد الساعات المتبقية للصيانة القادمة */}
              {remainingHours !== null && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    عدد الساعات المتبقية للصيانة القادمة
                  </Label>
                  <div className="px-3 py-2 bg-gray-100 rounded-md">
                    <span className="font-medium text-blue-600">{remainingHours} ساعة</span>
                  </div>
                </div>
              )}

              {/* تاريخ إصدار الترخيص */}
              <div className="space-y-2">
                <Label htmlFor="licenseIssueDate" className="text-sm font-medium">
                  تاريخ إصدار الترخيص
                </Label>
                <Input
                  id="licenseIssueDate"
                  type="date"
                  value={formData.licenseIssueDate}
                  onChange={(e) => handleInputChange('licenseIssueDate', e.target.value)}
                />
              </div>

              {/* تاريخ نهاية الترخيص */}
              <div className="space-y-2">
                <Label htmlFor="licenseExpiryDate" className="text-sm font-medium">
                  تاريخ نهاية الترخيص
                </Label>
                <Input
                  id="licenseExpiryDate"
                  type="date"
                  value={formData.licenseExpiryDate}
                  onChange={(e) => handleInputChange('licenseExpiryDate', e.target.value)}
                />
              </div>
            </div>

            {/* أزرار الحفظ والإلغاء */}
            <div className="flex gap-4 pt-6">
              <Button type="submit" className="gap-2 flex-1">
                <Save className="w-4 h-4" />
                حفظ بيانات المركبة
              </Button>
              <Button type="button" variant="outline" onClick={onBack} className="gap-2">
                إلغاء
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleEntry;
