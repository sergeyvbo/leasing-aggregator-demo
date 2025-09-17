import React from 'react';
import type { CompanyData } from '../../types';
import SearchIcon from '../icons/SearchIcon';

interface CompanySearchPageProps {
  companyData: CompanyData;
  setCompanyData: (data: CompanyData) => void;
  loading: boolean;
  onSearch: () => void;
  onNext: () => void;
}

const CompanySearchPage: React.FC<CompanySearchPageProps> = ({
  companyData,
  setCompanyData,
  loading,
  onSearch,
  onNext
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Поиск контрагента</h2>
      
      <div className="space-y-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">ИНН контрагента</label>
            <input
              type="text"
              value={companyData.inn}
              onChange={(e) => setCompanyData({...companyData, inn: e.target.value})}
              placeholder="Введите ИНН"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={onSearch}
            disabled={loading || !companyData.inn}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            ) : (
              <SearchIcon size={20} className="mr-2" />
            )}
            Поиск
          </button>
        </div>

        {companyData.result && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Данные контрагента</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><span className="font-medium">Наименование:</span> {companyData.result.name}</div>
              <div><span className="font-medium">ИНН:</span> {companyData.result.inn}</div>
              <div><span className="font-medium">КПП:</span> {companyData.result.kpp}</div>
              <div><span className="font-medium">ОКАТО:</span> {companyData.result.okato}</div>
              <div className="md:col-span-2"><span className="font-medium">ОПФ:</span> {companyData.result.opf}</div>
              <div className="md:col-span-2"><span className="font-medium">Адрес:</span> {companyData.result.address}</div>
            </div>
            <button
              onClick={onNext}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Далее
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanySearchPage;