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
exports.DeadLetterQueue = void 0;
const kafka_config_1 = require("../appconfig/kafka-config");
class DeadLetterQueue {
    constructor() {
        this.kafka = new kafka_config_1.KafkaConfig().getKafkaInstance();
        this.producer = this.kafka.producer();
    }
    runProducer(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("about to connect");
            yield this.producer.connect();
            console.log("connected");
            yield this.producer.send({
                topic: process.env.KAFKA_DEAD_LETTER_QUEUE,
                messages: [{
                        value: JSON.stringify(message)
                    }]
            });
            yield this.producer.disconnect();
        });
    }
}
exports.DeadLetterQueue = DeadLetterQueue;
