import TxAndFee from "lib/pages/tx-and-fee";
import { getAvgFeeEachCoin } from "lib/requests/tx_and_fee/avg_fee_each_coin";
import { getTerraAvgTxCountPerBlock } from "lib/requests/tx_and_fee/avg_tx_count_in_block";
import { getDailyBlockCount } from "lib/requests/tx_and_fee/daily_transaction_count";
import { getTotalFeeEachCoin } from "lib/requests/tx_and_fee/total_fee_each_coin";
import { getTerraTotalTx } from "lib/requests/tx_and_fee/total_tx";
export async function getStaticProps() {
    const [totalTx, totalFeeEachCoin, avgFeeEachCoin, dailyBlockCount, avgTxCountPerBlock] =
        await Promise.all([

            getTerraTotalTx(),
            getTotalFeeEachCoin(),
            getAvgFeeEachCoin(),
            getDailyBlockCount(),
            getTerraAvgTxCountPerBlock()
        ]);
    return {
        props: {

            totalTx,
            dailyBlockCount,
            totalFeeEachCoin,
            avgFeeEachCoin,
            avgTxCountPerBlock
        },
        revalidate: 60 * 60,
    };
}
export default TxAndFee;
