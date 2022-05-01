import Mirror from "lib/pages/mirror";
import { getPriceOfMirInLast30Days, getMirTokenCirculatingSupply, getMirTokenTotalSupply, getMirrorSwapValuem, getMirrorTVLByStocksVolume } from "lib/requests/mirror";

export async function getStaticProps() {
    const [priceOfMirInLast30Days, mirTokenCirculatingSupply, mirTokenTotalSupply, mirrorSwapValuem, mirrorTVLByStocksVolume,] = await Promise.all([
        getPriceOfMirInLast30Days(),
        getMirTokenCirculatingSupply(),
        getMirTokenTotalSupply(),
        getMirrorSwapValuem(),
        getMirrorTVLByStocksVolume()
    ]);
    return {
        props: {
            priceOfMirInLast30Days,
            mirTokenCirculatingSupply,
            mirTokenTotalSupply,
            mirrorSwapValuem,
            mirrorTVLByStocksVolume,

        },
        revalidate: 60 * 10,
    }
}
export default Mirror;
