import TxAndFee from "lib/pages/tx-and-fee";

import { getTerraDailyTx } from "lib/requests/tx_and_fee/daily_tx";
import { getTotalFeeEachCoin } from "lib/requests/tx_and_fee/total_fee_each_coin";
import { getTerraTotalTx } from "lib/requests/tx_and_fee/total_tx";
export async function getStaticProps() {
    const [dailyTx, totalTx, totalFeeEachCoin] = await Promise.all(
        [getTerraDailyTx(), getTerraTotalTx(), getTotalFeeEachCoin()]
    );
    return {
        props: {
            dailyTx,
            totalTx,
            totalFeeEachCoin
        },
    }
}
export default TxAndFee;
