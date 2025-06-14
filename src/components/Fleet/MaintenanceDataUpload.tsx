
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Upload, 
  Download, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Building2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MaintenanceDataUpload: React.FC = () => {
  const { toast } = useToast();
  const [selectedDataType, setSelectedDataType] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const dataTypes = [
    { id: 'daily', name: 'يومية', template: 'template_daily_maintenance.xlsx' },
    { id: 'weekly', name: 'أسبوعية', template: 'template_weekly_maintenance.xlsx' },
    { id: 'monthly', name: 'شهرية', template: 'template_monthly_maintenance.xlsx' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // التحقق من نوع الملف
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "خطأ في نوع الملف",
        description: "صيغة الملف غير مدعومة أو الأعمدة الأساسية غير مكتملة.",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
  };

  const handleDownloadTemplate = (templateName: string, dataType: string) => {
    // محاكاة تحميل القالب
    console.log(`Downloading template: ${templateName} for ${dataType}`);
    
    toast({
      title: "تحميل القالب",
      description: `جاري تحميل قالب البيانات ${dataTypes.find(dt => dt.id === dataType)?.name}`,
      variant: "default"
    });
  };

  const handleSubmit = async () => {
    if (!selectedDataType) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى اختيار نوع البيانات أولاً",
        variant: "destructive"
      });
      return;
    }

    if (!uploadedFile) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى رفع ملف التقرير",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // محاكاة رفع الملف ومعالجته
      await new Promise(resolve => setTimeout(resolve, 2000));

      // محاكاة التحقق من صحة البيانات
      const isValidFile = Math.random() > 0.3; // 70% احتمال نجاح

      if (!isValidFile) {
        toast({
          title: "خطأ في بيانات الملف",
          description: "صيغة الملف غير مدعومة أو الأعمدة الأساسية غير مكتملة.",
          variant: "destructive"
        });
        setIsUploading(false);
        return;
      }

      // إرسال البيانات للمراجعة
      console.log('Maintenance data uploaded:', {
        dataType: selectedDataType,
        file: uploadedFile.name,
        notes: notes,
        timestamp: new Date().toISOString()
      });

      toast({
        title: "تم بنجاح",
        description: "تم رفع تقرير الصيانة بنجاح، بانتظار اعتماد الإدارة.",
        variant: "default"
      });

      // إعادة تعيين النموذج
      setSelectedDataType('');
      setUploadedFile(null);
      setNotes('');

    } catch (error) {
      toast({
        title: "خطأ في الرفع",
        description: "حدث خطأ أثناء رفع البيانات، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Building2 className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">رفع بيانات الصيانة</h1>
          <p className="text-gray-600">رفع تقارير أعمال الصيانة للمراجعة والاعتماد</p>
        </div>
      </div>

      {/* بطاقة معلومات النظام */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800">إجراءات المراجعة</h3>
              <p className="text-sm text-blue-700 mt-1">
                سيتم إرسال التقرير أولاً للموظف المختص للمراجعة، ثم إلى مدير الإدارة للاعتماد النهائي.
                ستتلقى إشعاراً بنتيجة المراجعة عبر النظام.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* اختيار نوع البيانات */}
        <Card>
          <CardHeader>
            <CardTitle>اختر نوع البيانات</CardTitle>
            <CardDescription>حدد نوع تقرير الصيانة المراد رفعه</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dataTypes.map((dataType) => (
              <div key={dataType.id} className="space-y-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="radio"
                    id={dataType.id}
                    name="dataType"
                    value={dataType.id}
                    checked={selectedDataType === dataType.id}
                    onChange={(e) => setSelectedDataType(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label htmlFor={dataType.id} className="text-sm font-medium">
                    بيانات {dataType.name}
                  </Label>
                </div>
                
                {selectedDataType === dataType.id && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadTemplate(dataType.template, dataType.id)}
                    className="gap-2 mr-6"
                  >
                    <Download className="w-4 h-4" />
                    تحميل قالب {dataType.name}
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* رفع الملف */}
        <Card>
          <CardHeader>
            <CardTitle>رفع تقرير الصيانة</CardTitle>
            <CardDescription>ارفع ملف Excel المحتوي على بيانات الصيانة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fileUpload" className="text-sm font-medium">
                ملف التقرير <span className="text-red-500">*</span>
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  id="fileUpload"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">اضغط لرفع الملف أو اسحبه هنا</p>
                  <p className="text-xs text-gray-500 mt-1">ملفات Excel فقط (.xlsx, .xls)</p>
                </label>
              </div>
              
              {uploadedFile && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <FileText className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-800">{uploadedFile.name}</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              )}
            </div>

            {/* ملاحظات إضافية */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                ملاحظات إضافية (اختياري)
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أضف أي ملاحظات أو تفاصيل إضافية حول تقرير الصيانة..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* أزرار الإجراءات */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Button
              onClick={handleSubmit}
              disabled={!selectedDataType || !uploadedFile || isUploading}
              className="gap-2 flex-1"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري الرفع...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  رفع تقرير الصيانة
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                setSelectedDataType('');
                setUploadedFile(null);
                setNotes('');
              }}
              disabled={isUploading}
            >
              إلغاء
            </Button>
          </div>

          {(!selectedDataType || !uploadedFile) && (
            <div className="flex items-center gap-2 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                يرجى اختيار نوع البيانات ورفع الملف قبل المتابعة
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceDataUpload;
