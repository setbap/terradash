import { AnchorBalances } from "types/type";
export const getAnchorBalances = async () => {
  const response = await fetch(
    "https://eth-api.anchorprotocol.com/api/v1/stablecoin_info/uusd"
  );
  const data: AnchorBalances = await response.json();
  return data;
};
