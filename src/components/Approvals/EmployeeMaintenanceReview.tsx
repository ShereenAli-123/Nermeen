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
  AlertTriangle,
  Eye,
  Building2,
  Timer,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EmployeeMaintenanceReview: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject'>('approve');

  const pendingRequests = [
    {
      id: 1,
      title: 'تقرير صيانة يومي - محطة الضخ الرئيسية',
      type: 'صيانة يومية',
      submittedBy: 'شركة النخبة للصيانة',
      submissionDate: '2024-06-14',
      submissionTime: '09:30',
      deadline: '2024-06-15 09:30', // 24 hours for daily
      timeRemaining: '18 ساعة و 45 دقيقة',
      priority: 'عالي',
      description: 'تقرير أعمال الصيانة اليومية المنفذة بتاريخ 13-06-2024',
      attachments: ['تقرير_يومي_13-06.pdf', 'صور_الأعمال.zip'],
      status: 'في انتظار المراجعة الداخلية',
      station: 'محطة الضخ الرئيسية',
      department: 'إدارة الصرف الصحي'
    },
    {
      id: 2,
      title: 'بيان صيانة أسبوعي - المنطقة الشرقية',
      type: 'صيانة أسبوعية',
      submittedBy: 'شركة المثال للصيانة',
      submissionDate: '2024-06-13',
      submissionTime: '14:15',
      deadline: '2024-06-15 14:15', // 48 hours for weekly
      timeRemaining: '1 يوم و 12 ساعة',
      priority: 'متوسط',
      description: 'بيان أعمال الصيانة الأسبوعية للفترة من 06-06 إلى 12-06',
      attachments: ['بيان_أسبوعي_أسبوع25.xlsx'],
      status: 'في انتظار المراجعة الداخلية',
      station: 'شبكة المنطقة الشرقية',
      department: 'إدارة الصرف الصحي'
    },
    {
      id: 3,
      title: 'تقرير صيانة شهري - محطة المعالجة',
      type: 'صيانة شهرية',
      submittedBy: 'شركة الموارد الفنية',
      submissionDate: '2024-06-12',
      submissionTime: '11:00',
      deadline: '2024-06-14 11:00', // 48 hours for monthly
      timeRemaining: 'منتهي المهلة',
      priority: 'عاجل',
      description: 'تقرير الصيانة الشهرية لشهر مايو 2024',
      attachments: ['تقرير_شهري_مايو.pdf'],
      status: 'منتهي المهلة - لم يُراجع',
      station: 'محطة المعالجة المركزية',
      department: 'إدارة الصرف الصحي'
    }
  ];

  const reviewedRequests = [
    {
      id: 4,
      title: 'صيانة محطة الضخ الغربية',
      type: 'صيانة يومية',
      submittedBy: 'شركة التميز للصيانة',
      reviewDate: '2024-06-13',
      reviewedBy: 'م. أحمد محمد',
      status: 'في انتظار اعتماد المدير',
      action: 'اعتمد'
    },
    {
      id: 5,
      title: 'بيانات صيانة منطقة الجنوب',
      type: 'صيانة أسبوعية',
      submittedBy: 'شركة الصيانة المتقدمة',
      reviewDate: '2024-06-12',
      reviewedBy: 'م. فاطمة علي',
      status: 'مرفوض من الموظف',
      action: 'رفض',
      rejectionReason: 'البيانات المرفقة غير واضحة وتحتاج إعادة تنسيق'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عاجل':
        return 'bg-red-100 text-red-800';
      case 'عالي':
        return 'bg-noka-gold text-white';
      case 'متوسط':
        return 'bg-noka-beige text-noka-green-dark';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'في انتظار المراجعة الداخلية':
        return 'bg-noka-beige text-noka-green-dark';
      case 'في انتظار اعتماد المدير':
        return 'bg-noka-green-light text-white';
      case 'مرفوض من الموظف':
        return 'bg-red-100 text-red-800';
      case 'منتهي المهلة - لم يُراجع':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeRemainingColor = (timeRemaining: string) => {
    if (timeRemaining.includes('منتهي')) {
      return 'text-red-600';
    } else if (timeRemaining.includes('ساعة') && !timeRemaining.includes('يوم')) {
      return 'text-noka-gold';
    }
    return 'text-noka-green-medium';
  };

  const handleEmployeeReview = (requestId: number) => {
    if (reviewAction === 'approve') {
      console.log(`Employee approved request ${requestId}`, {
        reviewedBy: 'م. أحمد محمد', // سيتم استبداله ببيانات الموظف الفعلية
        reviewDate: new Date().toISOString(),
        nextStatus: 'في انتظار اعتماد المدير'
      });

      toast({
        title: "تم اعتماد الطلب وإحالته إلى مدير الإدارة",
        description: "تم إرسال الطلب للاعتماد النهائي من المدير",
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

      console.log(`Employee rejected request ${requestId}`, {
        reviewedBy: 'م. أحمد محمد', // سيتم استبداله ببيانات الموظف الفعلية
        reviewDate: new Date().toISOString(),
        rejectionReason: rejectionReason,
        nextStatus: 'مرفوض من الموظف'
      });

      toast({
        title: "تم رفض الطلب، و إعادة إرساله لشركة الصيانة",
        description: `سبب الرفض: ${rejectionReason}`,
        variant: "destructive"
      });
    }

    setSelectedRequest(null);
    setRejectionReason('');
    setReviewAction('approve');
  };

  const handleRequestDetails = (requestId: number) => {
    console.log(`View details for request ${requestId}`);
    // هنا سيتم فتح تفاصيل الطلب
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-noka-beige-light rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-noka-green-dark" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-noka-green-dark">مراجعة بيانات الصيانة</h1>
            <p className="text-noka-green-medium">مراجعة واعتماد طلبات الصيانة الواردة من الشركات</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-noka-gold border-noka-gold">
            {pendingRequests.filter(r => r.status === 'في انتظار المراجعة الداخلية').length} طلب للمراجعة
          </Badge>
          <Badge variant="outline" className="text-red-600 border-red-600">
            {pendingRequests.filter(r => r.timeRemaining === 'منتهي المهلة').length} منتهي المهلة
          </Badge>
        </div>
      </div>

      {/* بطاقة معلومات المهل الزمنية */}
      <Card className="bg-noka-beige-light border-noka-beige">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Timer className="w-5 h-5 text-noka-green-dark mt-0.5" />
            <div>
              <h3 className="font-medium text-noka-green-dark">المهل الزمنية للمراجعة</h3>
              <p className="text-sm text-noka-green-medium mt-1">
                الصيانة اليومية: 24 ساعة • الصيانة الأسبوعية والشهرية: 48 ساعة
                <br />
                يتم إخفاء الطلب من باقي الموظفين بمجرد مراجعته من أحد أعضاء الفريق.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md bg-noka-beige-light">
          <TabsTrigger value="pending" className="relative data-[state=active]:bg-noka-green-dark data-[state=active]:text-white">
            للمراجعة
            {pendingRequests.length > 0 && (
              <span className="absolute -top-1 -left-1 w-5 h-5 bg-noka-gold text-white text-xs rounded-full flex items-center justify-center">
                {pendingRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="reviewed" className="data-[state=active]:bg-noka-green-dark data-[state=active]:text-white">تمت المراجعة</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow border-noka-beige">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-noka-green-dark">{request.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1 text-noka-green-medium">
                        <Building2 className="w-4 h-4" />
                        {request.submittedBy} - {request.station}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-noka-green-dark">{request.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-noka-green-medium">
                      <Calendar className="w-4 h-4" />
                      <span>تاريخ الإرسال: {request.submissionDate} - {request.submissionTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className={getTimeRemainingColor(request.timeRemaining)}>
                        المتبقي: {request.timeRemaining}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-noka-gold text-noka-green-dark">{request.type}</Badge>
                    <Badge variant="outline" className="border-noka-gold text-noka-green-dark">{request.department}</Badge>
                  </div>

                  {request.attachments.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-noka-green-dark mb-2">المرفقات:</p>
                      <div className="flex flex-wrap gap-2">
                        {request.attachments.map((attachment, index) => (
                          <Badge key={index} variant="outline" className="gap-1 border-noka-beige text-noka-green-medium">
                            <FileText className="w-3 h-3" />
                            {attachment}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t border-noka-beige">
                    <Button
                      size="sm"
                      className="gap-2 bg-noka-green-dark hover:bg-noka-green-medium"
                      onClick={() => setSelectedRequest(request.id)}
                      disabled={request.status === 'منتهي المهلة - لم يُراجع'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      مراجعة وقرار
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-2 border-noka-gold text-noka-gold hover:bg-noka-gold hover:text-white"
                      onClick={() => handleRequestDetails(request.id)}
                    >
                      <Eye className="w-4 h-4" />
                      عرض التفاصيل
                    </Button>
                  </div>

                  {selectedRequest === request.id && (
                    <div className="mt-4 p-4 bg-noka-beige-light rounded-lg border border-noka-beige">
                      <h4 className="font-medium mb-3 text-noka-green-dark">مراجعة الطلب:</h4>
                      
                      <RadioGroup value={reviewAction} onValueChange={(value: 'approve' | 'reject') => setReviewAction(value)} className="mb-4">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="approve" id="approve" className="border-noka-green-dark" />
                          <Label htmlFor="approve" className="flex items-center gap-2 text-noka-green-dark">
                            <CheckCircle className="w-4 h-4 text-noka-green-medium" />
                            قبول وإحالة للمدير
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="reject" id="reject" className="border-noka-green-dark" />
                          <Label htmlFor="reject" className="flex items-center gap-2 text-noka-green-dark">
                            <XCircle className="w-4 h-4 text-red-600" />
                            رفض الطلب
                          </Label>
                        </div>
                      </RadioGroup>

                      {reviewAction === 'reject' && (
                        <div className="mb-4">
                          <Label htmlFor="rejectionReason" className="text-sm font-medium mb-2 block text-noka-green-dark">
                            سبب الرفض (إلزامي):
                          </Label>
                          <Textarea
                            id="rejectionReason"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="اكتب سبب رفض الطلب بالتفصيل..."
                            className="min-h-[80px] border-noka-beige focus:border-noka-gold"
                            required
                          />
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className={reviewAction === 'approve' ? 'bg-noka-green-medium hover:bg-noka-green-dark' : 'bg-red-600 hover:bg-red-700'}
                          onClick={() => handleEmployeeReview(request.id)}
                        >
                          {reviewAction === 'approve' ? (
                            <>
                              <ArrowRight className="w-4 h-4 mr-1" />
                              إحالة للمدير
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 mr-1" />
                              رفض الطلب
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-noka-gold text-noka-gold hover:bg-noka-gold hover:text-white"
                          onClick={() => {
                            setSelectedRequest(null);
                            setRejectionReason('');
                            setReviewAction('approve');
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

        <TabsContent value="reviewed" className="space-y-6">
          <div className="space-y-4">
            {reviewedRequests.map((request) => (
              <Card key={request.id} className={request.action === 'اعتمد' ? 'border-noka-green-light bg-noka-cream' : 'border-red-200 bg-red-50'}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-noka-green-dark">{request.title}</h3>
                        <p className="text-sm text-noka-green-medium">{request.submittedBy}</p>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.action === 'اعتمد' ? <CheckCircle className="w-4 h-4 mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
                        {request.status}
                      </Badge>
                    </div>

                    {request.rejectionReason && (
                      <div className="bg-white p-3 rounded border border-noka-beige">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-red-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-red-800">سبب الرفض:</p>
                            <p className="text-sm text-noka-green-dark">{request.rejectionReason}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-noka-green-medium">
                      <span>تاريخ المراجعة: {request.reviewDate}</span>
                      <span>راجع بواسطة: {request.reviewedBy}</span>
                      <Badge variant="outline" className="border-noka-gold text-noka-green-dark">{request.type}</Badge>
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

export default EmployeeMaintenanceReview;
