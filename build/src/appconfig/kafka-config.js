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
exports.KafkaConfig = void 0;
const kafkajs_1 = require("kafkajs");
const utils_1 = require("../utils");
// To set the configuration from Kafka through environment variables
// const kafkaConfig: KafkaConfig = { brokers: [`${process.env.KAFKA_HOST_NAME}${process.env.KAFKA_PORT}`] }
class KafkaConfig {
    constructor(KAFKA_BROKER_URL_1 = `${process.env.KAFKA_HOST_NAME}1:${process.env.KAFKA_PORT_1}`, KAFKA_BROKER_URL_2 = `${process.env.KAFKA_HOST_NAME}2:${process.env.KAFKA_PORT_2}`, KAFKA_BROKER_URL_3 = `${process.env.KAFKA_HOST_NAME}3:${process.env.KAFKA_PORT_3}`) {
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
        return {
            brokers: [this.KAFKA_BROKER_URL_1, this.KAFKA_BROKER_URL_2, this.KAFKA_BROKER_URL_3],
            connectionTimeout: 3000,
            requestTimeout: 25000,
            retry: {
                retries: 8
            },
            restartOnFailure: (error) => __awaiter(this, void 0, void 0, function* () {
                console.log('logged error', error);
                utils_1.logger.error(error.message, `Date: ${new Date().toISOString()}`);
                return true;
            })
        };
    }
}
exports.KafkaConfig = KafkaConfig;
