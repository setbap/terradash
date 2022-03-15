import { TotalFeeEachCoin } from "types/type";

export const getTotalFeeEachCoin = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/f539a129-17ce-4b57-98fd-93074dc3a7d8/data/latest"
  );
  const totalFeeEachCoinInfo: TotalFeeEachCoin[] = await res.json();

  return totalFeeEachCoinInfo.map((data) => ({
    coin: data.coin.substring(1),
    "total fee in USD": data["total fee in USD"],
  }));
};
