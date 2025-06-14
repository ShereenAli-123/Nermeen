
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Save, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface WaterConsumptionEntryProps {
  userRole: string;
}

interface StationConsumption {
  id: string;
  name: string;
  consumption: number;
}

interface FormData {
  date: string;
  stations: StationConsumption[];
  totalConsumption: number;
}

const WaterConsumptionEntry: React.FC<WaterConsumptionEntryProps> = ({ userRole }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingDates, setExistingDates] = useState<string[]>([
    '2025-01-10',
    '2025-01-11',
    '2025-01-12'
  ]);

  // محطات المياه المتاحة
  const waterStations: StationConsumption[] = [
    { id: '1', name: 'محطة المياه الرئيسية', consumption: 0 },
    { id: '2', name: 'محطة المياه الشرقية', consumption: 0 },
    { id: '3', name: 'محطة المياه الغربية', consumption: 0 },
    { id: '4', name: 'محطة المياه الشمالية', consumption: 0 },
    { id: '5', name: 'محطة المياه الجنوبية', consumption: 0 }
  ];

  const form = useForm<FormData>({
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      stations: waterStations,
      totalConsumption: 0
    }
  });

  const watchedStations = form.watch('stations');

  // حساب الإجمالي تلقائياً
  useEffect(() => {
    const total = watchedStations.reduce((sum, station) => sum + (station.consumption || 0), 0);
    form.setValue('totalConsumption', total);
  }, [watchedStations, form]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // التحقق من وجود التاريخ مسبقاً
      if (existingDates.includes(data.date)) {
        toast({
          title: "تحذير",
          description: "تم إدخال البيانات لهذا التاريخ مسبقاً",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // التحقق من الحقول المطلوبة
      if (!data.date) {
        toast({
          title: "خطأ",
          description: "يرجى تعبئة جميع الحقول الإلزامية",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // التحقق من صحة البيانات الرقمية
      const hasInvalidData = data.stations.some(station => 
        station.consumption < 0 || isNaN(station.consumption)
      );

      if (hasInvalidData) {
        toast({
          title: "خطأ في البيانات",
          description: "يرجى التأكد من أن جميع القيم رقمية وصحيحة",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // محاكاة إرسال البيانات
      await new Promise(resolve => setTimeout(resolve, 1000));

      // إضافة التاريخ للقائمة المحظورة
      setExistingDates(prev => [...prev, data.date]);

      toast({
        title: "نجح الحفظ",
        description: "تم حفظ بيانات محطة المياه بنجاح",
        variant: "default"
      });

      // إعادة تعيين النموذج
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
    form.reset({
      date: format(new Date(), 'yyyy-MM-dd'),
      stations: waterStations,
      totalConsumption: 0
    });
  };

  const updateStationConsumption = (stationId: string, value: number) => {
    const currentStations = form.getValues('stations');
    const updatedStations = currentStations.map(station => 
      station.id === stationId 
        ? { ...station, consumption: isNaN(value) ? 0 : value }
        : station
    );
    form.setValue('stations', updatedStations);
  };

  const canEntry = ['admin', 'department_head', 'employee'].includes(userRole);

  if (!canEntry) {
    return (
      <div className="p-6" dir="rtl">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">ليس لديك صلاحية لإدخال بيانات الاستهلاك</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">إدخال استهلاكات المياه</h1>
          <p className="text-gray-600">إدخال بيانات الاستهلاك اليومي لمحطات المياه</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>بيانات الاستهلاك</CardTitle>
              <CardDescription>يرجى إدخال بيانات الاستهلاك لجميع المحطات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* حقل التاريخ */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-red-500">التاريخ *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="date"
                          {...field}
                          className="pr-10"
                          required
                        />
                        <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* محطات المياه */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">استهلاك المحطات (متر مكعب)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {waterStations.map((station, index) => (
                    <FormField
                      key={station.id}
                      control={form.control}
                      name={`stations.${index}.consumption`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{station.name}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              {...field}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                field.onChange(value);
                                updateStationConsumption(station.id, value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* الإجمالي */}
              <FormField
                control={form.control}
                name="totalConsumption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>إجمالي المياه (متر مكعب)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        readOnly
                        className="bg-gray-100 font-bold text-lg"
                        value={field.value.toFixed(2)}
                      />
                    </FormControl>
                    <p className="text-sm text-gray-500">يتم حساب هذا الحقل تلقائياً</p>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* أزرار الإجراءات */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              إعادة تعيين
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'جاري الحفظ...' : 'حفظ البيانات'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WaterConsumptionEntry;
