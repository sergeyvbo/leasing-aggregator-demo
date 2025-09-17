import React from 'react';
import type { CompanyResult, VehicleResult, LeasingProduct } from '../../types';
import SendIcon from '../icons/SendIcon';

interface CommercialProposalPageProps {
  selectedCompany: CompanyResult | null;
  selectedVehicle: VehicleResult | null;
  selectedProduct: LeasingProduct | null;
  onSendProposal: () => void;
}

const CommercialProposalPage: React.FC<CommercialProposalPageProps> = ({
  selectedCompany,
  selectedVehicle,
  selectedProduct,
  onSendProposal
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Коммерческое предложение</h2>
      
      <div className="space-y-8">
        {/* Контрагент */}
        {selectedCompany && (
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Контрагент</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><span className="font-medium">Наименование:</span> {selectedCompany.name}</div>
              <div><span className="font-medium">ИНН:</span> {selectedCompany.inn}</div>
              <div><span className="font-medium">КПП:</span> {selectedCompany.kpp}</div>
              <div><span className="font-medium">ОКАТО:</span> {selectedCompany.okato}</div>
              <div className="md:col-span-2">
                <span className="font-medium">Адрес:</span> {selectedCompany.address}
              </div>
            </div>
          </div>
        )}

        {/* Предмет лизинга */}
        {selectedVehicle && (
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Предмет лизинга</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><span className="font-medium">Марка:</span> {selectedVehicle.brand}</div>
              <div><span className="font-medium">Модель:</span> {selectedVehicle.model}</div>
              <div><span className="font-medium">Год выпуска:</span> {selectedVehicle.year}</div>
              <div><span className="font-medium">Мощность:</span> {selectedVehicle.power}</div>
              <div><span className="font-medium">Стоимость:</span> {selectedVehicle.cost}</div>
              <div><span className="font-medium">Номер двигателя:</span> {selectedVehicle.engineNumber}</div>
            </div>
          </div>
        )}

        {/* Выбранное предложение */}
        {selectedProduct && (
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Выбранное предложение</h3>
            <div className="mb-4">
              <h4 className="text-lg font-medium text-purple-800">{selectedProduct.company}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><span className="font-medium">Срок:</span> {selectedProduct.term}</div>
              <div><span className="font-medium">Аванс:</span> {selectedProduct.advance}</div>
              <div><span className="font-medium">Тип графика:</span> {selectedProduct.paymentSchedule}</div>
              <div><span className="font-medium">Ставка:</span> {selectedProduct.rate}</div>
              <div><span className="font-medium">Агентское вознаграждение:</span> {selectedProduct.agentFee}</div>
              <div><span className="font-medium">Выкупной платеж:</span> {selectedProduct.buyoutPayment}</div>
            </div>
          </div>
        )}



        {/* Кнопка отправки */}
        <div className="flex justify-center">
          <button
            onClick={onSendProposal}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center text-lg font-medium"
          >
            <SendIcon size={24} className="mr-3" />
            Отправить на согласование
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommercialProposalPage;