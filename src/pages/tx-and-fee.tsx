import TxAndFee from "lib/pages/tx-and-fee";

import { getTerraDailyTx } from "lib/requests/tx_and_fee/daily_tx";
import { getTerraTotalTx } from "lib/requests/tx_and_fee/total_tx";
export async function getStaticProps() {
    const [dailyTx, totalTx] = await Promise.all(
        [getTerraDailyTx(), getTerraTotalTx()]
    );
    return {
        props: {
            dailyTx,
            totalTx
        },
    }
}
export default TxAndFee;
