import React from "react";
import { Button } from "../ui/button";
import { Printer } from "lucide-react";

interface Props {
  printTargetId: string;
}

const PrintInvoiceButton: React.FC<Props> = ({ printTargetId }) => {
  const handlePrint = () => {
    const content = document.getElementById(printTargetId);
    if (!content) return;

    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;

    const html = `
    <html>
      <head>
        <title>Invoice</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #333;
          }
          h1 {
            text-align: center;
            margin-bottom: 40px;
          }
          .invoice-header,
          .invoice-details,
          .invoice-total {
            margin-bottom: 20px;
          }
          .invoice-details p {
            margin: 4px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .right {
            text-align: right;
          }
          .no-print {
            display: none;
          }
        </style>
      </head>
      <body>
        <h1>Invoice</h1>
        ${content.innerHTML}
      </body>
    </html>
  `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <Button variant="outline" onClick={handlePrint}>
      <Printer size={16} className="mr-2" />
      Print Invoice
    </Button>
  );
};

export default PrintInvoiceButton;
