// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { VoterInfo } from "types/type";

const getVoterInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/f94d7ccf-d668-4e3d-b243-c28cd17bfdbd/data/latest"
  );
  const voterInfo: VoterInfo[] = await data.json();
  res.json(voterInfo[0]);
  res.statusCode = 200;
};

export default getVoterInfo;
