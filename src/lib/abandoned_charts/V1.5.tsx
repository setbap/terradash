import ChartBox from 'lib/components/charts/LineChart'
import MultiChartBox from 'lib/components/charts/MultiLineChart'
import { StatsCard } from 'lib/components/charts/StateCard'
import React from 'react'
import { BurnLuna, TerraDailyAvgMinMaxPrice, TotalLunaSupply, TotalUSTSupply } from 'types/type'

function V1Point5({ totalLunaSupply, burnLuna, totalUSTSupply, terraDailyAvgMinMaxPrice }: {
    totalLunaSupply: TotalLunaSupply,
    totalUSTSupply: TotalUSTSupply,
    burnLuna: BurnLuna[];
    terraDailyAvgMinMaxPrice: TerraDailyAvgMinMaxPrice[];
}) {
    return (
        <>
            <StatsCard
                status="unchanged"
                title={"[v1.5]LUNA total Supply"}
                stat={totalLunaSupply["LUNA total Supply"]}
            />
            <StatsCard
                status="unchanged"
                title={"[v1.5]UST total Supply"}
                stat={totalUSTSupply["UST total Supply"]}
            />




            <MultiChartBox
                data={terraDailyAvgMinMaxPrice}
                // tooltipTitle={["min price", "avg price", "max price"]}
                modelInfo="This chart shows daily price of LUNA. the red line is minimum price and the blue line is maximum price of each day."
                title="[v1.5]Daily Luna Price"
                multiOff
                chartColors={["#F44", "#4F4", "#55f"]}
                areaDataKey={["min price", "avg price", "max price"]}
                xAxisDataKey="day"
            />
            <ChartBox
                data={burnLuna}
                tooltipTitle={"amount"}
                modelInfo="In terra blockchain we have burn event. that means some amount of LUNA burnt daily.amount of burn increase after Columbus-5 update"
                title="[v1.5]Daily Burned Luna"
                areaDataKey={"amount"}
                xAxisDataKey="day"
            />
        </>
    )
}

export default V1Point5