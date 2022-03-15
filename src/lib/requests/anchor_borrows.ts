import { AnchorBorrows } from "types/type";

export const getAnchorBorrow = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/f539a129-17ce-4b57-98fd-93074dc3a7d8/data/latest"
  );
  const anchorBorrowInfo: AnchorBorrows[] = await res.json();
  return anchorBorrowInfo;
};
