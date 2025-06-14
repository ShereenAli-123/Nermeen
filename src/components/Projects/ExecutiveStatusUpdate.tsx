
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { FileText, Edit, Save, RotateCcw } from 'lucide-react';

interface StationData {
  stationType: string;
  city: string;
  stationName: string;
  reportDate: string;
  companyName: string;
  assignmentOrderNumber: string;
  assignmentOrderDate: string;
  siteHandoverDate: string;
  executionStartDate: string;
  plannedCompletionDate: string;
  actualCompletionDate: string;
  projectCompletionStatus: string;
  plannedProgressPercentage: number;
  civilProgressPercentage: number;
  electromechanicalProgressPercentage: number;
  notes: string;
}

const ExecutiveStatusUpdate: React.FC = () => {
  const { toast } = useToast();
  const [selectedStation, setSelectedStation] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [editMode, setEditMode] = useState<'status' | 'project' | null>(null);
  
  const [formData, setFormData] = useState<StationData>({
    stationType: '',
    city: '',
    stationName: '',
    reportDate: new Date().toISOString().split('T')[0],
    companyName: '',
    assignmentOrderNumber: '',
    assignmentOrderDate: '',
    siteHandoverDate: '',
    executionStartDate: '',
    plannedCompletionDate: '',
    actualCompletionDate: '',
    projectCompletionStatus: '',
    plannedProgressPercentage: 0,
    civilProgressPercentage: 0,
    electromechanicalProgressPercentage: 0,
    notes: ''
  });

  // Sample data
  const stationTypes = [
    'محطة معالجة صرف',
    'محطة رفع صرف',
    'محطة رفع ري',
    'محطة معالجة مياه'
  ];

  const cities = [
    '١٥ مايو',
    'حدائق أكتوبر',
    'القاهرة',
    'الجيزة',
    'الإسكندرية',
    'أسوان'
  ];

  const stations = [
    'محطة ١٥ مايو الرئيسية',
    'محطة الجبل الأصفر',
    'محطة حدائق أكتوبر',
    'محطة الزاوية الحمراء'
  ];

  const projectStatuses = [
    'تم النهو',
    'جاري التنفيذ',
    'متوقف'
  ];

  const handleInputChange = (field: keyof StationData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const loadStationData = () => {
    if (!formData.stationType || !formData.city || !formData.stationName) {
      toast({
        title: "تحذير",
        description: "يرجى اختيار محطة من القائمة",
        variant: "destructive"
      });
      return;
    }

    // Simulate loading station data
    const mockData: StationData = {
      stationType: formData.stationType,
      city: formData.city,
      stationName: formData.stationName,
      reportDate: formData.reportDate,
      companyName: 'المصرية الوطنية',
      assignmentOrderNumber: '١٨٣',
      assignmentOrderDate: '2023-01-18',
      siteHandoverDate: '2023-02-01',
      executionStartDate: '2023-03-01',
      plannedCompletionDate: '2024-12-31',
      actualCompletionDate: '2025-05-29',
      projectCompletionStatus: 'تم النهو',
      plannedProgressPercentage: 100,
      civilProgressPercentage: 100,
      electromechanicalProgressPercentage: 100,
      notes: 'لا توجد ملاحظات'
    };

    setFormData(mockData);
    setIsDataLoaded(true);
    
    toast({
      title: "تم التحميل",
      description: "تم تحميل بيانات المحطة بنجاح",
      variant: "default"
    });
  };

  const validateDates = () => {
    const dates = [
      { date: formData.assignmentOrderDate, name: 'تاريخ أمر الإسناد' },
      { date: formData.siteHandoverDate, name: 'تاريخ استلام الموقع' },
      { date: formData.executionStartDate, name: 'تاريخ بدء التنفيذ' },
      { date: formData.plannedCompletionDate, name: 'تاريخ النهو المخطط' }
    ];

    for (let i = 0; i < dates.length - 1; i++) {
      if (new Date(dates[i].date) > new Date(dates[i + 1].date)) {
        toast({
          title: "خطأ في التواريخ",
          description: "تسلسل التواريخ غير صحيح، راجع التواريخ",
          variant: "destructive"
        });
        return false;
      }
    }
    return true;
  };

  const validateRequiredFields = () => {
    const requiredFields = [
      'companyName', 'assignmentOrderNumber', 'assignmentOrderDate',
      'siteHandoverDate', 'executionStartDate', 'plannedCompletionDate',
      'projectCompletionStatus'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "خطأ",
        description: "يرجى ملئ الحقول المطلوبة",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleUpdateStatus = () => {
    if (!isDataLoaded) {
      toast({
        title: "تحذير",
        description: "يرجى اختيار محطة من القائمة",
        variant: "destructive"
      });
      return;
    }

    if (!validateRequiredFields() || !validateDates()) {
      return;
    }

    console.log('تحديث الموقف التنفيذي:', formData);
    
    toast({
      title: "نجح",
      description: "تم تحديث الموقف التنفيذي بنجاح",
      variant: "default"
    });
    
    setEditMode(null);
  };

  const handleEditProject = () => {
    if (!isDataLoaded) {
      toast({
        title: "تحذير",
        description: "يرجى اختيار محطة من القائمة",
        variant: "destructive"
      });
      return;
    }

    if (!validateRequiredFields() || !validateDates()) {
      return;
    }

    console.log('تعديل بيانات المشروع:', formData);
    
    toast({
      title: "نجح",
      description: "تم تعديل بيانات المشروع بنجاح",
      variant: "default"
    });
    
    setEditMode(null);
  };

  const handleReset = () => {
    setFormData({
      stationType: '',
      city: '',
      stationName: '',
      reportDate: new Date().toISOString().split('T')[0],
      companyName: '',
      assignmentOrderNumber: '',
      assignmentOrderDate: '',
      siteHandoverDate: '',
      executionStartDate: '',
      plannedCompletionDate: '',
      actualCompletionDate: '',
      projectCompletionStatus: '',
      plannedProgressPercentage: 0,
      civilProgressPercentage: 0,
      electromechanicalProgressPercentage: 0,
      notes: ''
    });
    setIsDataLoaded(false);
    setEditMode(null);
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">تحديث الموقف التنفيذي للمحطة</h1>
          <p className="text-gray-600">تحديث الحالة التنفيذية التفصيلية للمحطات الجاري تنفيذها</p>
        </div>
      </div>

      {/* قسم اختيار المحطة */}
      <Card className="border-r-4 border-r-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <FileText className="w-5 h-5" />
            اختيار المحطة
          </CardTitle>
          <CardDescription>
            اختر المحطة المراد تحديث موقفها التنفيذي
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Label htmlFor="stationName">اسم المحطة *</Label>
              <Select value={formData.stationName} onValueChange={(value) => handleInputChange('stationName', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المحطة" />
                </SelectTrigger>
                <SelectContent>
                  {stations.map((station) => (
                    <SelectItem key={station} value={station}>{station}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button onClick={loadStationData} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <FileText className="w-4 h-4" />
              تحميل بيانات المحطة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* قسم البيانات التفصيلية */}
      {isDataLoaded && (
        <div className="space-y-6">
          {/* البيانات الأساسية للمشروع */}
          <Card className="border-r-4 border-r-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Edit className="w-5 h-5" />
                البيانات الأساسية للمشروع
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportDate">تاريخ التقرير</Label>
                  <Input
                    id="reportDate"
                    type="date"
                    value={formData.reportDate}
                    onChange={(e) => handleInputChange('reportDate', e.target.value)}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">اسم الشركة *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="مثال: المصرية الوطنية"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignmentOrderNumber">رقم أمر الإسناد *</Label>
                  <Input
                    id="assignmentOrderNumber"
                    value={formData.assignmentOrderNumber}
                    onChange={(e) => handleInputChange('assignmentOrderNumber', e.target.value)}
                    placeholder="مثال: ١٨٣"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignmentOrderDate">تاريخ أمر الإسناد *</Label>
                  <Input
                    id="assignmentOrderDate"
                    type="date"
                    value={formData.assignmentOrderDate}
                    onChange={(e) => handleInputChange('assignmentOrderDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteHandoverDate">تاريخ استلام الموقع *</Label>
                  <Input
                    id="siteHandoverDate"
                    type="date"
                    value={formData.siteHandoverDate}
                    onChange={(e) => handleInputChange('siteHandoverDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="executionStartDate">تاريخ بدء التنفيذ *</Label>
                  <Input
                    id="executionStartDate"
                    type="date"
                    value={formData.executionStartDate}
                    onChange={(e) => handleInputChange('executionStartDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plannedCompletionDate">تاريخ النهو المخطط *</Label>
                  <Input
                    id="plannedCompletionDate"
                    type="date"
                    value={formData.plannedCompletionDate}
                    onChange={(e) => handleInputChange('plannedCompletionDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="actualCompletionDate">تاريخ النهو الفعلي</Label>
                  <Input
                    id="actualCompletionDate"
                    type="date"
                    value={formData.actualCompletionDate}
                    onChange={(e) => handleInputChange('actualCompletionDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectCompletionStatus">موقف نهو المشروع *</Label>
                  <Select value={formData.projectCompletionStatus} onValueChange={(value) => handleInputChange('projectCompletionStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر حالة المشروع" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectStatuses.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* الموقف التنفيذي */}
          <Card className="border-r-4 border-r-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Save className="w-5 h-5" />
                الموقف التنفيذي الحالي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plannedProgressPercentage">نسبة الإنجاز المخطط *</Label>
                  <Input
                    id="plannedProgressPercentage"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.plannedProgressPercentage}
                    onChange={(e) => handleInputChange('plannedProgressPercentage', Number(e.target.value))}
                    placeholder="0-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="civilProgressPercentage">نسبة الإنجاز المدني *</Label>
                  <Input
                    id="civilProgressPercentage"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.civilProgressPercentage}
                    onChange={(e) => handleInputChange('civilProgressPercentage', Number(e.target.value))}
                    placeholder="0-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="electromechanicalProgressPercentage">نسبة الإنجاز الكهروميكانيكي *</Label>
                  <Input
                    id="electromechanicalProgressPercentage"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.electromechanicalProgressPercentage}
                    onChange={(e) => handleInputChange('electromechanicalProgressPercentage', Number(e.target.value))}
                    placeholder="0-100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="أي ملاحظات إضافية"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* أزرار العمليات */}
          <div className="flex gap-3 justify-center">
            <Button onClick={handleUpdateStatus} className="gap-2 bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4" />
              تحديث الموقف التنفيذي
            </Button>
            <Button onClick={handleEditProject} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4" />
              تعديل بيانات المشروع
            </Button>
            <Button onClick={handleReset} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              إعادة تعيين
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutiveStatusUpdate;
