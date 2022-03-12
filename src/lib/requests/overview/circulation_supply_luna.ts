import { CirculationSupplyLuna } from "types/type";

export const getCirculationSupplyLuna = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/0c3eda6f-92bc-4594-a00d-fea003875016/data/latest"
  );
  const circulationSupplyLuna: CirculationSupplyLuna[] = await res.json();
  return circulationSupplyLuna;
};
