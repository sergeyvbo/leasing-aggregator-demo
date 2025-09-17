import React from 'react';
import XIcon from '../icons/XIcon';
import SendIcon from '../icons/SendIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendProposal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSendProposal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Коммерческое предложение</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <XIcon size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Сумма лизинга</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Срок лизинга</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Первоначальный взнос</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Процентная ставка</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Валюта</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>RUB</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Тип страхования</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>КАСКО + ОСАГО</option>
              <option>Только ОСАГО</option>
              <option>Без страхования</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Дополнительные условия</label>
            <textarea 
              rows={4} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Укажите дополнительные условия договора..."
            ></textarea>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={onSendProposal}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center"
          >
            <SendIcon size={20} className="mr-2" />
            Отправить на согласование
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;