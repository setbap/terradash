import { AnchorUserBorrowAndDeposit, SumAnchorBorrows } from "types/type";

export const getSumAnchorUserBorrowDeposit = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/7be9df46-62e4-4108-81d6-c533c8d07cd7/data/latest"
  );
  const totalUserBorrowAndDeposit: AnchorUserBorrowAndDeposit = (
    await res.json()
  )[0];
  return totalUserBorrowAndDeposit;
};
