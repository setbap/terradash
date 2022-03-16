import { TotalNumberOfValidators } from "types/type";

export const getTotalNumberOfValidators = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/7342be87-03d1-4313-b328-70d4c0a0c845/data/latest"
  );
  const totalNumberOfValidators: TotalNumberOfValidators = (
    await res.json()
  )[0];
  return totalNumberOfValidators;
};
