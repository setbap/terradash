import UST from "lib/pages/ust";
import { getUSTBridgeValue, getUSTInfoInBCs, getUSTSupply } from "lib/requests/ust";

export async function getStaticProps() {
    const [ustBridgeValue, USTSupply, USTInfoInBCs] = await Promise.all(
        [getUSTBridgeValue(), getUSTSupply(), getUSTInfoInBCs()]
    );
    return {
        props: {
            ustBridgeValue, USTSupply, USTInfoInBCs
        },
        revalidate: 60 * 60,
    }
}
export default UST;
