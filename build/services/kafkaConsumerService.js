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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConsumerService = void 0;
const validator_1 = require("../messaging/kafka/validator");
const shipment_loss_event_schema_json_1 = __importDefault(require("../specification/shipment-loss-event-schema.json"));
const kafka_config_1 = require("../appconfig/kafka-config");
class KafkaConsumerService {
    constructor() {
        this.kafka = new kafka_config_1.KafkaConfig().getKafkaInstance();
        this.consumer = this.kafka.consumer({ groupId: 'my-group' });
    }
    runConsumer() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("connecting");
            yield this.consumer.connect();
            yield this.consumer.subscribe({ topic: process.env.KAFKA_TOPIC_NAME_CONSUMER, fromBeginning: true });
            yield this.consumer.run({
                eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                    if (message.value !== null) {
                        const payloadEvent = validator_1.Validator.parseJson(message.value.toString());
                        validator_1.Validator.validateShipmentLossEvent(payloadEvent, shipment_loss_event_schema_json_1.default);
                    }
                })
            });
        });
    }
}
exports.KafkaConsumerService = KafkaConsumerService;
