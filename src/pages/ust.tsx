import UST from "lib/pages/ust";
import { getUSTBridgeValue, getUSTInfoInBCsNewUser, getUSTInfoInBCsUstVolume, getUSTInfoInBCsTxCount, getUSTMarketCap, getUSTSupply } from "lib/requests/ust";

export async function getStaticProps() {
    const [ustBridgeValue, USTSupply,
        USTInfoInBCsNewUser,
        USTInfoInBCsUstVolume,
        USTInfoInBCsTxCount
        , ustMarketCap] = await Promise.all(
            [getUSTBridgeValue(), getUSTSupply(),
            getUSTInfoInBCsNewUser(), getUSTInfoInBCsUstVolume(), getUSTInfoInBCsTxCount(),
            getUSTMarketCap()]
        );
    return {
        props: {
            ustBridgeValue, USTSupply, USTInfoInBCsNewUser,
            USTInfoInBCsUstVolume,
            USTInfoInBCsTxCount, ustMarketCap
        },
        revalidate: 60 * 60,
    }
}
export default UST;
