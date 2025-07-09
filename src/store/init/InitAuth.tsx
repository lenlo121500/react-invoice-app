import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const InitAuth = () => {
  const init = useAuthStore((state) => state.init);

  useEffect(() => {
    init();
  }, [init]);

  return null;
};

export default InitAuth;
