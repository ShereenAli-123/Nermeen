
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Save,
  RotateCcw,
  Calendar,
  Droplets,
  AlertCircle,
  CheckCircle,
  Calculator
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IrrigationConsumptionEntryProps {
  userRole: string;
}

interface StationData {
  id: string;
  name: string;
  consumption: string;
}

const IrrigationConsumptionEntry: React.FC<IrrigationConsumptionEntryProps> = ({ userRole }) => {
  const [date, setDate] = useState('');
  const [stations, setStations] = useState<StationData[]>([
    { id: '1', name: 'محطة مياه الري الرئيسية', consumption: '' },
    { id: '2', name: 'محطة مياه الري الشرقية', consumption: '' },
    { id: '3', name: 'محطة مياه الري الغربية', consumption: '' },
    { id: '4', name: 'محطة مياه الري الشمالية', consumption: '' },
    { id: '5', name: 'محطة مياه الري الجنوبية', consumption: '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Sample existing data to check for duplicates
  const existingEntries = [
    '2024-01-14',
    '2024-01-13',
    '2024-01-12'
  ];

  const handleStationConsumptionChange = (stationId: string, value: string) => {
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setStations(prev => 
        prev.map(station => 
          station.id === stationId 
            ? { ...station, consumption: value }
            : station
        )
      );
    }
  };

  const calculateTotal = () => {
    return stations.reduce((total, station) => {
      const consumption = parseFloat(station.consumption) || 0;
      return total + consumption;
    }, 0);
  };

  const validateForm = () => {
    // Check if date is provided
    if (!date) {
      toast({
        title: "يرجى تحديد التاريخ",
        description: "التاريخ حقل إلزامي",
        variant: "destructive"
      });
      return false;
    }

    // Check for duplicate date entry
    if (existingEntries.includes(date)) {
      toast({
        title: "تم إدخال البيانات لهذا التاريخ مسبقًا",
        description: "لا يمكن إدخال البيانات لنفس التاريخ مرتين",
        variant: "destructive"
      });
      return false;
    }

    // Check if at least one station has consumption data
    const hasConsumptionData = stations.some(station => 
      station.consumption && parseFloat(station.consumption) > 0
    );

    if (!hasConsumptionData) {
      toast({
        title: "يرجى إدخال بيانات الاستهلاك",
        description: "يجب إدخال استهلاك لمحطة واحدة على الأقل",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "تم حفظ بيانات محطة المياه بنجاح",
        description: "تم إرسال البيانات للمراجعة والاعتماد",
        variant: "default"
      });

      // Reset form after successful submission
      handleReset();
    } catch (error) {
      toast({
        title: "خطأ في حفظ البيانات",
        description: "حدث خطأ أثناء حفظ البيانات، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setDate('');
    setStations(prev => 
      prev.map(station => ({ ...station, consumption: '' }))
    );
    toast({
      title: "تم إعادة تعيين النموذج",
      description: "تم مسح جميع البيانات المدخلة",
      variant: "default"
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-EG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(num);
  };

  // Check user permissions
  if (!['admin', 'department_head', 'employee'].includes(userRole)) {
    return (
      <div className="flex items-center justify-center h-64" dir="rtl">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">ليست لديك صلاحية الوصول</h3>
          <p className="text-gray-600">لا تملك الصلاحيات اللازمة لإدخال بيانات الاستهلاك</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">إدخال بيانات استهلاكات مياه الري</h1>
          <p className="text-gray-600">إدخال البيانات اليومية لاستهلاكات مياه الري في المحطات المختلفة</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleReset} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            إعادة تعيين
          </Button>
        </div>
      </div>

      {/* Instructions Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">تعليمات الإدخال</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• يتم إدخال البيانات يومياً لكل محطة</li>
                <li>• التاريخ حقل إلزامي ولا يمكن تكراره</li>
                <li>• يجب إدخال استهلاك لمحطة واحدة على الأقل</li>
                <li>• سيتم إرسال البيانات للمراجعة والاعتماد</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            بيانات الاستهلاك
          </CardTitle>
          <CardDescription>
            املأ البيانات المطلوبة لاستهلاكات مياه الري
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Input */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">
                التاريخ / الفترة <span className="text-red-500">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {/* Stations Consumption */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">استهلاك المحطات (متر مكعب)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stations.map((station) => (
                  <div key={station.id} className="space-y-2">
                    <Label htmlFor={`station-${station.id}`} className="text-sm">
                      {station.name}
                    </Label>
                    <div className="relative">
                      <Droplets className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id={`station-${station.id}`}
                        type="text"
                        value={station.consumption}
                        onChange={(e) => handleStationConsumptionChange(station.id, e.target.value)}
                        placeholder="0.00"
                        className="pr-10"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Calculation */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">إجمالي المياه المستهلكة</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-900">
                      {formatNumber(calculateTotal())}
                    </span>
                    <span className="text-sm text-green-600 mr-2">متر مكعب</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="gap-2 min-w-32"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    حفظ البيانات
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 mb-1">عدد المحطات</p>
                <p className="text-2xl font-bold text-blue-900">{stations.length}</p>
                <p className="text-sm text-blue-600">محطة ري</p>
              </div>
              <Droplets className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 mb-1">محطات مُدخلة</p>
                <p className="text-2xl font-bold text-green-900">
                  {stations.filter(s => s.consumption && parseFloat(s.consumption) > 0).length}
                </p>
                <p className="text-sm text-green-600">من {stations.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 mb-1">حالة النموذج</p>
                <p className="text-lg font-bold text-purple-900">
                  {date && stations.some(s => s.consumption) ? 'جاهز للإرسال' : 'غير مكتمل'}
                </p>
                <p className="text-sm text-purple-600">
                  {date ? `تاريخ: ${date}` : 'لم يتم تحديد التاريخ'}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IrrigationConsumptionEntry;
