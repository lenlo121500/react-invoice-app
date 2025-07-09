import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useInvoiceStore, type Product } from "@/store/useInvoiceStore";

export const useInvoiceForm = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { addInvoice, updateInvoice, getInvoice, generateInvoiceNumber } =
    useInvoiceStore();

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "", quantity: 0, price: 0, subtotal: 0 },
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing && id) {
      const invoice = getInvoice(id);
      if (invoice) {
        setInvoiceNumber(invoice.invoiceNumber);
        setDate(invoice.date);
        setCustomerName(invoice.customerName);
        setProducts(invoice.products);
      }
    } else {
      setInvoiceNumber(generateInvoiceNumber());
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [id, isEditing, getInvoice, generateInvoiceNumber]);

  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: "",
      quantity: 0,
      price: 0,
      subtotal: 0,
    };
    setProducts([...products, newProduct]);
  };

  const removeProduct = (productId: string) => {
    if (products.length > 1) {
      setProducts(products.filter((product) => product.id !== productId));
    }
  };

  const updateProduct = (
    productId: string,
    field: keyof Product,
    value: string | number
  ) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          const updatedProduct = { ...product, [field]: value };

          if (field === "quantity" || field === "price") {
            updatedProduct.subtotal =
              updatedProduct.quantity * updatedProduct.price;
          }

          return updatedProduct;
        }
        return product;
      })
    );
  };

  const calculateTotal = () => {
    return products.reduce((sum, product) => sum + product.subtotal, 0);
  };

  const validateForm = () => {
    if (!invoiceNumber || !date || !customerName) {
      setError("All fields are required");
      return false;
    }

    if (
      products.some(
        (product) => !product.name || !product.quantity || !product.price
      )
    ) {
      setError("All product fields are required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (onSuccess: () => void) => {
    setError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const invoiceData = {
      invoiceNumber,
      date,
      customerName,
      products,
      total: calculateTotal(),
      userId: user?.id || "",
    };

    try {
      if (isEditing && id) {
        updateInvoice(id, invoiceData);
      } else {
        addInvoice(invoiceData);
      }
      onSuccess();
    } catch (error) {
      setError("Failed to create invoice");
      console.error(error);
    }

    setLoading(false);
  };

  return {
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
  };
};
