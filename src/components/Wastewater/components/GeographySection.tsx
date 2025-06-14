
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { GovernorateData, SystemOverview } from '../types/wastewater';

interface GeographySectionProps {
  governorateData: GovernorateData[];
  systemOverview: SystemOverview;
}

const GeographySection: React.FC<GeographySectionProps> = ({ governorateData, systemOverview }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>التوزيع حسب المحافظات</CardTitle>
          <CardDescription>عدد المحطات والطاقة الإنتاجية في كل محافظة</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={governorateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="plants" fill="#3b82f6" />
              <Bar dataKey="capacity" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>المساحة الإجمالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{systemOverview.totalArea}</div>
            <p className="text-sm text-gray-600">فدان</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الغابات الشجرية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{systemOverview.forestedArea}</div>
            <p className="text-sm text-gray-600">فدان مشجر</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إنتاج الحمأة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{systemOverview.dailySludge}</div>
            <p className="text-sm text-gray-600">طن/يوم</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeographySection;
