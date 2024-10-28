"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafkaConsumerService_1 = require("./services/kafkaConsumerService");
new kafkaConsumerService_1.KafkaConsumerService().runConsumer().catch(function (e) { return console.log(e); });
