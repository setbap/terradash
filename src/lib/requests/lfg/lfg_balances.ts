import { LFGBalance } from "types/type";

export const getLFGBalance = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/958d822f-5503-4028-bb91-6fa67a2efbd7/data/latest"
  );
  const lfgBalance: LFGBalance[] = await res.json();
  return lfgBalance;
};
