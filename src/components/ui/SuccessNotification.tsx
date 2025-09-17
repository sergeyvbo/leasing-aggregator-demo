import React from 'react';
import CheckCircleIcon from '../icons/CheckCircleIcon';

interface SuccessNotificationProps {
  isVisible: boolean;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-slideDown z-50">
      <div className="flex items-center">
        <CheckCircleIcon size={24} className="mr-2" />
        <div>
          <div className="font-semibold">Успешно отправлено!</div>
          <div className="text-sm">Коммерческое предложение направлено на согласование. Ожидайте оповещение о результате.</div>
        </div>
      </div>
    </div>
  );
};

export default SuccessNotification;