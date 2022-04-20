import { USTBridge } from "types/type";

export const getUSTBridgeValue = async () => {
    const res = await fetch(
        "https://api.flipsidecrypto.com/api/v2/queries/cbcea6f8-a3b1-4298-906e-db63b6971e25/data/latest"
    );
    const USTBridgeValue: USTBridge[] = await res.json();
    return USTBridgeValue;
};
