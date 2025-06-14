import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const treatmentPlantSchema = z.object({
  governorate: z.string().min(1, "المحافظة مطلوبة"),
  city: z.string().min(1, "المدينة مطلوبة"),
  name: z.string().min(3, "اسم المحطة يجب أن يكون 3 أحرف على الأقل").max(50, "اسم المحطة لا يجب أن يتجاوز 50 حرف"),
  treatmentType: z.string().min(1, "نوع المعالجة مطلوب"),
  designCapacityPrimary: z.number().min(0, "الطاقة التصميمية يجب أن تكون رقم موجب"),
  designCapacitySecondary: z.number().optional(),
  coordinates: z.string().min(1, "الإحداثيات مطلوبة"),
  forestArea: z.number().optional(),
  forestLocation: z.string().optional(),
  implementationStatus: z.string().optional(),
  treatmentTechnology: z.string().min(1, "تكنولوجيا المعالجة مطلوبة"),
  actualProduction: z.number().optional(),
  cityDischarge: z.number().optional(),
  cost: z.number().optional(),
  implementingCompany: z.string().min(1, "الشركة المنفذة مطلوبة"),
  maintenanceCompany: z.string().min(1, "شركة الصيانة مطلوبة"),
  operationYear: z.number().min(1900, "سنة التشغيل غير صحيحة"),
  stationStatus: z.string().optional(),
  dischargeNature: z.string().optional(),
  location: z.string().url("رابط الموقع غير صحيح").min(1, "رابط الموقع مطلوب"),
  serviceRange: z.string().min(1, "نطاق الخدمة مطلوب"),
  landArea: z.number().min(0, "مساحة الأرض يجب أن تكون رقم موجب"),
  expansionPlan: z.string().optional(),
  photographyStatus: z.string().optional(),
  laboratory: z.string().optional(),
  sludgeQuantity: z.number().optional(),
  sludgeTreatment: z.string().optional(),
  implementationStartYear: z.number().min(1900, "سنة بدء التنفيذ غير صحيحة"),
});

type TreatmentPlantFormData = z.infer<typeof treatmentPlantSchema>;

interface TreatmentPlantFormProps {
  onSubmit?: (data: TreatmentPlantFormData) => void;
  userRole?: string;
}

const TreatmentPlantForm: React.FC<TreatmentPlantFormProps> = ({ onSubmit, userRole = 'admin' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const { toast } = useToast();

  const form = useForm<TreatmentPlantFormData>({
    resolver: zodResolver(treatmentPlantSchema),
    defaultValues: {
      governorate: '',
      city: '',
      name: '',
      treatmentType: '',
      designCapacityPrimary: 0,
      coordinates: '',
      treatmentTechnology: '',
      implementingCompany: '',
      maintenanceCompany: '',
      operationYear: new Date().getFullYear(),
      location: '',
      serviceRange: '',
      landArea: 0,
      implementationStartYear: new Date().getFullYear(),
    },
  });

  const handleSubmit = async (data: TreatmentPlantFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check for duplicate name (mock validation)
      if (data.name === "محطة مكررة") {
        toast({
          title: "خطأ",
          description: "اسم المحطة مسجل مسبقًا",
          variant: "destructive",
        });
        return;
      }
      
      console.log('Form data:', data);
      console.log('Attachments:', attachments);
      
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ بيانات محطة المعالجة بنجاح",
      });
      
      if (onSubmit) {
        onSubmit(data);
      }
      
      // Reset form
      form.reset();
      setAttachments([]);
      
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => {
        const validTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        return validTypes.includes(file.type);
      });
      
      setAttachments(prev => [...prev, ...validFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">إدخال بيانات محطة معالجة جديدة</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              
              {/* البيانات الأساسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="governorate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المحافظة *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر المحافظة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="القاهرة">القاهرة</SelectItem>
                          <SelectItem value="الجيزة">الجيزة</SelectItem>
                          <SelectItem value="الإسكندرية">الإسكندرية</SelectItem>
                          <SelectItem value="الدقهلية">الدقهلية</SelectItem>
                          <SelectItem value="الشرقية">الشرقية</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المدينة *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر المدينة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="حدائق أكتوبر">حدائق أكتوبر</SelectItem>
                          <SelectItem value="6 أكتوبر">6 أكتوبر</SelectItem>
                          <SelectItem value="الشيخ زايد">الشيخ زايد</SelectItem>
                          <SelectItem value="المنصورة">المنصورة</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المحطة *</FormLabel>
                      <FormControl>
                        <Input placeholder="محطة معالجة غرب..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* نوع المعالجة والطاقة */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="treatmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نوع المعالجة *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع المعالجة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="اولي">أولي</SelectItem>
                          <SelectItem value="ثنائي">ثنائي</SelectItem>
                          <SelectItem value="ثلاثي">ثلاثي</SelectItem>
                          <SelectItem value="ثنائي و ثلاثي">ثنائي وثلاثي</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="designCapacityPrimary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الطاقة التصميمية - ثنائي (ألف م³/يوم) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="designCapacitySecondary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الطاقة التصميمية - ثلاثي (ألف م³/يوم)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* الموقع والإحداثيات */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="coordinates"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>إحداثيات المحطة *</FormLabel>
                      <FormControl>
                        <Input placeholder="30.5 / 29.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الموقع (رابط) *</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* باقي الحقول */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="treatmentTechnology"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تكنولوجيا المعالجة *</FormLabel>
                      <FormControl>
                        <Input placeholder="SBR" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="implementingCompany"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الشركة المنفذة *</FormLabel>
                      <FormControl>
                        <Input placeholder="المقاولون العرب" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maintenanceCompany"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>شركة الصيانة *</FormLabel>
                      <FormControl>
                        <Input placeholder="شركة مياه الجيزة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* السنوات والأرقام */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="operationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>سنة التشغيل *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="2022"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="implementationStartYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>سنة البدء في التنفيذ *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="2020"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="landArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>مساحة الأرض (فدان) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="50"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serviceRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نطاق الخدمة *</FormLabel>
                      <FormControl>
                        <Input placeholder="دهشور" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* الحقول الاختيارية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="actualProduction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الكمية المنتجة الفعلية (ألف م³/يوم)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="60"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تكلفة المحطة (مليون جنيه)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="350"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* رفع الملفات */}
              <div className="space-y-4">
                <Label>رفع الملفات (PDF, Word, Excel)</Label>
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileInput}
                    className="w-full"
                  >
                    اختر الملفات
                  </Button>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  
                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">الملفات المرفقة:</p>
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttachment(index)}
                          >
                            حذف
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* أزرار الحفظ والإلغاء */}
              <div className="flex gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setAttachments([]);
                  }}
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'جاري الحفظ...' : 'حفظ البيانات'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreatmentPlantForm;
