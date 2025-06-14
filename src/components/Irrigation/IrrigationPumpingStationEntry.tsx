
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
  Zap, 
  Droplets,
  FileText,
  Calendar,
  Building
} from 'lucide-react';

interface IrrigationPumpingStationFormData {
  // Basic Information
  governorate: string;
  city: string;
  stationName: string;
  stationType: string;
  designCapacity: number;
  currentCapacity: number;
  targetYearCapacity: number;
  coordinates: string;
  
  // Company Information
  executingCompany: string;
  operatingCompany: string;
  assignmentOrderNumber: string;
  finalDeliveryDate: string;
  currentOperator: string;
  siteHandoverDate: string;
  location: string;
  serviceRange: string;
  preliminaryDeliveryDate: string;
  
  // Technical Information
  powerSourcesCount: number;
  actualAverageFlow: string;
  supervisingConsultant: string;
  supervisionAuthority: string;
  
  // Pipeline Information
  dischargeDiameter: number;
  pipelineLength: number;
  pipelineMaterial: string;
  
  // Generator Information
  generatorCount: number;
  generatorCapacity: number;
  synchronizationExists: string;
  generatorBrand: string;
  
  // Pump Information
  availablePumpSpaces: number;
  workingPumps: number;
  standbyPumps: number;
  installedPumps: number;
  installedWorkingPumps: number;
  installedStandbyPumps: number;
  operatingHours: number;
  pumpDischarge: number;
  pumpBrand: string;
  pumpType: string;
  pumpPressure: number;
  pumpElectricalPower: number;
  stationPermanency: string;
  flowMeterStatus: string;
  
  // Additional Information
  notes: string;
  attachments: File[];
}

interface IrrigationPumpingStationEntryProps {
  userRole?: string;
}

const IrrigationPumpingStationEntry: React.FC<IrrigationPumpingStationEntryProps> = ({ 
  userRole = 'admin' 
}) => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<IrrigationPumpingStationFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  // Mock data for dropdowns
  const governorates = ['الجيزة', 'القاهرة', 'الإسكندرية', 'المنوفية', 'البحيرة'];
  const cities = ['حدائق أكتوبر', 'الشيخ زايد', 'القاهرة الجديدة', 'مدينة نصر', 'المعادي'];
  const stationTypes = ['محطة رفع ري', 'محطة رفع مياه', 'محطة معالجة'];
  const pipelineMaterials = ['GRP', 'HDPE', 'DI', 'STEEL', 'PVC'];
  const pumpTypes = ['طرد مركزي', 'أكسيال', 'مختلط', 'غاطسة'];
  const pumpBrands = ['KSB', 'Grundfos', 'Flygt', 'Sulzer', 'Wilo'];
  const generatorBrands = ['PERKINS', 'CATERPILLAR', 'CUMMINS', 'VOLVO', 'MAN'];

  const onSubmit = async (data: IrrigationPumpingStationFormData) => {
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
      const existingStations = ['محطة أكتوبر 1', 'محطة الشيخ زايد', 'محطة المعادي'];
      if (existingStations.includes(data.stationName)) {
        toast({
          title: "خطأ في الاسم",
          description: "اسم المحطة مستخدم من قبل",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Station data submitted:', data);
      console.log('Attachments:', attachments);
      
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ البيانات بنجاح",
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
      <Card className="bg-gradient-to-l from-green-600 to-green-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Droplets className="w-8 h-8" />
            إدخال بيانات محطة رفع ري جديدة
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
              <Label htmlFor="stationName">اسم المحطة *</Label>
              <Input 
                {...register('stationName', { required: 'اسم المحطة مطلوب' })}
                placeholder="محطة أكتوبر 5"
              />
              {errors.stationName && (
                <p className="text-red-500 text-sm">{errors.stationName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stationType">نوع المحطة</Label>
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
              <Label htmlFor="designCapacity">الطاقة التصميمية (م³/يوم) *</Label>
              <Input 
                type="number"
                {...register('designCapacity', { required: 'الطاقة التصميمية مطلوبة' })}
                placeholder="4000"
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
                placeholder="3500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetYearCapacity">طاقة سنة الهدف (م³/يوم) *</Label>
              <Input 
                type="number"
                {...register('targetYearCapacity', { required: 'طاقة سنة الهدف مطلوبة' })}
                placeholder="6000"
              />
              {errors.targetYearCapacity && (
                <p className="text-red-500 text-sm">{errors.targetYearCapacity.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="coordinates">إحداثيات المحطة *</Label>
              <Input 
                {...register('coordinates', { required: 'الإحداثيات مطلوبة' })}
                placeholder="E1:23445,N1:3556"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">الموقع (URL)</Label>
              <Input 
                type="url"
                {...register('location')}
                placeholder="https://maps.google.com/..."
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
                placeholder="المقاولون العرب"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="operatingCompany">الشركة المشغلة *</Label>
              <Input 
                {...register('operatingCompany', { required: 'الشركة المشغلة مطلوبة' })}
                placeholder="شركة مياه الجيزة"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignmentOrderNumber">رقم وتاريخ أمر الإسناد *</Label>
              <Input 
                {...register('assignmentOrderNumber', { required: 'رقم أمر الإسناد مطلوب' })}
                placeholder="1254 بتاريخ 10/10/2024"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supervisingConsultant">الاستشاري المشرف *</Label>
              <Input 
                {...register('supervisingConsultant', { required: 'الاستشاري المشرف مطلوب' })}
                placeholder="ECG"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supervisionAuthority">جهة الإشراف *</Label>
              <Input 
                {...register('supervisionAuthority', { required: 'جهة الإشراف مطلوبة' })}
                placeholder="الجهاز التنفيذي للمياه"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceRange">نطاق الخدمة *</Label>
              <Input 
                {...register('serviceRange', { required: 'نطاق الخدمة مطلوب' })}
                placeholder="منطقة جنوب حدائق أكتوبر"
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
              <Label htmlFor="finalDeliveryDate">تاريخ الاستلام النهائي *</Label>
              <Input 
                type="date"
                {...register('finalDeliveryDate', { required: 'تاريخ الاستلام النهائي مطلوب' })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preliminaryDeliveryDate">تاريخ الاستلام الابتدائي *</Label>
              <Input 
                type="date"
                {...register('preliminaryDeliveryDate', { required: 'تاريخ الاستلام الابتدائي مطلوب' })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteHandoverDate">تاريخ استلام الموقع *</Label>
              <Input 
                type="date"
                {...register('siteHandoverDate', { required: 'تاريخ استلام الموقع مطلوب' })}
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
              <Label htmlFor="powerSourcesCount">عدد مصادر التغذية بالكهرباء *</Label>
              <Input 
                type="number"
                {...register('powerSourcesCount', { required: 'عدد مصادر التغذية مطلوب' })}
                placeholder="4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualAverageFlow">متوسط التصرف الفعلي *</Label>
              <Input 
                {...register('actualAverageFlow', { required: 'متوسط التصرف الفعلي مطلوب' })}
                placeholder="34566"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dischargeDiameter">قطر خطوط الري (مم) *</Label>
              <Input 
                type="number"
                {...register('dischargeDiameter', { required: 'قطر خطوط الري مطلوب' })}
                placeholder="600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pipelineLength">طول خط الري (م) *</Label>
              <Input 
                type="number"
                {...register('pipelineLength', { required: 'طول خط الري مطلوب' })}
                placeholder="345"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pipelineMaterial">مادة صنع خط الري *</Label>
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
              <Label htmlFor="operatingHours">عدد ساعات التشغيل</Label>
              <Input 
                type="number"
                step="0.5"
                {...register('operatingHours')}
                placeholder="7.5"
              />
            </div>
          </CardContent>
        </Card>

        {/* Generator Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              بيانات المولدات
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="generatorCount">عدد المولدات *</Label>
              <Input 
                type="number"
                {...register('generatorCount', { required: 'عدد المولدات مطلوب' })}
                placeholder="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="generatorCapacity">قدرة المولد (KVA) *</Label>
              <Input 
                type="number"
                {...register('generatorCapacity', { required: 'قدرة المولد مطلوبة' })}
                placeholder="750"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="synchronizationExists">وجود تزامن *</Label>
              <Select onValueChange={(value) => setValue('synchronizationExists', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="نعم">نعم</SelectItem>
                  <SelectItem value="لا">لا</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="generatorBrand">ماركة المولد *</Label>
              <Select onValueChange={(value) => setValue('generatorBrand', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الماركة" />
                </SelectTrigger>
                <SelectContent>
                  {generatorBrands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Pump Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              بيانات الطلمبات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="availablePumpSpaces">عدد الأماكن المتاحة</Label>
                <Input 
                  type="number"
                  {...register('availablePumpSpaces')}
                  placeholder="4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="installedPumps">عدد الطلمبات المركبة</Label>
                <Input 
                  type="number"
                  {...register('installedPumps')}
                  placeholder="3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workingPumps">العاملة</Label>
                <Input 
                  type="number"
                  {...register('workingPumps')}
                  placeholder="2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="standbyPumps">الاحتياطي</Label>
                <Input 
                  type="number"
                  {...register('standbyPumps')}
                  placeholder="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pumpDischarge">تصريف الطلمبة (لتر/ثانية)</Label>
                <Input 
                  type="number"
                  {...register('pumpDischarge')}
                  placeholder="120"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pumpPressure">ضغط الطلمبة (متر)</Label>
                <Input 
                  type="number"
                  {...register('pumpPressure')}
                  placeholder="35"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pumpElectricalPower">القدرة الكهربية (كيلو وات)</Label>
                <Input 
                  type="number"
                  {...register('pumpElectricalPower')}
                  placeholder="75"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pumpBrand">ماركة الطلمبة</Label>
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
                <Label htmlFor="pumpType">نوع الطلمبة</Label>
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
                <Label htmlFor="stationPermanency">المحطة دائمة / حل مؤقت</Label>
                <Select onValueChange={(value) => setValue('stationPermanency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="دائمة">دائمة</SelectItem>
                    <SelectItem value="مؤقتة">مؤقتة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="flowMeterStatus">موقف تركيب أجهزة قياس التصريف</Label>
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
                placeholder="الطلمبة تحتاج صيانة موسمية"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachments">إرفاق ملفات (PDF, Word, Excel)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
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
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
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

export default IrrigationPumpingStationEntry;
