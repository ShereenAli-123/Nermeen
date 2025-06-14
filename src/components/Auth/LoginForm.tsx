
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLogin: (username: string, role: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { value: 'admin', label: 'مدير النظام' },
    { value: 'president', label: 'رئيس الهيئة' },
    { value: 'vice_president', label: 'نائب رئيس الجهاز' },
    { value: 'department_head', label: 'مدير الإدارة' },
    { value: 'employee', label: 'موظف إدخال البيانات' },
    { value: 'contractor', label: 'ممثل شركة الصيانة' },
    { value: 'gis_officer', label: 'مسؤول نظم المعلومات الجغرافية' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password && selectedRole) {
      setIsLoading(true);
      // Simulate loading for better UX
      setTimeout(() => {
        onLogin(username, selectedRole);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-noka-gradient-light flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Header Section with new logo */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
            <img 
              src="/lovable-uploads/318645e1-659c-44c2-94b0-031071f869a5.png" 
              alt="شعار الهيئة القومية لمياه الشرب والصرف الصحي" 
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-noka-text mb-3 font-tajawal">نوكا</h1>
          <p className="text-lg text-noka-green-medium font-medium font-tajawal">نظام إدارة المرافق المتكامل</p>
          <p className="text-sm text-noka-text mt-2 font-tajawal opacity-80">الهيئة القومية لمياه الشرب والصرف الصحي</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-noka-text font-tajawal font-bold">تسجيل الدخول</CardTitle>
            <CardDescription className="text-noka-text font-tajawal text-base opacity-70">أدخل بياناتك للوصول إلى النظام</CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-3">
                <label className="text-base font-semibold text-noka-text font-tajawal block">اسم المستخدم</label>
                <div className="relative">
                  <User className="absolute right-4 top-4 w-5 h-5 text-noka-green-medium" />
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pr-12 pl-4 py-3 text-right border-2 border-noka-beige focus:border-noka-gold transition-colors font-tajawal text-base text-noka-text"
                    placeholder="أدخل اسم المستخدم"
                    required
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <label className="text-base font-semibold text-noka-text font-tajawal block">كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-4 top-4 w-5 h-5 text-noka-green-medium" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-12 pl-12 py-3 text-right border-2 border-noka-beige focus:border-noka-gold transition-colors font-tajawal text-base text-noka-text"
                    placeholder="أدخل كلمة المرور"
                    required
                    dir="rtl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-4 text-noka-green-medium hover:text-noka-gold transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="text-base font-semibold text-noka-text font-tajawal block">نوع المستخدم</label>
                <Select value={selectedRole} onValueChange={setSelectedRole} required dir="rtl">
                  <SelectTrigger className="border-2 border-noka-beige focus:border-noka-gold transition-colors py-3 font-tajawal text-base text-noka-text">
                    <SelectValue placeholder="اختر نوع المستخدم" />
                  </SelectTrigger>
                  <SelectContent className="font-tajawal">
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value} className="text-right font-tajawal text-base py-3 text-noka-text">
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-noka-gradient hover:opacity-90 text-white py-4 text-lg font-bold font-tajawal shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري تسجيل الدخول...
                  </div>
                ) : (
                  'دخول'
                )}
              </Button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <button type="button" className="text-noka-gold hover:text-noka-green-dark transition-colors font-tajawal text-sm font-medium">
                  نسيت كلمة المرور؟
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-noka-text font-tajawal text-sm opacity-80">© 2024 الهيئة القومية لمياه الشرب والصرف الصحي</p>
          <p className="text-noka-text font-tajawal text-xs opacity-60">جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
