
import { Kafka } from 'kafkajs';
import {Validator} from "../messaging/kafka/validator";
import schema from "../specification/shipment-loss-event-schema.json"
import {KafkaConfig} from "../appconfig/kafka-config";

export class KafkaConsumerService {
    private kafka: Kafka
    private consumer

    constructor(){
        this.kafka = new KafkaConfig().getKafkaInstance()
        this.consumer = this.kafka.consumer({groupId: 'my-group'})
    }

    public async runConsumer(){
        console.log("connecting")
        await this.consumer.connect()
        await this.consumer.subscribe({topic: process.env.KAFKA_TOPIC_NAME_CONSUMER as string, fromBeginning: true})
        await this.consumer.run({
            eachMessage: async ({topic, partition, message}) => {
                if (message.value === null) {
                    return;
                }
                const payloadEvent = Validator.parseJson(message.value.toString())
                Validator.validateShipmentLossEvent(payloadEvent, schema)
            }
        })
    }

}







