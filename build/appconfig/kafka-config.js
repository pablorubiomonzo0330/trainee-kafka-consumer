"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConfig = void 0;
const kafkajs_1 = require("kafkajs");
// To set the configuration from Kafka through environment variables
// const kafkaConfig: KafkaConfig = { brokers: [`${process.env.KAFKA_HOST_NAME}${process.env.KAFKA_PORT}`] }
class KafkaConfig {
    constructor(KAFKA_BROKER_URL = `${process.env.KAFKA_HOST_NAME}${process.env.KAFKA_PORT}`) {
        this.KAFKA_BROKER_URL = KAFKA_BROKER_URL;
    }
    getKafkaInstance() {
        if (this.kafkaInstance === undefined) {
            const kafkaConfig = this.getClientConfig();
            this.kafkaInstance = new kafkajs_1.Kafka(kafkaConfig);
        }
        return this.kafkaInstance;
    }
    getClientConfig() {
        return {
            clientId: `trainee_kafkaproject`,
            brokers: [this.KAFKA_BROKER_URL]
        };
    }
}
exports.KafkaConfig = KafkaConfig;
