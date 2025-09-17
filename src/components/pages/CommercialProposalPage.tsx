import React, { useState } from 'react';
import type { CompanyResult, VehicleResult, LeasingProduct } from '../../types';
import SendIcon from '../icons/SendIcon';

interface CommercialProposalPageProps {
  selectedCompany: CompanyResult | null;
  selectedVehicle: VehicleResult | null;
  selectedProduct: LeasingProduct | null;
  onSendProposal: () => void;
  onShowNotification: (message: string) => void;
}

const CommercialProposalPage: React.FC<CommercialProposalPageProps> = ({
  selectedCompany,
  selectedVehicle,
  selectedProduct,
  onSendProposal,
  onShowNotification
}) => {
  const [paymentSchedule, setPaymentSchedule] = useState<any>(null);
  const [isProposalSent, setIsProposalSent] = useState(false);

  const handleSendProposal = async () => {
    // Сразу показываем успешное уведомление и отмечаем что предложение отправлено
    setIsProposalSent(true);
    onSendProposal();

    // Через 5-10 секунд показываем график платежей и уведомление о финансировании
    const delay = Math.floor(Math.random() * 5000) + 5000; // 5-10 seconds

    setTimeout(async () => {
      // Generate payment schedule
      if (selectedVehicle && selectedProduct) {
        const { generatePaymentSchedule } = await import('../../data/mockData');
        const schedule = generatePaymentSchedule(selectedVehicle.cost, selectedProduct);
        setPaymentSchedule(schedule);
      }

      onShowNotification('Получены условия финансирования от лизинговой компании');
    }, delay);
  };
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



        {/* График платежей */}
        {paymentSchedule && (
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">График платежей</h3>

            {/* Сводная информация */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-sm text-gray-600">Общая стоимость</div>
                <div className="text-lg font-semibold">{paymentSchedule.totalAmount.toLocaleString('ru-RU')} ₽</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-sm text-gray-600">Первоначальный взнос</div>
                <div className="text-lg font-semibold">{paymentSchedule.advanceAmount.toLocaleString('ru-RU')} ₽</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-sm text-gray-600">Сумма лизинга</div>
                <div className="text-lg font-semibold">{paymentSchedule.loanAmount.toLocaleString('ru-RU')} ₽</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-sm text-gray-600">Переплата</div>
                <div className="text-lg font-semibold">{paymentSchedule.totalInterest.toLocaleString('ru-RU')} ₽</div>
              </div>
            </div>

            {/* Таблица платежей */}
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Месяц</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Платеж</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Основной долг</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Проценты</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Остаток</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paymentSchedule.schedule.map((item: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.month}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.date}</td>
                        <td className="px-4 py-3 text-sm text-right font-medium">{item.payment.toLocaleString('ru-RU')} ₽</td>
                        <td className="px-4 py-3 text-sm text-right">{item.principal.toLocaleString('ru-RU')} ₽</td>
                        <td className="px-4 py-3 text-sm text-right">{item.interest.toLocaleString('ru-RU')} ₽</td>
                        <td className="px-4 py-3 text-sm text-right">{item.balance.toLocaleString('ru-RU')} ₽</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {paymentSchedule.schedule.length === 12 && (
                <div className="px-4 py-3 bg-gray-50 text-sm text-gray-600 text-center">
                  Показаны первые 12 месяцев из {parseInt(selectedProduct?.term.replace(/\D/g, '') || '36')}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Кнопка отправки */}
        <div className="flex justify-center">
          <button
            onClick={handleSendProposal}
            disabled={isProposalSent}
            className={`px-8 py-4 rounded-xl transition-all duration-300 flex items-center text-lg font-medium ${isProposalSent
                ? 'bg-green-500 text-white cursor-default'
                : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700'
              }`}
          >
            {isProposalSent ? (
              <>
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Отправлено на согласование
              </>
            ) : (
              <>
                <SendIcon size={24} className="mr-3" />
                Отправить на согласование
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommercialProposalPage;