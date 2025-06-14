import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  MapPin, 
  Settings, 
  Eye, 
  Edit,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Trash2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import StationOperationalUpdate from './StationOperationalUpdate';
import StationEditForm from './StationEditForm';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

interface PumpingStationsTableProps {
  userRole?: string;
}

interface PumpingStation {
  id: number;
  name: string;
  location: string;
  governorate: string;
  designCapacity: number;
  actualFlow: number;
  pumps: {
    total: number;
    working: number;
  };
  generators: {
    total: number;
    working: number;
  };
  status: 'تعمل' | 'تحت الصيانة' | 'متوقفة';
  efficiency: number;
  lastUpdate: string;
  operatingCompany: string;
}

const PumpingStationsTable: React.FC<PumpingStationsTableProps> = ({ userRole = 'admin' }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [stationToDelete, setStationToDelete] = useState<PumpingStation | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [stations, setStations] = useState<PumpingStation[]>([
    {
      id: 1,
      name: 'محطة رفع الصرف الصحي - القاهرة الجديدة',
      location: 'القاهرة الجديدة - التجمع الأول',
      governorate: 'القاهرة',
      designCapacity: 25000,
      actualFlow: 18500,
      pumps: { total: 4, working: 3 },
      generators: { total: 2, working: 2 },
      status: 'تعمل',
      efficiency: 74,
      lastUpdate: '2024-06-13',
      operatingCompany: 'شركة النخبة للصيانة'
    },
    {
      id: 2,
      name: 'محطة رفع الإسكندرية الرئيسية',
      location: 'الإسكندرية - سيدي جابر',
      governorate: 'الإسكندرية',
      designCapacity: 40000,
      actualFlow: 35200,
      pumps: { total: 6, working: 5 },
      generators: { total: 3, working: 3 },
      status: 'تعمل',
      efficiency: 88,
      lastUpdate: '2024-06-12',
      operatingCompany: 'شركة المثال للصيانة'
    },
    {
      id: 3,
      name: 'محطة رفع الدقهلية - المنصورة',
      location: 'المنصورة - وسط المدينة',
      governorate: 'الدقهلية',
      designCapacity: 15000,
      actualFlow: 0,
      pumps: { total: 3, working: 0 },
      generators: { total: 2, working: 1 },
      status: 'تحت الصيانة',
      efficiency: 0,
      lastUpdate: '2024-06-10',
      operatingCompany: 'شركة الموارد المائية'
    },
    {
      id: 4,
      name: 'محطة رفع الجيزة الغربية',
      location: 'الجيزة - المهندسين',
      governorate: 'الجيزة',
      designCapacity: 20000,
      actualFlow: 16800,
      pumps: { total: 4, working: 4 },
      generators: { total: 2, working: 2 },
      status: 'تعمل',
      efficiency: 84,
      lastUpdate: '2024-06-13',
      operatingCompany: 'شركة النخبة للصيانة'
    },
    {
      id: 5,
      name: 'محطة رفع قنا الجنوبية',
      location: 'قنا - حي المدينة',
      governorate: 'قنا',
      designCapacity: 12000,
      actualFlow: 0,
      pumps: { total: 2, working: 0 },
      generators: { total: 1, working: 0 },
      status: 'متوقفة',
      efficiency: 0,
      lastUpdate: '2024-06-08',
      operatingCompany: 'شركة الموارد المائية'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'تعمل':
        return <CheckCircle className="w-4 h-4" />;
      case 'تحت الصيانة':
        return <AlertTriangle className="w-4 h-4" />;
      case 'متوقفة':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'تعمل':
        return 'bg-green-100 text-green-800';
      case 'تحت الصيانة':
        return 'bg-yellow-100 text-yellow-800';
      case 'متوقفة':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return 'text-green-600';
    if (efficiency >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.governorate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStation = (stationId: number) => {
    setSelectedStation(stationId);
    setShowUpdateForm(true);
  };

  const handleEditStation = (stationId: number) => {
    if (userRole === 'viewer') {
      toast({
        title: "غير مصرح",
        description: "ليس لديك صلاحية تعديل بيانات المحطات",
        variant: "destructive",
      });
      return;
    }
    setSelectedStation(stationId);
    setShowEditForm(true);
  };

  const handleDeleteStation = (station: PumpingStation) => {
    if (userRole !== 'admin' && userRole !== 'department_head') {
      toast({
        title: "غير مصرح",
        description: "ليس لديك صلاحية حذف المحطات",
        variant: "destructive",
      });
      return;
    }
    setStationToDelete(station);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!stationToDelete) return;
    
    setIsDeleting(true);
    
    try {
      // محاكاة فحص البيانات المرتبطة
      const hasRelatedData = Math.random() > 0.5; // محاكاة
      
      if (hasRelatedData) {
        toast({
          title: "لا يمكن حذف المحطة لوجود بيانات مرتبطة بها",
          description: "يمكن أرشفة المحطة بدلاً من حذفها",
          variant: "destructive",
        });
        setShowDeleteDialog(false);
        return;
      }

      // محاكاة عملية الحذف
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStations(prev => prev.filter(s => s.id !== stationToDelete.id));
      
      toast({
        title: "تم حذف المحطة بنجاح",
        description: `تم حذف محطة ${stationToDelete.name} من النظام`,
      });
      
      setShowDeleteDialog(false);
    } catch (error) {
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف المحطة. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setStationToDelete(null);
    }
  };

  const handleSaveStation = (updatedStation: PumpingStation) => {
    setStations(prev => prev.map(s => s.id === updatedStation.id ? updatedStation : s));
    setShowEditForm(false);
    setSelectedStation(null);
  };

  const handleBackToTable = () => {
    setShowUpdateForm(false);
    setShowEditForm(false);
    setSelectedStation(null);
  };

  if (showUpdateForm && selectedStation) {
    const station = stations.find(s => s.id === selectedStation);
    return (
      <StationOperationalUpdate
        stationId={selectedStation}
        stationName={station?.name || ''}
        onBack={handleBackToTable}
      />
    );
  }

  if (showEditForm && selectedStation) {
    const station = stations.find(s => s.id === selectedStation);
    if (!station) return null;
    
    return (
      <StationEditForm
        station={station}
        onSave={handleSaveStation}
        onCancel={handleBackToTable}
      />
    );
  }

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            قائمة محطات رفع الصرف الصحي
          </CardTitle>
          <CardDescription>
            إدارة ومراقبة جميع محطات رفع الصرف الصحي في المحافظات
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* شريط البحث */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث عن محطة أو موقع..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          {/* جدول المحطات */}
          <div className="space-y-4">
            {filteredStations.map((station) => (
              <Card key={station.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{station.name}</h3>
                        <Badge className={getStatusColor(station.status)}>
                          {getStatusIcon(station.status)}
                          {station.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{station.location}</span>
                        </div>
                        
                        <div>
                          <span className="font-medium">الطاقة التصميمية:</span> {station.designCapacity.toLocaleString()} م³/يوم
                        </div>
                        
                        <div>
                          <span className="font-medium">التصرف الفعلي:</span> {station.actualFlow.toLocaleString()} م³/يوم
                        </div>
                        
                        <div>
                          <span className="font-medium">الكفاءة:</span> 
                          <span className={`font-bold ml-1 ${getEfficiencyColor(station.efficiency)}`}>
                            {station.efficiency}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span>الطلمبات:</span>
                          <span className="font-medium">{station.pumps.working}/{station.pumps.total}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span>المولدات:</span>
                          <span className="font-medium">{station.generators.working}/{station.generators.total}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span>آخر تحديث:</span>
                          <span className="font-medium">{station.lastUpdate}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">الشركة المشغلة:</span> {station.operatingCompany}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStation(station.id)}
                        className="gap-2 bg-blue-600 hover:bg-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                        تحديث
                      </Button>
                      
                      <Button size="sm" variant="outline" className="gap-2">
                        <Eye className="w-4 h-4" />
                        عرض
                      </Button>

                      {(userRole === 'admin' || userRole === 'department_head') && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditStation(station.id)}
                            className="gap-2 hover:bg-blue-50"
                          >
                            <Settings className="w-4 h-4" />
                            تعديل
                          </Button>

                          {userRole === 'admin' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteStation(station)}
                              className="gap-2 hover:bg-red-50 text-red-600 border-red-200"
                            >
                              <Trash2 className="w-4 h-4" />
                              حذف
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              لا توجد محطات تطابق معايير البحث
            </div>
          )}
        </CardContent>
      </Card>

      {/* نافذة تأكيد الحذف */}
      <ConfirmDeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setStationToDelete(null);
        }}
        onConfirm={confirmDelete}
        stationName={stationToDelete?.name || ''}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default PumpingStationsTable;
