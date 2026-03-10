import { useLocation } from "react-router-dom";
import { useMemo } from "react";

const useRedirectedProduct = () => {
  const location = useLocation();

  // useMemo to avoid recalculating on every render
  return useMemo(() => {
    const params = new URLSearchParams(location.search);
    const productId = params.get("productId") || null;
    const quantity = parseInt(params.get("quantity")) || 1;

    return { productId, quantity };
  }, [location.search]);
};

export default useRedirectedProduct;