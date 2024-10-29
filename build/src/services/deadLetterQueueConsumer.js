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
exports.DeadLetterQueueConsumer = void 0;
const kafka_config_1 = require("../appconfig/kafka-config");
class DeadLetterQueueConsumer {
    constructor() {
        this.kafka = new kafka_config_1.KafkaConfig().getKafkaInstance();
        this.consumer = this.kafka.consumer({ groupId: 'dead-letter-queue' });
    }
    runConsumer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumer.connect();
            console.log("DeadLetterQueueConsumer connected");
            yield this.consumer.subscribe({ topic: process.env.KAFKA_DEAD_LETTER_QUEUE, fromBeginning: true });
            console.log("DeadLetterQueueConsumer subscribed to", process.env.KAFKA_DEAD_LETTER_QUEUE);
            yield this.consumer.run({
                eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                    if (message.value === null) {
                        console.log("message is null");
                        return;
                    }
                    console.log(JSON.parse(Buffer.from(message.value).toString('utf-8')));
                })
            });
        });
    }
}
exports.DeadLetterQueueConsumer = DeadLetterQueueConsumer;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield new DeadLetterQueueConsumer().runConsumer();
    });
}
main().catch(e => console.log(e));
