import { CirculationSupplyUST } from "types/type";

export const getCirculationSupplyUST = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/25625aa4-2e41-455e-8c0e-4d599f5c758e/data/latest"
  );
  const circulationSupplyUST: CirculationSupplyUST[] = await res.json();
  return circulationSupplyUST;
};
