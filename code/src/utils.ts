import {ShipmentLossEventModel} from "./models/shipmentLossEventModel"
interface Payload {
    [key: string]: any
}

export function mapPayloadIntoShipmentLossEventModel(payload: Payload){
    return new ShipmentLossEventModel(
        payload["detailedState"], 
        payload["occurredOn"], 
        payload["partnerId"], 
        payload["positionItemsLost"], 
        payload["shipmentId"], 
        payload["trackingKey"], 
        payload["trackingUrl"])
}