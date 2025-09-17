import React from 'react';
import type { CompanyResult, VehicleResult, LeasingProduct } from '../../types';

interface ContractSigningPageProps {
  selectedCompany: CompanyResult | null;
  selectedVehicle: VehicleResult | null;
  selectedProduct: LeasingProduct | null;
  paymentSchedule: any;
}

const ContractSigningPage: React.FC<ContractSigningPageProps> = ({
  selectedCompany,
  selectedVehicle,
  selectedProduct,
  paymentSchedule
}) => {
  const handleSignContract = () => {
    alert('Функция электронной подписи будет реализована');
  };

  const handlePayment = () => {
    alert('Функция оплаты будет реализована');
  };

  const handleSavePDF = () => {
    alert('Функция сохранения в PDF будет реализована');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Подписание договора лизинга</h2>

      {/* Макет договора */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-dashed border-gray-300 mb-8">
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
          {/* Заголовок договора */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">ДОГОВОР ЛИЗИНГА</h1>
            <p className="text-gray-600">№ ЛД-{Date.now().toString().slice(-6)} от {new Date().toLocaleDateString('ru-RU')}</p>
          </div>

          {/* Стороны договора */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">СТОРОНЫ ДОГОВОРА</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Лизингодатель */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">ЛИЗИНГОДАТЕЛЬ:</h4>
                <p className="text-sm text-gray-700">
                  <strong>{selectedProduct?.company}</strong><br/>
                  ИНН: 7707083893<br/>
                  КПП: 770701001<br/>
                  Адрес: г. Москва, ул. Тверская, д. 1
                </p>
              </div>

              {/* Лизингополучатель */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">ЛИЗИНГОПОЛУЧАТЕЛЬ:</h4>
                {selectedCompany && (
                  <p className="text-sm text-gray-700">
                    <strong>{selectedCompany.name}</strong><br/>
                    ИНН: {selectedCompany.inn}<br/>
                    КПП: {selectedCompany.kpp}<br/>
                    Адрес: {selectedCompany.address}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Предмет лизинга */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ПРЕДМЕТ ЛИЗИНГА</h3>
            {selectedVehicle && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Марка и модель:</strong> {selectedVehicle.brand} {selectedVehicle.model}</div>
                  <div><strong>Год выпуска:</strong> {selectedVehicle.year}</div>
                  <div><strong>Мощность:</strong> {selectedVehicle.power}</div>
                  <div><strong>Номер двигателя:</strong> {selectedVehicle.engineNumber}</div>
                  <div className="md:col-span-2">
                    <strong>Стоимость:</strong> 
                    <span className="ml-2">
                      {selectedVehicle.customCost && selectedVehicle.customCost.trim() 
                        ? selectedVehicle.customCost 
                        : selectedVehicle.cost}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Условия лизинга */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">УСЛОВИЯ ЛИЗИНГА</h3>
            {selectedProduct && paymentSchedule && (
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div><strong>Срок лизинга:</strong> {selectedProduct.term}</div>
                  <div><strong>Первоначальный взнос:</strong> {paymentSchedule.advanceAmount?.toLocaleString('ru-RU')} ₽</div>
                  <div><strong>Ставка:</strong> {selectedProduct.rate}</div>
                  <div><strong>Ежемесячный платеж:</strong> {paymentSchedule.monthlyPayment?.toLocaleString('ru-RU')} ₽</div>
                  <div><strong>Общая стоимость:</strong> {paymentSchedule.totalAmount?.toLocaleString('ru-RU')} ₽</div>
                  <div><strong>Выкупной платеж:</strong> {selectedProduct.buyoutPayment}</div>
                </div>
              </div>
            )}
          </div>

          {/* Права и обязанности */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ПРАВА И ОБЯЗАННОСТИ СТОРОН</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Лизингодатель обязуется:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Приобрести в собственность указанное имущество</li>
                <li>Передать имущество во временное владение и пользование</li>
                <li>Обеспечить соответствие имущества условиям договора</li>
              </ul>
              
              <p className="pt-4"><strong>Лизингополучатель обязуется:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Своевременно вносить лизинговые платежи</li>
                <li>Поддерживать имущество в исправном состоянии</li>
                <li>Застраховать предмет лизинга</li>
              </ul>
            </div>
          </div>

          {/* Подписи */}
          <div className="border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-4">ЛИЗИНГОДАТЕЛЬ:</p>
                <div className="border-b border-gray-300 mb-2 h-8"></div>
                <p className="text-xs text-gray-600">Подпись / Расшифровка</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-4">ЛИЗИНГОПОЛУЧАТЕЛЬ:</p>
                <div className="border-b border-gray-300 mb-2 h-8"></div>
                <p className="text-xs text-gray-600">Подпись / Расшифровка</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleSignContract}
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center text-lg font-medium"
        >
          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Подписать электронной подписью
        </button>

        <button
          onClick={handlePayment}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center text-lg font-medium"
        >
          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Оплатить
        </button>

        <button
          onClick={handleSavePDF}
          className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center justify-center text-lg font-medium"
        >
          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Сохранить в PDF
        </button>
      </div>
    </div>
  );
};

export default ContractSigningPage;