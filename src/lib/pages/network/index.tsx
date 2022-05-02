import {
    Box, SimpleGrid,
} from "@chakra-ui/react";
import BarGraph from "lib/components/charts/BarGraph";
import ChartBox from "lib/components/charts/LineChart";
import StackedAreaChart from "lib/components/charts/StackedAreaGraph";
import { NextSeo } from "next-seo";
import { TerraTransactionStatics } from "types/type";

const COLOR_ARRAY = ['#FF6633', '#3366E6', '#1AFF33', '#FFB399', '#FF33FF', '#FF1A66', '#FFFF99',
    '#1AB399', '#00B3E6',
    '#E6B333', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];




interface Props {
    networkFeeDaily: any
    totalTransactionDailyFee: any;
    terraTransactionStatics: TerraTransactionStatics[]
}
const Network = ({
    networkFeeDaily, totalTransactionDailyFee, terraTransactionStatics
}: Props) => {

    // const ogUrl = `https://ogterradash.vercel.app/api/anchor?totalDeposits=${totalDeposits}&totalBorrowed=${totalBorrowed}&currentAPY=${currentAPY}&yieldReserve=${yieldReserve}`
    // const ogUrl = `localhost:3001/api/anchor?totalDeposits=${totalDeposits}&totalBorrowed=${totalBorrowed}&currentAPY=${currentAPY}&yieldReserve=${yieldReserve}`

    return (
        <>
            <NextSeo
                title="TerraDash"
                description="Track the latest stats and trends on the economics of Terra Network"
                openGraph={{
                    url: 'https://terradash.vercel.app/network',
                    title: 'TerraDash | Business Intelligence Dashboard for Terra Network',
                    description: 'Track the latest stats and trends on the economics of Terra Network',
                    images: [
                        {
                            url: 'https://ogterradash.vercel.app/ogterradash.png',
                            width: 1200,
                            height: 630,
                            alt: 'Terra Network Information',
                            type: 'image/png',
                        },
                    ],
                    site_name: 'TerraDash',
                }}
                twitter={{
                    handle: "@flipsidecrypto",
                    cardType: "summary_large_image",
                }}
            />

            <Box mx={"auto"} px={{ base: 6, sm: 2, md: 6 }}>
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 2, "2xl": 3 }}
                    spacing={{ base: 5, lg: 6 }}
                    pt='6'
                >

                </SimpleGrid>
                <SimpleGrid
                    py={"6"}
                    columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
                    spacing={{ base: 2, md: 4, lg: 6 }}
                >
                    <BarGraph
                        queryLink="https://app.flipsidecrypto.com/velocity/queries/52915f60-a99b-4b24-95a7-2d98a0499f08"
                        modelInfo="Volume of UST bridged out By Each Bridge over the time"
                        values={networkFeeDaily.dailySwapFeeUSD}
                        title="Total Daily Transaction Fees in Terra (USD)"
                        dataKey="date"
                        baseSpan={3}
                        oyLabel="Amount (USD)"
                        oxLabel="name"
                        labels={(networkFeeDaily.tokenNames as string[]).filter(name => name !== null).map(
                            (name, index) => ({
                                key: name,
                                color: COLOR_ARRAY[index % COLOR_ARRAY.length],
                            })
                        )}
                    />
                    <StackedAreaChart
                        dataPrecision={4}
                        queryLink="https://app.flipsidecrypto.com/velocity/queries/52915f60-a99b-4b24-95a7-2d98a0499f08"
                        modelInfo="Volume of UST bridged out By Each Bridge over the time"
                        values={networkFeeDaily.dailyAVGSwapFeeUSD}
                        title="Average Daily Transaction Fees in Terra (USD)"
                        dataKey="date"
                        baseSpan={3}
                        oyLabel="Amount (USD)"
                        oxLabel="name"
                        labels={(networkFeeDaily.tokenNames as string[]).filter(name => name !== null).map(
                            (name, index) => ({
                                key: name,
                                color: COLOR_ARRAY[index % COLOR_ARRAY.length],
                            })
                        )}
                    />

                    <ChartBox
                        queryLink="https://app.flipsidecrypto.com/velocity/queries/687c37e7-d15d-48e4-a453-d5bf7e589580"
                        data={totalTransactionDailyFee}
                        tooltipTitle={"amount"}
                        modelInfo="see the number of unique users who transaction in this blockchain per day. The increase in users is clearly evident and is a testament to Terra popularity among the cryptocurrency community."
                        title="Total Daily TX Fee on Terra (USD)"
                        areaDataKey={"Fee"}
                        baseSpan={3}
                        xAxisDataKey="day"
                    />
                    <ChartBox
                        queryLink="https://app.flipsidecrypto.com/velocity/queries/687c37e7-d15d-48e4-a453-d5bf7e589580"
                        data={totalTransactionDailyFee}
                        tooltipTitle={"amount"}
                        modelInfo="see the number of unique users who transaction in this blockchain per day. The increase in users is clearly evident and is a testament to Terra popularity among the cryptocurrency community."
                        title="Avrage TX Fee on Terra (USD)"
                        extraDecimal={4}
                        baseSpan={3}
                        areaDataKey={"Avrage Fee"}
                        xAxisDataKey="day"
                    />

                    <ChartBox
                        queryLink="https://app.flipsidecrypto.com/velocity/queries/687c37e7-d15d-48e4-a453-d5bf7e589580"
                        data={terraTransactionStatics}
                        tooltipTitle={"amount"}
                        modelInfo="see the number of unique users who transaction in this blockchain per day. The increase in users is clearly evident and is a testament to Terra popularity among the cryptocurrency community."
                        title="Daily Transaction Per Second"
                        baseSpan={3}
                        areaDataKey={"TPS"}
                        xAxisDataKey="day"
                    />

                    <ChartBox
                        queryLink="https://app.flipsidecrypto.com/velocity/queries/687c37e7-d15d-48e4-a453-d5bf7e589580"
                        data={terraTransactionStatics}
                        tooltipTitle={"amount"}
                        modelInfo="see the number of unique users who transaction in this blockchain per day. The increase in users is clearly evident and is a testament to Terra popularity among the cryptocurrency community."
                        title="Number of Transactions Per Day"
                        baseSpan={3}
                        areaDataKey={"Number of Transacton"}
                        xAxisDataKey="day"
                    />


                    <ChartBox
                        queryLink="https://app.flipsidecrypto.com/velocity/queries/687c37e7-d15d-48e4-a453-d5bf7e589580"
                        data={terraTransactionStatics}
                        tooltipTitle={"amount"}
                        modelInfo="see the number of unique users who transaction in this blockchain per day. The increase in users is clearly evident and is a testament to Terra popularity among the cryptocurrency community."
                        title="Success Rate of Transactions"
                        baseSpan={3}
                        extraDecimal={5}
                        areaDataKey={"Success Rate"}
                        xAxisDataKey="day"
                    />


                </SimpleGrid>
            </Box>
        </>
    );
};

export default Network;
