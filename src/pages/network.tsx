import Network from "lib/pages/network";
import { getNetworkFeeDaily, getTotalTransactionDailyFee } from "lib/requests/network";


export async function getStaticProps() {
    const [
        networkFeeDaily,
        totalTransactionDailyFee
    ] = await Promise.all([
        getNetworkFeeDaily(),
        getTotalTransactionDailyFee()
    ]);
    return {
        props: {
            networkFeeDaily,
            totalTransactionDailyFee
        },
        revalidate: 60 * 10,
    }
}
export default Network;
