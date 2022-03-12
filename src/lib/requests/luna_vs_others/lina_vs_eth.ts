import { LunaVsEthPrice } from "types/type";

export const getLunaVsETH = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/96cecc72-05d6-4e89-9c61-58547d62a89a/data/latest"
  );
  const lunaVsETHPrice: LunaVsEthPrice[] = await res.json();
  return lunaVsETHPrice;
};
