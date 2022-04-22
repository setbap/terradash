import BarGraph from 'lib/components/charts/BarGraph'
import ChartBox from 'lib/components/charts/LineChart'
import { StatsCard } from 'lib/components/charts/StateCard'
import React from 'react'
import { AvgUSTPrice, CirculationSupplyLuna, CirculationSupplyUST, CurentLunaPrice, DailyNewUser, DailyNewUserSince2022, DistributionOfLunaHolders, TotalBurnLuna } from 'types/type'

export default function Next({
    distributionOfLunaHolders,
    avgUSTPrice,
    totalBurnLuna
}: {
    distributionOfLunaHolders: DistributionOfLunaHolders[],
    totalBurnLuna: TotalBurnLuna,
    avgUSTPrice: AvgUSTPrice[]
}) {

    return (
        <>
            <StatsCard
                status="inc"
                title={"[next]Total burn Luna from Col5"}
                stat={totalBurnLuna["burnt_luna"]}
            />


            <ChartBox
                data={avgUSTPrice}
                tooltipTitle="Avg UST price  "
                modelInfo="UST is an algorithmic stablecoin on Terra blockchain but that does not mean the price is always $1. In this chart, you can see the fluctuations of the UST on different days."
                title="[next]Avg Daily UST price "
                areaDataKey="avg price"
                extraDecimal={5}
                domain={[0.9, 1.1]}
                xAxisDataKey="day"
            />

            <BarGraph
                modelInfo="This chart shows how many users hold between (0,10] LUNA, how many hold between (10,100] LUNA, how many hold between (10o,1000] LUNA and etc."
                values={distributionOfLunaHolders}
                title="[next]distribution of LUNA between holders"
                dataKey="distribution"
                oyLabel="number of wallets"
                oxLabel="group"
                isNotDate
                labels={[
                    { key: "number of addresses", color: "#0953fe" },
                ]}
            />
        </>
    )
}
