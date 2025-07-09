import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InvoiceDetailsFormProps {
  invoiceNumber: string;
  date: string;
  customerName: string;
  onInvoiceNumberChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onCustomerNameChange: (value: string) => void;
}

const InvoiceDetailsForm: React.FC<InvoiceDetailsFormProps> = ({
  invoiceNumber,
  date,
  customerName,
  onInvoiceNumberChange,
  onDateChange,
  onCustomerNameChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="invoiceNumber">Invoice Number *</Label>
        <Input
          id="invoiceNumber"
          value={invoiceNumber}
          onChange={(e) => onInvoiceNumberChange(e.target.value)}
          placeholder="INV-0001"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Invoice Date *</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerName">Customer Name *</Label>
        <Input
          id="customerName"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>
    </div>
  );
};

export default InvoiceDetailsForm;
