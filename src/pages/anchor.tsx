import Anchor from "lib/pages/anchor";
import { getAnchorBorrowAndDeposit } from "lib/requests/borrow_and_deposit";
import { getAnchorBorrowAndDepositUser } from "lib/requests/borrow_and_deposit copy";
import { getSumAnchorBorrow } from "lib/requests/sum_anchor_borrow";
import { getSumAnchorDeposite } from "lib/requests/sum_anchor_deposite";
import { getSumAnchorUserBorrowDeposit } from "lib/requests/sum_anchor_user_deposit_and_borrow";
import { getAnchorBalances } from "lib/requests/anchor_balances";
import { getAnchorEarnUsers } from "lib/requests/anchor_earn_users";
import { getAnchorBorrowUsers } from "lib/requests/anchor_borrow_users";
import { getCurrentYieldReserve } from "lib/requests/current_yield_reserve";

export async function getStaticProps() {
    const [sumAnchorDeposite, sumAnchorBorrow, borrowAndDeposit, totalUserBorrowDeposit, borrowAndDepositUser, anchorBalances, anchorEarnUsers, anchorBorrowUsers, currentYieldReserve] = await Promise.all(
        [getSumAnchorDeposite(), getSumAnchorBorrow(), getAnchorBorrowAndDeposit(), getSumAnchorUserBorrowDeposit(), getAnchorBorrowAndDepositUser(), getAnchorBalances(), getAnchorEarnUsers(), getAnchorBorrowUsers(), getCurrentYieldReserve()]
    );
    return {
        props: {
            sumAnchorDeposite,
            sumAnchorBorrow,
            borrowAndDeposit,
            totalUserBorrowDeposit,
            borrowAndDepositUser,
            anchorBalances,
            anchorEarnUsers,
            anchorBorrowUsers,
            currentYieldReserve,
        },
        revalidate: 60 * 60,
    }
}
export default Anchor;
