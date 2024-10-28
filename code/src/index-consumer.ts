import {KafkaConsumerService} from "./services/kafkaConsumerService";

new KafkaConsumerService().runConsumer().catch(e => console.log(e))