import { AnchorEarnUsers } from "types/type";

export const getAnchorEarnUsers = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/8661c1e7-368b-4dd5-9833-2169d13a6576/data/latest"
  );
  const anchorEarnUsersInfo: AnchorEarnUsers[] =
    await res.json();
  return anchorEarnUsersInfo;
};
