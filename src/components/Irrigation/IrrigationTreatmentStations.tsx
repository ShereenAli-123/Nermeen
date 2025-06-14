
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Filter,
  FileText,
  Printer,
  Download,
  Edit,
  Eye,
  Trash2,
  MapPin,
  Settings,
  AlertTriangle,
  Calendar,
  Building,
  Zap
} from 'lucide-react';

interface IrrigationTreatmentStationsProps {
  userRole?: string;
}

// بيانات تجريبية لمحطات المعالجة
const treatmentStationsData = [
  {
    id: 1,
    name: 'محطة معالجة الري المركزية الرئيسية',
    governorate: 'الرياض',
    city: 'الرياض',
    stationType: 'دائم',
    currentCapacity: 50000,
    targetCapacity: 75000,
    operatingCompany: 'شركة المياه الوطنية',
    supervisingConsultant: 'مكتب الاستشارات الهندسية المتقدمة',
    supervisionAuthority: 'هيئة تطوير وتأهيل المناطق الصحراوية',
    dischargeLines: '800 مم × 1200 م',
    generatorCount: 3,
    generatorCapacity: 1500,
    synchronizationExists: 'نعم',
    pumpCount: '6 مركبة / 4 عاملة / 2 احتياطية',
    pumpDischarge: 450,
    pumpPressure: 85,
    pumpBrand: 'Grundfos',
    operatingHours: 20,
    website: 'https://station1.gov.sa',
    serviceArea: 'شرق الرياض، حي الملك فهد، حي العليا',
    notes: 'محطة حديثة تعمل بكفاءة عالية'
  },
  {
    id: 2,
    name: 'محطة معالجة الري الشمالية',
    governorate: 'القصيم',
    city: 'بريدة',
    stationType: 'دائم',
    currentCapacity: 35000,
    targetCapacity: 50000,
    operatingCompany: 'شركة تطوير المياه',
    supervisingConsultant: 'المكتب الاستشاري للمياه والري',
    supervisionAuthority: 'هيئة تطوير وتأهيل المناطق الصحراوية',
    dischargeLines: '600 مم × 800 م',
    generatorCount: 2,
    generatorCapacity: 1200,
    synchronizationExists: 'نعم',
    pumpCount: '4 مركبة / 3 عاملة / 1 احتياطية',
    pumpDischarge: 380,
    pumpPressure: 75,
    pumpBrand: 'KSB',
    operatingHours: 18,
    website: 'https://station2.gov.sa',
    serviceArea: 'شمال بريدة، المنطقة الزراعية الأولى',
    notes: 'تحتاج صيانة دورية للمولدات'
  },
  {
    id: 3,
    name: 'محطة معالجة الري الجنوبية',
    governorate: 'نجران',
    city: 'نجران',
    stationType: 'مؤقت',
    currentCapacity: 25000,
    targetCapacity: 40000,
    operatingCompany: 'شركة المرافق البيئية',
    supervisingConsultant: 'بيت الخبرة للاستشارات',
    supervisionAuthority: 'هيئة تطوير وتأهيل المناطق الصحراوية',
    dischargeLines: '500 مم × 600 م',
    generatorCount: 2,
    generatorCapacity: 800,
    synchronizationExists: 'لا',
    pumpCount: '3 مركبة / 2 عاملة / 1 احتياطية',
    pumpDischarge: 320,
    pumpPressure: 65,
    pumpBrand: 'Flygt',
    operatingHours: 16,
    website: 'https://station3.gov.sa',
    serviceArea: 'وادي نجران، المنطقة الزراعية الجنوبية',
    notes: 'محطة مؤقتة، مخطط للتطوير'
  },
  {
    id: 4,
    name: 'محطة معالجة الري الغربية',
    governorate: 'مكة المكرمة',
    city: 'الطائف',
    stationType: 'دائم',
    currentCapacity: 42000,
    targetCapacity: 60000,
    operatingCompany: 'شركة المياه المتطورة',
    supervisingConsultant: 'مجموعة الاستشارات الفنية',
    supervisionAuthority: 'هيئة تطوير وتأهيل المناطق الصحراوية',
    dischargeLines: '700 مم × 950 م',
    generatorCount: 3,
    generatorCapacity: 1300,
    synchronizationExists: 'نعم',
    pumpCount: '5 مركبة / 4 عاملة / 1 احتياطية',
    pumpDischarge: 420,
    pumpPressure: 80,
    pumpBrand: 'Wilo',
    operatingHours: 22,
    website: 'https://station4.gov.sa',
    serviceArea: 'منطقة الطائف الزراعية، الأحياء الجنوبية',
    notes: 'أداء ممتاز، تعمل بكامل طاقتها'
  },
  {
    id: 5,
    name: 'محطة معالجة الري الشرقية',
    governorate: 'المنطقة الشرقية',
    city: 'الأحساء',
    stationType: 'دائم',
    currentCapacity: 60000,
    targetCapacity: 80000,
    operatingCompany: 'شركة الخدمات المائية المتقدمة',
    supervisingConsultant: 'المؤسسة الاستشارية للمياه',
    supervisionAuthority: 'هيئة تطوير وتأهيل المناطق الصحراوية',
    dischargeLines: '900 مم × 1500 م',
    generatorCount: 4,
    generatorCapacity: 2000,
    synchronizationExists: 'نعم',
    pumpCount: '8 مركبة / 6 عاملة / 2 احتياطية',
    pumpDischarge: 500,
    pumpPressure: 90,
    pumpBrand: 'Sulzer',
    operatingHours: 24,
    website: 'https://station5.gov.sa',
    serviceArea: 'واحة الأحساء، المناطق الزراعية الشرقية',
    notes: 'أكبر محطة في المنطقة، تعمل على مدار الساعة'
  }
];

const IrrigationTreatmentStations: React.FC<IrrigationTreatmentStationsProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [governorateFilter, setGovernorateFilter] = useState('all');
  const [stationTypeFilter, setStationTypeFilter] = useState('all');
  const [operatingCompanyFilter, setOperatingCompanyFilter] = useState('all');

  // تصفية البيانات
  const filteredStations = treatmentStationsData.filter(station => {
    const matchesSearch = 
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.operatingCompany.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGovernorate = governorateFilter === 'all' || station.governorate === governorateFilter;
    const matchesStationType = stationTypeFilter === 'all' || station.stationType === stationTypeFilter;
    const matchesOperatingCompany = operatingCompanyFilter === 'all' || station.operatingCompany === operatingCompanyFilter;
    
    return matchesSearch && matchesGovernorate && matchesStationType && matchesOperatingCompany;
  });

  // حساب الإحصائيات
  const totalStations = treatmentStationsData.length;
  const permanentStations = treatmentStationsData.filter(s => s.stationType === 'دائم').length;
  const temporaryStations = treatmentStationsData.filter(s => s.stationType === 'مؤقت').length;
  const totalCurrentCapacity = treatmentStationsData.reduce((sum, s) => sum + s.currentCapacity, 0);
  const totalTargetCapacity = treatmentStationsData.reduce((sum, s) => sum + s.targetCapacity, 0);
  const avgEfficiency = Math.round((totalCurrentCapacity / totalTargetCapacity) * 100);

  // قوائم الخيارات للفلترة
  const governorates = [...new Set(treatmentStationsData.map(s => s.governorate))];
  const stationTypes = [...new Set(treatmentStationsData.map(s => s.stationType))];
  const operatingCompanies = [...new Set(treatmentStationsData.map(s => s.operatingCompany))];

  const handleExportToExcel = () => {
    console.log('تصدير إلى Excel');
    // سيتم تطبيق التصدير لاحقاً
  };

  const handleExportToPDF = () => {
    console.log('تصدير إلى PDF');
    // سيتم تطبيق التصدير لاحقاً
  };

  const handlePrint = () => {
    console.log('طباعة التقرير');
    window.print();
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">محطات معالجة الري</h1>
          <p className="text-gray-600 mt-2">عرض وإدارة محطات معالجة مياه الري</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          آخر تحديث: {new Date().toLocaleString('ar-EG')}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-r-4 border-r-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المحطات</CardTitle>
            <Building className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalStations}</div>
            <p className="text-xs text-gray-600">محطة معالجة</p>
          </CardContent>
        </Card>

        <Card className="border-r-4 border-r-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المحطات الدائمة</CardTitle>
            <Settings className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{permanentStations}</div>
            <p className="text-xs text-gray-600">
              {Math.round((permanentStations / totalStations) * 100)}% من الإجمالي
            </p>
          </CardContent>
        </Card>

        <Card className="border-r-4 border-r-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الطاقة الحالية</CardTitle>
            <Zap className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {totalCurrentCapacity.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">م³/يوم</p>
          </CardContent>
        </Card>

        <Card className="border-r-4 border-r-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">كفاءة التشغيل</CardTitle>
            <AlertTriangle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{avgEfficiency}%</div>
            <p className="text-xs text-gray-600">نسبة الطاقة المستغلة</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            البحث والتصفية المتقدمة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* البحث العام */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في أسماء المحطات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* فلتر المحافظة */}
            <select
              value={governorateFilter}
              onChange={(e) => setGovernorateFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">جميع المحافظات</option>
              {governorates.map(gov => (
                <option key={gov} value={gov}>{gov}</option>
              ))}
            </select>

            {/* فلتر نوع المحطة */}
            <select
              value={stationTypeFilter}
              onChange={(e) => setStationTypeFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">جميع الأنواع</option>
              {stationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* فلتر الشركة المشغلة */}
            <select
              value={operatingCompanyFilter}
              onChange={(e) => setOperatingCompanyFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">جميع الشركات</option>
              {operatingCompanies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>

            {/* أزرار التصدير */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportToExcel}
                className="flex items-center gap-1"
              >
                <FileText className="w-4 h-4" />
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportToPDF}
                className="flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="flex items-center gap-1"
              >
                <Printer className="w-4 h-4" />
                طباعة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              عرض {filteredStations.length} من أصل {totalStations} محطة
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">المحطات المؤقتة: {temporaryStations}</Badge>
              <Badge variant="outline">المحطات الدائمة: {permanentStations}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Stations Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة محطات معالجة الري</CardTitle>
          <CardDescription>
            عرض تفصيلي لجميع محطات معالجة مياه الري
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredStations.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نتائج مطابقة</h3>
              <p className="text-gray-600">لا توجد محطات مطابقة لخيارات الفلترة المحددة</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اسم المحطة</TableHead>
                    <TableHead className="text-right">المحافظة</TableHead>
                    <TableHead className="text-right">المدينة</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">الطاقة الحالية</TableHead>
                    <TableHead className="text-right">طاقة الهدف</TableHead>
                    <TableHead className="text-right">الشركة المشغلة</TableHead>
                    <TableHead className="text-right">ساعات التشغيل</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStations.map((station) => (
                    <TableRow key={station.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{station.name}</TableCell>
                      <TableCell>{station.governorate}</TableCell>
                      <TableCell>{station.city}</TableCell>
                      <TableCell>
                        <Badge variant={station.stationType === 'دائم' ? 'default' : 'secondary'}>
                          {station.stationType}
                        </Badge>
                      </TableCell>
                      <TableCell>{station.currentCapacity.toLocaleString()} م³/يوم</TableCell>
                      <TableCell>{station.targetCapacity.toLocaleString()} م³/يوم</TableCell>
                      <TableCell className="max-w-xs truncate">{station.operatingCompany}</TableCell>
                      <TableCell>{station.operatingHours} ساعة</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" title="عرض التفاصيل">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {(userRole === 'admin' || userRole === 'department_head' || userRole === 'employee') && (
                            <>
                              <Button variant="outline" size="sm" title="تعديل">
                                <Edit className="w-4 h-4" />
                              </Button>
                              {userRole === 'admin' && (
                                <Button variant="outline" size="sm" title="حذف">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {(userRole === 'admin' || userRole === 'department_head' || userRole === 'employee') && (
        <Card>
          <CardHeader>
            <CardTitle>الإجراءات السريعة</CardTitle>
            <CardDescription>أدوات سريعة لإدارة محطات معالجة الري</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="p-4 h-auto flex flex-col items-center gap-2">
                <Building className="w-6 h-6 text-blue-600" />
                <span className="font-medium">إضافة محطة</span>
              </Button>
              <Button variant="outline" className="p-4 h-auto flex flex-col items-center gap-2">
                <Settings className="w-6 h-6 text-green-600" />
                <span className="font-medium">إعدادات التشغيل</span>
              </Button>
              <Button variant="outline" className="p-4 h-auto flex flex-col items-center gap-2">
                <MapPin className="w-6 h-6 text-purple-600" />
                <span className="font-medium">عرض الخريطة</span>
              </Button>
              <Button variant="outline" className="p-4 h-auto flex flex-col items-center gap-2">
                <FileText className="w-6 h-6 text-orange-600" />
                <span className="font-medium">تقرير شامل</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IrrigationTreatmentStations;
