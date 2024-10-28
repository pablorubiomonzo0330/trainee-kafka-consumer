"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPayloadIntoShipmentLossEventModel = mapPayloadIntoShipmentLossEventModel;
var shipmentLossEventModel_1 = require("./models/shipmentLossEventModel");
function mapPayloadIntoShipmentLossEventModel(payload) {
    return new shipmentLossEventModel_1.ShipmentLossEventModel(payload["detailedState"], payload["occurredOn"], payload["partnerId"], payload["positionItemsLost"], payload["shipmentId"], payload["trackingKey"], payload["trackingUrl"]);
}
