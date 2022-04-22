import moment from "moment";
import { USTBridge, USTBridgeInfo, USTMarketCap, USTMarketCapRes, USTSupply, UST_IN_ALL_BCs } from "types/type";

export const getUSTSupply = async (): Promise<number> => {
    const response = await fetch(
        'https://lcd.terra.dev/cosmos/bank/v1beta1/supply/uusd'
    );
    const data: USTSupply = await response.json();
    return Number(data.amount.amount) / 1000_000;
}

export const getUSTMarketCap = async (): Promise<USTMarketCap> => {
    const wUSTResponse = await fetch(
        `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0xa47c8bf37f92aBed4A126BDA807A7b7498661acD&apikey=${process.env.ETHER_SCAN_API_KEY}`
    );
    const WormholeUSTResponse = await fetch(
        `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0xa693B19d2931d498c5B318dF961919BB4aee87a5&apikey=${process.env.ETHER_SCAN_API_KEY}`
    );

    const AvaxUSTResponse = await fetch(
        `https://api.snowtrace.io/api?module=stats&action=tokensupply&contractaddress=0xb599c3590f42f8f995ecfa0f85d2980b76862fc1&apikey=${process.env.SNOW_TRACE_API_KEY}`
    )

    const BNBUSTResponse = await fetch(
        `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=0x23396cf899ca06c4472205fc903bdb4de249d6fc&apikey=${process.env.BSC_SCAN_API_KEY}`
    )
    const THORCHAINUSTResponse = await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/9c3ae373-f24e-4379-8f81-ca2151e0fc9b/data/latest`
    )
    const wUsetMarketCap: USTMarketCapRes = await wUSTResponse.json();
    const WormholeUSTMarketCap: USTMarketCapRes = await WormholeUSTResponse.json();
    const AvaxUSTMarketCap: USTMarketCapRes = await AvaxUSTResponse.json();
    const BNBUSTMarketCap: USTMarketCapRes = await BNBUSTResponse.json();
    const THORCHAINUSTMarketCap: [{ TOTAL_UST: number }] = await THORCHAINUSTResponse.json();


    return ({
        wUST: (+wUsetMarketCap.result) / 1e18,
        wormholUST: (+WormholeUSTMarketCap.result) / 1e6,
        AvaxUST: (+AvaxUSTMarketCap.result) / 1e6,
        BNBUST: (+BNBUSTMarketCap.result) / 1e18,
        ThorChainUST: (+THORCHAINUSTMarketCap[0].TOTAL_UST)
    })
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



