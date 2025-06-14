
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera,
  Plus,
  MapPin,
  Activity,
  AlertCircle,
  CheckCircle,
  Settings,
  BarChart3,
  Eye,
  Monitor,
  PlayCircle,
  PauseCircle
} from 'lucide-react';

const CameraManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cameras');

  const cameras = [
    {
      id: 1,
      name: 'كاميرا محطة المعالجة الرئيسية',
      location: 'المحطة الرئيسية - البوابة الشرقية',
      status: 'نشط',
      type: 'HD 1080p',
      lastRecording: '2024-06-12 14:30',
      storage: '2.4 TB',
      isRecording: true
    },
    {
      id: 2,
      name: 'كاميرا شبكة المياه الشرقية',
      location: 'المنطقة الشرقية - نقطة التوزيع الرئيسية',
      status: 'نشط',
      type: '4K Ultra HD',
      lastRecording: '2024-06-12 14:25',
      storage: '3.1 TB',
      isRecording: true
    },
    {
      id: 3,
      name: 'كاميرا المضخة الجنوبية',
      location: 'المنطقة الجنوبية - محطة الضخ',
      status: 'غير متصل',
      type: 'HD 720p',
      lastRecording: '2024-06-10 09:15',
      storage: '1.8 TB',
      isRecording: false
    },
    {
      id: 4,
      name: 'كاميرا أمنية - المدخل الرئيسي',
      location: 'المبنى الإداري - المدخل الرئيسي',
      status: 'نشط',
      type: 'HD 1080p',
      lastRecording: '2024-06-12 14:35',
      storage: '2.9 TB',
      isRecording: true
    }
  ];

  const recordings = [
    {
      id: 1,
      camera: 'كاميرا محطة المعالجة الرئيسية',
      date: '2024-06-12',
      duration: '08:30:45',
      size: '4.5 GB',
      type: 'تسجيل يومي'
    },
    {
      id: 2,
      camera: 'كاميرا شبكة المياه الشرقية',
      date: '2024-06-12',
      duration: '08:28:12',
      size: '6.2 GB',
      type: 'تسجيل يومي'
    },
    {
      id: 3,
      camera: 'كاميرا أمنية - المدخل الرئيسي',
      date: '2024-06-11',
      duration: '24:00:00',
      size: '12.8 GB',
      type: 'تسجيل أمني'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط':
        return 'bg-green-100 text-green-800';
      case 'غير متصل':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">وحدة الكاميرات</h1>
          <p className="text-gray-600">مراقبة وإدارة كاميرات المراقبة</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة كاميرا جديدة
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="cameras">الكاميرات</TabsTrigger>
          <TabsTrigger value="live">البث المباشر</TabsTrigger>
          <TabsTrigger value="recordings">التسجيلات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="cameras" className="space-y-6">
          <div className="grid gap-6">
            {cameras.map((camera) => (
              <Card key={camera.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Camera className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{camera.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {camera.location}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {camera.isRecording && (
                        <div className="flex items-center gap-1 text-red-600">
                          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                          <span className="text-sm">تسجيل</span>
                        </div>
                      )}
                      <Badge className={getStatusColor(camera.status)}>
                        {camera.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">نوع الكاميرا</p>
                      <p className="font-medium">{camera.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">آخر تسجيل</p>
                      <p className="font-medium">{camera.lastRecording}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">مساحة التخزين</p>
                      <p className="font-medium">{camera.storage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">حالة التسجيل</p>
                      <p className="font-medium">{camera.isRecording ? 'يسجل الآن' : 'متوقف'}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Eye className="w-4 h-4" />
                      مشاهدة مباشرة
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      {camera.isRecording ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                      {camera.isRecording ? 'إيقاف التسجيل' : 'بدء التسجيل'}
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Settings className="w-4 h-4" />
                      إعدادات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cameras.filter(cam => cam.status === 'نشط').map((camera) => (
              <Card key={camera.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{camera.name}</CardTitle>
                  <CardDescription>{camera.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-48 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center text-white">
                      <Monitor className="w-12 h-12 mx-auto mb-2 opacity-70" />
                      <p>البث المباشر</p>
                      <p className="text-sm opacity-70">{camera.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      مشاهدة بملء الشاشة
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recordings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجل التسجيلات</CardTitle>
              <CardDescription>جميع التسجيلات المحفوظة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recordings.map((recording) => (
                  <div key={recording.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{recording.camera}</h3>
                      <p className="text-sm text-gray-600">{recording.type} - {recording.date}</p>
                      <p className="text-sm text-gray-500">المدة: {recording.duration} | الحجم: {recording.size}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        تشغيل
                      </Button>
                      <Button size="sm" variant="outline">
                        تحميل
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات التسجيل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">جودة التسجيل</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>1080p HD</option>
                    <option>4K Ultra HD</option>
                    <option>720p HD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">مدة الاحتفاظ بالتسجيلات</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>30 يوم</option>
                    <option>60 يوم</option>
                    <option>90 يوم</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إعدادات التنبيهات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>تنبيه انقطاع الاتصال</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span>تنبيه امتلاء التخزين</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span>تنبيه كشف الحركة</span>
                  <input type="checkbox" className="rounded" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CameraManagement;
