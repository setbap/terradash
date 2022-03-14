import ValidatorAndStacke from "lib/pages/validator-and-stacke";

import { getTotalLunaStaked } from "lib/requests/validator-and-stake/total_luna_staked";
import { getTotalLunaStakedInUSD } from "lib/requests/validator-and-stake/total_luna_staked_usd";
import { getTotalWalletStaked } from "lib/requests/validator-and-stake/total_wallet_staked";
export async function getStaticProps() {
    const [totalLunaStaked, totalLunaStakedInUSD, totalWalletStaked] = await Promise.all(
        [getTotalLunaStaked(), getTotalLunaStakedInUSD(), getTotalWalletStaked()]
    );
    return {
        props: {
            totalLunaStaked, totalLunaStakedInUSD, totalWalletStaked
        },
    }
}
export default ValidatorAndStacke;
