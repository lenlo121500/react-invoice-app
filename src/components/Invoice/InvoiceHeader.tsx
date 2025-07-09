import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PrintInvoiceButton from "./PrintInvoiceButton";

interface InvoiceHeaderProps {
  isEditing: boolean;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ isEditing }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate("/invoices")}>
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Invoice" : "Create New Invoice"}
        </h1>
        <PrintInvoiceButton printTargetId="invoice-print-section" />
      </div>
    </div>
  );
};

export default InvoiceHeader;