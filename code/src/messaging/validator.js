"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
var jsonschema_1 = require("jsonschema");
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.validateShipmentLossEvent = function (message, schema) {
        var validationErrors = (0, jsonschema_1.validate)(message, schema).errors;
        var reasons = validationErrors.map(function (error) { return error.stack; });
        if (reasons && reasons.length > 0) {
            throw new Error(reasons.toString());
        }
        else {
            console.log("The shipment matches the schema");
        }
    };
    Validator.parseJson = function (body) {
        try {
            return JSON.parse(body);
        }
        catch (_a) {
            throw new Error("Event can´t be parsed");
        }
    };
    return Validator;
}());
exports.Validator = Validator;
