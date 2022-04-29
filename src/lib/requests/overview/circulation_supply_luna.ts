import {  CirculationSupplyLuna,
  CirculationSupplyLunaResualt,
} from "types/type";
export const getCirculationSupplyLuna: () => Promise<
  CirculationSupplyLuna[]
> = async () => {
  // previose was => https://app.flipsidecrypto.com/velocity/queries/0c3eda6f-92bc-4594-a00d-fea003875016
  const res = await fetch(
    "https://api.extraterrestrial.money/v1/api/supply?denom=uluna"
  );
  const circulationSupplyLuna: CirculationSupplyLunaResualt = await res.json();
  return circulationSupplyLuna.uluna
    .map((lunaCirculatingSupply) => ({
      day: lunaCirculatingSupply.date,
      "LUNA Circulating Supply": lunaCirculatingSupply.circ / 1e6,
    }))
    .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
};
