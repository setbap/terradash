import { MostUserIntractedDapps } from "types/type";

export const getMostUserIntractedDapps = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/5571bf5b-097e-43ee-8770-ae621b61d274/data/latest"
  );
  const mostUserIntractedDappsInfo: MostUserIntractedDapps[] = await res.json();
  return mostUserIntractedDappsInfo;
};
