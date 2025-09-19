export interface PaymentScheduleItem {
  month: number;
  date: string;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}