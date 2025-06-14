
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Factory, Droplets, Gauge, DollarSign } from 'lucide-react';
import { SystemOverview } from '../types/wastewater';

interface SystemOverviewCardsProps {
  systemOverview: SystemOverview;
}

const SystemOverviewCards: React.FC<SystemOverviewCardsProps> = ({ systemOverview }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-800">إجمالي المحطات</CardTitle>
          <Factory className="h-5 w-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">{systemOverview.totalPlants}</div>
          <p className="text-xs text-blue-600 mt-1">
            <span className="text-green-600">{systemOverview.operatingPlants} تعمل</span> • 
            <span className="text-yellow-600 mr-2">{systemOverview.underMaintenance} صيانة</span>
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800">الطاقة الإجمالية</CardTitle>
          <Droplets className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">{systemOverview.totalCapacity.toLocaleString()}</div>
          <p className="text-xs text-green-600">ألف م³/يوم</p>
          <Progress value={(systemOverview.actualProduction / systemOverview.totalCapacity) * 100} className="mt-2" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-800">كفاءة النظام</CardTitle>
          <Gauge className="h-5 w-5 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900">{systemOverview.efficiency}%</div>
          <p className="text-xs text-purple-600">متوسط الكفاءة التشغيلية</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-800">الاستثمار الإجمالي</CardTitle>
          <DollarSign className="h-5 w-5 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-900">{systemOverview.totalInvestment}</div>
          <p className="text-xs text-orange-600">مليون جنيه</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemOverviewCards;
