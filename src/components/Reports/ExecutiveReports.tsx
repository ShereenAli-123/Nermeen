
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { FileText, Printer, Trash2, Calendar, MapPin, Building } from 'lucide-react';
import StationReportsTable from './StationReportsTable';

const ExecutiveReports: React.FC = () => {
  const { toast } = useToast();
  const [reportDate, setReportDate] = useState('');
  const [stationType1, setStationType1] = useState('');
  const [city1, setCity1] = useState('');
  const [station1, setStation1] = useState('');
  
  const [stationType2, setStationType2] = useState('');
  const [reportDate2, setReportDate2] = useState('');
  
  const [stationType3, setStationType3] = useState('');
  const [city3, setCity3] = useState('');
  const [station3, setStation3] = useState('');

  // State for showing reports
  const [showReport, setShowReport] = useState(false);
  const [currentReportType, setCurrentReportType] = useState('');
  const [reportData, setReportData] = useState({
    type: '',
    stationType: '',
    city: '',
    station: '',
    reportDate: ''
  });

  // Sample data
  const stationTypes = [
    'محطة معالجة صرف',
    'محطة رفع صرف',
    'محطة رفع ري',
    'محطة معالجة مياه'
  ];

  const cities = [
    'القاهرة',
    'الجيزة',
    'الإسكندرية',
    'أسوان',
    'الأقصر',
    'حدائق أكتوبر'
  ];

  const stations = [
    'محطة الجبل الأصفر',
    'محطة حدائق أكتوبر',
    'محطة الزاوية الحمراء',
    'محطة كفر الدوار',
    'محطة معالجة صرف صحي بحدائق أكتوبر'
  ];

  const validateSection1 = () => {
    if (!stationType1 || !city1 || !station1 || !reportDate) {
      toast({
        title: "تحذير",
        description: "يرجى اختيار المحطة والتاريخ",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateSection2 = () => {
    if (!stationType2 || !reportDate2) {
      toast({
        title: "تحذير", 
        description: "يرجى اختيار نوع المحطة والتاريخ",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateSection3 = () => {
    if (!stationType3 || !city3 || !station3) {
      toast({
        title: "تحذير",
        description: "يرجى اختيار المحطة والمدينة",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handlePrintStationReport = () => {
    if (validateSection1()) {
      setReportData({
        type: 'single',
        stationType: stationType1,
        city: city1,
        station: station1,
        reportDate: reportDate
      });
      setCurrentReportType('single');
      setShowReport(true);
      toast({
        title: "تم توليد التقرير بنجاح",
        description: "تم عرض موقف المحطة في التاريخ المحدد",
        variant: "default"
      });
    }
  };

  const handleDeleteExecutiveReport = () => {
    if (validateSection1()) {
      toast({
        title: "تم الحذف",
        description: "تم حذف الموقف التنفيذي بنجاح",
        variant: "default"
      });
      console.log('حذف الموقف التنفيذي:', { stationType1, city1, station1, reportDate });
    }
  };

  const handlePrintAllStationsReport = () => {
    if (validateSection2()) {
      setReportData({
        type: 'type',
        stationType: stationType2,
        city: '',
        station: '',
        reportDate: reportDate2
      });
      setCurrentReportType('type');
      setShowReport(true);
      toast({
        title: "تم توليد التقرير بنجاح",
        description: "تم عرض موقف جميع المحطات من النوع المحدد",
        variant: "default"
      });
    }
  };

  const handlePrintStationStatus = () => {
    if (validateSection3()) {
      setReportData({
        type: 'all',
        stationType: stationType3,
        city: city3,
        station: station3,
        reportDate: ''
      });
      setCurrentReportType('all');
      setShowReport(true);
      toast({
        title: "تم توليد التقرير بنجاح",
        description: "تم عرض جميع التقارير التنفيذية للمحطة",
        variant: "default"
      });
    }
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">التقارير التنفيذية للمحطات</h1>
          <p className="text-gray-600">تقارير الأعمال الجاري طرحها ومتابعة المواقف التنفيذية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            تقارير أرشيفية
          </Button>
          {showReport && (
            <Button variant="outline" onClick={() => setShowReport(false)} className="gap-2">
              <FileText className="w-4 h-4" />
              إخفاء التقرير
            </Button>
          )}
        </div>
      </div>

      {showReport && (
        <StationReportsTable
          reportType={reportData.type}
          stationType={reportData.stationType}
          city={reportData.city}
          station={reportData.station}
          reportDate={reportData.reportDate}
        />
      )}

      <div className="grid gap-6">
        {/* Section 1: طباعة بيان محطة واحدة / حذف الموقف التنفيذي */}
        <Card className="border-r-4 border-r-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <FileText className="w-5 h-5" />
              طباعة بيان محطة واحدة / حذف الموقف التنفيذي
            </CardTitle>
            <CardDescription>
              طباعة بيانات محطة محددة أو حذف الموقف التنفيذي لها
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stationType1">نوع المحطة</Label>
                <Select value={stationType1} onValueChange={setStationType1}>
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
                <Label htmlFor="city1">المدينة</Label>
                <Select value={city1} onValueChange={setCity1}>
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
                <Label htmlFor="station1">اسم المحطة</Label>
                <Select value={station1} onValueChange={setStation1}>
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

              <div className="space-y-2">
                <Label htmlFor="reportDate">تاريخ التقرير</Label>
                <Input
                  id="reportDate"
                  type="date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handlePrintStationReport} className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Printer className="w-4 h-4" />
                طباعة موقف المحطة
              </Button>
              <Button 
                onClick={handleDeleteExecutiveReport} 
                variant="destructive" 
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                حذف الموقف التنفيذي
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: طباعة بيانات لكل محطات من نوع معين */}
        <Card className="border-r-4 border-r-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <Building className="w-5 h-5" />
              طباعة بيانات لكل محطات من نوع معين
            </CardTitle>
            <CardDescription>
              طباعة تقرير شامل لجميع المحطات من نوع محدد
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stationType2">نوع المحطة</Label>
                <Select value={stationType2} onValueChange={setStationType2}>
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
                <Label htmlFor="reportDate2">تاريخ التقرير</Label>
                <Input
                  id="reportDate2"
                  type="date"
                  value={reportDate2}
                  onChange={(e) => setReportDate2(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handlePrintAllStationsReport} 
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                <Printer className="w-4 h-4" />
                طباعة موقف المحطات
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: طباعة كل الموقف الخاص بالمحطة */}
        <Card className="border-r-4 border-r-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <MapPin className="w-5 h-5" />
              طباعة كل الموقف الخاص بالمحطة
            </CardTitle>
            <CardDescription>
              طباعة الموقف التنفيذي الكامل لمحطة محددة
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stationType3">نوع المحطة</Label>
                <Select value={stationType3} onValueChange={setStationType3}>
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
                <Label htmlFor="city3">المدينة</Label>
                <Select value={city3} onValueChange={setCity3}>
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
                <Label htmlFor="station3">اسم المحطة</Label>
                <Select value={station3} onValueChange={setStation3}>
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

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handlePrintStationStatus} 
                className="gap-2 bg-purple-600 hover:bg-purple-700"
              >
                <Printer className="w-4 h-4" />
                طباعة
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExecutiveReports;
