import { CirculationSupplyLuna, TerraDailyAvgMinMaxPrice } from "types/type";

export const getTerraDailyAvgMinMaxPrice = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/013da2da-7132-47af-9701-01148ffe9b23/data/latest"
  );
  const terraDailyAvgMinMaxPrice: TerraDailyAvgMinMaxPrice[] = await res.json();
  return terraDailyAvgMinMaxPrice;
};
