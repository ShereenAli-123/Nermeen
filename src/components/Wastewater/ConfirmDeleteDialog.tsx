
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  stationName: string;
  hasRelatedData?: boolean;
  isLoading?: boolean;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  stationName,
  hasRelatedData = false,
  isLoading = false
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${hasRelatedData ? 'bg-yellow-100' : 'bg-red-100'}`}>
              {hasRelatedData ? (
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              ) : (
                <Trash2 className="w-6 h-6 text-red-600" />
              )}
            </div>
            <div>
              <DialogTitle className="text-right">
                {hasRelatedData ? 'تحذير - لا يمكن الحذف' : 'تأكيد الحذف'}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>
        
        <DialogDescription className="text-right space-y-3">
          {hasRelatedData ? (
            <>
              <p className="text-gray-700">
                لا يمكن حذف المحطة <strong>{stationName}</strong> لوجود بيانات مرتبطة بها.
              </p>
              <p className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded">
                يمكن أرشفة المحطة بدلاً من حذفها للاحتفاظ بالبيانات التاريخية.
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-700">
                هل أنت متأكد من رغبتك في حذف المحطة <strong>{stationName}</strong>؟
              </p>
              <p className="text-sm text-red-700 bg-red-50 p-3 rounded">
                <strong>تحذير:</strong> هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع البيانات المرتبطة بهذه المحطة نهائياً.
              </p>
            </>
          )}
        </DialogDescription>

        <DialogFooter className="gap-2">
          <Button onClick={onClose} variant="outline" className="gap-2">
            <X className="w-4 h-4" />
            {hasRelatedData ? 'إغلاق' : 'إلغاء'}
          </Button>
          
          {!hasRelatedData && (
            <Button 
              onClick={onConfirm} 
              variant="destructive" 
              disabled={isLoading}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              {isLoading ? 'جاري الحذف...' : 'تأكيد الحذف'}
            </Button>
          )}
          
          {hasRelatedData && (
            <Button onClick={onClose} className="gap-2">
              أرشفة المحطة
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
