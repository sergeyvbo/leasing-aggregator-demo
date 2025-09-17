import React from 'react';
import type { CompanyData } from '../../types';
import SearchIcon from '../icons/SearchIcon';

interface CompanySearchPageProps {
  companyData: CompanyData;
  setCompanyData: (data: CompanyData) => void;
  loading: boolean;
  onSearch: () => void;
  onNext: (companyIndex: number) => void;
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

        {companyData.result && companyData.result.length > 0 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-900">Найденные контрагенты</h3>
            {companyData.result.map((company, index) => (
              <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><span className="font-medium">Наименование:</span> {company.name}</div>
                  <div><span className="font-medium">ИНН:</span> {company.inn}</div>
                  <div><span className="font-medium">КПП:</span> {company.kpp}</div>
                  <div><span className="font-medium">ОКАТО:</span> {company.okato}</div>
                  <div className="md:col-span-2"><span className="font-medium">ОПФ:</span> {company.opf}</div>
                  <div className="md:col-span-2"><span className="font-medium">Адрес:</span> {company.address}</div>
                </div>
                <button
                  onClick={() => onNext(index)}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Выбрать этого контрагента
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanySearchPage;