import { Top10ValidatorsAccordingStake } from "types/type";

export const getTop10ValidatorsAccordingStake = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/ce878e8e-fe0b-41b4-bb1c-5c35bb0e5fd9/data/latest"
  );
  const top10ValidatorsAccordingStake: Top10ValidatorsAccordingStake[] =
    await res.json();
  return top10ValidatorsAccordingStake;
};
