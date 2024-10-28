"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkaProducerService_1 = require("./services/kafkaProducerService");
new kafkaProducerService_1.KafkaProducerService().runProducer().catch(e => console.log(e));
