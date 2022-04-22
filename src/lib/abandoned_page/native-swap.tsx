import DappsAndNft from "lib/pages/native-swap";
import { getDailySwapCount } from "lib/requests/dapps_nft_swap/daily_swap_count";
import { getDailySwapVolume } from "lib/requests/dapps_nft_swap/daily_swap_volume";
import { getMostUserIntractedDapps } from "lib/requests/dapps_nft_swap/top_intracted_dapps";

import { getTopNativeSwapPair } from "lib/requests/dapps_nft_swap/top_most_swap_pair";
export async function getStaticProps() {
    const [topNativeSwapPair, dailySwapCount, dailySwapVolume, mostUserIntractedDapps] = await Promise.all(
        [getTopNativeSwapPair(), getDailySwapCount(), getDailySwapVolume(), getMostUserIntractedDapps()]
    );
    return {
        props: {
            topNativeSwapPair, dailySwapCount, dailySwapVolume, mostUserIntractedDapps
        },
        revalidate: 60 * 60,
    }
}
export default DappsAndNft;
