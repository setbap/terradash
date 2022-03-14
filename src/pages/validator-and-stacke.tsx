import ValidatorAndStacke from "lib/pages/validator-and-stacke";
import { getAmoutOfStakedInUSD } from "lib/requests/validator-and-stake/daily_amount_of_usd_staked";
import { getDailyUniqueUserStaked } from "lib/requests/validator-and-stake/daily_unique_user_staked";

import { getTotalLunaStaked } from "lib/requests/validator-and-stake/total_luna_staked";
import { getTotalLunaStakedInUSD } from "lib/requests/validator-and-stake/total_luna_staked_usd";
import { getTotalWalletAlreadyStaked } from "lib/requests/validator-and-stake/total_wallet_already_staked";
import { getTotalWalletStaked } from "lib/requests/validator-and-stake/total_wallet_staked";
export async function getStaticProps() {
    const [
        totalLunaStaked,
        totalLunaStakedInUSD,
        totalWalletStaked,
        totalWalletAlreadyStaked,
        dailyUniqueUserStaked,
        amoutOfStakedInUSD,
    ] = await Promise.all([
        getTotalLunaStaked(),
        getTotalLunaStakedInUSD(),
        getTotalWalletStaked(),
        getTotalWalletAlreadyStaked(),
        getDailyUniqueUserStaked(),
        getAmoutOfStakedInUSD()
    ]);
    return {
        props: {
            totalLunaStaked,
            totalLunaStakedInUSD,
            totalWalletStaked,
            totalWalletAlreadyStaked,
            dailyUniqueUserStaked,
            amoutOfStakedInUSD
        },
    };
}
export default ValidatorAndStacke;
