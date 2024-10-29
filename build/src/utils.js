"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.mapPayloadIntoShipmentLossEventModel = mapPayloadIntoShipmentLossEventModel;
exports.getLogs = getLogs;
const shipmentLossEventModel_1 = require("./models/shipmentLossEventModel");
const log4js = __importStar(require("log4js"));
const fs = __importStar(require("fs"));
function mapPayloadIntoShipmentLossEventModel(payload) {
    return new shipmentLossEventModel_1.ShipmentLossEventModel(payload["detailedState"], payload["occurredOn"], payload["partnerId"], payload["positionItemsLost"], payload["shipmentId"], payload["trackingKey"], payload["trackingUrl"]);
}
log4js.configure({
    appenders: { lightfish: { type: "file", filename: "kafkaProjectErrors.log" } },
    categories: { default: { appenders: ["lightfish"], level: "error" } },
});
exports.logger = log4js.getLogger();
function getLogs() {
    fs.readFile("../struktur-von-jan/lightfishErrors.log", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading log file: ", err);
            return;
        }
        const array_of_errors = data.split("(Mitteleuropäische Sommerzeit)").reverse();
        array_of_errors.forEach(err => {
            console.log(err);
        });
    });
}
