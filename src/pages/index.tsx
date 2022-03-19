import Home from "lib/pages/home";
import { getDailyNewUser } from "lib/requests/daily_new_user";
import { getBurnLuna } from "lib/requests/overview/burn_luna";
import { getCirculationSupplyLuna } from "lib/requests/overview/circulation_supply_luna";
import { getCirculationSupplyUST } from "lib/requests/overview/circulation_supply_ust";
import { getCurrentLunaPrice } from "lib/requests/overview/current_terra_price";
import { getDailyNewUserSince2022 } from "lib/requests/overview/daily_new_user_since_2022";
import { getDistributionOfLunaHolders } from "lib/requests/overview/distribution_of_luna_holders";
import { getTerraDailyAvgMinMaxPrice } from "lib/requests/overview/terra_avg_min_max_price";
import { getAvgUSTPrice } from "lib/requests/overview/terra_avg_min_max_price copy";
import { getTotalBurnLuna } from "lib/requests/overview/total_burn_luna";
import { getTotalLunaSupply } from "lib/requests/overview/total_luna_supply";
import { getTotalNumberOfWallets } from "lib/requests/overview/total_number_of_wallets";
import { getTotalUSTSupply } from "lib/requests/overview/total_ust_supply";
export async function getStaticProps() {
    const [
        dailyNewUser,
        curentLunaPrice,
        circulationSupplyLuna,
        circulationSupplyUST,
        terraDailyAvgMinMaxPrice,
        burnLuna,
        totalBurnLuna,
        avgUSTPrice,
        totalLunaSupply,
        totalUSTSupply,
        totalNumberOfWallets,
        distributionOfLunaHolders,
        dailyNewUserSince2022
    ] = await Promise.all([
        getDailyNewUser(),
        getCurrentLunaPrice(),
        getCirculationSupplyLuna(),
        getCirculationSupplyUST(),
        getTerraDailyAvgMinMaxPrice(),
        getBurnLuna(),
        getTotalBurnLuna(),
        getAvgUSTPrice(),
        getTotalLunaSupply(),
        getTotalUSTSupply(),
        getTotalNumberOfWallets(),
        getDistributionOfLunaHolders(),
        getDailyNewUserSince2022(),
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
            avgUSTPrice,
            totalLunaSupply,
            totalUSTSupply,
            totalNumberOfWallets,
            distributionOfLunaHolders,
            dailyNewUserSince2022
        },
        revalidate: 60 * 60,
    };
}
export default Home;
