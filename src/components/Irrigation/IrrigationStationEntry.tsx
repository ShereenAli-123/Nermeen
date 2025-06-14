
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { 
  Save, 
  X, 
  Upload, 
  MapPin, 
  Settings, 
  Droplets,
  FileText,
  Calendar,
  Building,
  Gauge
} from 'lucide-react';

interface IrrigationStationFormData {
  // Basic Information
  governorate: string;
  city: string;
  stationName: string;
  stationType: string;
  coordinates: string;
  location: string;
  
  // Capacity Information
  designCapacity: number;
  currentCapacity: number;
  targetYearCapacity: number;
  operatingHours: number;
  serviceRange: string;
  
  // Company Information
  executingCompany: string;
  operatingCompany: string;
  assignmentOrderNumber: string;
  currentOperator: string;
  supervisingConsultant: string;
  supervisionAuthority: string;
  
  // Dates
  finalDeliveryDate: string;
  preliminaryDeliveryDate: string;
  siteHandoverDate: string;
  
  // Technical Information
  powerSourcesCount: number;
  actualAverageFlow: string;
  dischargeDiameter: number;
  pipelineLength: number;
  pipelineMaterial: string;
  
  // Water Distribution System
  distributionNetworkLength: number;
  numberOfBranches: number;
  mainPipelineDiameter: number;
  secondaryPipelineDiameter: number;
  irrigationMethod: string;
  cropTypes: string;
  
  // Station Equipment
  pumpCount: number;
  pumpCapacity: number;
  pumpBrand: string;
  pumpType: string;
  motorPower: number;
  
  // Control Systems
  automationLevel: string;
  monitoringSystem: string;
  remoteControlCapability: string;
  
  // Additional Information
  stationPermanency: string;
  flowMeterStatus: string;
  notes: string;
  attachments: File[];
}

interface IrrigationStationEntryProps {
  userRole?: string;
}

const IrrigationStationEntry: React.FC<IrrigationStationEntryProps> = ({ 
  userRole = 'admin' 
}) => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<IrrigationStationFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  // Mock data for dropdowns
  const governorates = ['الجيزة', 'القاهرة', 'الإسكندرية', 'المنوفية', 'البحيرة', 'الفيوم', 'بني سويف'];
  const cities = ['حدائق أكتوبر', 'الشيخ زايد', 'القاهرة الجديدة', 'مدينة نصر', 'المعادي', 'الفيوم', 'بني سويف'];
  const stationTypes = ['محطة ري بالرش', 'محطة ري بالتنقيط', 'محطة ري بالغمر', 'محطة ري مختلطة'];
  const pipelineMaterials = ['GRP', 'HDPE', 'DI', 'STEEL', 'PVC', 'CONCRETE'];
  const pumpTypes = ['طرد مركزي', 'أكسيال', 'مختلط', 'غاطسة', 'توربينية'];
  const pumpBrands = ['KSB', 'Grundfos', 'Flygt', 'Sulzer', 'Wilo', 'Pentair'];
  const irrigationMethods = ['ري بالرش', 'ري بالتنقيط', 'ري بالغمر', 'ري محوري', 'ري بالفقاعات'];
  const automationLevels = ['يدوي بالكامل', 'شبه آلي', 'آلي بالكامل', 'ذكي'];
  const cropTypes = ['قمح', 'ذرة', 'أرز', 'قصب السكر', 'بنجر السكر', 'محاصيل علفية', 'خضروات', 'فاكهة'];

  const onSubmit = async (data: IrrigationStationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Validation for required fields
      if (!data.stationName || !data.designCapacity || !data.targetYearCapacity) {
        toast({
          title: "خطأ في البيانات",
          description: "يرجى تعبئة جميع الحقول الإلزامية",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Check for duplicate station name (mock validation)
      const existingStations = ['محطة ري النهضة', 'محطة ري السلام', 'محطة ري التوحيد'];
      if (existingStations.includes(data.stationName)) {
        toast({
          title: "خطأ في الاسم",
          description: "اسم المحطة مستخدم من قبل",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Validation for logical values
      if (data.currentCapacity && data.designCapacity && data.currentCapacity > data.designCapacity) {
        toast({
          title: "خطأ في البيانات",
          description: "الطاقة الحالية لا يمكن أن تكون أكبر من الطاقة التصميمية",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Irrigation station data submitted:', data);
      console.log('Attachments:', attachments);
      
      toast({
        title: "تم حفظ البيانات بنجاح",
        description: "تم حفظ بيانات محطة الري بنجاح",
        variant: "default",
      });
      
      // Reset form
      reset();
      setAttachments([]);
      
    } catch (error) {
      toast({
        title: "خطأ في النظام",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    setAttachments([]);
    toast({
      title: "تم الإلغاء",
      description: "تم إلغاء العملية وإفراغ النموذج",
      variant: "default",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Card className="bg-gradient-to-l from-blue-600 to-blue-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Droplets className="w-8 h-8" />
            إدخال بيانات محطة ري جديدة
          </CardTitle>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              المعلومات الأساسية
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="governorate">المحافظة *</Label>
              <Select onValueChange={(value) => setValue('governorate', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المحافظة" />
                </SelectTrigger>
                <SelectContent>
                  {governorates.map(gov => (
                    <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">المدينة *</Label>
              <Select onValueChange={(value) => setValue('city', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stationName">اسم محطة الري *</Label>
              <Input 
                {...register('stationName', { required: 'اسم المحطة مطلوب' })}
                placeholder="محطة ري النهضة"
              />
              {errors.stationName && (
                <p className="text-red-500 text-sm">{errors.stationName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stationType">نوع محطة الري</Label>
              <Select onValueChange={(value) => setValue('stationType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع المحطة" />
                </SelectTrigger>
                <SelectContent>
                  {stationTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coordinates">إحداثيات المحطة *</Label>
              <Input 
                {...register('coordinates', { required: 'الإحداثيات مطلوبة' })}
                placeholder="E:30.1234, N:31.5678"
              />
              {errors.coordinates && (
                <p className="text-red-500 text-sm">{errors.coordinates.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">رابط الموقع</Label>
              <Input 
                type="url"
                {...register('location')}
                placeholder="https://maps.google.com/..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Capacity Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="w-5 h-5" />
              معلومات الطاقة والتصريف
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="designCapacity">الطاقة التصميمية (م³/يوم) *</Label>
              <Input 
                type="number"
                {...register('designCapacity', { required: 'الطاقة التصميمية مطلوبة' })}
                placeholder="5000"
              />
              {errors.designCapacity && (
                <p className="text-red-500 text-sm">{errors.designCapacity.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentCapacity">الطاقة الحالية (م³/يوم) *</Label>
              <Input 
                type="number"
                {...register('currentCapacity', { required: 'الطاقة الحالية مطلوبة' })}
                placeholder="4500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetYearCapacity">طاقة سنة الهدف (م³/يوم) *</Label>
              <Input 
                type="number"
                {...register('targetYearCapacity', { required: 'طاقة سنة الهدف مطلوبة' })}
                placeholder="7000"
              />
              {errors.targetYearCapacity && (
                <p className="text-red-500 text-sm">{errors.targetYearCapacity.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="operatingHours">ساعات التشغيل اليومية</Label>
              <Input 
                type="number"
                step="0.5"
                {...register('operatingHours')}
                placeholder="8"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualAverageFlow">متوسط التصرف الفعلي (لتر/ثانية)</Label>
              <Input 
                {...register('actualAverageFlow')}
                placeholder="58"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceRange">نطاق الخدمة *</Label>
              <Input 
                {...register('serviceRange', { required: 'نطاق الخدمة مطلوب' })}
                placeholder="منطقة زراعية شرق المدينة"
              />
            </div>
          </CardContent>
        </Card>

        {/* Company Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              معلومات الشركات والجهات
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="executingCompany">الشركة المنفذة *</Label>
              <Input 
                {...register('executingCompany', { required: 'الشركة المنفذة مطلوبة' })}
                placeholder="شركة الري الحديث"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="operatingCompany">الشركة المشغلة *</Label>
              <Input 
                {...register('operatingCompany', { required: 'الشركة المشغلة مطلوبة' })}
                placeholder="شركة إدارة الري"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignmentOrderNumber">رقم وتاريخ أمر الإسناد *</Label>
              <Input 
                {...register('assignmentOrderNumber', { required: 'رقم أمر الإسناد مطلوب' })}
                placeholder="2024/567 بتاريخ 15/11/2024"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentOperator">المشغل الحالي</Label>
              <Input 
                {...register('currentOperator')}
                placeholder="قسم الري بالمحافظة"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supervisingConsultant">الاستشاري المشرف</Label>
              <Input 
                {...register('supervisingConsultant')}
                placeholder="مكتب الاستشارات الزراعية"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supervisionAuthority">جهة الإشراف</Label>
              <Input 
                {...register('supervisionAuthority')}
                placeholder="وزارة الموارد المائية"
              />
            </div>
          </CardContent>
        </Card>

        {/* Dates Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              التواريخ المهمة
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="finalDeliveryDate">تاريخ الاستلام النهائي</Label>
              <Input 
                type="date"
                {...register('finalDeliveryDate')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preliminaryDeliveryDate">تاريخ الاستلام الابتدائي</Label>
              <Input 
                type="date"
                {...register('preliminaryDeliveryDate')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteHandoverDate">تاريخ استلام الموقع</Label>
              <Input 
                type="date"
                {...register('siteHandoverDate')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Technical Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              المعلومات الفنية
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="powerSourcesCount">عدد مصادر التغذية بالكهرباء</Label>
              <Input 
                type="number"
                {...register('powerSourcesCount')}
                placeholder="2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dischargeDiameter">قطر خطوط الري الرئيسية (مم)</Label>
              <Input 
                type="number"
                {...register('dischargeDiameter')}
                placeholder="400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pipelineLength">طول خط الري الرئيسي (م)</Label>
              <Input 
                type="number"
                {...register('pipelineLength')}
                placeholder="2500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pipelineMaterial">مادة صنع خطوط الري</Label>
              <Select onValueChange={(value) => setValue('pipelineMaterial', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المادة" />
                </SelectTrigger>
                <SelectContent>
                  {pipelineMaterials.map(material => (
                    <SelectItem key={material} value={material}>{material}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="irrigationMethod">طريقة الري</Label>
              <Select onValueChange={(value) => setValue('irrigationMethod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر طريقة الري" />
                </SelectTrigger>
                <SelectContent>
                  {irrigationMethods.map(method => (
                    <SelectItem key={method} value={method}>{method}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cropTypes">أنواع المحاصيل</Label>
              <Input 
                {...register('cropTypes')}
                placeholder="قمح، ذرة، خضروات"
              />
            </div>
          </CardContent>
        </Card>

        {/* Water Distribution System Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              نظام التوزيع المائي
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="distributionNetworkLength">طول شبكة التوزيع (كم)</Label>
              <Input 
                type="number"
                step="0.1"
                {...register('distributionNetworkLength')}
                placeholder="15.5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfBranches">عدد الفروع الرئيسية</Label>
              <Input 
                type="number"
                {...register('numberOfBranches')}
                placeholder="6"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainPipelineDiameter">قطر الخط الرئيسي (مم)</Label>
              <Input 
                type="number"
                {...register('mainPipelineDiameter')}
                placeholder="600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryPipelineDiameter">قطر الخطوط الفرعية (مم)</Label>
              <Input 
                type="number"
                {...register('secondaryPipelineDiameter')}
                placeholder="300"
              />
            </div>
          </CardContent>
        </Card>

        {/* Station Equipment Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              معدات المحطة
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pumpCount">عدد المضخات</Label>
              <Input 
                type="number"
                {...register('pumpCount')}
                placeholder="3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pumpCapacity">سعة المضخة (لتر/ثانية)</Label>
              <Input 
                type="number"
                {...register('pumpCapacity')}
                placeholder="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pumpBrand">ماركة المضخات</Label>
              <Select onValueChange={(value) => setValue('pumpBrand', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الماركة" />
                </SelectTrigger>
                <SelectContent>
                  {pumpBrands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pumpType">نوع المضخات</Label>
              <Select onValueChange={(value) => setValue('pumpType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  {pumpTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motorPower">قدرة المحرك (كيلو وات)</Label>
              <Input 
                type="number"
                {...register('motorPower')}
                placeholder="55"
              />
            </div>
          </CardContent>
        </Card>

        {/* Control Systems Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="w-5 h-5" />
              أنظمة التحكم والمراقبة
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="automationLevel">مستوى الأتمتة</Label>
              <Select onValueChange={(value) => setValue('automationLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المستوى" />
                </SelectTrigger>
                <SelectContent>
                  {automationLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monitoringSystem">نظام المراقبة</Label>
              <Input 
                {...register('monitoringSystem')}
                placeholder="SCADA"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remoteControlCapability">إمكانية التحكم عن بعد</Label>
              <Select onValueChange={(value) => setValue('remoteControlCapability', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="متوفر">متوفر</SelectItem>
                  <SelectItem value="غير متوفر">غير متوفر</SelectItem>
                  <SelectItem value="قيد التطوير">قيد التطوير</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              معلومات إضافية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stationPermanency">طبيعة المحطة</Label>
                <Select onValueChange={(value) => setValue('stationPermanency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="دائمة">دائمة</SelectItem>
                    <SelectItem value="موسمية">موسمية</SelectItem>
                    <SelectItem value="مؤقتة">مؤقتة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="flowMeterStatus">حالة أجهزة قياس التصريف</Label>
                <Select onValueChange={(value) => setValue('flowMeterStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="تم التركيب">تم التركيب</SelectItem>
                    <SelectItem value="قيد التركيب">قيد التركيب</SelectItem>
                    <SelectItem value="لم يتم التركيب">لم يتم التركيب</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea 
                {...register('notes')}
                placeholder="أي ملاحظات فنية أو تشغيلية مهمة..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachments">إرفاق ملفات (PDF, Word, Excel)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-gray-600">اضغط لاختيار الملفات أو اسحبها هنا</span>
                </label>
              </div>
              
              {attachments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">الملفات المرفقة:</h4>
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <Card>
          <CardContent className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'جاري الحفظ...' : 'حفظ البيانات'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default IrrigationStationEntry;
