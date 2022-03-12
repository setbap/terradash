import Home from "lib/pages/home";
import { getDailyNewUser } from "lib/requests/daily_new_user";
import { getCirculationSupplyLuna } from "lib/requests/overview/circulation_supply_luna";
import { getCirculationSupplyUST } from "lib/requests/overview/circulation_supply_ust";
import { getCurrentLunaPrice } from "lib/requests/overview/current_terra_price";
import { getTerraDailyAvgMinMaxPrice } from "lib/requests/overview/terra_avg_min_max_price";
export async function getStaticProps() {
    const [dailyNewUser, curentLunaPrice, circulationSupplyLuna, circulationSupplyUST, terraDailyAvgMinMaxPrice] = await Promise.all(
        [getDailyNewUser(), getCurrentLunaPrice(), getCirculationSupplyLuna(), getCirculationSupplyUST(), getTerraDailyAvgMinMaxPrice()]
    );
    return {
        props: {
            dailyNewUser,
            curentLunaPrice,
            circulationSupplyLuna,
            circulationSupplyUST,
            terraDailyAvgMinMaxPrice
        },
    }
}
export default Home;
