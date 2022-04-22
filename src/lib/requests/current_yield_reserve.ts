import { CurrentYieldReserve } from "types/type";

export const getCurrentYieldReserve = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/9acc8040-4d62-451b-8029-d3e381ee3ac8/data/latest"
  );
  const currentYieldReserve: CurrentYieldReserve[] =
    (await res.json())[0];
  return currentYieldReserve;
};
