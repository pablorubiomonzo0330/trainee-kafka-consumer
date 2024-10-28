"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const jsonschema_1 = require("jsonschema");
class Validator {
    static validateShipmentLossEvent(message, schema) {
        const validationErrors = (0, jsonschema_1.validate)(message, schema).errors;
        const reasons = validationErrors.map((error) => error.stack);
        if (reasons && reasons.length > 0) {
            throw new Error(reasons.toString());
        }
        else {
            console.log("The shipment matches the schema");
        }
    }
    static parseJson(body) {
        try {
            return JSON.parse(body);
        }
        catch (_a) {
            throw new Error("Event can´t be parsed");
        }
    }
}
exports.Validator = Validator;
