
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

const pumpingStationSchema = z.object({
  governorate: z.string().min(1, "المحافظة مطلوبة"),
  city: z.string().min(1, "المدينة مطلوبة"),
  name: z.string().min(1, "اسم المحطة مطلوب"),
  stationType: z.string().min(1, "نوع المحطة مطلوب"),
  currentCapacity: z.number().min(0, "الطاقة الحالية يجب أن تكون رقم موجب"),
  targetCapacity: z.number().min(0, "طاقة سنة الهدف يجب أن تكون رقم موجب"),
  coordinates: z.string().min(1, "الإحداثيات مطلوبة"),
  implementingCompany: z.string().min(1, "الشركة المنفذة مطلوبة"),
  operatingCompany: z.string().min(1, "الشركة المشغلة مطلوبة"),
  assignmentOrder: z.string().min(1, "رقم وتاريخ أمر الإسناد مطلوب"),
  finalReceiptDate: z.string().min(1, "تاريخ الاستلام النهائي مطلوب"),
  currentStatus: z.string().min(1, "الحالة الحالية مطلوبة"),
  siteReceiptDate: z.string().min(1, "تاريخ استلام الموقع مطلوب"),
  location: z.string().url("رابط الموقع غير صحيح").min(1, "رابط الموقع مطلوب"),
  serviceRange: z.string().min(1, "نطاق الخدمة مطلوب"),
  preliminaryReceiptDate: z.string().min(1, "تاريخ الاستلام الابتدائي مطلوب"),
  dischargePoint: z.string().min(1, "نقطة المصب مطلوبة"),
  powerSources: z.number().min(1, "عدد مصادر التغذية مطلوب"),
  actualDischarge: z.string().min(1, "متوسط التصرف الفعلي مطلوب"),
  supervisingConsultant: z.string().min(1, "الاستشاري المشرف مطلوب"),
  supervisionAuthority: z.string().min(1, "جهة الإشراف مطلوبة"),
  
  // خطوط الطرد
  dischargeLines: z.number().min(1, "عدد خطوط الطرد مطلوب"),
  dischargeDiameter: z.number().min(1, "قطر خطوط الطرد مطلوب"),
  dischargeLength: z.number().min(1, "طول خط الطرد مطلوب"),
  pipelineMaterial: z.string().min(1, "مادة صنع خط الطرد مطلوبة"),
  
  // بيانات المولدات
  generatorCount: z.number().min(1, "عدد المولدات مطلوب"),
  generatorCapacity: z.number().min(1, "قدرة المولد مطلوبة"),
  synchronizationExists: z.string().min(1, "وجود تزامن مطلوب"),
  generatorBrand: z.string().min(1, "ماركة المولد مطلوبة"),
  
  // أعداد الطلمبات
  availableSpaces: z.number().optional(),
  workingAvailable: z.number().optional(),
  standbyAvailable: z.number().optional(),
  installedPumps: z.number().optional(),
  workingInstalled: z.number().optional(),
  standbyInstalled: z.number().optional(),
  operatingHours: z.number().optional(),
  
  // مواصفات الطلمبات
  pumpDischarge: z.number().optional(),
  pumpBrand: z.string().optional(),
  pumpType: z.string().optional(),
  pumpPressure: z.number().optional(),
  pumpPower: z.number().optional(),
  
  // معلومات إضافية
  stationPermanency: z.string().optional(),
  flowMeterStatus: z.string().optional(),
  notes: z.string().optional(),
});

type PumpingStationFormData = z.infer<typeof pumpingStationSchema>;

interface PumpingStationFormProps {
  onSubmit?: (data: PumpingStationFormData) => void;
  userRole?: string;
}

const PumpingStationForm: React.FC<PumpingStationFormProps> = ({ onSubmit, userRole = 'admin' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const { toast } = useToast();

  const form = useForm<PumpingStationFormData>({
    resolver: zodResolver(pumpingStationSchema),
    defaultValues: {
      governorate: '',
      city: '',
      name: '',
      stationType: 'محطة رفع صرف صحي',
      currentCapacity: 0,
      targetCapacity: 0,
      coordinates: '',
      implementingCompany: '',
      operatingCompany: '',
      assignmentOrder: '',
      finalReceiptDate: '',
      currentStatus: '',
      siteReceiptDate: '',
      location: '',
      serviceRange: '',
      preliminaryReceiptDate: '',
      dischargePoint: '',
      powerSources: 1,
      actualDischarge: '',
      supervisingConsultant: '',
      supervisionAuthority: '',
      dischargeLines: 1,
      dischargeDiameter: 0,
      dischargeLength: 0,
      pipelineMaterial: '',
      generatorCount: 1,
      generatorCapacity: 0,
      synchronizationExists: '',
      generatorBrand: '',
    },
  });

  const handleSubmit = async (data: PumpingStationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check for duplicate name (mock validation)
      if (data.name === "محطة مكررة") {
        toast({
          title: "خطأ",
          description: "اسم المحطة مستخدم من قبل",
          variant: "destructive",
        });
        return;
      }
      
      console.log('Pumping station data:', data);
      console.log('Attachments:', attachments);
      
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ بيانات محطة الرفع بنجاح",
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
    const fileInput = document.getElementById('pumping-file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">إدخال بيانات محطة رفع صرف صحي جديدة</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              
              {/* البيانات الأساسية */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">البيانات الأساسية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                                <SelectValue placeholder="يتم عرضها تلقائياً" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="الجيزة">الجيزة</SelectItem>
                              <SelectItem value="القاهرة">القاهرة</SelectItem>
                              <SelectItem value="الإسكندرية">الإسكندرية</SelectItem>
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
                                <SelectValue placeholder="يتم عرضها تلقائياً" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="حدائق أكتوبر">حدائق أكتوبر</SelectItem>
                              <SelectItem value="6 أكتوبر">6 أكتوبر</SelectItem>
                              <SelectItem value="الشيخ زايد">الشيخ زايد</SelectItem>
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
                            <Input placeholder="محطة أكتوبر 5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="stationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نوع المحطة</FormLabel>
                          <FormControl>
                            <Input placeholder="محطة رفع صرف صحي" {...field} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currentCapacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الطاقة الحالية *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="4000"
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
                      name="targetCapacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>طاقة سنة الهدف *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="6000"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="coordinates"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>إحداثيات المحطة *</FormLabel>
                          <FormControl>
                            <Input placeholder="E1:23445,N1:3556" {...field} />
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
                </CardContent>
              </Card>

              {/* بيانات الشركات والتواريخ */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">بيانات الشركات والتواريخ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      name="operatingCompany"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الشركة المشغلة *</FormLabel>
                          <FormControl>
                            <Input placeholder="شركة مياه الجيزة" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="assignmentOrder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم وتاريخ أمر الإسناد *</FormLabel>
                          <FormControl>
                            <Input placeholder="1254 بتاريخ 10/10/2024" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="finalReceiptDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>تاريخ الاستلام النهائي *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="siteReceiptDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>تاريخ استلام الموقع *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preliminaryReceiptDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>تاريخ الاستلام الابتدائي *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="supervisingConsultant"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاستشاري المشرف *</FormLabel>
                          <FormControl>
                            <Input placeholder="ECG" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="supervisionAuthority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>جهة الإشراف *</FormLabel>
                          <FormControl>
                            <Input placeholder="الجهاز التنفيذي للمياه" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* خطوط الطرد */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">خطوط الطرد</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="dischargeLines"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>عدد خطوط الطرد *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="2"
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
                      name="dischargeDiameter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>قطر خطوط الطرد (مم) *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="600"
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
                      name="dischargeLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>طول خط الطرد (م) *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="345"
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
                      name="pipelineMaterial"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>مادة صنع خط الطرد *</FormLabel>
                          <FormControl>
                            <Input placeholder="GRP" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* بيانات المولدات */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">بيانات المولدات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="generatorCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>عدد المولدات *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="1"
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
                      name="generatorCapacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>قدرة المولد (KVA) *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="750"
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
                      name="synchronizationExists"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>وجود تزامن *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="نعم">نعم</SelectItem>
                              <SelectItem value="لا">لا</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="generatorBrand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ماركة المولد *</FormLabel>
                          <FormControl>
                            <Input placeholder="PERKINS" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* رفع الملفات */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">المرفقات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      id="pumping-file-input"
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
                </CardContent>
              </Card>

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

export default PumpingStationForm;
