import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { type Product } from "@/store/useInvoiceStore";
import ProductRow from "./ProductRow";

interface ProductsTableProps {
  products: Product[];
  onAddProduct: () => void;
  onUpdateProduct: (
    productId: string,
    field: keyof Product,
    value: string | number
  ) => void;
  onRemoveProduct: (productId: string) => void;
  total: number;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onRemoveProduct,
  total,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Products</h3>
        <Button type="button" onClick={onAddProduct} variant="outline">
          <Plus size={20} className="mr-2" />
          Add Product
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-2 text-left">
                Product Name
              </th>
              <th className="border border-gray-300 p-2 text-left">Quantity</th>
              <th className="border border-gray-300 p-2 text-left">Price</th>
              <th className="border border-gray-300 p-2 text-left">Subtotal</th>
              <th className="border border-gray-300 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onUpdate={onUpdateProduct}
                onRemove={onRemoveProduct}
                canRemove={products.length > 1}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductsTable;
