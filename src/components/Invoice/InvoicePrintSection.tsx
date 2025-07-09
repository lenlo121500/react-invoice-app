import React from "react";
import { type Product } from "@/context/invoice/invoice-context";

interface InvoicePrintSectionProps {
  invoiceNumber: string;
  date: string;
  customerName: string;
  products: Product[];
  total: number;
}

const InvoicePrintSection: React.FC<InvoicePrintSectionProps> = ({
  invoiceNumber,
  date,
  customerName,
  products,
  total,
}) => {
  return (
    <div id="invoice-print-section" className="hidden">
      <div className="invoice-header">
        <h2>Invoice #: {invoiceNumber}</h2>
        <p>Date: {date}</p>
        <p>Customer: {customerName}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>${product.price.toFixed(2)}</td>
              <td style={{ textAlign: "right" }}>
                ${product.subtotal.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="invoice-total"
        style={{ textAlign: "right", marginTop: "1rem" }}
      >
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default InvoicePrintSection;