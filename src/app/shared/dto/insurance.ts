export interface Insurances {
  content: Insurance[];
  totalElements: number;
}
export interface Insurance {
  id: number;
  insuranceNumber: number;
  policyType: string;
  insuredSum: number;
  insuredName: string;
  insuredSurname: string;
  insuredItem?: string;
}
