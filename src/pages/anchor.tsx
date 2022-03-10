import Anchor from "lib/pages/anchor";
import { getAnchorDeposite } from "lib/requests/anchor_deposite";
import { getSumAnchorDeposite } from "lib/requests/sum_anchor_deposite";
export async function getStaticProps() {
    const [anchorDeposite, sumAnchorDeposite] = await Promise.all(
        [getAnchorDeposite(), getSumAnchorDeposite()]
    );
    return {
        props: {
            anchorDeposite,
            sumAnchorDeposite
        },
    }
}
export default Anchor;
