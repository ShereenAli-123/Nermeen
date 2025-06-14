
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users,
  Plus,
  Search,
  UserCheck,
  UserX,
  Settings,
  Shield,
  Edit,
  Trash2,
  Key
} from 'lucide-react';

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 1,
      name: 'أحمد محمد علي',
      email: 'ahmed.mohamed@nuca.gov.eg',
      role: 'admin',
      department: 'إدارة النظم',
      status: 'نشط',
      lastLogin: '2024-06-12 14:30',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'فاطمة أحمد سالم',
      email: 'fatma.ahmed@nuca.gov.eg',
      role: 'department_head',
      department: 'إدارة المياه',
      status: 'نشط',
      lastLogin: '2024-06-12 09:15',
      createdAt: '2024-02-01'
    },
    {
      id: 3,
      name: 'محمود علي حسن',
      email: 'mahmoud.ali@nuca.gov.eg',
      role: 'employee',
      department: 'إدارة الصرف الصحي',
      status: 'نشط',
      lastLogin: '2024-06-11 16:45',
      createdAt: '2024-03-10'
    },
    {
      id: 4,
      name: 'مها سالم محمد',
      email: 'maha.salem@nuca.gov.eg',
      role: 'gis_officer',
      department: 'نظم المعلومات الجغرافية',
      status: 'متوقف',
      lastLogin: '2024-06-08 11:20',
      createdAt: '2024-01-20'
    }
  ];

  const roles = [
    {
      id: 'admin',
      name: 'مدير النظام',
      description: 'صلاحيات كاملة في النظام',
      permissions: ['إدارة المستخدمين', 'إدارة الأدوار', 'عرض جميع البيانات', 'تصدير التقارير'],
      userCount: 2
    },
    {
      id: 'president',
      name: 'رئيس الهيئة',
      description: 'عرض التقارير التنفيذية',
      permissions: ['عرض التقارير التنفيذية', 'عرض الإحصائيات العامة'],
      userCount: 1
    },
    {
      id: 'department_head',
      name: 'مدير الإدارة',
      description: 'إدارة قسم معين',
      permissions: ['إدارة قسمه', 'اعتماد البيانات', 'عرض تقارير القسم'],
      userCount: 5
    },
    {
      id: 'employee',
      name: 'موظف إدخال البيانات',
      description: 'إدخال وتحديث البيانات',
      permissions: ['إدخال البيانات', 'تحديث البيانات', 'عرض البيانات المخصصة'],
      userCount: 12
    },
    {
      id: 'gis_officer',
      name: 'مسؤول نظم المعلومات الجغرافية',
      description: 'إدارة الخرائط والطبقات الجغرافية',
      permissions: ['إدارة الخرائط', 'رفع الطبقات الجغرافية', 'تحديث البيانات المكانية'],
      userCount: 3
    }
  ];

  const auditLog = [
    {
      id: 1,
      user: 'أحمد محمد علي',
      action: 'إنشاء مستخدم جديد',
      target: 'سالم أحمد محمد',
      timestamp: '2024-06-12 10:30',
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      user: 'فاطمة أحمد سالم',
      action: 'تحديث صلاحيات المستخدم',
      target: 'محمود علي حسن',
      timestamp: '2024-06-11 14:15',
      ipAddress: '192.168.1.105'
    },
    {
      id: 3,
      user: 'أحمد محمد علي',
      action: 'إيقاف المستخدم',
      target: 'مها سالم محمد',
      timestamp: '2024-06-10 09:45',
      ipAddress: '192.168.1.100'
    }
  ];

  const getRoleLabel = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name : roleId;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط':
        return 'bg-green-100 text-green-800';
      case 'متوقف':
        return 'bg-red-100 text-red-800';
      case 'معلق':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.includes(searchTerm) || 
    user.email.includes(searchTerm) ||
    user.department.includes(searchTerm)
  );

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">إدارة المستخدمين</h1>
          <p className="text-gray-600">إدارة المستخدمين والأدوار والصلاحيات</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة مستخدم
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="users">المستخدمين</TabsTrigger>
          <TabsTrigger value="roles">الأدوار</TabsTrigger>
          <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
          <TabsTrigger value="audit">سجل المراجعة</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>قائمة المستخدمين</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="البحث في المستخدمين..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.department}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">{getRoleLabel(user.role)}</p>
                      <p className="text-xs text-gray-500">آخر دخول: {user.lastLogin}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Edit className="w-4 h-4" />
                        تعديل
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Key className="w-4 h-4" />
                        إعادة تعيين كلمة المرور
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        {user.status === 'نشط' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        {user.status === 'نشط' ? 'إيقاف' : 'تفعيل'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid gap-6">
            {roles.map((role) => (
              <Card key={role.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{role.userCount} مستخدم</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium">الصلاحيات:</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Settings className="w-4 h-4" />
                      تعديل الصلاحيات
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Users className="w-4 h-4" />
                      عرض المستخدمين
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>مصفوفة الصلاحيات</CardTitle>
              <CardDescription>تفصيل الصلاحيات لكل دور</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 p-3 text-right">الصلاحية</th>
                      <th className="border border-gray-300 p-3">مدير النظام</th>
                      <th className="border border-gray-300 p-3">رئيس الهيئة</th>
                      <th className="border border-gray-300 p-3">مدير الإدارة</th>
                      <th className="border border-gray-300 p-3">موظف البيانات</th>
                      <th className="border border-gray-300 p-3">مسؤول GIS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      'إدارة المستخدمين',
                      'عرض التقارير التنفيذية',
                      'اعتماد البيانات',
                      'إدخال البيانات',
                      'إدارة الخرائط',
                      'تصدير التقارير',
                      'إدارة النظام'
                    ].map((permission, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-3 font-medium">{permission}</td>
                        <td className="border border-gray-300 p-3 text-center">
                          <Shield className="w-5 h-5 text-green-600 mx-auto" />
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          {['عرض التقارير التنفيذية', 'تصدير التقارير'].includes(permission) ? 
                            <Shield className="w-5 h-5 text-green-600 mx-auto" /> : 
                            <span className="text-gray-300">-</span>
                          }
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          {['اعتماد البيانات', 'عرض التقارير التنفيذية', 'تصدير التقارير'].includes(permission) ? 
                            <Shield className="w-5 h-5 text-green-600 mx-auto" /> : 
                            <span className="text-gray-300">-</span>
                          }
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          {['إدخال البيانات'].includes(permission) ? 
                            <Shield className="w-5 h-5 text-green-600 mx-auto" /> : 
                            <span className="text-gray-300">-</span>
                          }
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          {['إدارة الخرائط', 'إدخال البيانات'].includes(permission) ? 
                            <Shield className="w-5 h-5 text-green-600 mx-auto" /> : 
                            <span className="text-gray-300">-</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجل مراجعة النظام</CardTitle>
              <CardDescription>تتبع جميع العمليات والتغييرات في النظام</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLog.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{log.action}</h3>
                      <p className="text-sm text-gray-600">بواسطة: {log.user}</p>
                      <p className="text-sm text-gray-600">المستهدف: {log.target}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">{log.timestamp}</p>
                      <p className="text-xs text-gray-500">IP: {log.ipAddress}</p>
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

export default UserManagement;
