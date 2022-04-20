import UST from "lib/pages/ust";
import { getUSTBridgeValue, getUSTSupply } from "lib/requests/ust";

export async function getStaticProps() {
    const [ustBridgeValue, USTSupply] = await Promise.all(
        [getUSTBridgeValue(), getUSTSupply()]
    );
    return {
        props: {
            ustBridgeValue, USTSupply,
        },
        revalidate: 60 * 60,
    }
}
export default UST;
