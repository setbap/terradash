import { AnchorBorrowUsers } from "types/type";

export const getAnchorBorrowUsers = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/333c9bdc-c60c-4697-8008-0e6140f0f5e1/data/latest"
  );
  const anchorBorrowUsersInfo: AnchorBorrowUsers[] =
    await res.json();
  return anchorBorrowUsersInfo;
};
