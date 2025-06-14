import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  User,
  Calendar,
  MessageSquare,
  Eye,
  ArrowLeft,
  Shield,
  AlertCircle,
  Building2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EmployeeAcknowledgment from './EmployeeAcknowledgment';
import EmployeeMaintenanceReview from './EmployeeMaintenanceReview';

const ApprovalWorkflow: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [currentView, setCurrentView] = useState<'approval' | 'acknowledgment' | 'employee-review'>('approval');
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');

  const pendingRequests = [
    {
      id: 1,
      title: 'بيان صيانة شركة النخبة للفترة من 01-06 إلى 15-06',
      type: 'بيان صيانة مجمع',
      submittedBy: 'شركة النخبة للصيانة',
      department: 'إدارة الصيانة',
      submissionDate: '2024-06-12',
      reviewDate: '2024-06-13',
      reviewedBy: 'م. سامي أحمد',
      priority: 'عالي',
      description: 'بيان مجمع لأعمال الصيانة المنفذة في المحطات الشرقية',
      attachments: ['بيان_الصيانة_يونيو.pdf'],
      status: 'في انتظار اعتماد المدير',
      employeeNotes: 'تم مراجعة البيان والموافقة على المتابعة للاعتماد'
    },
    {
      id: 2,
      title: 'تقرير صيانة يومي - محطة الضخ الرئيسية',
      type: 'تقرير صيانة يومي',
      submittedBy: 'شركة المثال للصيانة',
      department: 'إدارة الصيانة',
      submissionDate: '2024-06-12',
      reviewDate: '2024-06-13',
      reviewedBy: 'م. أحمد محمد',
      priority: 'متوسط',
      description: 'تقرير أعمال الصيانة اليومية للمحطة الرئيسية',
      attachments: ['تقرير_يومي_12-06.xlsx'],
      status: 'في انتظار اعتماد المدير'
    },
    {
      id: 3,
      title: 'بيانات استهلاك المنطقة الجنوبية',
      type: 'إدخال بيانات استهلاك',
      submittedBy: 'شركة الموارد المائية',
      department: 'إدارة المياه',
      submissionDate: '2024-06-11',
      reviewDate: '2024-06-12',
      reviewedBy: 'م. فاطمة علي',
      priority: 'عالي',
      description: 'بيانات استهلاك المياه للمنطقة الجنوبية للربع الثاني',
      attachments: ['استهلاك_الجنوبية_Q2.xlsx'],
      status: 'في انتظار اعتماد المدير'
    }
  ];

  const approvedRequests = [
    {
      id: 4,
      title: 'بيانات استهلاك المنطقة الشرقية',
      type: 'إدخال بيانات',
      submittedBy: 'محمود علي',
      department: 'إدارة المياه',
      submissionDate: '2024-06-10',
      approvalDate: '2024-06-11',
      approvedBy: 'م. سامي محمد',
      status: 'معتمد'
    },
    {
      id: 5,
      title: 'صيانة محطة الضخ الغربية',
      type: 'طلب صيانة',
      submittedBy: 'نادية حسن',
      department: 'إدارة الصيانة',
      submissionDate: '2024-06-09',
      approvalDate: '2024-06-10',
      approvedBy: 'م. أحمد فاروق',
      status: 'معتمد'
    }
  ];

  const rejectedRequests = [
    {
      id: 6,
      title: 'بيانات غير مكتملة للمحطة الثانوية',
      type: 'إدخال بيانات',
      submittedBy: 'ياسر محمد',
      department: 'إدارة المياه',
      submissionDate: '2024-06-08',
      rejectionDate: '2024-06-09',
      rejectedBy: 'م. فاطمة أحمد',
      rejectionReason: 'البيانات المرفقة غير مكتملة ونقص في المرفقات المطلوبة',
      status: 'مرفوض من المدير'
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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'في انتظار اعتماد المدير':
        return 'bg-orange-100 text-orange-800';
      case 'معتمد':
        return 'bg-green-100 text-green-800';
      case 'مرفوض من المدير':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleManagerDecision = (requestId: number) => {
    if (approvalAction === 'approve') {
      console.log(`Manager approved request ${requestId}`, {
        approvedBy: 'م. سامي محمد', // سيتم استبداله ببيانات المدير الفعلية
        approvalDate: new Date().toISOString(),
        finalStatus: 'معتمد'
      });

      toast({
        title: "تم اعتماد الطلب بنجاح",
        description: "تم اعتماد الطلب وإرسال إشعار لمقدم الطلب",
        variant: "default"
      });
    } else {
      if (!rejectionReason.trim()) {
        toast({
          title: "خطأ",
          description: "يرجى إدخال سبب الرفض",
          variant: "destructive"
        });
        return;
      }

      console.log(`Manager rejected request ${requestId}`, {
        rejectedBy: 'م. سامي محمد', // سيتم استبداله ببيانات المدير الفعلية
        rejectionDate: new Date().toISOString(),
        rejectionReason: rejectionReason,
        finalStatus: 'مرفوض من المدير'
      });

      toast({
        title: "تم رفض الطلب من قبل المدير",
        description: `سبب الرفض: ${rejectionReason}. يرجى إعادة رفع تقرير الصيانة`,
        variant: "destructive"
      });
    }

    setSelectedRequest(null);
    setRejectionReason('');
    setApprovalAction('approve');
  };

  const handleRequestDetails = (requestId: number) => {
    console.log(`View details for request ${requestId}`);
    // هنا سيتم فتح تفاصيل الطلب
  };

  if (currentView === 'acknowledgment') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => setCurrentView('approval')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
        <EmployeeAcknowledgment />
      </div>
    );
  }

  if (currentView === 'employee-review') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => setCurrentView('approval')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
        <EmployeeMaintenanceReview />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">الاعتماد النهائي للمدير</h1>
            <p className="text-gray-600">مراجعة واعتماد الطلبات النهائية</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setCurrentView('employee-review')}
          >
            <Building2 className="w-4 h-4" />
            مراجعة الموظفين
          </Button>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setCurrentView('acknowledgment')}
          >
            <Eye className="w-4 h-4" />
            تأكيد الاطلاع
          </Button>
          <Badge variant="outline" className="text-orange-600">
            {pendingRequests.length} طلب للاعتماد
          </Badge>
        </div>
      </div>

      {/* بطاقة معلومات سير العمل */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-purple-800">سير عمل الاعتماد النهائي</h3>
              <p className="text-sm text-purple-700 mt-1">
                هذه الطلبات تم مراجعتها من قبل الموظفين وهي الآن بانتظار اعتمادك النهائي. 
                بعد اعتمادك ستصبح البيانات متاحة في النظام والتقارير الرسمية.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="pending" className="relative">
            للاعتماد
            {pendingRequests.length > 0 && (
              <span className="absolute -top-1 -left-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                {pendingRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">معتمد</TabsTrigger>
          <TabsTrigger value="rejected">مرفوض</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow border-orange-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{request.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <User className="w-4 h-4" />
                        {request.submittedBy} - {request.department}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                      <Badge className={getStatusColor(request.status)}>
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
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>تاريخ المراجعة: {request.reviewDate}</span>
                    </div>
                    <Badge variant="outline">{request.type}</Badge>
                  </div>

                  {request.reviewedBy && (
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="text-sm font-medium text-blue-800">تمت المراجعة بواسطة: {request.reviewedBy}</p>
                      {request.employeeNotes && (
                        <p className="text-sm text-blue-700 mt-1">ملاحظات المراجع: {request.employeeNotes}</p>
                      )}
                    </div>
                  )}

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
                      className="gap-2 bg-purple-600 hover:bg-purple-700"
                      onClick={() => setSelectedRequest(request.id)}
                    >
                      <Shield className="w-4 h-4" />
                      اتخاذ قرار
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
                    <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-medium mb-3">قرار الاعتماد النهائي:</h4>
                      
                      <RadioGroup value={approvalAction} onValueChange={(value: 'approve' | 'reject') => setApprovalAction(value)} className="mb-4">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="approve" id="approve" />
                          <Label htmlFor="approve" className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            اعتماد نهائي
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="reject" id="reject" />
                          <Label htmlFor="reject" className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-600" />
                            رفض
                          </Label>
                        </div>
                      </RadioGroup>

                      {approvalAction === 'reject' && (
                        <div className="mb-4">
                          <Label htmlFor="rejectionReason" className="text-sm font-medium mb-2 block">
                            سبب الرفض (إلزامي):
                          </Label>
                          <Textarea
                            id="rejectionReason"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="اكتب سبب رفض الطلب بالتفصيل..."
                            className="min-h-[80px]"
                            required
                          />
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className={approvalAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                          onClick={() => handleManagerDecision(request.id)}
                        >
                          {approvalAction === 'approve' ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              اعتماد نهائي
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 mr-1" />
                              رفض نهائي
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedRequest(null);
                            setRejectionReason('');
                            setApprovalAction('approve');
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

        <TabsContent value="approved" className="space-y-6">
          <div className="space-y-4">
            {approvedRequests.map((request) => (
              <Card key={request.id} className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{request.title}</h3>
                      <p className="text-sm text-gray-600">{request.submittedBy} - {request.department}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span>تاريخ الإرسال: {request.submissionDate}</span>
                        <span>تاريخ الاعتماد: {request.approvalDate}</span>
                        <span>اعتمد بواسطة: {request.approvedBy}</span>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {request.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-6">
          <div className="space-y-4">
            {rejectedRequests.map((request) => (
              <Card key={request.id} className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{request.title}</h3>
                        <p className="text-sm text-gray-600">{request.submittedBy} - {request.department}</p>
                      </div>
                      <Badge className="bg-red-100 text-red-800">
                        <XCircle className="w-4 h-4 mr-1" />
                        {request.status}
                      </Badge>
                    </div>
                    
                    <div className="bg-white p-3 rounded border">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-red-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-800">سبب الرفض:</p>
                          <p className="text-sm text-gray-700">{request.rejectionReason}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>تاريخ الإرسال: {request.submissionDate}</span>
                      <span>تاريخ الرفض: {request.rejectionDate}</span>
                      <span>رفض بواسطة: {request.rejectedBy}</span>
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

export default ApprovalWorkflow;
