import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { toast } from "sonner";
import { useInvoiceForm } from "../../hooks/use-invoice-form";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceDetailsForm from "./InvoiceDetailsForm";
import ProductsTable from "./ProductsTable";
import InvoicePrintSection from "./InvoicePrintSection";

const InvoiceForm = () => {
  const navigate = useNavigate();
  const {
    invoiceNumber,
    setInvoiceNumber,
    date,
    setDate,
    customerName,
    setCustomerName,
    products,
    error,
    loading,
    isEditing,
    addProduct,
    removeProduct,
    updateProduct,
    calculateTotal,
    handleSubmit,
  } = useInvoiceForm();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(() => {
      toast.success("Invoice created successfully");
      navigate("/invoices");
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <InvoiceHeader isEditing={isEditing} />

      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <InvoiceDetailsForm
              invoiceNumber={invoiceNumber}
              date={date}
              customerName={customerName}
              onInvoiceNumberChange={setInvoiceNumber}
              onDateChange={setDate}
              onCustomerNameChange={setCustomerName}
            />

            <ProductsTable
              products={products}
              onAddProduct={addProduct}
              onUpdateProduct={updateProduct}
              onRemoveProduct={removeProduct}
              total={calculateTotal()}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/invoices")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                <Save size={20} className="mr-2" />
                {loading
                  ? "Saving..."
                  : isEditing
                  ? "Update Invoice"
                  : "Create Invoice"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <InvoicePrintSection
        invoiceNumber={invoiceNumber}
        date={date}
        customerName={customerName}
        products={products}
        total={calculateTotal()}
      />
    </div>
  );
};

export default InvoiceForm;