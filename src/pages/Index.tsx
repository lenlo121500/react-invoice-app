import Login from "@/components/Auth/Login";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import Register from "@/components/Auth/Register";
import Dashboard from "@/components/Dashboard/Dashboard";
import InvoiceForm from "@/components/Invoice/InvoiceForm";
import InvoiceList from "@/components/Invoice/InvoiceList";
import Navbar from "@/components/Layout/Navbar";
import { AuthProvider } from "@/context/auth/auth-provider";
import { InvoiceProvider } from "@/context/invoice/invoice-provider";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";

const Index = () => {
  return (
    <AuthProvider>
      <InvoiceProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invoices"
                element={
                  <ProtectedRoute>
                    <InvoiceList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invoice/new"
                element={
                  <ProtectedRoute>
                    <InvoiceForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invoice/edit/:id"
                element={
                  <ProtectedRoute>
                    <InvoiceForm />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </InvoiceProvider>
    </AuthProvider>
  );
};

export default Index;
