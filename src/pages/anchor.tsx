import Anchor from "lib/pages/anchor";
import { getAnchorBorrowAndDeposit } from "lib/requests/borrow_and_deposit";
import { getAnchorBalances } from "lib/requests/anchor_balances";
import { getAnchorEarnUsers } from "lib/requests/anchor_earn_users";
import { getAnchorBorrowUsers } from "lib/requests/anchor_borrow_users";
import { getCurrentYieldReserve } from "lib/requests/current_yield_reserve";
import { getAnchorTVLUSD } from "lib/requests/anchor_collateral_tvl"

export async function getStaticProps() {
    const [borrowAndDeposit, anchorBalances, anchorEarnUsers, anchorBorrowUsers, currentYieldReserve, anchorGrossTVLUSD] = await Promise.all(
        [getAnchorBorrowAndDeposit(), getAnchorBalances(), getAnchorEarnUsers(), getAnchorBorrowUsers(), getCurrentYieldReserve(), getAnchorTVLUSD()]
    );
    return {
        props: {
            borrowAndDeposit,
            anchorBalances,
            anchorEarnUsers,
            anchorBorrowUsers,
            currentYieldReserve,
            anchorGrossTVLUSD
        },
        revalidate: 60 * 10,
    }
}
export default Anchor;
