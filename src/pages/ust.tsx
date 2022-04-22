import UST from "lib/pages/ust";
import { getUSTBridgeValue, getUSTInfoInBCs, getUSTMarketCap, getUSTSupply } from "lib/requests/ust";

export async function getStaticProps() {
    const [ustBridgeValue, USTSupply, USTInfoInBCs, ustMarketCap] = await Promise.all(
        [getUSTBridgeValue(), getUSTSupply(), getUSTInfoInBCs(), getUSTMarketCap()]
    );
    return {
        props: {
            ustBridgeValue, USTSupply, USTInfoInBCs, ustMarketCap
        },
        revalidate: 60 * 60,
    }
}
export default UST;
