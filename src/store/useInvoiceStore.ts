import { create } from "zustand";

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

interface InvoiceState {
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, "id">) => void;
  updateInvoice: (id: string, invoice: Omit<Invoice, "id">) => void;
  deleteInvoice: (id: string) => void;
  getInvoice: (id: string) => Invoice | undefined;
  generateInvoiceNumber: () => string;
  init: () => void;
}

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
  invoices: [],

  init: () => {
    const saved = localStorage.getItem("invoices");
    if (saved) {
      try {
        set({ invoices: JSON.parse(saved) });
      } catch (err) {
        console.error("Failed to parse invoices from localStorage", err);
      }
    }
  },

  addInvoice: (invoiceData) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `invoice_${Date.now()}_${Math.random()}`,
    };
    const updated = [...get().invoices, newInvoice];
    localStorage.setItem("invoices", JSON.stringify(updated));
    set({ invoices: updated });
  },

  updateInvoice: (id, invoiceData) => {
    const updated = get().invoices.map((invoice) =>
      invoice.id === id ? { ...invoiceData, id } : invoice
    );
    localStorage.setItem("invoices", JSON.stringify(updated));
    set({ invoices: updated });
  },

  deleteInvoice: (id) => {
    const updated = get().invoices.filter((invoice) => invoice.id !== id);
    localStorage.setItem("invoices", JSON.stringify(updated));
    set({ invoices: updated });
  },

  getInvoice: (id) => {
    return get().invoices.find((invoice) => invoice.id === id);
  },

  generateInvoiceNumber: () => {
    const count = get().invoices.length + 1;
    return `INV-${count.toString().padStart(4, "0")}`;
  },
}));
