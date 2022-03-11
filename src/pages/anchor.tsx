import Anchor from "lib/pages/anchor";
import { getAnchorBorrow } from "lib/requests/anchor_borrows";
import { getAnchorDeposite } from "lib/requests/anchor_deposite";
import { getAnchorBorrowAndDeposit } from "lib/requests/borrow_and_deposit";
import { getAnchorBorrowAndDepositUser } from "lib/requests/borrow_and_deposit copy";
import { getSumAnchorBorrow } from "lib/requests/sum_anchor_borrow";
import { getSumAnchorDeposite } from "lib/requests/sum_anchor_deposite";
import { getSumAnchorUserBorrowDeposit } from "lib/requests/sum_anchor_user_deposit_and_borrow";
export async function getStaticProps() {
    const [sumAnchorDeposite, sumAnchorBorrow, borrowAndDeposit, totalUserBorrowDeposit, borrowAndDepositUser] = await Promise.all(
        [getSumAnchorDeposite(), getSumAnchorBorrow(), getAnchorBorrowAndDeposit(), getSumAnchorUserBorrowDeposit(), getAnchorBorrowAndDepositUser()]
    );
    return {
        props: {
            sumAnchorDeposite,
            sumAnchorBorrow,
            borrowAndDeposit,
            totalUserBorrowDeposit,
            borrowAndDepositUser
        },
    }
}
export default Anchor;
