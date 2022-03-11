import { AnchorBorrowAndDeposit } from "types/type";

export const getAnchorBorrowAndDeposit = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/8999136f-9f13-4375-ae2a-fd0c58f4f291/data/latest"
  );
  const anchorBorrowDepositInfo: AnchorBorrowAndDeposit[] = await res.json();
  return anchorBorrowDepositInfo;
};
