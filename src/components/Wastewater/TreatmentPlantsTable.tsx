
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Printer,
  MapPin,
  Calendar,
  DollarSign,
  TreePine,
  ChevronDown,
  SortAsc,
  SortDesc,
  Building,
  Factory,
  Users,
  Camera
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface TreatmentPlant {
  id: number;
  name: string;
  treatmentType: string;
  executingCompany: string;
  maintenanceCompany: string;
  operationYear: number;
  designCapacity: number;
  actualProduction: number;
  coordinates: { e: number; n: number };
  area: number;
  forestArea?: number;
  cost: number;
  status: string;
  expansionPlan: string;
  sludgeAmount: number;
  sludgeDisposal: string;
  constructionStartYear: number;
  photographyStatus: string;
  locationLink: string;
  city: string;
  governorate: string;
}

interface TreatmentPlantsTableProps {
  userRole?: string;
}

const TreatmentPlantsTable: React.FC<TreatmentPlantsTableProps> = ({ userRole = 'admin' }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof TreatmentPlant>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTreatmentType, setFilterTreatmentType] = useState<string>('all');
  const [filterGovernorate, setFilterGovernorate] = useState<string>('all');
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // بيانات شاملة ومحدثة لمحطات المعالجة
  const treatmentPlants: TreatmentPlant[] = [
    {
      id: 1,
      name: 'محطة معالجة الصرف الصحي الرئيسية',
      treatmentType: 'ثلاثي',
      executingCompany: 'شركة المياه الدولية',
      maintenanceCompany: 'شركة الصيانة المتقدمة',
      operationYear: 2018,
      designCapacity: 150,
      actualProduction: 128,
      coordinates: { e: 31.2156, n: 29.9553 },
      area: 25,
      forestArea: 5,
      cost: 85,
      status: 'تعمل',
      expansionPlan: 'مخطط 2025',
      sludgeAmount: 12,
      sludgeDisposal: 'تجفيف ميكانيكي',
      constructionStartYear: 2015,
      photographyStatus: 'تم التصوير',
      locationLink: 'https://maps.google.com/...',
      city: 'القاهرة',
      governorate: 'القاهرة'
    },
    {
      id: 2,
      name: 'محطة معالجة الشرقية المتطورة',
      treatmentType: 'ثنائي',
      executingCompany: 'المقاولون العرب',
      maintenanceCompany: 'شركة البيئة النظيفة',
      operationYear: 2020,
      designCapacity: 80,
      actualProduction: 65,
      coordinates: { e: 31.7364, n: 30.5965 },
      area: 15,
      forestArea: 3,
      cost: 45,
      status: 'تعمل',
      expansionPlan: 'لا يوجد',
      sludgeAmount: 8,
      sludgeDisposal: 'تجفيف طبيعي',
      constructionStartYear: 2017,
      photographyStatus: 'جاري التصوير',
      locationLink: 'https://maps.google.com/...',
      city: 'الزقازيق',
      governorate: 'الشرقية'
    },
    {
      id: 3,
      name: 'محطة الرفع الجنوبية',
      treatmentType: 'ثنائي',
      executingCompany: 'شركة الإنشاءات الحديثة',
      maintenanceCompany: 'نفس الشركة المنفذة',
      operationYear: 2019,
      designCapacity: 50,
      actualProduction: 0,
      coordinates: { e: 31.2001, n: 29.8739 },
      area: 10,
      cost: 30,
      status: 'تحت الصيانة',
      expansionPlan: 'مخطط 2024',
      sludgeAmount: 0,
      sludgeDisposal: 'تجفيف طبيعي',
      constructionStartYear: 2016,
      photographyStatus: 'لم يتم التصوير',
      locationLink: 'https://maps.google.com/...',
      city: 'الجيزة',
      governorate: 'الجيزة'
    },
    {
      id: 4,
      name: 'محطة معالجة الإسكندرية الكبرى',
      treatmentType: 'ثلاثي',
      executingCompany: 'شركة أوراسكوم للإنشاء',
      maintenanceCompany: 'شركة التشغيل والصيانة المتخصصة',
      operationYear: 2021,
      designCapacity: 200,
      actualProduction: 180,
      coordinates: { e: 29.9187, n: 31.2001 },
      area: 35,
      forestArea: 8,
      cost: 120,
      status: 'تعمل',
      expansionPlan: 'مخطط 2026',
      sludgeAmount: 18,
      sludgeDisposal: 'تجفيف ميكانيكي',
      constructionStartYear: 2018,
      photographyStatus: 'تم التصوير',
      locationLink: 'https://maps.google.com/...',
      city: 'الإسكندرية',
      governorate: 'الإسكندرية'
    },
    {
      id: 5,
      name: 'محطة معالجة الدقهلية الحديثة',
      treatmentType: 'ثنائي',
      executingCompany: 'شركة حسن علام',
      maintenanceCompany: 'شركة الدقهلية للصيانة',
      operationYear: 2022,
      designCapacity: 60,
      actualProduction: 55,
      coordinates: { e: 31.4165, n: 31.0444 },
      area: 12,
      forestArea: 2,
      cost: 35,
      status: 'تعمل',
      expansionPlan: 'لا يوجد',
      sludgeAmount: 6,
      sludgeDisposal: 'تجفيف طبيعي',
      constructionStartYear: 2019,
      photographyStatus: 'تم التصوير',
      locationLink: 'https://maps.google.com/...',
      city: 'المنصورة',
      governorate: 'الدقهلية'
    },
    {
      id: 6,
      name: 'محطة معالجة أسوان الجديدة',
      treatmentType: 'ثلاثي',
      executingCompany: 'شركة المقاولات المصرية',
      maintenanceCompany: 'شركة الصعيد للصيانة',
      operationYear: 2023,
      designCapacity: 40,
      actualProduction: 35,
      coordinates: { e: 32.8998, n: 24.0889 },
      area: 8,
      forestArea: 1,
      cost: 28,
      status: 'تعمل',
      expansionPlan: 'مخطط 2027',
      sludgeAmount: 4,
      sludgeDisposal: 'تجفيف ميكانيكي',
      constructionStartYear: 2020,
      photographyStatus: 'جاري التصوير',
      locationLink: 'https://maps.google.com/...',
      city: 'أسوان',
      governorate: 'أسوان'
    }
  ];

  // فلترة وترتيب البيانات
  const filteredAndSortedData = useMemo(() => {
    let filtered = treatmentPlants.filter((plant) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = (
        plant.name.toLowerCase().includes(searchLower) ||
        plant.treatmentType.toLowerCase().includes(searchLower) ||
        plant.executingCompany.toLowerCase().includes(searchLower) ||
        plant.maintenanceCompany.toLowerCase().includes(searchLower) ||
        plant.status.toLowerCase().includes(searchLower) ||
        plant.city.toLowerCase().includes(searchLower) ||
        plant.governorate.toLowerCase().includes(searchLower) ||
        plant.operationYear.toString().includes(searchLower) ||
        plant.designCapacity.toString().includes(searchLower) ||
        plant.actualProduction.toString().includes(searchLower) ||
        plant.sludgeDisposal.toLowerCase().includes(searchLower) ||
        plant.expansionPlan.toLowerCase().includes(searchLower)
      );

      const matchesStatus = filterStatus === 'all' || plant.status === filterStatus;
      const matchesTreatmentType = filterTreatmentType === 'all' || plant.treatmentType === filterTreatmentType;
      const matchesGovernorate = filterGovernorate === 'all' || plant.governorate === filterGovernorate;

      return matchesSearch && matchesStatus && matchesTreatmentType && matchesGovernorate;
    });

    // ترتيب البيانات
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection, filterStatus, filterTreatmentType, filterGovernorate]);

  // تقسيم البيانات للصفحات
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handleSort = (field: keyof TreatmentPlant) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleEdit = (plant: TreatmentPlant) => {
    if (userRole === 'viewer') {
      toast({
        title: "غير مصرح",
        description: "ليس لديك صلاحية تنفيذ هذا الإجراء",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "تعديل المحطة",
      description: `فتح شاشة تعديل ${plant.name}`,
    });
  };

  const handleDelete = (plant: TreatmentPlant) => {
    if (userRole !== 'admin') {
      toast({
        title: "غير مصرح",
        description: "ليس لديك صلاحية تنفيذ هذا الإجراء",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "حذف المحطة",
      description: `تم حذف ${plant.name}`,
      variant: "destructive",
    });
  };

  const handleView = (plant: TreatmentPlant) => {
    toast({
      title: "عرض التفاصيل",
      description: `عرض تفاصيل ${plant.name}`,
    });
  };

  const handleExport = (format: 'excel' | 'pdf') => {
    toast({
      title: "تم تصدير البيانات بنجاح",
      description: `تم تصدير ${filteredAndSortedData.length} محطة بصيغة ${format.toUpperCase()}`,
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "طباعة البيانات",
      description: "تم إرسال البيانات للطابعة",
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterTreatmentType('all');
    setFilterGovernorate('all');
    setCurrentPage(1);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'تعمل':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">تعمل</Badge>;
      case 'تحت الصيانة':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">تحت الصيانة</Badge>;
      case 'متوقفة':
        return <Badge variant="destructive">متوقفة</Badge>;
      case 'تحت الإنشاء':
        return <Badge variant="secondary">تحت الإنشاء</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTreatmentTypeBadge = (type: string) => {
    return type === 'ثلاثي' 
      ? <Badge className="bg-blue-100 text-blue-800">ثلاثي</Badge>
      : <Badge className="bg-purple-100 text-purple-800">ثنائي</Badge>;
  };

  const getPhotographyBadge = (status: string) => {
    switch (status) {
      case 'تم التصوير':
        return <Badge className="bg-green-100 text-green-800">تم التصوير</Badge>;
      case 'جاري التصوير':
        return <Badge className="bg-yellow-100 text-yellow-800">جاري التصوير</Badge>;
      case 'لم يتم التصوير':
        return <Badge className="bg-red-100 text-red-800">لم يتم التصوير</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // الحصول على القيم الفريدة للفلاتر
  const uniqueStatuses = [...new Set(treatmentPlants.map(p => p.status))];
  const uniqueTreatmentTypes = [...new Set(treatmentPlants.map(p => p.treatmentType))];
  const uniqueGovernorates = [...new Set(treatmentPlants.map(p => p.governorate))];

  return (
    <div className="space-y-6" dir="rtl">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-l from-blue-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">محطات المعالجة الشاملة</CardTitle>
              <CardDescription className="text-gray-600">
                قائمة تفصيلية بجميع محطات معالجة الصرف الصحي ({filteredAndSortedData.length} من {treatmentPlants.length} محطة)
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleExport('excel')} variant="outline" size="sm" className="gap-2 hover:bg-green-50">
                <Download className="w-4 h-4" />
                Excel
              </Button>
              <Button onClick={() => handleExport('pdf')} variant="outline" size="sm" className="gap-2 hover:bg-red-50">
                <Download className="w-4 h-4" />
                PDF
              </Button>
              <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2 hover:bg-blue-50">
                <Printer className="w-4 h-4" />
                طباعة
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* شريط البحث والفلترة المتقدم */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث في جميع الحقول (اسم المحطة، نوع المعالجة، الشركة، السنة، الحالة، إلخ)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 border-gray-300 focus:border-blue-500"
                />
              </div>
              <Button 
                onClick={clearFilters} 
                variant="outline" 
                size="sm"
                className="whitespace-nowrap hover:bg-gray-50"
              >
                مسح الفلاتر
              </Button>
            </div>

            {/* فلاتر متقدمة */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="فلترة حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  {uniqueStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterTreatmentType} onValueChange={setFilterTreatmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="نوع المعالجة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  {uniqueTreatmentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterGovernorate} onValueChange={setFilterGovernorate}>
                <SelectTrigger>
                  <SelectValue placeholder="المحافظة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المحافظات</SelectItem>
                  {uniqueGovernorates.map(gov => (
                    <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 عناصر</SelectItem>
                  <SelectItem value="10">10 عناصر</SelectItem>
                  <SelectItem value="25">25 عنصر</SelectItem>
                  <SelectItem value="50">50 عنصر</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* الجدول */}
          {filteredAndSortedData.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                <Factory className="w-full h-full" />
              </div>
              <p className="text-gray-500 text-lg">لا توجد محطات مطابقة لخيارات الفلترة</p>
              <Button onClick={clearFilters} variant="outline" className="mt-4">
                مسح الفلاتر وإعادة المحاولة
              </Button>
            </div>
          ) : (
            <>
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleSort('name')}
                        >
                          <div className="flex items-center gap-2">
                            اسم المحطة
                            {sortField === 'name' && (
                              sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleSort('treatmentType')}
                        >
                          <div className="flex items-center gap-2">
                            نوع المعالجة
                            {sortField === 'treatmentType' && (
                              sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead>الشركة المنفذة</TableHead>
                        <TableHead>شركة الصيانة</TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleSort('operationYear')}
                        >
                          <div className="flex items-center gap-2">
                            سنة التشغيل
                            {sortField === 'operationYear' && (
                              sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead>الطاقة/الإنتاج</TableHead>
                        <TableHead>المساحة/الغابات</TableHead>
                        <TableHead>التكلفة</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الحمأة</TableHead>
                        <TableHead>التصوير</TableHead>
                        <TableHead>المحافظة</TableHead>
                        <TableHead>العمليات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.map((plant) => (
                        <TableRow key={plant.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell className="font-medium min-w-[200px]">
                            <div>
                              <div className="font-semibold text-gray-900">{plant.name}</div>
                              <div className="text-sm text-gray-500">{plant.city}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getTreatmentTypeBadge(plant.treatmentType)}
                          </TableCell>
                          <TableCell className="min-w-[150px]">
                            <div className="text-sm">
                              <div className="font-medium">{plant.executingCompany}</div>
                              <div className="text-gray-500 text-xs">منذ {plant.constructionStartYear}</div>
                            </div>
                          </TableCell>
                          <TableCell className="min-w-[150px]">
                            <div className="text-sm">{plant.maintenanceCompany}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              <Badge variant="outline" className="mb-1">{plant.operationYear}</Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm space-y-1">
                              <div><span className="text-blue-600 font-medium">{plant.designCapacity}</span> ألف م³</div>
                              <div><span className="text-green-600 font-medium">{plant.actualProduction}</span> فعلي</div>
                              <div className="text-xs text-gray-500">
                                {Math.round((plant.actualProduction / plant.designCapacity) * 100)}% كفاءة
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm space-y-1">
                              <div><span className="font-medium">{plant.area}</span> فدان</div>
                              {plant.forestArea && (
                                <div className="flex items-center gap-1 text-green-600">
                                  <TreePine className="w-3 h-3" />
                                  <span>{plant.forestArea} مشجر</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium text-green-600">{plant.cost} مليون</div>
                              <div className="text-xs text-gray-500">جنيه</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(plant.status)}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm space-y-1">
                              <div><span className="font-medium">{plant.sludgeAmount}</span> طن/يوم</div>
                              <div className="text-xs text-gray-500">{plant.sludgeDisposal}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getPhotographyBadge(plant.photographyStatus)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{plant.governorate}</Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>العمليات المتاحة</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleView(plant)} className="gap-2">
                                  <Eye className="w-4 h-4" />
                                  عرض التفاصيل الكاملة
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => window.open(plant.locationLink, '_blank')} 
                                  className="gap-2"
                                >
                                  <MapPin className="w-4 h-4" />
                                  عرض الموقع ({plant.coordinates.e.toFixed(4)}, {plant.coordinates.n.toFixed(4)})
                                </DropdownMenuItem>
                                {(userRole === 'admin' || userRole === 'department_head') && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleEdit(plant)} className="gap-2">
                                      <Edit className="w-4 h-4" />
                                      تعديل البيانات
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {userRole === 'admin' && (
                                  <DropdownMenuItem 
                                    onClick={() => handleDelete(plant)}
                                    className="gap-2 text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    حذف المحطة
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* معلومات الترقيم والتنقل */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>عرض</span>
                  <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>
                  <span>إلى</span>
                  <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)}</span>
                  <span>من</span>
                  <span className="font-medium">{filteredAndSortedData.length}</span>
                  <span>نتيجة</span>
                </div>

                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-gray-100'}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNumber;
                        if (totalPages <= 5) {
                          pageNumber = i + 1;
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i;
                        } else {
                          pageNumber = currentPage - 2 + i;
                        }
                        
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              onClick={() => setCurrentPage(pageNumber)}
                              isActive={currentPage === pageNumber}
                              className="cursor-pointer"
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-gray-100'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TreatmentPlantsTable;
