import { useAuth } from "@/context/auth/use-auth";
import { useInvoice } from "@/context/invoice/use-invoice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Edit, FileText, Plus, Search, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";
import { toast } from "sonner";

const InvoiceList = () => {
  const { user } = useAuth();
  const { invoices, deleteInvoice } = useInvoice();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const userInvoices = invoices.filter(
    (invoice) => invoice.userId === user?.id
  );

  const filteredInvoices = userInvoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (invoiceId: string) => {
    toast.success("Invoice deleted");
    deleteInvoice(invoiceId);
    setDeleteConfirm(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link to="/invoice/new">
          <Button>
            <Plus size={20} className="mr-2" />
            New Invoice
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
          <div className="flex items-center space-x-2">
            <Search size={20} className="text-gray-400" />
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredInvoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Invoice #</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Customer</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="p-4">{formatDate(invoice.date)}</td>
                      <td className="p-4">{invoice.customerName}</td>
                      <td className="p-4 font-semibold">
                        ${invoice.total.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Link to={`/invoice/edit/${invoice.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit size={16} className="mr-1" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeleteConfirm(invoice.id)}
                          >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {searchTerm ? "No matching invoices found" : "No invoices yet"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? "Try adjusting your search criteria."
                  : "Create a new invoice to get started."}
              </p>
              {!searchTerm && (
                <Link to="/invoice/new">
                  <Button>
                    <Plus size={20} className="mr-2" />
                    Create Invoice
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card>
            <CardHeader>
              <CardTitle>Confirm Deletion</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  Are you sure you want to delete this invoice? This action
                  cannot be undoned.
                </AlertDescription>
              </Alert>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
