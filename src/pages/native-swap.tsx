import DappsAndNft from "lib/pages/native-swap";
import { getDailySwapCount } from "lib/requests/dapps_nft_swap/daily_swap_count";
import { getDailySwapVolume } from "lib/requests/dapps_nft_swap/daily_swap_volume";

import { getTopNativeSwapPair } from "lib/requests/dapps_nft_swap/top_most_swap_pair";
export async function getStaticProps() {
    const [topNativeSwapPair, dailySwapCount, dailySwapVolume] = await Promise.all(
        [getTopNativeSwapPair(), getDailySwapCount(), getDailySwapVolume()]
    );
    return {
        props: {
            topNativeSwapPair, dailySwapCount, dailySwapVolume
        },
    }
}
export default DappsAndNft;
