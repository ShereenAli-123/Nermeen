
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { SystemOverview, YearlyData } from '../types/wastewater';

interface FinancialSectionProps {
  systemOverview: SystemOverview;
  yearlyData: YearlyData[];
}

const FinancialSection: React.FC<FinancialSectionProps> = ({ systemOverview, yearlyData }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>إجمالي الاستثمار</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{systemOverview.totalInvestment}</div>
            <p className="text-sm text-gray-600">مليون جنيه</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>متوسط التكلفة لكل محطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {Math.round(systemOverview.totalInvestment / systemOverview.totalPlants)}
            </div>
            <p className="text-sm text-gray-600">مليون جنيه</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>استهلاك الطاقة اليومي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{systemOverview.energyConsumption}</div>
            <p className="text-sm text-gray-600">كيلو واط/ساعة</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>نمو الاستثمار عبر السنوات</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="investment" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSection;
