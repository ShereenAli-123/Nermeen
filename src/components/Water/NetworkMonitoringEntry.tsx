
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  Network,
  Upload,
  Save,
  RotateCcw,
  AlertTriangle,
  MapPin,
  Activity,
  Gauge,
  FileText
} from 'lucide-react';

interface NetworkMonitoringEntryProps {
  userRole: string;
}

interface MonitoringData {
  date: string;
  stationName: string;
  city: string;
  region: string;
  pressure: string;
  flowRate: string;
  waterQuality: string;
  networkStatus: string;
  issuesDetected: boolean;
  issueDescription: string;
  affectedAreas: string;
  maintenanceRequired: boolean;
  maintenanceNotes: string;
  attachments: File[];
}

const NetworkMonitoringEntry: React.FC<NetworkMonitoringEntryProps> = ({ userRole }) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<MonitoringData>({
    date: new Date().toISOString().split('T')[0],
    stationName: '',
    city: '',
    region: '',
    pressure: '',
    flowRate: '',
    waterQuality: 'جيدة',
    networkStatus: 'طبيعي',
    issuesDetected: false,
    issueDescription: '',
    affectedAreas: '',
    maintenanceRequired: false,
    maintenanceNotes: '',
    attachments: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stations = [
    'محطة المياه الرئيسية',
    'محطة المياه الشرقية',
    'محطة المياه الغربية',
    'محطة المياه الشمالية',
    'محطة المياه الجنوبية'
  ];

  const cities = [
    'المدينة الرئيسية',
    'المدينة الشرقية',
    'المدينة الغربية',
    'المدينة الشمالية',
    'المدينة الجنوبية'
  ];

  const regions = [
    'المنطقة الأولى',
    'المنطقة الثانية',
    'المنطقة الثالثة',
    'المنطقة الرابعة',
    'المنطقة الخامسة'
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) {
      newErrors.date = 'التاريخ مطلوب';
    }

    if (!formData.stationName) {
      newErrors.stationName = 'اسم المحطة مطلوب';
    }

    if (!formData.city) {
      newErrors.city = 'المدينة مطلوبة';
    }

    if (!formData.region) {
      newErrors.region = 'المنطقة مطلوبة';
    }

    if (!formData.pressure) {
      newErrors.pressure = 'الضغط مطلوب';
    } else if (isNaN(Number(formData.pressure)) || Number(formData.pressure) < 0) {
      newErrors.pressure = 'الضغط يجب أن يكون رقم موجب';
    }

    if (!formData.flowRate) {
      newErrors.flowRate = 'معدل التدفق مطلوب';
    } else if (isNaN(Number(formData.flowRate)) || Number(formData.flowRate) < 0) {
      newErrors.flowRate = 'معدل التدفق يجب أن يكون رقم موجب';
    }

    if (formData.issuesDetected && !formData.issueDescription.trim()) {
      newErrors.issueDescription = 'وصف المشكلة مطلوب عند اكتشاف مشاكل';
    }

    if (formData.maintenanceRequired && !formData.maintenanceNotes.trim()) {
      newErrors.maintenanceNotes = 'ملاحظات الصيانة مطلوبة عند الحاجة للصيانة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof MonitoringData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      return validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024; // 5MB limit
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "تنبيه",
        description: "بعض الملفات غير مدعومة. يُسمح بملفات PDF و JPG و PNG فقط (حد أقصى 5 ميجابايت)",
        variant: "destructive"
      });
    }

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى تعبئة جميع الحقول الإلزامية وتصحيح الأخطاء",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "نجح الحفظ",
        description: "تم حفظ البيانات بنجاح وإرسالها للمراجعة"
      });

      handleReset();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      stationName: '',
      city: '',
      region: '',
      pressure: '',
      flowRate: '',
      waterQuality: 'جيدة',
      networkStatus: 'طبيعي',
      issuesDetected: false,
      issueDescription: '',
      affectedAreas: '',
      maintenanceRequired: false,
      maintenanceNotes: '',
      attachments: []
    });
    setErrors({});
  };

  const canAccess = ['admin', 'department_head', 'employee'].includes(userRole);

  if (!canAccess) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">غير مصرح</h3>
          <p className="text-gray-600">ليس لديك صلاحية للوصول إلى هذه الصفحة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Network className="w-8 h-8 text-blue-600" />
            إدخال بيانات مراقبة الشبكة
          </h1>
          <p className="text-gray-600 mt-2">
            إدخال بيانات مراقبة أداء شبكة المياه واكتشاف الأعطال
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              المعلومات الأساسية
            </CardTitle>
            <CardDescription>
              معلومات المحطة والموقع والتاريخ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">التاريخ *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className={errors.date ? 'border-red-500' : ''}
                />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stationName">اسم المحطة *</Label>
                <Select
                  value={formData.stationName}
                  onValueChange={(value) => handleInputChange('stationName', value)}
                >
                  <SelectTrigger className={errors.stationName ? 'border-red-500' : ''}>
                    <SelectValue placeholder="اختر المحطة" />
                  </SelectTrigger>
                  <SelectContent>
                    {stations.map((station) => (
                      <SelectItem key={station} value={station}>
                        {station}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.stationName && (
                  <p className="text-sm text-red-500">{errors.stationName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">المدينة *</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => handleInputChange('city', value)}
                >
                  <SelectTrigger className={errors.city ? 'border-red-500' : ''}>
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">المنطقة *</Label>
                <Select
                  value={formData.region}
                  onValueChange={(value) => handleInputChange('region', value)}
                >
                  <SelectTrigger className={errors.region ? 'border-red-500' : ''}>
                    <SelectValue placeholder="اختر المنطقة" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.region && (
                  <p className="text-sm text-red-500">{errors.region}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="w-5 h-5" />
              بيانات الأداء
            </CardTitle>
            <CardDescription>
              قياسات الضغط والتدفق وجودة المياه
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pressure">الضغط (بار) *</Label>
                <Input
                  id="pressure"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="مثال: 2.5"
                  value={formData.pressure}
                  onChange={(e) => handleInputChange('pressure', e.target.value)}
                  className={errors.pressure ? 'border-red-500' : ''}
                />
                {errors.pressure && (
                  <p className="text-sm text-red-500">{errors.pressure}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="flowRate">معدل التدفق (م³/ساعة) *</Label>
                <Input
                  id="flowRate"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="مثال: 1500"
                  value={formData.flowRate}
                  onChange={(e) => handleInputChange('flowRate', e.target.value)}
                  className={errors.flowRate ? 'border-red-500' : ''}
                />
                {errors.flowRate && (
                  <p className="text-sm text-red-500">{errors.flowRate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="waterQuality">جودة المياه</Label>
                <Select
                  value={formData.waterQuality}
                  onValueChange={(value) => handleInputChange('waterQuality', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ممتازة">ممتازة</SelectItem>
                    <SelectItem value="جيدة">جيدة</SelectItem>
                    <SelectItem value="مقبولة">مقبولة</SelectItem>
                    <SelectItem value="ضعيفة">ضعيفة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="networkStatus">حالة الشبكة</Label>
                <Select
                  value={formData.networkStatus}
                  onValueChange={(value) => handleInputChange('networkStatus', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="طبيعي">طبيعي</SelectItem>
                    <SelectItem value="تحذير">تحذير</SelectItem>
                    <SelectItem value="خطر">خطر</SelectItem>
                    <SelectItem value="معطل">معطل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issues and Maintenance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              المشاكل والصيانة
            </CardTitle>
            <CardDescription>
              تسجيل المشاكل المكتشفة ومتطلبات الصيانة
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="issuesDetected"
                checked={formData.issuesDetected}
                onCheckedChange={(checked) => handleInputChange('issuesDetected', checked)}
              />
              <Label htmlFor="issuesDetected">تم اكتشاف مشاكل في الشبكة</Label>
            </div>

            {formData.issuesDetected && (
              <div className="space-y-4 bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="space-y-2">
                  <Label htmlFor="issueDescription">وصف المشكلة *</Label>
                  <Textarea
                    id="issueDescription"
                    placeholder="اكتب وصفاً مفصلاً للمشكلة المكتشفة..."
                    value={formData.issueDescription}
                    onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                    className={errors.issueDescription ? 'border-red-500' : ''}
                    rows={3}
                  />
                  {errors.issueDescription && (
                    <p className="text-sm text-red-500">{errors.issueDescription}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="affectedAreas">المناطق المتأثرة</Label>
                  <Input
                    id="affectedAreas"
                    placeholder="مثال: المنطقة الأولى، الحي الثاني"
                    value={formData.affectedAreas}
                    onChange={(e) => handleInputChange('affectedAreas', e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="maintenanceRequired"
                checked={formData.maintenanceRequired}
                onCheckedChange={(checked) => handleInputChange('maintenanceRequired', checked)}
              />
              <Label htmlFor="maintenanceRequired">مطلوب صيانة</Label>
            </div>

            {formData.maintenanceRequired && (
              <div className="space-y-2 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <Label htmlFor="maintenanceNotes">ملاحظات الصيانة *</Label>
                <Textarea
                  id="maintenanceNotes"
                  placeholder="اكتب تفاصيل الصيانة المطلوبة..."
                  value={formData.maintenanceNotes}
                  onChange={(e) => handleInputChange('maintenanceNotes', e.target.value)}
                  className={errors.maintenanceNotes ? 'border-red-500' : ''}
                  rows={3}
                />
                {errors.maintenanceNotes && (
                  <p className="text-sm text-red-500">{errors.maintenanceNotes}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Attachments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              المرفقات
            </CardTitle>
            <CardDescription>
              إرفاق مستندات أو صور (PDF, JPG, PNG - حد أقصى 5 ميجابايت)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="attachments">اختر الملفات</Label>
              <Input
                id="attachments"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="file:ml-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                <Label>الملفات المرفقة:</Label>
                <div className="space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        حذف
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            إلغاء وإعادة تعيين
          </Button>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'جاري الحفظ...' : 'حفظ البيانات'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NetworkMonitoringEntry;
