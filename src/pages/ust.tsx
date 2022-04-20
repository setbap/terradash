import UST from "lib/pages/ust";
import { getUSTBridgeValue } from "lib/requests/ust";

export async function getStaticProps() {
    const [ustBridgeValue] = await Promise.all(
        [getUSTBridgeValue()]
    );
    return {
        props: {
            ustBridgeValue
        },
        revalidate: 60 * 60,
    }
}
export default UST;
