import TerraVsOthers from "lib/pages/terra-vs-others";
import { getLunaVsBtcPrice } from "lib/requests/luna_vs_others/lina_vs_btc";
import { getLunaVsETH } from "lib/requests/luna_vs_others/lina_vs_eth";
export async function getStaticProps() {
    const [lunaVsETHPrice, lunaVsBtcPrice] = await Promise.all(
        [getLunaVsETH(), getLunaVsBtcPrice()]
    );
    return {
        props: {
            lunaVsETHPrice,
            lunaVsBtcPrice
        },
    }
}
export default TerraVsOthers;
