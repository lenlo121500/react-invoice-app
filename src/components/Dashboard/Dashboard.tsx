import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { DollarSign, FileText, Plus, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { useInvoiceStore } from "@/store/useInvoiceStore";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { invoices } = useInvoiceStore();

  const userInvoices = invoices.filter(
    (invoice) => invoice.userId === user?.id
  );
  const totalAmount = userInvoices.reduce(
    (sum, invoice) => sum + invoice.total,
    0
  );
  const recentInvoices = userInvoices
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        <Link to="invoice/new">
          <Button className="flex items-center">
            <Plus size={20} className="mr-2" />
            New Invoice
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invoices
            </CardTitle>
            <FileText className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userInvoices.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div>${totalAmount.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                new Set(userInvoices.map((invoices) => invoices.customerName))
                  .size
              }
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Your latest invoices</CardDescription>
        </CardHeader>
        <CardContent>
          {recentInvoices.length > 0 ? (
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold">{invoice.invoiceNumber}</h4>
                    <p className="text-sm text-gray-600">
                      {invoice.customerName}
                    </p>
                    <p className="text-sm text-gray-500">{invoice.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${invoice.total.toFixed(2)}</p>
                    <Link to={`/invoices/edit/${invoice.id}`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No invoices yet</p>
              <Link to="/invoice/new">
                <Button className="mt-4">Create Your First Invoice</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
