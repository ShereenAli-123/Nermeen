
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Printer } from 'lucide-react';

interface StationReportData {
  id: number;
  reportDate: string;
  stationName: string;
  city: string;
  stationType: string;
  assignmentStatus: string;
  regulatoryApproval: string;
  technicalSignature: string;
  scientificSignature: string;
  progressPercentage: number;
  notes: string;
}

interface StationReportsTableProps {
  reportType: string;
  stationType: string;
  city?: string;
  station?: string;
  reportDate?: string;
}

const StationReportsTable: React.FC<StationReportsTableProps> = ({
  reportType,
  stationType,
  city,
  station,
  reportDate
}) => {
  // Sample data based on the images
  const sampleReports: StationReportData[] = [
    {
      id: 1,
      reportDate: '2023/1/15',
      stationName: 'محطة معالجة صرف صحي بحدائق أكتوبر',
      city: 'حدائق أكتوبر',
      stationType: 'محطة معالجة صرف',
      assignmentStatus: 'تم',
      regulatoryApproval: 'معتمد',
      technicalSignature: 'تم',
      scientificSignature: 'تم',
      progressPercentage: 85,
      notes: 'المشروع قيد التنفيذ وفقاً للجدول الزمني'
    },
    {
      id: 2,
      reportDate: '2023/4/20',
      stationName: 'محطة معالجة صرف صحي بحدائق أكتوبر',
      city: 'حدائق أكتوبر',
      stationType: 'محطة معالجة صرف',
      assignmentStatus: 'تم',
      regulatoryApproval: 'معتمد',
      technicalSignature: 'تم',
      scientificSignature: 'تم',
      progressPercentage: 92,
      notes: 'المشروع في مراحله النهائية'
    }
  ];

  const getFilteredReports = () => {
    let filtered = sampleReports;
    
    if (stationType) {
      filtered = filtered.filter(report => report.stationType === stationType);
    }
    
    if (city) {
      filtered = filtered.filter(report => report.city === city);
    }
    
    if (station) {
      filtered = filtered.filter(report => report.stationName.includes(station));
    }
    
    if (reportDate && reportType === 'single') {
      filtered = filtered.filter(report => report.reportDate === reportDate);
    }
    
    return filtered;
  };

  const filteredReports = getFilteredReports();

  const getReportTitle = () => {
    switch (reportType) {
      case 'single':
        return `تقرير موقف المحطة - ${station} - ${reportDate}`;
      case 'all':
        return `جميع التقارير التنفيذية - ${station}`;
      case 'type':
        return `تقرير جميع محطات ${stationType} - ${reportDate}`;
      default:
        return 'التقرير التنفيذي للمحطات';
    }
  };

  const getProgressBadge = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 70) return 'bg-blue-100 text-blue-800';
    if (percentage >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (filteredReports.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">لا توجد بيانات تنفيذية محفوظة للمعايير المحددة</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-blue-600">
              {getReportTitle()}
            </CardTitle>
            <CardDescription>
              عدد السجلات: {filteredReports.length}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              تصدير Excel
            </Button>
            <Button size="sm" className="gap-2">
              <Printer className="w-4 h-4" />
              طباعة
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead className="text-right font-bold">تاريخ التقرير</TableHead>
                <TableHead className="text-right font-bold">اسم المحطة</TableHead>
                <TableHead className="text-right font-bold">المدينة</TableHead>
                <TableHead className="text-right font-bold">نوع المحطة</TableHead>
                <TableHead className="text-right font-bold">موقف الإسناد</TableHead>
                <TableHead className="text-right font-bold">موافقة الجهة الرقابية</TableHead>
                <TableHead className="text-right font-bold">التوقيع الفني</TableHead>
                <TableHead className="text-right font-bold">التوقيع العلمي</TableHead>
                <TableHead className="text-right font-bold">نسبة الإنجاز</TableHead>
                <TableHead className="text-right font-bold">الملاحظات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-gray-50">
                  <TableCell className="text-right">{report.reportDate}</TableCell>
                  <TableCell className="text-right font-medium">{report.stationName}</TableCell>
                  <TableCell className="text-right">{report.city}</TableCell>
                  <TableCell className="text-right">{report.stationType}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={report.assignmentStatus === 'تم' ? 'default' : 'secondary'}>
                      {report.assignmentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={report.regulatoryApproval === 'معتمد' ? 'default' : 'secondary'}>
                      {report.regulatoryApproval}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={report.technicalSignature === 'تم' ? 'default' : 'secondary'}>
                      {report.technicalSignature}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={report.scientificSignature === 'تم' ? 'default' : 'secondary'}>
                      {report.scientificSignature}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className={getProgressBadge(report.progressPercentage)}>
                      {report.progressPercentage}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm">{report.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StationReportsTable;
