import { AmoutOfStakedInUSD } from "types/type";

export const getAmoutOfStakedInUSD = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/87f5c397-2197-48e3-8dc5-18032eb2dc46/data/latest"
  );
  const amoutOfStakedInUSD: AmoutOfStakedInUSD[] = await res.json();
  return amoutOfStakedInUSD;
};
