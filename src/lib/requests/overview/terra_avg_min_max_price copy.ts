import { AvgUSTPrice } from "types/type";

export const getAvgUSTPrice = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/ead0c67f-d2ee-419d-9231-5a99cf67bfd2/data/latest"
  );
  const avgUSTPrice: AvgUSTPrice[] = await res.json();
  return avgUSTPrice;
};
