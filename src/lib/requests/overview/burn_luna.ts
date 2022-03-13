import { BurnLuna } from "types/type";

export const getBurnLuna = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/9f8cc23f-e6b4-4466-b31f-943f2f4bfc8e/data/latest"
  );
  const burnLuna: BurnLuna[] = await res.json();
  return burnLuna;
};
