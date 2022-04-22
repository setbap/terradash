import moment from "moment";
import { USTBridge, USTBridgeInfo, USTSupply, UST_IN_ALL_BCs } from "types/type";

export const getUSTSupply = async (): Promise<number> => {
    const response = await fetch(
        'https://lcd.terra.dev/cosmos/bank/v1beta1/supply/uusd'
    );
    const data: USTSupply = await response.json();
    return Number(data.amount.amount) / 1000_000;
}

export const getUSTInfoInBCs = async (): Promise<UST_IN_ALL_BCs[]> => {
    const response = await fetch(
        'https://api.flipsidecrypto.com/api/v2/queries/37af1ab8-b314-4e6d-88bb-7613a83e5b14/data/latest'
    );
    const data: UST_IN_ALL_BCs[] = await response.json();
    return data.sort((a, b) => moment(a.DATE).isAfter(moment(b.DATE)) ? 1 : -1).map(item => {

        return ({
            ...item,
            "TERRA new users": item.TERRA_NEW_USERS,
            "SOL new users": item.SOL_NEW_USERS,
            "ETH new users": item.ETH_NEW_USERS,
            "POLY new users": item.POLY_NEW_USERS,
            "HAR new users": item.HAR_NEW_USERS,

            "TERRA TX count": item.TERRA_TX,
            "SOL TX count": item.SOL_TX,
            "ETH TX count": item.ETH_TX,
            "POLY TX count": item.POLY_TX,
            "HAR TX count": item.HAR_TX,

            "TERRA UST Valume": item.TERRA_UST_DAILY,
            "SOL UST Valume": item.SOL_UST_DAILY,
            "ETH UST Valume": item.ETH_UST_DAILY,
            "POLY UST Valume": item.POLY_UST_DAILY,
            "HAR UST Valume": item.HAR_UST_DAILY,
        })
    });
}


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



