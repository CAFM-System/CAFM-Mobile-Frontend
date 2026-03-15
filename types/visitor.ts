export interface Visitor {
  id: number;
  date: string;
  fullName: string;
  phone?: string;
  email?: string;
  idNumber?: string;
  vehicleNumber?: string;
  visitDate?: string;
  dateFrom?: string;
  dateTo?: string;
  numberOfOthers?: number;
  entryTime?: string;
  visitorType?: string;
  isPreRegistered?: boolean;
}
