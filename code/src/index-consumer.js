"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafkaConsumerService_1 = require("./services/kafkaConsumerService");
console.log(process.env.APP_ENV);
new kafkaConsumerService_1.KafkaConsumerService().runConsumer().catch(function (e) { return console.log(e); });
