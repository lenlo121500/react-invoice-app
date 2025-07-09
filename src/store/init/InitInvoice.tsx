import { useEffect } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";

const InitInvoice = () => {
  const init = useInvoiceStore((state) => state.init);

  useEffect(() => {
    init();
  }, [init]);

  return null;
};

export default InitInvoice;
