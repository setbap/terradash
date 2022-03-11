import { AnchorDailyUserBorrowAndDeposit } from "types/type";

export const getAnchorBorrowAndDepositUser = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/ed7c8884-c2f7-4243-978a-055ada7f2db2/data/latest"
  );
  const anchorBorrowDepositUserInfo: AnchorDailyUserBorrowAndDeposit[] =
    await res.json();
  return anchorBorrowDepositUserInfo;
};
