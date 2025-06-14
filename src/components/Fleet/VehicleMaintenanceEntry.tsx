
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Upload, Save, RotateCcw, Wrench } from 'lucide-react';

interface VehicleMaintenanceEntryProps {
  onBack?: () => void;
}

const VehicleMaintenanceEntry: React.FC<VehicleMaintenanceEntryProps> = ({ onBack }) => {
  const { toast } = useToast();
  
  // قائمة المركبات المسجلة
  const vehicles = [
    { plate: '7491 ق ن', type: 'نافوري', currentHours: 1800 },
    { plate: '1234 أ ن', type: 'مرسيدس', currentHours: 2100 },
    { plate: '5678 ب م', type: 'إيفيكو', currentHours: 1950 },
    { plate: '9012 ج هـ', type: 'هيونداي', currentHours: 1650 }
  ];

  const [formData, setFormData] = useState({
    vehiclePlate: '',
    vehicleType: '',
    maintenanceType: '',
    specificMaintenanceType: '',
    lastMaintenanceHours: '',
    lastMaintenanceDate: '',
    cost: '',
    documents: null as File | null,
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleVehicleSelect = (plate: string) => {
    const selectedVehicle = vehicles.find(v => v.plate === plate);
    if (selectedVehicle) {
      setFormData(prev => ({
        ...prev,
        vehiclePlate: plate,
        vehicleType: selectedVehicle.type
      }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, documents: file }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.vehiclePlate) {
      newErrors.vehiclePlate = 'يرجى اختيار رقم السيارة';
    }

    if (!formData.maintenanceType) {
      newErrors.maintenanceType = 'يرجى اختيار نوع الصيانة';
    }

    if (!formData.specificMaintenanceType) {
      newErrors.specificMaintenanceType = 'يرجى تحديد نوع الصيانة بالتفصيل';
    }

    if (formData.maintenanceType === 'دورية' && !formData.lastMaintenanceHours) {
      newErrors.lastMaintenanceHours = 'يرجى إدخال عدد الساعات عند آخر صيانة دورية';
    }

    if (formData.maintenanceType === 'دورية' && !formData.lastMaintenanceDate) {
      newErrors.lastMaintenanceDate = 'يرجى إدخال تاريخ آخر صيانة';
    }

    if (!formData.cost) {
      newErrors.cost = 'يرجى إدخال تكلفة الصيانة';
    } else if (isNaN(Number(formData.cost)) || Number(formData.cost) <= 0) {
      newErrors.cost = 'يرجى إدخال تكلفة صحيحة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkDuplicateMaintenance = () => {
    // فحص التكرار - هنا يمكن إضافة منطق فحص قاعدة البيانات
    // في الوقت الحالي نعتبر أنه لا يوجد تكرار
    return false;
  };

  const calculateNextMaintenanceDate = () => {
    if (formData.maintenanceType === 'دورية' && formData.lastMaintenanceHours) {
      const currentHours = parseInt(formData.lastMaintenanceHours);
      const nextMaintenanceHours = currentHours + 400; // كل 400 ساعة
      return `الصيانة القادمة عند ${nextMaintenanceHours} ساعة`;
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملئ جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    if (checkDuplicateMaintenance()) {
      toast({
        title: "خطأ في الحفظ",
        description: "تم إدخال هذه الصيانة مسبقًا لنفس التاريخ",
        variant: "destructive"
      });
      return;
    }

    // حفظ البيانات
    console.log('بيانات الصيانة:', formData);
    
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ بيانات الصيانة بنجاح",
    });

    // إعادة تعيين النموذج
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      vehiclePlate: '',
      vehicleType: '',
      maintenanceType: '',
      specificMaintenanceType: '',
      lastMaintenanceHours: '',
      lastMaintenanceDate: '',
      cost: '',
      documents: null,
      notes: ''
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6" dir="rtl">
      <Card className="bg-gradient-to-l from-blue-600 to-blue-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Wrench className="w-8 h-8" />
            إدخال بيانات صيانة المركبات
          </CardTitle>
          <CardDescription className="text-blue-100">
            إضافة تفاصيل الصيانة وتتبع مواعيد الصيانة القادمة
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>تفاصيل صيانة المركبة</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* رقم السيارة */}
              <div className="space-y-2">
                <Label htmlFor="vehiclePlate">رقم السيارة *</Label>
                <Select value={formData.vehiclePlate} onValueChange={handleVehicleSelect}>
                  <SelectTrigger className={errors.vehiclePlate ? 'border-red-500' : ''}>
                    <SelectValue placeholder="اختر رقم السيارة" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.plate} value={vehicle.plate}>
                        {vehicle.plate} - {vehicle.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.vehiclePlate && (
                  <p className="text-sm text-red-600">{errors.vehiclePlate}</p>
                )}
              </div>

              {/* نوع السيارة */}
              <div className="space-y-2">
                <Label htmlFor="vehicleType">نوع السيارة</Label>
                <Input
                  id="vehicleType"
                  value={formData.vehicleType}
                  readOnly
                  className="bg-gray-50"
                  placeholder="يتم التعبئة تلقائياً"
                />
              </div>

              {/* نوع الصيانة */}
              <div className="space-y-2">
                <Label htmlFor="maintenanceType">نوع الصيانة *</Label>
                <Select
                  value={formData.maintenanceType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, maintenanceType: value }))}
                >
                  <SelectTrigger className={errors.maintenanceType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="اختر نوع الصيانة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="دورية">صيانة دورية</SelectItem>
                    <SelectItem value="أخرى">صيانة أخرى</SelectItem>
                  </SelectContent>
                </Select>
                {errors.maintenanceType && (
                  <p className="text-sm text-red-600">{errors.maintenanceType}</p>
                )}
              </div>

              {/* تفاصيل نوع الصيانة */}
              <div className="space-y-2">
                <Label htmlFor="specificMaintenanceType">تفاصيل نوع الصيانة *</Label>
                <Input
                  id="specificMaintenanceType"
                  value={formData.specificMaintenanceType}
                  onChange={(e) => setFormData(prev => ({ ...prev, specificMaintenanceType: e.target.value }))}
                  className={errors.specificMaintenanceType ? 'border-red-500' : ''}
                  placeholder="مثال: تغيير زيت، فحص فرامل، إصلاح محرك"
                />
                {errors.specificMaintenanceType && (
                  <p className="text-sm text-red-600">{errors.specificMaintenanceType}</p>
                )}
              </div>

              {/* عدد الساعات عند آخر صيانة دورية */}
              {formData.maintenanceType === 'دورية' && (
                <div className="space-y-2">
                  <Label htmlFor="lastMaintenanceHours">عدد الساعات عند آخر صيانة دورية *</Label>
                  <Input
                    id="lastMaintenanceHours"
                    type="number"
                    value={formData.lastMaintenanceHours}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastMaintenanceHours: e.target.value }))}
                    className={errors.lastMaintenanceHours ? 'border-red-500' : ''}
                    placeholder="1600"
                  />
                  {errors.lastMaintenanceHours && (
                    <p className="text-sm text-red-600">{errors.lastMaintenanceHours}</p>
                  )}
                </div>
              )}

              {/* تاريخ آخر صيانة */}
              {formData.maintenanceType === 'دورية' && (
                <div className="space-y-2">
                  <Label htmlFor="lastMaintenanceDate">تاريخ آخر صيانة *</Label>
                  <Input
                    id="lastMaintenanceDate"
                    type="date"
                    value={formData.lastMaintenanceDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastMaintenanceDate: e.target.value }))}
                    className={errors.lastMaintenanceDate ? 'border-red-500' : ''}
                  />
                  {errors.lastMaintenanceDate && (
                    <p className="text-sm text-red-600">{errors.lastMaintenanceDate}</p>
                  )}
                </div>
              )}

              {/* المصاريف */}
              <div className="space-y-2">
                <Label htmlFor="cost">المصاريف (جنيه) *</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={formData.cost}
                  onChange={(e) => setFormData(prev => ({ ...prev, cost: e.target.value }))}
                  className={errors.cost ? 'border-red-500' : ''}
                  placeholder="18294.95"
                />
                {errors.cost && (
                  <p className="text-sm text-red-600">{errors.cost}</p>
                )}
              </div>

              {/* رفع المستندات */}
              <div className="space-y-2">
                <Label htmlFor="documents">المستندات (اختياري)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="documents"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="flex-1"
                  />
                  <Upload className="w-5 h-5 text-gray-500" />
                </div>
                {formData.documents && (
                  <p className="text-sm text-green-600">تم رفع: {formData.documents.name}</p>
                )}
              </div>
            </div>

            {/* ملاحظات */}
            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات إضافية</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="أي ملاحظات إضافية حول الصيانة..."
                rows={3}
              />
            </div>

            {/* عرض موعد الصيانة القادمة */}
            {formData.maintenanceType === 'دورية' && formData.lastMaintenanceHours && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 font-medium">
                  <Calendar className="w-5 h-5 inline ml-2" />
                  {calculateNextMaintenanceDate()}
                </p>
              </div>
            )}

            {/* أزرار التحكم */}
            <div className="flex gap-4 pt-6">
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" />
                حفظ بيانات الصيانة
              </Button>
              
              <Button type="button" variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                إعادة تعيين
              </Button>

              {onBack && (
                <Button type="button" variant="ghost" onClick={onBack}>
                  العودة للقائمة
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleMaintenanceEntry;
