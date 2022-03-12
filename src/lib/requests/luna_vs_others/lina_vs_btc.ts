import { LunaVsBtcPrice } from "types/type";

export const getLunaVsBtcPrice = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/be9037e2-bafa-47c3-8dae-e17d5545b159/data/latest"
  );
  const lunaVsBtcPrice: LunaVsBtcPrice[] = await res.json();
  return lunaVsBtcPrice;
};
