import Network from "lib/pages/network";
import { getNetworkFeeDaily, getTerraStakingRewardUSD, getTerraTransactionStatics, getTotalTransactionDailyFee } from "lib/requests/network";


export async function getStaticProps() {
    const [
        networkFeeDaily,
        totalTransactionDailyFee,
        terraTransactionStatics,
        terraStakingRewardUSD
    ] = await Promise.all([
        getNetworkFeeDaily(),
        getTotalTransactionDailyFee(),
        getTerraTransactionStatics(),
        getTerraStakingRewardUSD()
    ]);
    return {
        props: {
            networkFeeDaily,
            totalTransactionDailyFee,
            terraTransactionStatics,
            terraStakingRewardUSD
        },
        revalidate: 60 * 10,
    }
}
export default Network;
