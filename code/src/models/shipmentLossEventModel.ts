export class ShipmentLossEventModel {
    public detailedState: string
    public occurredOn: string
    public partnerId: string
    public positionItemsLost: Array<{positionItemId: string, salesOrderId: string}>
    public shipmentId: string
    public trackingKey: {carrier: string, trackingNumber: string}
    public trackingUrl: string

    constructor(detailedState: string, occurredOn: string, partnerId: string, positionItemsLost: Array<{positionItemId: string, salesOrderId: string}>, shipmentId: string, trackingKey: {carrier: string, trackingNumber: string}, trackingUrl: string) {
        this.detailedState =   detailedState
        this.occurredOn = occurredOn
        this.partnerId = partnerId
        this.positionItemsLost = positionItemsLost
        this.shipmentId = shipmentId
        this.trackingKey = trackingKey
        this.trackingUrl = trackingUrl
    }

}
