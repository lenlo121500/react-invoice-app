import { createContext } from "react";
export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  customerName: string;
  products: Product[];
  total: number;
  userId: string;
}

interface InvoiceContextType {
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, "id">) => void;
  updateInvoice: (id: string, invoice: Omit<Invoice, "id">) => void;
  deleteInvoice: (id: string) => void;
  getInvoice: (id: string) => Invoice | undefined;
  generateInvoiceNumber: () => string;
}

export const InvoiceContext = createContext<InvoiceContextType | undefined>(
  undefined
);
