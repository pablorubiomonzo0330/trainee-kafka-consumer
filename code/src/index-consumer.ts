import {KafkaConsumerService} from "./services/kafkaConsumerService";
console.log(process.env.APP_ENV)
new KafkaConsumerService().runConsumer().catch(e => console.log(e))