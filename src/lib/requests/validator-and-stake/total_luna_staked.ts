import { TotalLunaStaked } from "types/type";
export const getTotalLunaStaked: () => Promise<TotalLunaStaked> = async () => {
  const res = await fetch("https://lcd.terra.dev/cosmos/staking/v1beta1/pool");
  const totalLunaStakedInUSD = await res.json();
  return {
    "LUNA total staked": +totalLunaStakedInUSD.pool.bonded_tokens / 1e6,
  };
};
