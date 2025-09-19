import React from 'react';
import type { VehicleData } from '../../types';
import SearchIcon from '../icons/SearchIcon';
import CarIcon from '../icons/CarIcon';

interface LeasingSubjectPageProps {
  leasingSubject: string;
  setLeasingSubject: (subject: string) => void;
  vehicleData: VehicleData;
  setVehicleData: (data: VehicleData) => void;
  loading: boolean;
  onSearchVehicle: () => void;
  onNext: () => void;
}

const LeasingSubjectPage: React.FC<LeasingSubjectPageProps> = ({
  leasingSubject,
  setLeasingSubject,
  vehicleData,
  setVehicleData,
  loading,
  onSearchVehicle,
  onNext
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Выбор предмета лизинга</h2>
      
      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Предмет лизинга</label>
          <select
            value={leasingSubject}
            onChange={(e) => setLeasingSubject(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] text-base touch-manipulation"
          >
            <option value="">Выберите предмет лизинга</option>
            <option value="car">Автомобиль</option>
            <option value="aircraft">Воздушное судно</option>
            <option value="ship">Водный транспорт</option>
          </select>
        </div>

        {leasingSubject && (
          <div className="bg-blue-50 p-4 md:p-6 rounded-xl border border-blue-200 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CarIcon size={24} className="mr-2 text-blue-600" />
              {leasingSubject === 'car' && 'Данные автомобиля'}
              {leasingSubject === 'aircraft' && 'Данные воздушного судна'}
              {leasingSubject === 'ship' && 'Данные водного транспорта'}
            </h3>
            {/* Desktop layout */}
            <div className="hidden sm:flex space-x-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {leasingSubject === 'car' && 'VIN номер'}
                  {leasingSubject === 'aircraft' && 'Название воздушного судна'}
                  {leasingSubject === 'ship' && 'Название водного транспорта'}
                </label>
                <input
                  type="text"
                  value={vehicleData.searchQuery}
                  onChange={(e) => setVehicleData({...vehicleData, searchQuery: e.target.value})}
                  placeholder={
                    leasingSubject === 'car' ? 'Введите VIN' :
                    leasingSubject === 'aircraft' ? 'Введите название судна' :
                    'Введите название транспорта'
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] text-base touch-manipulation"
                />
              </div>
              <button
                onClick={onSearchVehicle}
                disabled={loading || !vehicleData.searchQuery}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center min-h-[44px]"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <SearchIcon size={20} className="mr-2" />
                )}
                Поиск
              </button>
            </div>

            {/* Mobile layout */}
            <div className="sm:hidden space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {leasingSubject === 'car' && 'VIN номер'}
                  {leasingSubject === 'aircraft' && 'Название воздушного судна'}
                  {leasingSubject === 'ship' && 'Название водного транспорта'}
                </label>
                <input
                  type="text"
                  value={vehicleData.searchQuery}
                  onChange={(e) => setVehicleData({...vehicleData, searchQuery: e.target.value})}
                  placeholder={
                    leasingSubject === 'car' ? 'Введите VIN' :
                    leasingSubject === 'aircraft' ? 'Введите название судна' :
                    'Введите название транспорта'
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] text-base touch-manipulation"
                />
              </div>
              <button
                onClick={onSearchVehicle}
                disabled={loading || !vehicleData.searchQuery}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px]"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <SearchIcon size={20} className="mr-2" />
                )}
                Поиск
              </button>
            </div>

            {vehicleData.result && (
              <div className="bg-white p-4 rounded-lg border animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div><span className="font-medium">Марка:</span> {vehicleData.result.brand}</div>
                  <div><span className="font-medium">Модель:</span> {vehicleData.result.model}</div>
                  <div><span className="font-medium">Год выпуска:</span> {vehicleData.result.year}</div>
                  <div><span className="font-medium">Мощность:</span> {vehicleData.result.power}</div>
                  <div className="md:col-span-2">
                    <span className="font-medium">
                      {leasingSubject === 'car' && 'Номер двигателя:'}
                      {leasingSubject === 'aircraft' && 'Серийный номер:'}
                      {leasingSubject === 'ship' && 'Номер двигателя:'}
                    </span> {vehicleData.result.engineNumber}
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Стоимость предмета лизинга
                  </label>
                  <input
                    type="text"
                    value={vehicleData.result.customCost || vehicleData.result.cost}
                    onChange={(e) => {
                      const value = e.target.value;
                      setVehicleData({
                        ...vehicleData,
                        result: {
                          ...vehicleData.result!,
                          customCost: value
                        }
                      });
                    }}
                    placeholder="Введите стоимость (например: 2 500 000 ₽)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] text-base touch-manipulation"
                  />
                </div>

                <button
                  onClick={onNext}
                  className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors min-h-[44px] w-full sm:w-auto"
                >
                  Далее
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeasingSubjectPage;