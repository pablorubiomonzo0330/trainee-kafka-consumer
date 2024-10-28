"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentLossEventModel = void 0;
class ShipmentLossEventModel {
    constructor(detailedState, occurredOn, partnerId, positionItemsLost, shipmentId, trackingKey, trackingUrl) {
        this.detailedState = detailedState;
        this.occurredOn = occurredOn;
        this.partnerId = partnerId;
        this.positionItemsLost = positionItemsLost;
        this.shipmentId = shipmentId;
        this.trackingKey = trackingKey;
        this.trackingUrl = trackingUrl;
    }
}
exports.ShipmentLossEventModel = ShipmentLossEventModel;
