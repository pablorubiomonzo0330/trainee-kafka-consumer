"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConfig = void 0;
const kafkajs_1 = require("kafkajs");
// To set the configuration from Kafka through environment variables
// const kafkaConfig: KafkaConfig = { brokers: [`${process.env.KAFKA_HOST_NAME}${process.env.KAFKA_PORT}`] }
class KafkaConfig {
    constructor(KAFKA_BROKER_URL_1 = `${process.env.KAFKA_HOST_NAME}${process.env.KAFKA_PORT_1}`, KAFKA_BROKER_URL_2 = `${process.env.KAFKA_HOST_NAME}${process.env.KAFKA_PORT_2}`, KAFKA_BROKER_URL_3 = `${process.env.KAFKA_HOST_NAME}${process.env.KAFKA_PORT_3}`) {
        this.KAFKA_BROKER_URL_1 = KAFKA_BROKER_URL_1;
        this.KAFKA_BROKER_URL_2 = KAFKA_BROKER_URL_2;
        this.KAFKA_BROKER_URL_3 = KAFKA_BROKER_URL_3;
    }
    getKafkaInstance() {
        if (this.kafkaInstance === undefined) {
            const kafkaConfig = this.getClientConfig();
            this.kafkaInstance = new kafkajs_1.Kafka(kafkaConfig);
        }
        return this.kafkaInstance;
    }
    getClientConfig() {
        console.log(this.KAFKA_BROKER_URL_1);
        return {
            brokers: [this.KAFKA_BROKER_URL_1, this.KAFKA_BROKER_URL_2, this.KAFKA_BROKER_URL_3]
        };
    }
}
exports.KafkaConfig = KafkaConfig;
