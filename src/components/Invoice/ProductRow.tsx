import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Trash2 } from "lucide-react";
import { type Product } from "@/context/invoice/invoice-context";

interface ProductRowProps {
  product: Product;
  onUpdate: (
    productId: string,
    field: keyof Product,
    value: string | number
  ) => void;
  onRemove: (productId: string) => void;
  canRemove: boolean;
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  onUpdate,
  onRemove,
  canRemove,
}) => {
  return (
    <tr>
      <td className="border border-gray-300 p-2">
        <Input
          value={product.name}
          onChange={(e) => onUpdate(product.id, "name", e.target.value)}
          placeholder="Product name"
          required
        />
      </td>
      <td className="border border-gray-300 p-2">
        <Input
          type="number"
          min="1"
          value={product.quantity || ""}
          onChange={(e) =>
            onUpdate(product.id, "quantity", Number(e.target.value))
          }
          placeholder="0"
          required
        />
      </td>
      <td className="border border-gray-300 p-2">
        <Input
          type="number"
          min="0"
          step="0.01"
          value={product.price || ""}
          onChange={(e) =>
            onUpdate(product.id, "price", Number(e.target.value))
          }
          placeholder="0.00"
          required
        />
      </td>
      <td className="border border-gray-300 p-2 text-right">
        ${product.subtotal.toFixed(2)}
      </td>
      <td className="border border-gray-300 p-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onRemove(product.id)}
          disabled={!canRemove}
        >
          <Trash2 size={16} />
        </Button>
      </td>
    </tr>
  );
};

export default ProductRow;
