
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CompanyPerformance } from '../types/wastewater';

interface CompaniesSectionProps {
  companyPerformance: CompanyPerformance[];
  getStatusColor: (status: string) => string;
}

const CompaniesSection: React.FC<CompaniesSectionProps> = ({ companyPerformance, getStatusColor }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>أداء الشركات المنفذة</CardTitle>
        <CardDescription>تقييم أداء الشركات في التنفيذ والصيانة</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {companyPerformance.map((company, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium">{company.name}</h3>
                <p className="text-sm text-gray-600">{company.plants} محطة</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{company.efficiency}%</div>
                  <p className="text-xs text-gray-600">الكفاءة</p>
                </div>
                <Badge className={getStatusColor(company.maintenance)}>
                  {company.maintenance}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompaniesSection;
