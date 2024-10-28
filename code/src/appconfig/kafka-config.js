"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConfig = void 0;
var kafkajs_1 = require("kafkajs");
// To set the configuration from Kafka through environment variables
// const kafkaConfig: KafkaConfig = { brokers: [`${process.env.KAFKA_HOST_NAME}${process.env.KAFKA_PORT}`] }
var KafkaConfig = /** @class */ (function () {
    function KafkaConfig(KAFKA_BROKER_URL_1, KAFKA_BROKER_URL_2, KAFKA_BROKER_URL_3) {
        if (KAFKA_BROKER_URL_1 === void 0) { KAFKA_BROKER_URL_1 = "".concat(process.env.KAFKA_HOST_NAME).concat(process.env.KAFKA_PORT_1); }
        if (KAFKA_BROKER_URL_2 === void 0) { KAFKA_BROKER_URL_2 = "".concat(process.env.KAFKA_HOST_NAME).concat(process.env.KAFKA_PORT_2); }
        if (KAFKA_BROKER_URL_3 === void 0) { KAFKA_BROKER_URL_3 = "".concat(process.env.KAFKA_HOST_NAME).concat(process.env.KAFKA_PORT_3); }
        this.KAFKA_BROKER_URL_1 = KAFKA_BROKER_URL_1;
        this.KAFKA_BROKER_URL_2 = KAFKA_BROKER_URL_2;
        this.KAFKA_BROKER_URL_3 = KAFKA_BROKER_URL_3;
    }
    KafkaConfig.prototype.getKafkaInstance = function () {
        if (this.kafkaInstance === undefined) {
            var kafkaConfig = this.getClientConfig();
            this.kafkaInstance = new kafkajs_1.Kafka(kafkaConfig);
        }
        return this.kafkaInstance;
    };
    KafkaConfig.prototype.getClientConfig = function () {
        console.log(this.KAFKA_BROKER_URL_1);
        return {
            brokers: [this.KAFKA_BROKER_URL_1, this.KAFKA_BROKER_URL_2, this.KAFKA_BROKER_URL_3]
        };
    };
    return KafkaConfig;
}());
exports.KafkaConfig = KafkaConfig;
