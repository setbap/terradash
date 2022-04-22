import { AnchorBorrowAndDeposit } from "types/type";

export const getAnchorBorrowAndDeposit = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/42c3d322-8ea0-4f29-96c1-61f14a65e1c7/data/latest"
  );
  const anchorBorrowDepositInfo: AnchorBorrowAndDeposit[] = await res.json();
  return anchorBorrowDepositInfo;
};
