import { AnchorBorrows } from "types/type";

export const getAnchorBorrow = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/f90236ef-de84-44ca-b523-2c72fed75794/data/latest"
  );
  const anchorBorrowInfo: AnchorBorrows[] = await res.json();
  return anchorBorrowInfo;
};
