
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { MonthlyPerformance, QualityMetric } from '../types/wastewater';

interface PerformanceChartsProps {
  monthlyPerformance: MonthlyPerformance[];
  qualityMetrics: QualityMetric[];
  getStatusColor: (status: string) => string;
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ 
  monthlyPerformance, 
  qualityMetrics, 
  getStatusColor 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>الأداء الشهري</CardTitle>
          <CardDescription>كفاءة المعالجة والإنتاج خلال الأشهر الماضية</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="production" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>مؤشرات الجودة</CardTitle>
          <CardDescription>معايير جودة المياه المعالجة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {qualityMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{metric.parameter}</h4>
                  <p className="text-sm text-gray-600">المعيار: {metric.standard} {metric.unit}</p>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold" style={{ color: metric.color }}>
                    {metric.value} {metric.unit}
                  </div>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceCharts;
