
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Clock,
  CheckCircle,
  Eye,
  FileText,
  User,
  Calendar,
  MessageSquare,
  AlertCircle,
  Building2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EmployeeAcknowledgment: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [acknowledgmentNotes, setAcknowledmentNotes] = useState('');

  // طلبات في انتظار تأكيد الاطلاع
  const pendingAcknowledgments = [
    {
      id: 1,
      title: 'بيان صيانة شركة النخبة للفترة من 01-06 إلى 15-06',
      type: 'بيان صيانة مجمع',
      submittedBy: 'شركة النخبة للصيانة',
      submissionDate: '2024-06-12',
      priority: 'عالي',
      description: 'بيان مجمع لأعمال الصيانة المنفذة في المحطات الشرقية',
      attachments: ['بيان_الصيانة_يونيو.pdf'],
      status: 'بانتظار تأكيد الاطلاع'
    },
    {
      id: 2,
      title: 'تقرير صيانة يومي - محطة الضخ الرئيسية',
      type: 'تقرير صيانة يومي',
      submittedBy: 'شركة المثال للصيانة',
      submissionDate: '2024-06-12',
      priority: 'متوسط',
      description: 'تقرير أعمال الصيانة اليومية للمحطة الرئيسية',
      attachments: ['تقرير_يومي_12-06.xlsx'],
      status: 'بانتظار تأكيد الاطلاع'
    },
    {
      id: 3,
      title: 'إدخال مركبة جديدة - شاحنة صيانة',
      type: 'إدخال مركبة',
      submittedBy: 'أحمد محمد - إدارة الأسطول',
      submissionDate: '2024-06-11',
      priority: 'منخفض',
      description: 'إدخال شاحنة صيانة جديدة للأسطول',
      attachments: ['وثائق_المركبة.pdf'],
      status: 'بانتظار تأكيد الاطلاع'
    }
  ];

  // طلبات تم تأكيد الاطلاع عليها
  const acknowledgedRequests = [
    {
      id: 4,
      title: 'بيان صيانة أسبوعي - محطة المعالجة',
      type: 'بيان صيانة أسبوعي',
      submittedBy: 'شركة التقنية المتقدمة',
      submissionDate: '2024-06-10',
      acknowledgmentDate: '2024-06-11',
      acknowledgedBy: 'م. سامي أحمد',
      status: 'تم تأكيد الاطلاع',
      notes: 'تم مراجعة البيان والموافقة على المتابعة للاعتماد'
    },
    {
      id: 5,
      title: 'تحديث بيانات مركبة موجودة',
      type: 'تحديث بيانات مركبة',
      submittedBy: 'فاطمة علي - إدارة الأسطول',
      submissionDate: '2024-06-09',
      acknowledgmentDate: '2024-06-10',
      acknowledgedBy: 'م. سامي أحمد',
      status: 'تم تأكيد الاطلاع'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عاجل':
        return 'bg-red-100 text-red-800';
      case 'عالي':
        return 'bg-orange-100 text-orange-800';
      case 'متوسط':
        return 'bg-blue-100 text-blue-800';
      case 'منخفض':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAcknowledge = (requestId: number) => {
    console.log(`Acknowledged request ${requestId}`, {
      notes: acknowledgmentNotes,
      timestamp: new Date().toISOString(),
      acknowledgedBy: 'م. سامي أحمد' // سيتم استبداله ببيانات المستخدم الفعلية
    });

    toast({
      title: "تم تأكيد الاطلاع",
      description: "تم تأكيد اطلاعك على الطلب بنجاح وإرساله للمدير للاعتماد النهائي",
      variant: "default"
    });

    setSelectedRequest(null);
    setAcknowledmentNotes('');
  };

  const handleRequestDetails = (requestId: number) => {
    console.log(`View details for request ${requestId}`);
    // هنا سيتم فتح تفاصيل الطلب
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Eye className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">تأكيد الاطلاع</h1>
          <p className="text-gray-600">مراجعة وتأكيد الاطلاع على الطلبات المرسلة</p>
        </div>
        <div className="mr-auto flex gap-2">
          <Badge variant="outline" className="text-orange-600">
            {pendingAcknowledgments.length} طلب في الانتظار
          </Badge>
        </div>
      </div>

      {/* بطاقة معلومات سير العمل */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800">سير عمل المراجعة</h3>
              <p className="text-sm text-blue-700 mt-1">
                بعد تأكيد اطلاعك على الطلب، سيتم إرساله تلقائياً إلى مدير الإدارة للاعتماد النهائي. 
                يمكنك إضافة ملاحظات توضيحية قبل التأكيد.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="pending" className="relative">
            في انتظار التأكيد
            {pendingAcknowledgments.length > 0 && (
              <span className="absolute -top-1 -left-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                {pendingAcknowledgments.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="acknowledged">تم التأكيد</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="space-y-4">
            {pendingAcknowledgments.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{request.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Building2 className="w-4 h-4" />
                        {request.submittedBy}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                      <Badge variant="outline" className="text-orange-600">
                        <Clock className="w-3 h-3 mr-1" />
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{request.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>تاريخ الإرسال: {request.submissionDate}</span>
                    </div>
                    <Badge variant="outline">{request.type}</Badge>
                  </div>

                  {request.attachments.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">المرفقات:</p>
                      <div className="flex flex-wrap gap-2">
                        {request.attachments.map((attachment, index) => (
                          <Badge key={index} variant="outline" className="gap-1">
                            <FileText className="w-3 h-3" />
                            {attachment}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      size="sm"
                      className="gap-2 bg-blue-600 hover:bg-blue-700"
                      onClick={() => setSelectedRequest(request.id)}
                    >
                      <CheckCircle className="w-4 h-4" />
                      تأكيد الاطلاع
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => handleRequestDetails(request.id)}
                    >
                      <Eye className="w-4 h-4" />
                      عرض التفاصيل
                    </Button>
                  </div>

                  {selectedRequest === request.id && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium mb-2">ملاحظات إضافية (اختياري):</h4>
                      <Textarea
                        value={acknowledgmentNotes}
                        onChange={(e) => setAcknowledmentNotes(e.target.value)}
                        placeholder="أضف أي ملاحظات أو توضيحات حول الطلب..."
                        className="mb-3"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleAcknowledge(request.id)}
                        >
                          تأكيد الاطلاع والإرسال للمدير
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedRequest(null);
                            setAcknowledmentNotes('');
                          }}
                        >
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="acknowledged" className="space-y-6">
          <div className="space-y-4">
            {acknowledgedRequests.map((request) => (
              <Card key={request.id} className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{request.title}</h3>
                        <p className="text-sm text-gray-600">{request.submittedBy}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {request.status}
                      </Badge>
                    </div>
                    
                    {request.notes && (
                      <div className="bg-white p-3 rounded border">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-800">ملاحظات التأكيد:</p>
                            <p className="text-sm text-gray-700">{request.notes}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>تاريخ الإرسال: {request.submissionDate}</span>
                      <span>تاريخ التأكيد: {request.acknowledgmentDate}</span>
                      <span>أكد بواسطة: {request.acknowledgedBy}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeAcknowledgment;
