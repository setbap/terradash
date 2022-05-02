import UST from "lib/pages/ust";
import { getUSTBridgeValue, getUSTInfoInBCsNewUser, getUSTInfoInBCsUstVolume, getUSTInfoInBCsTxCount, getUSTMarketCap, getUSTSupply, getUSTDailySupply } from "lib/requests/ust";

export async function getStaticProps() {
    const [ustBridgeValue, USTSupply,
        USTInfoInBCsNewUser,
        USTInfoInBCsUstVolume,
        USTInfoInBCsTxCount,
        ustMarketCap,
        uSTDailySupply,
    ] = await Promise.all(
        [
            getUSTBridgeValue(),
            getUSTSupply(),
            getUSTInfoInBCsNewUser(),
            getUSTInfoInBCsUstVolume(),
            getUSTInfoInBCsTxCount(),
            getUSTMarketCap(),
            getUSTDailySupply()
        ]
    );
    return {
        props: {
            ustBridgeValue,
            USTSupply,
            USTInfoInBCsNewUser,
            USTInfoInBCsUstVolume,
            USTInfoInBCsTxCount,
            ustMarketCap,
            uSTDailySupply
        },
        revalidate: 10 * 60,
    }
}
export default UST;
