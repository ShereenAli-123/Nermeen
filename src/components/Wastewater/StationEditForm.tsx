
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { 
  ArrowRight, 
  Save, 
  X 
} from 'lucide-react';

interface PumpingStation {
  id: number;
  name: string;
  location: string;
  governorate: string;
  designCapacity: number;
  actualFlow: number;
  pumps: {
    total: number;
    working: number;
  };
  generators: {
    total: number;
    working: number;
  };
  status: 'تعمل' | 'تحت الصيانة' | 'متوقفة';
  efficiency: number;
  lastUpdate: string;
  operatingCompany: string;
}

interface StationEditFormProps {
  station: PumpingStation;
  onSave: (updatedStation: PumpingStation) => void;
  onCancel: () => void;
}

const StationEditForm: React.FC<StationEditFormProps> = ({ station, onSave, onCancel }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PumpingStation>(station);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof PumpingStation] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // التحقق من صحة البيانات
    if (!formData.name.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "اسم المحطة مطلوب",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (formData.designCapacity <= 0) {
      toast({
        title: "خطأ في البيانات",
        description: "الطاقة التصميمية يجب أن تكون أكبر من صفر",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (formData.pumps.working > formData.pumps.total) {
      toast({
        title: "خطأ في البيانات",
        description: "عدد الطلمبات العاملة لا يمكن أن يزيد عن العدد الإجمالي",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // محاكاة حفظ البيانات
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // حساب الكفاءة
      const efficiency = formData.designCapacity > 0 
        ? Math.round((formData.actualFlow / formData.designCapacity) * 100)
        : 0;
      
      const updatedStation = {
        ...formData,
        efficiency,
        lastUpdate: new Date().toISOString().split('T')[0]
      };

      onSave(updatedStation);
      
      toast({
        title: "تم تعديل بيانات المحطة بنجاح",
        description: `تم حفظ التعديلات على محطة ${formData.name}`,
      });
    } catch (error) {
      toast({
        title: "حدث خطأ أثناء حفظ التعديلات",
        description: "يرجى مراجعة البيانات والمحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const governorates = ['القاهرة', 'الإسكندرية', 'الجيزة', 'الدقهلية', 'قنا', 'أسوان', 'الشرقية'];
  const companies = ['شركة النخبة للصيانة', 'شركة المثال للصيانة', 'شركة الموارد المائية'];
  const statuses: Array<'تعمل' | 'تحت الصيانة' | 'متوقفة'> = ['تعمل', 'تحت الصيانة', 'متوقفة'];

  return (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                تعديل بيانات المحطة
              </CardTitle>
              <CardDescription>
                تعديل البيانات الأساسية والتشغيلية لمحطة {station.name}
              </CardDescription>
            </div>
            <Button onClick={onCancel} variant="outline" size="sm" className="gap-2">
              <ArrowRight className="w-4 h-4" />
              العودة للقائمة
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* البيانات الأساسية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">اسم المحطة *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="أدخل اسم المحطة"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">الموقع</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="أدخل موقع المحطة"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="governorate">المحافظة</Label>
              <Select value={formData.governorate} onValueChange={(value) => handleInputChange('governorate', value)}>
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
              <Label htmlFor="operatingCompany">الشركة المشغلة</Label>
              <Select value={formData.operatingCompany} onValueChange={(value) => handleInputChange('operatingCompany', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الشركة المشغلة" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map(company => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* البيانات التشغيلية */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="designCapacity">الطاقة التصميمية (ألف م³/يوم) *</Label>
              <Input
                id="designCapacity"
                type="number"
                min="0"
                value={formData.designCapacity}
                onChange={(e) => handleInputChange('designCapacity', Number(e.target.value))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualFlow">التصرف الفعلي (ألف م³/يوم)</Label>
              <Input
                id="actualFlow"
                type="number"
                min="0"
                value={formData.actualFlow}
                onChange={(e) => handleInputChange('actualFlow', Number(e.target.value))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">حالة التشغيل</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر حالة التشغيل" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* بيانات المعدات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">بيانات الطلمبات</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pumpsTotal">العدد الإجمالي</Label>
                  <Input
                    id="pumpsTotal"
                    type="number"
                    min="0"
                    value={formData.pumps.total}
                    onChange={(e) => handleInputChange('pumps.total', Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pumpsWorking">العدد العامل</Label>
                  <Input
                    id="pumpsWorking"
                    type="number"
                    min="0"
                    max={formData.pumps.total}
                    value={formData.pumps.working}
                    onChange={(e) => handleInputChange('pumps.working', Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">بيانات المولدات</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="generatorsTotal">العدد الإجمالي</Label>
                  <Input
                    id="generatorsTotal"
                    type="number"
                    min="0"
                    value={formData.generators.total}
                    onChange={(e) => handleInputChange('generators.total', Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="generatorsWorking">العدد العامل</Label>
                  <Input
                    id="generatorsWorking"
                    type="number"
                    min="0"
                    max={formData.generators.total}
                    value={formData.generators.working}
                    onChange={(e) => handleInputChange('generators.working', Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* أزرار العمليات */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t">
            <Button onClick={onCancel} variant="outline" className="gap-2">
              <X className="w-4 h-4" />
              إلغاء
            </Button>
            <Button onClick={handleSave} disabled={isLoading} className="gap-2">
              <Save className="w-4 h-4" />
              {isLoading ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StationEditForm;
