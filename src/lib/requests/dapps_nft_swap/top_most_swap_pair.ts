import { TopNativeSwapPair } from "types/type";

export const getTopNativeSwapPair = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/0753cce8-5af0-40f6-b076-eb080837d30f/data/latest"
  );
  const topNativeSwapPairInfo: TopNativeSwapPair[] = await res.json();
  return topNativeSwapPairInfo;
};
