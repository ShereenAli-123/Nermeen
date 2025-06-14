
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Download,
  Filter,
  Search,
  Calendar,
  MapPin,
  Droplets,
  TrendingUp,
  AlertCircle,
  Printer
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IrrigationConsumptionReportProps {
  userRole: string;
}

const IrrigationConsumptionReport: React.FC<IrrigationConsumptionReportProps> = ({ userRole }) => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedStation, setSelectedStation] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [showNoData, setShowNoData] = useState(false);
  const { toast } = useToast();

  // Sample irrigation consumption data
  const consumptionData = [
    {
      id: 1,
      date: '2024-01-14',
      station: 'محطة مياه الري الرئيسية',
      region: 'المركز',
      cropType: 'قمح',
      irrigatedArea: 1200,
      waterConsumption: 8500,
      efficiency: 85,
      status: 'نشط',
      farmer: 'أحمد محمد'
    },
    {
      id: 2,
      date: '2024-01-14',
      station: 'محطة مياه الري الشرقية',
      region: 'الشرق',
      cropType: 'ذرة',
      irrigatedArea: 800,
      waterConsumption: 6200,
      efficiency: 78,
      status: 'نشط',
      farmer: 'محمود علي'
    },
    {
      id: 3,
      date: '2024-01-14',
      station: 'محطة مياه الري الغربية',
      region: 'الغرب',
      cropType: 'أرز',
      irrigatedArea: 1500,
      waterConsumption: 12000,
      efficiency: 72,
      status: 'مراقبة',
      farmer: 'سعد إبراهيم'
    },
    {
      id: 4,
      date: '2024-01-13',
      station: 'محطة مياه الري الشمالية',
      region: 'الشمال',
      cropType: 'برسيم',
      irrigatedArea: 600,
      waterConsumption: 4800,
      efficiency: 88,
      status: 'نشط',
      farmer: 'خالد حسن'
    },
    {
      id: 5,
      date: '2024-01-13',
      station: 'محطة مياه الري الجنوبية',
      region: 'الجنوب',
      cropType: 'قطن',
      irrigatedArea: 900,
      waterConsumption: 7200,
      efficiency: 80,
      status: 'نشط',
      farmer: 'عمر فاروق'
    }
  ];

  const handleFilter = () => {
    if (!dateFrom && !dateTo && selectedStation === 'all' && selectedRegion === 'all' && !searchTerm) {
      setFilteredData(consumptionData);
      setShowNoData(false);
      return;
    }

    let filtered = consumptionData;

    // Filter by date range
    if (dateFrom || dateTo) {
      if (!dateFrom || !dateTo) {
        toast({
          title: "يرجى تحديد الفترة الزمنية",
          description: "يرجى إدخال تاريخ البداية والنهاية",
          variant: "destructive"
        });
        return;
      }
      
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        const fromDate = new Date(dateFrom);
        const toDate = new Date(dateTo);
        return itemDate >= fromDate && itemDate <= toDate;
      });
    }

    // Filter by station
    if (selectedStation !== 'all') {
      filtered = filtered.filter(item => item.station === selectedStation);
    }

    // Filter by region
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(item => item.region === selectedRegion);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.station.includes(searchTerm) || 
        item.region.includes(searchTerm) ||
        item.cropType.includes(searchTerm) ||
        item.farmer.includes(searchTerm)
      );
    }

    if (filtered.length === 0) {
      setShowNoData(true);
      toast({
        title: "لا توجد بيانات متاحة للفترة المحددة",
        description: "لا توجد بيانات متاحة للفترة أو المحطة المحددة",
        variant: "default"
      });
    } else {
      setShowNoData(false);
    }

    setFilteredData(filtered);
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    toast({
      title: "تم تحميل التقرير بنجاح",
      description: `تم تصدير التقرير بصيغة ${format === 'pdf' ? 'PDF' : 'Excel'}`,
      variant: "default"
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "تم إرسال التقرير للطباعة",
      description: "تم فتح واجهة الطباعة",
      variant: "default"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'نشط':
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
      case 'مراقبة':
        return <Badge className="bg-yellow-100 text-yellow-800">مراقبة</Badge>;
      case 'متوقف':
        return <Badge className="bg-red-100 text-red-800">متوقف</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-EG').format(num);
  };

  // Initialize with all data on component mount
  React.useEffect(() => {
    setFilteredData(consumptionData);
  }, []);

  const displayData = filteredData.length > 0 ? filteredData : consumptionData;

  // Check user permissions
  if (!['admin', 'manager', 'viewer'].includes(userRole)) {
    return (
      <div className="flex items-center justify-center h-64" dir="rtl">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">ليست لديك صلاحية الوصول</h3>
          <p className="text-gray-600">لا تملك الصلاحيات اللازمة لعرض هذا التقرير</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">تقرير استهلاكات مياه الري</h1>
          <p className="text-gray-600">عرض وتحليل استهلاكات مياه الري بحسب التاريخ والمحطة والمنطقة</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            طباعة
          </Button>
          <Button onClick={() => handleExport('excel')} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير Excel
          </Button>
          <Button onClick={() => handleExport('pdf')} className="gap-2">
            <Download className="w-4 h-4" />
            تصدير PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 mb-1">إجمالي المساحة المروية</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatNumber(displayData.reduce((sum, item) => sum + item.irrigatedArea, 0))}
                </p>
                <p className="text-sm text-blue-600">فدان</p>
              </div>
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 mb-1">إجمالي استهلاك المياه</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatNumber(displayData.reduce((sum, item) => sum + item.waterConsumption, 0))}
                </p>
                <p className="text-sm text-green-600">متر مكعب</p>
              </div>
              <Droplets className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 mb-1">عدد المحطات</p>
                <p className="text-2xl font-bold text-purple-900">{displayData.length}</p>
                <p className="text-sm text-purple-600">محطة</p>
              </div>
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 mb-1">متوسط الكفاءة</p>
                <p className="text-2xl font-bold text-orange-900">
                  {Math.round(displayData.reduce((sum, item) => sum + item.efficiency, 0) / displayData.length)}%
                </p>
                <p className="text-sm text-orange-600">كفاءة الري</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            تصفية البيانات
          </CardTitle>
          <CardDescription>
            قم بتحديد الفترة الزمنية أو المحطة أو المنطقة لتصفية البيانات
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">من تاريخ</label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">إلى تاريخ</label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">المحطة</label>
              <Select value={selectedStation} onValueChange={setSelectedStation}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المحطة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المحطات</SelectItem>
                  <SelectItem value="محطة مياه الري الرئيسية">محطة مياه الري الرئيسية</SelectItem>
                  <SelectItem value="محطة مياه الري الشرقية">محطة مياه الري الشرقية</SelectItem>
                  <SelectItem value="محطة مياه الري الغربية">محطة مياه الري الغربية</SelectItem>
                  <SelectItem value="محطة مياه الري الشمالية">محطة مياه الري الشمالية</SelectItem>
                  <SelectItem value="محطة مياه الري الجنوبية">محطة مياه الري الجنوبية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">المنطقة</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنطقة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المناطق</SelectItem>
                  <SelectItem value="المركز">المركز</SelectItem>
                  <SelectItem value="الشرق">الشرق</SelectItem>
                  <SelectItem value="الغرب">الغرب</SelectItem>
                  <SelectItem value="الشمال">الشمال</SelectItem>
                  <SelectItem value="الجنوب">الجنوب</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">البحث</label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="ابحث في المحطات أو المزارعين..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="flex items-end">
              <Button onClick={handleFilter} className="w-full gap-2">
                <Filter className="w-4 h-4" />
                تصفية
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>نتائج تقرير استهلاكات مياه الري</CardTitle>
          <CardDescription>
            {showNoData ? 'لا توجد بيانات متاحة للفترة أو المحطة المحددة' : `عرض ${displayData.length} نتيجة`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showNoData ? (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">لا توجد بيانات</h3>
              <p className="text-gray-500">لا توجد بيانات متاحة للفترة أو المحطة المحددة</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>المحطة</TableHead>
                  <TableHead>المنطقة</TableHead>
                  <TableHead>نوع المحصول</TableHead>
                  <TableHead>المساحة المروية (فدان)</TableHead>
                  <TableHead>استهلاك المياه (م³)</TableHead>
                  <TableHead>الكفاءة (%)</TableHead>
                  <TableHead>المزارع</TableHead>
                  <TableHead>الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {item.date}
                      </div>
                    </TableCell>
                    <TableCell>{item.station}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {item.region}
                      </div>
                    </TableCell>
                    <TableCell>{item.cropType}</TableCell>
                    <TableCell className="font-medium text-blue-600">
                      {formatNumber(item.irrigatedArea)}
                    </TableCell>
                    <TableCell className="font-medium text-green-600">
                      {formatNumber(item.waterConsumption)}
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${
                        item.efficiency >= 85 ? 'text-green-600' : 
                        item.efficiency >= 75 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {item.efficiency}%
                      </span>
                    </TableCell>
                    <TableCell>{item.farmer}</TableCell>
                    <TableCell>
                      {getStatusBadge(item.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IrrigationConsumptionReport;
