"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.mapPayloadIntoShipmentLossEventModel = mapPayloadIntoShipmentLossEventModel;
exports.getLogs = getLogs;
var shipmentLossEventModel_1 = require("./models/shipmentLossEventModel");
var log4js = require("log4js");
var fs = require("fs");
function mapPayloadIntoShipmentLossEventModel(payload) {
    return new shipmentLossEventModel_1.ShipmentLossEventModel(payload["detailedState"], payload["occurredOn"], payload["partnerId"], payload["positionItemsLost"], payload["shipmentId"], payload["trackingKey"], payload["trackingUrl"]);
}
log4js.configure({
    appenders: { lightfish: { type: "file", filename: "kafkaProjectErrors.log" } },
    categories: { default: { appenders: ["lightfish"], level: "error" } },
});
exports.logger = log4js.getLogger();
function getLogs() {
    fs.readFile("../struktur-von-jan/lightfishErrors.log", "utf-8", function (err, data) {
        if (err) {
            console.error("Error reading log file: ", err);
            return;
        }
        var array_of_errors = data.split("(Mitteleuropäische Sommerzeit)").reverse();
        array_of_errors.forEach(function (err) {
            console.log(err);
        });
    });
}
