import LFG from "lib/pages/lfg";
import { getLFGBalance } from "lib/requests/lfg/lfg_balances";

export async function getStaticProps() {
    const [lfgBalance,] = await Promise.all(
        [getLFGBalance()]
    );
    return {
        props: {
            lfgBalance,

        },
        revalidate: 60 * 60,
    }
}
export default LFG;
