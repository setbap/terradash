import Network from "lib/pages/network";
import { getNetworkFeeDaily, getTerraTransactionStatics, getTotalTransactionDailyFee } from "lib/requests/network";


export async function getStaticProps() {
    const [
        networkFeeDaily,
        totalTransactionDailyFee,
        terraTransactionStatics,
    ] = await Promise.all([
        getNetworkFeeDaily(),
        getTotalTransactionDailyFee(),
        getTerraTransactionStatics()
    ]);
    return {
        props: {
            networkFeeDaily,
            totalTransactionDailyFee,
            terraTransactionStatics
        },
        revalidate: 60 * 10,
    }
}
export default Network;
