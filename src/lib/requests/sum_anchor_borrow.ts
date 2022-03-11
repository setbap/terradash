import { SumAnchorBorrows } from "types/type";

export const getSumAnchorBorrow = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/252c45e8-6d11-4b1f-ae18-37d836488c9f/data/latest"
  );
  const sumAnchorBorrowInfo: SumAnchorBorrows = (await res.json())[0];
  return sumAnchorBorrowInfo;
};
