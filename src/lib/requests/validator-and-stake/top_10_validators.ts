import { Top10Validators } from "types/type";

export const getTop10Validators = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/51eeb709-3841-4cf0-8630-d678f355aeaa/data/latest"
  );
  const top10Validators: Top10Validators[] = await res.json();
  return top10Validators;
};
