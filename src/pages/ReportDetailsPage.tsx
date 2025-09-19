import React, { useState } from 'react';
import type { Report, GeneratedReport } from '../types/reports';
import CommandPanel from '../components/CommandPanel';
import ReportResults from '../components/ReportResults';
import { generateReport } from '../data/reportsData';

interface ReportDetailsPageProps {
  report: Report;
  onBack: () => void;
}

const ReportDetailsPage: React.FC<ReportDetailsPageProps> = ({
  report,
  onBack
}) => {
  // State for report parameters and generation
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [generatedReport, setGeneratedReport] = useState<GeneratedReport | null>(null);
  const [generating, setGenerating] = useState(false);

  // Handle parameter changes
  const handleParameterChange = (key: string, value: any) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle report generation
  const handleGenerate = async () => {
    setGenerating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate report using the mock data processing
      const generatedReportData = generateReport(report.id, parameters);
      
      setGeneratedReport(generatedReportData);
    } catch (error) {
      console.error('Error generating report:', error);
      // In a real app, you would show an error message to the user
    } finally {
      setGenerating(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main container with consistent responsive padding matching ClientsPage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with back button and report name - Enhanced for mobile */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col space-y-3 md:space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0 lg:gap-6">
            {/* Back button - Enhanced for touch */}
            <div className="flex-shrink-0">
              <button
                onClick={onBack}
                className="flex items-center text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-3 py-2 -mx-3 -my-2 transition-colors duration-200 font-medium min-h-[44px] touch-manipulation"
              >
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm md:text-base">Назад к списку отчетов</span>
              </button>
            </div>
            
            {/* Report info - Responsive layout */}
            <div className="flex-1 lg:text-right">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 break-words leading-tight">
                {report.name}
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-2 break-words">
                {report.description}
              </p>
            </div>
          </div>
        </div>

        {/* Report category badge and metadata */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
            <div className="flex items-center">
              {(() => {
                const categoryLabels = {
                  financial: 'Финансовые',
                  operational: 'Операционные',
                  analytical: 'Аналитические'
                };
                const categoryColors = {
                  financial: 'bg-green-100 text-green-800',
                  operational: 'bg-blue-100 text-blue-800',
                  analytical: 'bg-purple-100 text-purple-800'
                };
                
                return (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[report.category]}`}>
                    {categoryLabels[report.category]}
                  </span>
                );
              })()}
            </div>
            
            {report.lastGenerated && (
              <span className="text-xs md:text-sm text-gray-500">
                Последнее создание: {report.lastGenerated.toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            )}
          </div>
        </div>

        {/* Main content area - CommandPanel and ReportResults */}
        <div className="space-y-6 md:space-y-8">
          {/* Command Panel Section */}
          <section className="scroll-mt-6" id="command-panel">
            <CommandPanel
              report={report}
              parameters={parameters}
              onParameterChange={handleParameterChange}
              onGenerate={handleGenerate}
              generating={generating}
            />
          </section>

          {/* Report Results Section */}
          <section className="scroll-mt-6" id="report-results">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Результаты отчета</h2>
              {generatedReport ? (
                <ReportResults generatedReport={generatedReport} />
              ) : (
                <div className="text-center py-8 md:py-12">
                  <svg className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400 mb-3 md:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-base md:text-lg font-medium text-gray-900 mb-2">Результаты отчета</p>
                  <p className="text-sm md:text-base text-gray-500 max-w-md mx-auto">
                    Настройте параметры отчета и нажмите "Сгенерировать отчет" для получения результатов
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Bottom spacing for better UX - Consistent with ClientsPage */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
};

export default ReportDetailsPage;