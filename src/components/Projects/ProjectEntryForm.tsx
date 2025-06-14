
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Plus, RotateCcw, Save } from 'lucide-react';

interface ProjectData {
  city: string;
  stationType: string;
  stationName: string;
  reportDate: string;
  assignmentStatus: boolean;
  facilitiesCommitteeApproval: string;
  technicalSignature: string;
  scientificSignature: string;
  notes: string;
}

const ProjectEntryForm: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProjectData>({
    city: '',
    stationType: '',
    stationName: '',
    reportDate: '',
    assignmentStatus: false,
    facilitiesCommitteeApproval: '',
    technicalSignature: '',
    scientificSignature: '',
    notes: ''
  });

  // Sample data
  const cities = [
    'حدائق أكتوبر',
    'القاهرة',
    'الجيزة',
    'الإسكندرية',
    'أسوان',
    'الأقصر'
  ];

  const stationTypes = [
    'محطة معالجة صرف',
    'محطة رفع صرف',
    'محطة رفع ري',
    'محطة معالجة مياه'
  ];

  const stationNames = [
    'محطة المعالجة الرئيسية',
    'محطة الجبل الأصفر',
    'محطة حدائق أكتوبر',
    'محطة الزاوية الحمراء',
    'محطة كفر الدوار'
  ];

  const handleInputChange = (field: keyof ProjectData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['city', 'stationType', 'stationName', 'reportDate'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "تحذير",
        description: "يرجى استكمال البيانات المطلوبة",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.city || !formData.stationName) {
      toast({
        title: "تحذير",
        description: "يرجى اختيار المدينة واسم المحطة",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleAddProject = () => {
    if (!formData.city || !formData.stationType) {
      toast({
        title: "تحذير",
        description: "يرجى اختيار المدينة ونوع المحطة أولاً",
        variant: "destructive"
      });
      return;
    }
    
    setIsEditing(true);
    toast({
      title: "جاهز للإدخال",
      description: "يمكنك الآن إدخال بيانات المشروع",
      variant: "default"
    });
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    // Simulate saving data
    console.log('حفظ بيانات المشروع:', formData);
    
    toast({
      title: "نجح",
      description: isEditing ? "تم حفظ المشروع بنجاح" : "تم تحديث بيانات المشروع بنجاح",
      variant: "default"
    });
    
    setIsEditing(false);
  };

  const handleReset = () => {
    setFormData({
      city: '',
      stationType: '',
      stationName: '',
      reportDate: '',
      assignmentStatus: false,
      facilitiesCommitteeApproval: '',
      technicalSignature: '',
      scientificSignature: '',
      notes: ''
    });
    setIsEditing(false);
    
    toast({
      title: "تم الإلغاء",
      description: "تم إعادة تعيين النموذج",
      variant: "default"
    });
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">موقف المحطات الجاري طرحها</h1>
          <p className="text-gray-600">إضافة وتحديث مشاريع الأعمال الجاري طرحها للمحطات</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleReset} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            إلغاء
          </Button>
        </div>
      </div>

      <Card className="border-r-4 border-r-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Plus className="w-5 h-5" />
            بيانات المشروع
          </CardTitle>
          <CardDescription>
            إدخال وتحديث بيانات مشاريع المحطات الجاري طرحها
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* القسم الأول: البيانات الأساسية */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="city">المدينة *</Label>
              <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stationType">نوع المحطة *</Label>
              <Select value={formData.stationType} onValueChange={(value) => handleInputChange('stationType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع المحطة" />
                </SelectTrigger>
                <SelectContent>
                  {stationTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stationName">اسم المحطة *</Label>
              <Select value={formData.stationName} onValueChange={(value) => handleInputChange('stationName', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر اسم المحطة" />
                </SelectTrigger>
                <SelectContent>
                  {stationNames.map((name) => (
                    <SelectItem key={name} value={name}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* زر إضافة مشروع */}
          {!isEditing && (
            <div className="flex justify-center pt-4">
              <Button onClick={handleAddProject} className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                إضافة مشروع
              </Button>
            </div>
          )}

          {/* القسم الثاني: البيانات التفصيلية */}
          {isEditing && (
            <div className="space-y-6 border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportDate">تاريخ التقرير *</Label>
                  <Input
                    id="reportDate"
                    type="date"
                    value={formData.reportDate}
                    onChange={(e) => handleInputChange('reportDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facilitiesCommitteeApproval">موافقة لجنة المرافق</Label>
                  <Input
                    id="facilitiesCommitteeApproval"
                    value={formData.facilitiesCommitteeApproval}
                    onChange={(e) => handleInputChange('facilitiesCommitteeApproval', e.target.value)}
                    placeholder="مثال: نعم"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                <Checkbox
                  id="assignmentStatus"
                  checked={formData.assignmentStatus}
                  onCheckedChange={(checked) => handleInputChange('assignmentStatus', checked as boolean)}
                />
                <Label htmlFor="assignmentStatus" className="mr-2">موقف الإسناد *</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="technicalSignature">التوقيع الفني</Label>
                  <Input
                    id="technicalSignature"
                    value={formData.technicalSignature}
                    onChange={(e) => handleInputChange('technicalSignature', e.target.value)}
                    placeholder="اسم المسؤول الفني"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scientificSignature">التوقيع العلمي</Label>
                  <Input
                    id="scientificSignature"
                    value={formData.scientificSignature}
                    onChange={(e) => handleInputChange('scientificSignature', e.target.value)}
                    placeholder="اسم المسؤول العلمي"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="إضافة أي تفاصيل إضافية تخص المشروع (مثال: المشروع تحت الفحص)"
                  rows={4}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="gap-2 bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4" />
                  تحديث
                </Button>
                <Button onClick={handleReset} variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  إلغاء
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectEntryForm;
