import React, { useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 4;

  const handleSignContract = () => {
    alert('Функция электронной подписи будет реализована');
  };

  const handlePayment = () => {
    alert('Функция оплаты будет реализована');
  };

  const handleSavePDF = () => {
    alert('Функция сохранения в PDF будет реализована');
  };



  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Генерируем случайные данные для электронной подписи
  const generateRandomCertificate = () => {
    const certNumber = Math.random().toString(36).substring(2, 15).toUpperCase();
    const names = ['Иванов Иван Иванович', 'Петров Петр Петрович', 'Сидоров Сидор Сидорович', 'Козлов Андрей Владимирович'];
    const randomName = names[Math.floor(Math.random() * names.length)];

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const sixMonthsForward = new Date();
    sixMonthsForward.setMonth(sixMonthsForward.getMonth() + 6);

    return {
      certNumber,
      owner: randomName,
      validFrom: sixMonthsAgo.toLocaleDateString('ru-RU'),
      validTo: sixMonthsForward.toLocaleDateString('ru-RU')
    };
  };

  const certData = generateRandomCertificate();

  // Генерируем график платежей
  const generatePaymentSchedule = () => {
    if (!paymentSchedule || !selectedProduct) return [];

    const schedule = [];
    const termMonths = parseInt(selectedProduct.term.replace(/\D/g, ''));
    const monthlyPayment = paymentSchedule.monthlyPayment;
    const startDate = new Date();

    for (let i = 0; i < termMonths; i++) {
      const paymentDate = new Date(startDate);
      paymentDate.setMonth(paymentDate.getMonth() + i + 1);

      schedule.push({
        number: i + 1,
        date: paymentDate.toLocaleDateString('ru-RU'),
        amount: monthlyPayment,
        principal: Math.round(monthlyPayment * 0.7),
        interest: Math.round(monthlyPayment * 0.3)
      });
    }

    return schedule;
  };

  const schedule = generatePaymentSchedule();

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="mx-auto bg-white shadow-lg" style={{ width: '210mm', height: '297mm', padding: '20mm' }}>
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
                    <strong>{selectedProduct?.company}</strong><br />
                    ИНН: 7707083893<br />
                    КПП: 770701001<br />
                    Адрес: г. Москва, ул. Тверская, д. 1<br />
                    Тел.: +7 (495) 123-45-67<br />
                    Email: info@{selectedProduct?.company.toLowerCase().replace(/\s+/g, '')}.ru
                  </p>
                </div>

                {/* Лизингополучатель */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">ЛИЗИНГОПОЛУЧАТЕЛЬ:</h4>
                  {selectedCompany && (
                    <p className="text-sm text-gray-700">
                      <strong>{selectedCompany.name}</strong><br />
                      ИНН: {selectedCompany.inn}<br />
                      КПП: {selectedCompany.kpp}<br />
                      Адрес: {selectedCompany.address}<br />
                      Тел.: +7 (495) 987-65-43<br />
                      Email: contact@company.ru
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
                    <div><strong>VIN:</strong> WVWZZZ1JZ3W386752</div>
                    <div><strong>Цвет:</strong> Черный металлик</div>
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

            {/* Предмет договора */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">1. ПРЕДМЕТ ДОГОВОРА</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>1.1. По настоящему договору Лизингодатель обязуется приобрести в собственность указанное Лизингополучателем имущество у определенного им продавца и предоставить Лизингополучателю это имущество за плату во временное владение и пользование.</p>
                <p>1.2. Лизингополучатель обязуется принять указанное имущество во временное владение и пользование и выплачивать Лизингодателю лизинговые платежи в порядке и в сроки, установленные настоящим договором.</p>
                <p>1.3. Право собственности на предмет лизинга принадлежит Лизингодателю.</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="mx-auto bg-white shadow-lg" style={{ width: '210mm', height: '297mm', padding: '20mm' }}>
            {/* Права и обязанности */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">2. ПРАВА И ОБЯЗАННОСТИ СТОРОН</h3>
              <div className="text-sm text-gray-700 space-y-4">
                <div>
                  <p className="font-semibold mb-2">2.1. Лизингодатель обязуется:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Приобрести в собственность указанное имущество у поставщика в соответствии с условиями настоящего договора</li>
                    <li>Передать имущество во временное владение и пользование Лизингополучателю</li>
                    <li>Обеспечить соответствие имущества условиям договора</li>
                    <li>Предупредить Лизингополучателя о правах третьих лиц на передаваемое имущество</li>
                    <li>Не вмешиваться в хозяйственную деятельность Лизингополучателя</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">2.2. Лизингодатель имеет право:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Контролировать соблюдение Лизингополучателем условий договора</li>
                    <li>Осуществлять финансовый контроль за деятельностью Лизингополучателя</li>
                    <li>Инспектировать финансовое состояние Лизингополучателя</li>
                    <li>Требовать досрочного расторжения договора при нарушении его условий</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">2.3. Лизингополучатель обязуется:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Принять предмет лизинга в порядке, предусмотренном договором</li>
                    <li>Своевременно вносить лизинговые платежи</li>
                    <li>Поддерживать имущество в исправном состоянии</li>
                    <li>Застраховать предмет лизинга от рисков утраты, недостачи или повреждения</li>
                    <li>Обеспечить сохранность предмета лизинга</li>
                    <li>Не отчуждать предмет лизинга и не передавать его в субаренду без согласия Лизингодателя</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">2.4. Лизингополучатель имеет право:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Владеть и пользоваться предметом лизинга в соответствии с его назначением</li>
                    <li>Выкупить предмет лизинга по истечении срока договора</li>
                    <li>Требовать от Лизингодателя выполнения обязательств по договору</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Страхование */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">3. СТРАХОВАНИЕ</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>3.1. Лизингополучатель обязан застраховать предмет лизинга от рисков утраты, недостачи или повреждения на полную стоимость.</p>
                <p>3.2. Страхование осуществляется в пользу Лизингодателя как выгодоприобретателя.</p>
                <p>3.3. Страховая премия уплачивается Лизингополучателем.</p>
                <p>3.4. В случае наступления страхового случая страховое возмещение направляется на погашение задолженности по лизинговым платежам.</p>
              </div>
            </div>


          </div>
        );

      case 3:
        return (
          <div className="mx-auto bg-white shadow-lg" style={{ width: '210mm', height: '297mm', padding: '20mm' }}>

            {/* Техническое обслуживание */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">4. ТЕХНИЧЕСКОЕ ОБСЛУЖИВАНИЕ</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>4.1. Техническое обслуживание предмета лизинга осуществляется Лизингополучателем за свой счет.</p>
                <p>4.2. Лизингополучатель обязан проводить регулярное техническое обслуживание в соответствии с рекомендациями производителя.</p>
                <p>4.3. Все расходы по эксплуатации, техническому обслуживанию и ремонту несет Лизингополучатель.</p>
              </div>
            </div>
            
            {/* График платежей */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">5. ГРАФИК ЛИЗИНГОВЫХ ПЛАТЕЖЕЙ</h3>

              {schedule.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-2 py-2 text-left">№</th>
                          <th className="px-2 py-2 text-left">Дата платежа</th>
                          <th className="px-2 py-2 text-right">Сумма платежа, ₽</th>
                          <th className="px-2 py-2 text-right">Основной долг, ₽</th>
                          <th className="px-2 py-2 text-right">Проценты, ₽</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedule.slice(0, 20).map((payment) => (
                          <tr key={payment.number} className="border-b">
                            <td className="px-2 py-1">{payment.number}</td>
                            <td className="px-2 py-1">{payment.date}</td>
                            <td className="px-2 py-1 text-right">{payment.amount.toLocaleString('ru-RU')}</td>
                            <td className="px-2 py-1 text-right">{payment.principal.toLocaleString('ru-RU')}</td>
                            <td className="px-2 py-1 text-right">{payment.interest.toLocaleString('ru-RU')}</td>
                          </tr>
                        ))}
                        {schedule.length > 20 && (
                          <tr>
                            <td colSpan={5} className="px-2 py-2 text-center text-gray-500 italic">
                              ... и еще {schedule.length - 20} платежей
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-blue-50 p-3 rounded">
                    <div><strong>Общее количество платежей:</strong> {schedule.length}</div>
                    <div><strong>Общая сумма платежей:</strong> {(schedule.reduce((sum, p) => sum + p.amount, 0)).toLocaleString('ru-RU')} ₽</div>
                    <div><strong>Переплата:</strong> {(schedule.reduce((sum, p) => sum + p.interest, 0)).toLocaleString('ru-RU')} ₽</div>
                  </div>
                </div>
              )}
            </div>

          </div>
        );

      case 4:
        return (
          <div className="mx-auto bg-white shadow-lg" style={{ width: '210mm', height: '297mm', padding: '20mm' }}>
            {/* Ответственность сторон */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">6. ОТВЕТСТВЕННОСТЬ СТОРОН</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>6.1. За неисполнение или ненадлежащее исполнение обязательств по настоящему договору стороны несут ответственность в соответствии с действующим законодательством.</p>
                <p>6.2. При просрочке лизинговых платежей Лизингополучатель уплачивает пени в размере 0,1% от суммы просроченного платежа за каждый день просрочки.</p>
                <p>6.3. Лизингодатель не несет ответственности за недостатки предмета лизинга, которые были оговорены при заключении договора или были заранее известны Лизингополучателю.</p>
              </div>
            </div>

            {/* Форс-мажор */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">7. ФОРС-МАЖОР</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>7.1. Стороны освобождаются от ответственности за частичное или полное неисполнение обязательств по настоящему договору, если это неисполнение явилось следствием обстоятельств непреодолимой силы.</p>
                <p>7.2. К обстоятельствам непреодолимой силы относятся: стихийные бедствия, военные действия, террористические акты, решения органов государственной власти и другие обстоятельства, не зависящие от воли сторон.</p>
              </div>
            </div>

            {/* Реквизиты сторон */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">8. РЕКВИЗИТЫ СТОРОН</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">ЛИЗИНГОДАТЕЛЬ:</h4>
                  <div className="text-xs text-gray-700">
                    <p><strong>{selectedProduct?.company}</strong></p>
                    <p>ИНН: 7707083893</p>
                    <p>КПП: 770701001</p>
                    <p>ОГРН: 1027700132195</p>
                    <p>Адрес: 125009, г. Москва, ул. Тверская, д. 1</p>
                    <p>Р/с: 40702810400000123456</p>
                    <p>Банк: ПАО "Сбербанк России"</p>
                    <p>К/с: 30101810400000000225</p>
                    <p>БИК: 044525225</p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">ЛИЗИНГОПОЛУЧАТЕЛЬ:</h4>
                  {selectedCompany && (
                    <div className="text-xs text-gray-700">
                      <p><strong>{selectedCompany.name}</strong></p>
                      <p>ИНН: {selectedCompany.inn}</p>
                      <p>КПП: {selectedCompany.kpp}</p>
                      <p>ОГРН: 1027700987654</p>
                      <p>Адрес: {selectedCompany.address}</p>
                      <p>Р/с: 40702810500000654321</p>
                      <p>Банк: ПАО "ВТБ"</p>
                      <p>К/с: 30101810700000000187</p>
                      <p>БИК: 044525187</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Подписи */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-4">ЛИЗИНГОДАТЕЛЬ:</p>

                  <div className="mb-4">
                    <div className="bg-white border-2 border-blue-900 text-blue-900 p-3 rounded-lg text-xs leading-tight">
                      <div className="font-bold mb-1">ДОКУМЕНТ ПОДПИСАН</div>
                      <div className="font-bold mb-2">ЭЛЕКТРОННОЙ ПОДПИСЬЮ</div>
                      <div className="space-y-1">
                        <div>Сертификат: {certData.certNumber}</div>
                        <div>Владелец: {certData.owner}</div>
                        <div>Действителен с {certData.validFrom} по {certData.validTo}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-300 mb-2 h-8"></div>
                  <p className="text-xs text-gray-600">Генеральный директор / М.П.</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-4">ЛИЗИНГОПОЛУЧАТЕЛЬ:</p>
                  <div className="border-b border-gray-300 mb-2 h-8"></div>
                  <p className="text-xs text-gray-600">Генеральный директор / М.П.</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Подписание договора лизинга</h2>

        {/* Индикатор страниц */}
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Макет договора */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-dashed border-gray-300 mb-8 flex justify-center">
        <div className="overflow-hidden" style={{ width: '210mm', height: '297mm' }}>
          {renderPage()}
        </div>
      </div>

      {/* Навигация между страницами */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Предыдущая
        </button>

        <span className="text-gray-600">
          Страница {currentPage} из {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
        >
          Следующая
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
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