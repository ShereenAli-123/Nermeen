
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Printer } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import SystemOverviewCards from './components/SystemOverviewCards';
import OverviewCharts from './components/OverviewCharts';
import PerformanceCharts from './components/PerformanceCharts';
import GeographySection from './components/GeographySection';
import QualitySection from './components/QualitySection';
import CompaniesSection from './components/CompaniesSection';
import FinancialSection from './components/FinancialSection';
import {
  SystemOverview,
  TreatmentType,
  GovernorateData,
  YearlyData,
  MonthlyPerformance,
  QualityMetric,
  CompanyPerformance
} from './types/wastewater';

interface WastewaterDashboardProps {
  userRole?: string;
}

const WastewaterDashboard: React.FC<WastewaterDashboardProps> = ({ userRole = 'admin' }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات شاملة للنظام
  const systemOverview: SystemOverview = {
    totalPlants: 45,
    operatingPlants: 38,
    underMaintenance: 5,
    underConstruction: 2,
    totalCapacity: 2500,
    actualProduction: 2150,
    efficiency: 86,
    totalInvestment: 1250,
    totalArea: 850,
    forestedArea: 125,
    dailySludge: 45,
    energyConsumption: 2400
  };

  const treatmentTypes: TreatmentType[] = [
    { name: 'معالجة ثنائية', count: 28, capacity: 1400, color: '#3b82f6' },
    { name: 'معالجة ثلاثية', count: 17, capacity: 1100, color: '#10b981' }
  ];

  const governorateData: GovernorateData[] = [
    { name: 'القاهرة', plants: 12, capacity: 650, production: 580 },
    { name: 'الجيزة', plants: 8, capacity: 420, production: 380 },
    { name: 'الإسكندرية', plants: 6, capacity: 380, production: 340 },
    { name: 'الشرقية', plants: 10, capacity: 550, production: 480 },
    { name: 'أخرى', plants: 9, capacity: 500, production: 370 }
  ];

  const yearlyData: YearlyData[] = [
    { year: '2019', plants: 32, capacity: 1800, investment: 800 },
    { year: '2020', plants: 35, capacity: 2000, investment: 920 },
    { year: '2021', plants: 38, capacity: 2200, investment: 1050 },
    { year: '2022', plants: 42, capacity: 2350, investment: 1150 },
    { year: '2023', plants: 45, capacity: 2500, investment: 1250 }
  ];

  const monthlyPerformance: MonthlyPerformance[] = [
    { month: 'يناير', efficiency: 88, production: 2100 },
    { month: 'فبراير', efficiency: 85, production: 2050 },
    { month: 'مارس', efficiency: 90, production: 2200 },
    { month: 'أبريل', efficiency: 87, production: 2150 },
    { month: 'مايو', efficiency: 89, production: 2180 },
    { month: 'يونيو', efficiency: 86, production: 2150 }
  ];

  const qualityMetrics: QualityMetric[] = [
    { parameter: 'BOD', value: 15, standard: 20, unit: 'mg/L', status: 'ممتاز', color: '#10b981' },
    { parameter: 'TSS', value: 12, standard: 15, unit: 'mg/L', status: 'ممتاز', color: '#10b981' },
    { parameter: 'النيتروجين', value: 8, standard: 10, unit: 'mg/L', status: 'جيد', color: '#3b82f6' },
    { parameter: 'الفوسفور', value: 2.1, standard: 2, unit: 'mg/L', status: 'يحتاج تحسين', color: '#f59e0b' }
  ];

  const companyPerformance: CompanyPerformance[] = [
    { name: 'شركة المياه الدولية', plants: 12, efficiency: 92, maintenance: 'ممتاز' },
    { name: 'المقاولون العرب', plants: 8, efficiency: 88, maintenance: 'جيد' },
    { name: 'شركة الإنشاءات الحديثة', plants: 6, efficiency: 85, maintenance: 'متوسط' },
    { name: 'شركات أخرى', plants: 19, efficiency: 84, maintenance: 'متنوع' }
  ];

  const handleExport = (type: 'pdf' | 'excel') => {
    toast({
      title: "تم تصدير البيانات بنجاح",
      description: `تم تصدير التقرير الشامل بصيغة ${type.toUpperCase()}`,
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "طباعة التقرير",
      description: "تم إرسال التقرير الشامل للطابعة",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ممتاز': return 'bg-green-100 text-green-800';
      case 'جيد': return 'bg-blue-100 text-blue-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'يحتاج تحسين': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* رأس الصفحة */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">لوحة تحكم الصرف الصحي الشاملة</h2>
          <p className="text-gray-600 mt-1">نظرة شاملة على جميع محطات معالجة الصرف الصحي والأداء التشغيلي</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleExport('pdf')} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير PDF
          </Button>
          <Button onClick={() => handleExport('excel')} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير Excel
          </Button>
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            طباعة
          </Button>
        </div>
      </div>

      {/* علامات التبويب الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full max-w-4xl">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
          <TabsTrigger value="geography">التوزيع الجغرافي</TabsTrigger>
          <TabsTrigger value="quality">جودة المياه</TabsTrigger>
          <TabsTrigger value="companies">الشركات</TabsTrigger>
          <TabsTrigger value="financial">المالية</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-6">
          <SystemOverviewCards systemOverview={systemOverview} />
          <OverviewCharts treatmentTypes={treatmentTypes} yearlyData={yearlyData} />
        </TabsContent>

        {/* الأداء */}
        <TabsContent value="performance" className="space-y-6">
          <PerformanceCharts 
            monthlyPerformance={monthlyPerformance} 
            qualityMetrics={qualityMetrics}
            getStatusColor={getStatusColor}
          />
        </TabsContent>

        {/* التوزيع الجغرافي */}
        <TabsContent value="geography" className="space-y-6">
          <GeographySection governorateData={governorateData} systemOverview={systemOverview} />
        </TabsContent>

        {/* جودة المياه */}
        <TabsContent value="quality" className="space-y-6">
          <QualitySection qualityMetrics={qualityMetrics} getStatusColor={getStatusColor} />
        </TabsContent>

        {/* الشركات */}
        <TabsContent value="companies" className="space-y-6">
          <CompaniesSection companyPerformance={companyPerformance} getStatusColor={getStatusColor} />
        </TabsContent>

        {/* المالية */}
        <TabsContent value="financial" className="space-y-6">
          <FinancialSection systemOverview={systemOverview} yearlyData={yearlyData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WastewaterDashboard;
