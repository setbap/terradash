import { VoterInfo } from "types/type";

export const getVoteInfo = async () => {
  const res = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/f94d7ccf-d668-4e3d-b243-c28cd17bfdbd/data/latest"
  );
  const voterInfo: VoterInfo = (await res.json())[0];
  return voterInfo;
};
