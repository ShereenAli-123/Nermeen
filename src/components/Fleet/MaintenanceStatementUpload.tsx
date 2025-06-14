
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Building2,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MaintenanceStatementUploadProps {
  onBack?: () => void;
}

const MaintenanceStatementUpload: React.FC<MaintenanceStatementUploadProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // التحقق من نوع الملف - PDF فقط
    if (file.type !== 'application/pdf') {
      toast({
        title: "خطأ في نوع الملف",
        description: "صيغة الملف غير مدعومة. يُسمح برفع ملفات PDF فقط.",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
  };

  const handleSubmit = async () => {
    // التحقق من تحديد الفترة الزمنية
    if (!startDate || !endDate) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى تحديد الفترة الزمنية للبيان",
        variant: "destructive"
      });
      return;
    }

    // التحقق من صحة التواريخ
    if (new Date(startDate) > new Date(endDate)) {
      toast({
        title: "خطأ في التواريخ",
        description: "تاريخ البداية يجب أن يكون قبل تاريخ النهاية",
        variant: "destructive"
      });
      return;
    }

    if (!uploadedFile) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى رفع ملف البيان بصيغة PDF",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // محاكاة رفع الملف ومعالجته
      await new Promise(resolve => setTimeout(resolve, 2000));

      // محاكاة التحقق من صحة البيانات
      const isValidFile = Math.random() > 0.2; // 80% احتمال نجاح

      if (!isValidFile) {
        toast({
          title: "خطأ في بيانات الملف",
          description: "صيغة الملف غير مدعومة أو البيانات الأساسية غير مكتملة.",
          variant: "destructive"
        });
        setIsUploading(false);
        return;
      }

      // إرسال البيانات للمراجعة
      console.log('Maintenance statement uploaded:', {
        file: uploadedFile.name,
        startDate: startDate,
        endDate: endDate,
        notes: notes,
        timestamp: new Date().toISOString()
      });

      toast({
        title: "تم بنجاح",
        description: "تم رفع بيان الصيانة بنجاح، بانتظار اعتماد الإدارة.",
        variant: "default"
      });

      // إعادة تعيين النموذج
      setUploadedFile(null);
      setNotes('');
      setStartDate('');
      setEndDate('');

    } catch (error) {
      toast({
        title: "خطأ في الرفع",
        description: "حدث خطأ أثناء رفع البيان، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center gap-4">
        {onBack && (
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        )}
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <Building2 className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">رفع بيان الصيانة المجمع</h1>
          <p className="text-gray-600">رفع بيان مجمع لأعمال الصيانة المنفذة خلال فترة محددة</p>
        </div>
      </div>

      {/* بطاقة معلومات النظام */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-purple-800">إجراءات المراجعة</h3>
              <p className="text-sm text-purple-700 mt-1">
                سيتم إرسال البيان أولاً للموظف المختص للمراجعة، ثم إلى مدير الإدارة للاعتماد النهائي.
                ستتلقى إشعاراً بنتيجة المراجعة عبر النظام.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* تحديد الفترة الزمنية */}
        <Card>
          <CardHeader>
            <CardTitle>الفترة الزمنية للبيان</CardTitle>
            <CardDescription>حدد الفترة التي يغطيها بيان الصيانة المجمع</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium">
                  تاريخ البداية <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-medium">
                  تاريخ النهاية <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
            </div>

            {startDate && endDate && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  فترة البيان: من {new Date(startDate).toLocaleDateString('ar-SA')} إلى {new Date(endDate).toLocaleDateString('ar-SA')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* رفع الملف */}
        <Card>
          <CardHeader>
            <CardTitle>رفع بيان الصيانة</CardTitle>
            <CardDescription>ارفع ملف PDF يحتوي على البيان المجمع لأعمال الصيانة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fileUpload" className="text-sm font-medium">
                ملف البيان <span className="text-red-500">*</span>
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  id="fileUpload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">اضغط لرفع الملف أو اسحبه هنا</p>
                  <p className="text-xs text-gray-500 mt-1">ملفات PDF فقط (.pdf)</p>
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
                placeholder="أضف أي ملاحظات أو تفاصيل إضافية حول بيان الصيانة..."
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
              disabled={!startDate || !endDate || !uploadedFile || isUploading}
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
                  رفع بيان الصيانة
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                setStartDate('');
                setEndDate('');
                setUploadedFile(null);
                setNotes('');
              }}
              disabled={isUploading}
            >
              إلغاء
            </Button>
          </div>

          {(!startDate || !endDate || !uploadedFile) && (
            <div className="flex items-center gap-2 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                يرجى تحديد الفترة الزمنية ورفع ملف البيان قبل المتابعة
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceStatementUpload;
