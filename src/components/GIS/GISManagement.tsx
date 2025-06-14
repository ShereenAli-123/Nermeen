
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin,
  Plus,
  Layers,
  Download,
  Upload,
  Settings,
  Map,
  Globe,
  Satellite,
  Navigation
} from 'lucide-react';

const GISManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('maps');

  const mapLayers = [
    {
      id: 1,
      name: 'شبكة المياه الرئيسية',
      type: 'خطوط',
      visible: true,
      lastUpdate: '2024-06-10',
      coverage: '100%',
      status: 'محدث'
    },
    {
      id: 2,
      name: 'محطات المعالجة',
      type: 'نقاط',
      visible: true,
      lastUpdate: '2024-06-05',
      coverage: '100%',
      status: 'محدث'
    },
    {
      id: 3,
      name: 'شبكة الصرف الصحي',
      type: 'خطوط',
      visible: false,
      lastUpdate: '2024-05-28',
      coverage: '85%',
      status: 'يحتاج تحديث'
    },
    {
      id: 4,
      name: 'مناطق الري',
      type: 'مضلعات',
      visible: true,
      lastUpdate: '2024-06-08',
      coverage: '90%',
      status: 'محدث'
    }
  ];

  const projects = [
    {
      id: 1,
      name: 'مسح شبكة المياه الشرقية',
      progress: 75,
      startDate: '2024-05-01',
      endDate: '2024-07-30',
      team: 'فريق المسح أ',
      status: 'في التقدم'
    },
    {
      id: 2,
      name: 'تحديث خرائط الصرف الصحي',
      progress: 40,
      startDate: '2024-04-15',
      endDate: '2024-08-15',
      team: 'فريق المسح ب',
      status: 'في التقدم'
    },
    {
      id: 3,
      name: 'رقمنة شبكة الري التقليدية',
      progress: 90,
      startDate: '2024-03-01',
      endDate: '2024-06-30',
      team: 'فريق الرقمنة',
      status: 'شبه مكتمل'
    }
  ];

  const dataFiles = [
    {
      id: 1,
      name: 'شبكة_المياه_الرئيسية.shp',
      type: 'Shapefile',
      size: '12.5 MB',
      uploadDate: '2024-06-10',
      uploader: 'م. أحمد محمد'
    },
    {
      id: 2,
      name: 'محطات_المعالجة.kml',
      type: 'KML',
      size: '2.1 MB',
      uploadDate: '2024-06-08',
      uploader: 'م. فاطمة علي'
    },
    {
      id: 3,
      name: 'مناطق_الري.geojson',
      type: 'GeoJSON',
      size: '8.7 MB',
      uploadDate: '2024-06-05',
      uploader: 'م. محمود سالم'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'محدث':
        return 'bg-green-100 text-green-800';
      case 'يحتاج تحديث':
        return 'bg-yellow-100 text-yellow-800';
      case 'في التقدم':
        return 'bg-blue-100 text-blue-800';
      case 'شبه مكتمل':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">نظم المعلومات الجغرافية</h1>
          <p className="text-gray-600">إدارة الخرائط والطبقات الجغرافية</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة طبقة جديدة
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="maps">الخرائط</TabsTrigger>
          <TabsTrigger value="layers">الطبقات</TabsTrigger>
          <TabsTrigger value="projects">المشاريع</TabsTrigger>
          <TabsTrigger value="data">البيانات</TabsTrigger>
        </TabsList>

        <TabsContent value="maps" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>الخريطة التفاعلية</CardTitle>
                  <CardDescription>عرض شامل لجميع الطبقات والشبكات</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg">خريطة تفاعلية</p>
                      <p className="text-sm text-gray-500">عرض الطبقات والشبكات</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Globe className="w-4 h-4" />
                      عرض عام
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Satellite className="w-4 h-4" />
                      صور القمر الصناعي
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Navigation className="w-4 h-4" />
                      أدوات القياس
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>التحكم في الطبقات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mapLayers.map((layer) => (
                      <div key={layer.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={layer.visible} 
                            className="rounded"
                          />
                          <span className="text-sm font-medium">{layer.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {layer.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layers" className="space-y-6">
          <div className="grid gap-6">
            {mapLayers.map((layer) => (
              <Card key={layer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Layers className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{layer.name}</CardTitle>
                        <CardDescription>نوع الطبقة: {layer.type}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(layer.status)}>
                      {layer.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">آخر تحديث</p>
                      <p className="font-medium">{layer.lastUpdate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">التغطية</p>
                      <p className="font-medium">{layer.coverage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">الرؤية</p>
                      <p className="font-medium">{layer.visible ? 'مرئي' : 'مخفي'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">النوع</p>
                      <p className="font-medium">{layer.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Settings className="w-4 h-4" />
                      إعدادات
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      تصدير
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription>{project.team}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>التقدم</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">تاريخ البداية</p>
                        <p className="font-medium">{project.startDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">تاريخ الانتهاء</p>
                        <p className="font-medium">{project.endDate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>ملفات البيانات الجغرافية</CardTitle>
                  <CardDescription>إدارة ورفع الملفات الجغرافية</CardDescription>
                </div>
                <Button className="gap-2">
                  <Upload className="w-4 h-4" />
                  رفع ملف
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{file.name}</h3>
                      <p className="text-sm text-gray-600">النوع: {file.type} | الحجم: {file.size}</p>
                      <p className="text-sm text-gray-500">رفع بواسطة: {file.uploader} في {file.uploadDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        تحميل
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <MapPin className="w-4 h-4" />
                        عرض على الخريطة
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GISManagement;
