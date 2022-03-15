import { AvgFeeEachCoin } from "types/type";

export const getAvgFeeEachCoin = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/c76980ef-ca1f-4b4c-a456-4becd3329ab8/data/latest"
  );
  const avgFeeEachCoinInfo: AvgFeeEachCoin[] = await res.json();

  return avgFeeEachCoinInfo.map((data) => ({
    coin: data.coin.substring(1),
    "avg fee in USD": data["avg fee in USD"],
  }));
};
