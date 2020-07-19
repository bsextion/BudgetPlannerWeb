export interface Bill {
  id: string;
  name: string;
  dueTime: Date;
  amount: number;
  category: string;
  isPaid: boolean;
}
