
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { QualityMetric } from '../types/wastewater';

interface QualitySectionProps {
  qualityMetrics: QualityMetric[];
  getStatusColor: (status: string) => string;
}

const QualitySection: React.FC<QualitySectionProps> = ({ qualityMetrics, getStatusColor }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {qualityMetrics.map((metric, index) => (
        <Card key={index} className="border-l-4" style={{ borderLeftColor: metric.color }}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{metric.parameter}</span>
              <Badge className={getStatusColor(metric.status)}>
                {metric.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>القيمة الحالية:</span>
                <span className="font-bold">{metric.value} {metric.unit}</span>
              </div>
              <div className="flex justify-between">
                <span>المعيار المطلوب:</span>
                <span>أقل من {metric.standard} {metric.unit}</span>
              </div>
              <Progress 
                value={(metric.value / metric.standard) * 100} 
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QualitySection;
