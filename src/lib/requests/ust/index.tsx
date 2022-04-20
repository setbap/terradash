import moment from "moment";
import { USTBridge, USTBridgeInfo } from "types/type";


export const getUSTBridgeValue: () => Promise<USTBridgeInfo> = async () => {
    const res = await fetch(
        "https://api.flipsidecrypto.com/api/v2/queries/cbcea6f8-a3b1-4298-906e-db63b6971e25/data/latest"
    );
    const USTBridgeValue: USTBridge[] = await res.json();
    const blockchains = Array.from(
        new Set(
            USTBridgeValue.map((item) => {
                return item.DESTINATION_CHAIN;
            })
        )
    );
    const bridges = Array.from(
        new Set(
            USTBridgeValue.map((item) => {
                return item.BRIDGE;
            })
        )
    );
    const sum: { [key: string]: number } = {};
    USTBridgeValue.forEach((item) => {
        sum[item.DESTINATION_CHAIN] =
            (sum[item.DESTINATION_CHAIN] ?? 0) + item.UST_AMOUNT;
    });
    const blockchainsWithValue = Object.entries(sum).map((bc) => ({
        blockchain: bc[0],
        amount: bc[1],
    }));

    const dailyBridgeValue = calculateDailyBridgeValue("MM-DD-YYYY", USTBridgeValue, bridges);
    const monthlyBridgeValue = calculateDailyBridgeValue("YYYY/MM", USTBridgeValue, bridges);


    return {
        bridges,
        blockchains,
        dailyBridgeValue,
        monthlyBridgeValue,
        blockchainsWithValue,
    };
};
function calculateDailyBridgeValue(dateFormat: string, USTBridgeValue: USTBridge[], bridges: string[]) {
    const dailyEachBridgeSum: { [key: string]: { [key: string]: number; }; } = {};
    USTBridgeValue.forEach((item) => {
        const date = moment(item.DAY).format(dateFormat);
        if (dailyEachBridgeSum[date] === undefined) {
            dailyEachBridgeSum[date] = {};
            dailyEachBridgeSum[date][item.BRIDGE] = item.UST_AMOUNT;
        } else if (dailyEachBridgeSum[date][item.BRIDGE] === undefined) {
            dailyEachBridgeSum[date][item.BRIDGE] = item.UST_AMOUNT;
        } else {
            dailyEachBridgeSum[date][item.BRIDGE] += item.UST_AMOUNT;
        }
    });
    const dailyBridgeValue = Object.entries(dailyEachBridgeSum).map(bc => {
        const finalObject = { date: bc[0] };
        bridges.forEach(bridge => {
            // @ts-ignore
            finalObject[bridge] = bc[1][bridge] ?? 0;
        });
        return finalObject;
    }).sort((a, b) => {
        // @ts-ignore
        return moment(a.date).isAfter(moment(b.date)) ? 1 : -1;
    });
    return dailyBridgeValue;
}



