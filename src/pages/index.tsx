import Home from "lib/pages/home";
import { getDailyNewUser } from "lib/requests/daily_new_user";
import { getBurnLuna } from "lib/requests/overview/burn_luna";
import { getCirculationSupplyLuna } from "lib/requests/overview/circulation_supply_luna";
import { getCirculationSupplyUST } from "lib/requests/overview/circulation_supply_ust";
import { getCurrentLunaPrice } from "lib/requests/overview/current_terra_price";
import { getTerraDailyAvgMinMaxPrice } from "lib/requests/overview/terra_avg_min_max_price";
import { getAvgUSTPrice } from "lib/requests/overview/terra_avg_min_max_price copy";
import { getTotalBurnLuna } from "lib/requests/overview/total_burn_luna";
export async function getStaticProps() {
    const [
        dailyNewUser,
        curentLunaPrice,
        circulationSupplyLuna,
        circulationSupplyUST,
        terraDailyAvgMinMaxPrice,
        burnLuna,
        totalBurnLuna,
        avgUSTPrice
    ] = await Promise.all([
        getDailyNewUser(),
        getCurrentLunaPrice(),
        getCirculationSupplyLuna(),
        getCirculationSupplyUST(),
        getTerraDailyAvgMinMaxPrice(),
        getBurnLuna(),
        getTotalBurnLuna(),
        getAvgUSTPrice(),
    ]);
    return {
        props: {
            dailyNewUser,
            curentLunaPrice,
            circulationSupplyLuna,
            circulationSupplyUST,
            terraDailyAvgMinMaxPrice,
            burnLuna,
            totalBurnLuna,
            avgUSTPrice
        },
    };
}
export default Home;