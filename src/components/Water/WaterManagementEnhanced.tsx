
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Droplets, 
  TrendingUp,
  BarChart3,
  Plus,
  FileText,
  Settings,
  Activity
} from 'lucide-react';
import ActionButton from '@/components/UI/ActionButton';
import StatusIndicator from '@/components/UI/StatusIndicator';
import BreadcrumbNavigation from '@/components/UI/BreadcrumbNavigation';

interface WaterManagementEnhancedProps {
  userRole?: string;
}

const WaterManagementEnhanced: React.FC<WaterManagementEnhancedProps> = ({ userRole = 'admin' }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // إحصائيات محسنة
  const waterStats = {
    totalConsumption: 2345,
    monthlyGrowth: 12.5,
    activeStations: 15,
    maintenanceAlerts: 3,
    efficiency: 94.2,
    coverage: 98.5
  };

  const breadcrumbItems = [
    { id: 'water', label: 'إدارة المياه', isActive: true }
  ];

  const quickActions = [
    {
      id: 'consumption-entry',
      label: 'إدخال استهلاك جديد',
      icon: Plus,
      variant: 'primary' as const,
      onClick: () => setActiveTab('consumption-entry')
    },
    {
      id: 'irrigation-entry',
      label: 'إدخال استهلاك ري',
      icon: Droplets,
      variant: 'secondary' as const,
      onClick: () => setActiveTab('irrigation-entry')
    },
    {
      id: 'network-monitoring',
      label: 'مراقبة الشبكة',
      icon: Activity,
      variant: 'secondary' as const,
      onClick: () => setActiveTab('network-monitoring')
    }
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNavigation items={breadcrumbItems} />
      
      {/* العنوان والإجراءات السريعة */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-noka-green-dark flex items-center gap-3">
            <Droplets className="w-8 h-8" />
            النظام المتكامل لإدارة المياه
          </h1>
          <p className="text-noka-text/70 mt-2">
            منصة شاملة لإدارة ومراقبة شبكات المياه والاستهلاك في جميع المحافظات
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {quickActions.map((action) => (
            <ActionButton
              key={action.id}
              variant={action.variant}
              icon={action.icon}
              onClick={action.onClick}
            >
              {action.label}
            </ActionButton>
          ))}
        </div>
      </div>

      {/* الإحصائيات المحسنة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-noka-green-dark bg-gradient-to-br from-noka-cream to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-noka-green-dark">{waterStats.totalConsumption}</p>
                <p className="text-noka-green-medium">إجمالي الاستهلاك (ألف م³)</p>
                <StatusIndicator status="success" label="طبيعي" size="sm" />
              </div>
              <Droplets className="w-12 h-12 text-noka-green-medium" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-noka-gold bg-gradient-to-br from-noka-beige-light to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-noka-green-dark">+{waterStats.monthlyGrowth}%</p>
                <p className="text-noka-green-medium">النمو الشهري</p>
                <StatusIndicator status="active" label="متزايد" size="sm" />
              </div>
              <TrendingUp className="w-12 h-12 text-noka-gold" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-noka-beige bg-gradient-to-br from-noka-cream to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-noka-green-dark">{waterStats.activeStations}</p>
                <p className="text-noka-green-medium">المحطات النشطة</p>
                <StatusIndicator status="active" label="تعمل" size="sm" />
              </div>
              <Settings className="w-12 h-12 text-noka-green-light" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-noka-green-dark">{waterStats.maintenanceAlerts}</p>
                <p className="text-noka-green-medium">تنبيهات الصيانة</p>
                <StatusIndicator status="warning" label="يتطلب انتباه" size="sm" />
              </div>
              <Activity className="w-12 h-12 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات المحسنة */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-noka-beige-light h-12">
          <TabsTrigger 
            value="overview" 
            className="flex items-center gap-2 data-[state=active]:bg-noka-green-dark data-[state=active]:text-white font-medium"
          >
            <BarChart3 className="w-4 h-4" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger 
            value="consumption-entry" 
            className="flex items-center gap-2 data-[state=active]:bg-noka-green-dark data-[state=active]:text-white font-medium"
          >
            <Plus className="w-4 h-4" />
            إدخال الاستهلاك
          </TabsTrigger>
          <TabsTrigger 
            value="irrigation-entry" 
            className="flex items-center gap-2 data-[state=active]:bg-noka-green-dark data-[state=active]:text-white font-medium"
          >
            <Droplets className="w-4 h-4" />
            استهلاك الري
          </TabsTrigger>
          <TabsTrigger 
            value="network-monitoring" 
            className="flex items-center gap-2 data-[state=active]:bg-noka-green-dark data-[state=active]:text-white font-medium"
          >
            <Activity className="w-4 h-4" />
            مراقبة الشبكة
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="flex items-center gap-2 data-[state=active]:bg-noka-green-dark data-[state=active]:text-white font-medium"
          >
            <FileText className="w-4 h-4" />
            التقارير
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-noka-beige">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-noka-green-dark">
                  <BarChart3 className="w-5 h-5" />
                  أداء النظام
                </CardTitle>
                <CardDescription>
                  مؤشرات الأداء الرئيسية لشبكة المياه
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-noka-beige-light rounded-lg">
                    <span className="font-medium text-noka-green-dark">كفاءة النظام</span>
                    <StatusIndicator 
                      status="success" 
                      label={`${waterStats.efficiency}%`} 
                      size="lg"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-noka-cream rounded-lg">
                    <span className="font-medium text-noka-green-dark">نسبة التغطية</span>
                    <StatusIndicator 
                      status="success" 
                      label={`${waterStats.coverage}%`} 
                      size="lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-noka-beige">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-noka-green-dark">
                  <Activity className="w-5 h-5" />
                  الإجراءات السريعة
                </CardTitle>
                <CardDescription>
                  الوصول السريع للعمليات الأكثر استخداماً
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action) => (
                    <ActionButton
                      key={action.id}
                      variant={action.variant}
                      icon={action.icon}
                      onClick={action.onClick}
                      fullWidth
                      className="justify-start"
                    >
                      {action.label}
                    </ActionButton>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="consumption-entry" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إدخال استهلاك المياه</CardTitle>
              <CardDescription>إدخال بيانات استهلاك المياه الجديدة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-noka-text/70">
                <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>سيتم إضافة نموذج إدخال استهلاك المياه هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="irrigation-entry" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إدخال استهلاك مياه الري</CardTitle>
              <CardDescription>إدخال بيانات استهلاك مياه الري</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-noka-text/70">
                <Droplets className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>سيتم إضافة نموذج إدخال استهلاك مياه الري هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network-monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>مراقبة الشبكة</CardTitle>
              <CardDescription>مراقبة حالة شبكة المياه في الوقت الفعلي</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-noka-text/70">
                <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>سيتم إضافة لوحة مراقبة الشبكة هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تقارير المياه</CardTitle>
              <CardDescription>تقارير شاملة عن استهلاك ومراقبة المياه</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-noka-text/70">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>سيتم إضافة صفحة التقارير هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WaterManagementEnhanced;
