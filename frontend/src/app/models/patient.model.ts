export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  healthInsurance: string;
  planNumber?: string; 
}
