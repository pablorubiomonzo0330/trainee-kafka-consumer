"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const jsonschema_1 = require("jsonschema");
const utils_1 = require("../utils");
const dead_letter_queue_1 = require("../services/dead-letter-queue");
class Validator {
    static validateShipmentLossEvent(message, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationErrors = (0, jsonschema_1.validate)(message, schema).errors;
            const reasons = validationErrors.map((error) => error.stack);
            if (reasons && reasons.length > 0) {
                utils_1.logger.error(reasons.toString());
                console.log("sendind message to DLQ");
                yield new dead_letter_queue_1.DeadLetterQueue().runProducer({ message: message.toString(), reasons: reasons.toString() }).catch(e => console.log(e));
                console.log("Message sent to DLQ");
            }
            else {
                console.log("The shipment matches the schema");
            }
        });
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
