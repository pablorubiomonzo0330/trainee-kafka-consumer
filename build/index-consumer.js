"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkaConsumerService_1 = require("./services/kafkaConsumerService");
new kafkaConsumerService_1.KafkaConsumerService().runConsumer().catch(e => console.log(e));
