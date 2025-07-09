import { useEffect, useState } from "react";
import { InvoiceContext, type Invoice } from "./invoice-context";

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const savedInvoices = localStorage.getItem("invoices");
    if (savedInvoices) {
      try {
        setInvoices(JSON.parse(savedInvoices));
      } catch (error) {
        console.error("Failed to parse invoices from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  const addInvoice = (invoiceData: Omit<Invoice, "id">) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `invoice_${Date.now()}_${Math.random()}`,
    };
    setInvoices((prev) => [...prev, newInvoice]);
  };

  const updateInvoice = (id: string, invoiceData: Omit<Invoice, "id">) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === id ? { ...invoiceData, id } : invoice
      )
    );
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
  };

  const getInvoice = (id: string) => {
    return invoices.find((invoice) => invoice.id === id);
  };

  const generateInvoiceNumber = () => {
    const count = invoices.length + 1;
    return `INV-${count.toString().padStart(4, "0")}`;
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        getInvoice,
        generateInvoiceNumber,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
