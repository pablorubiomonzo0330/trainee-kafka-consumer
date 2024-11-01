
import { Kafka } from 'kafkajs';
import {Validator} from "../messaging/validator";
import schema from "../specification/shipment-loss-event-schema.json"
import {KafkaConfig} from "../appconfig/kafka-config"
import {mapPayloadIntoShipmentLossEventModel} from "../utils"
import {logger} from "../utils";

export class KafkaConsumerService {
    private kafka: Kafka
    private consumer

    constructor(){
        this.kafka = new KafkaConfig().getKafkaInstance()
        this.consumer = this.kafka.consumer({groupId: 'my-group'})
    }

    public async runConsumer(){
        await this.consumer.connect()
        await this.consumer.subscribe({topic: process.env.KAFKA_TOPIC_NAME_CONSUMER as string, fromBeginning: true})
        await this.consumer.run({
            eachMessage: async ({topic, partition, message}) => {
                if (message.value === null) {
                    logger.error(`The message value is empty - Date: ${new Date().toISOString()}`)
                    return;
                }
                const payloadEvent: object = Validator.parseJson(message.value.toString()) as object
                await Validator.validateShipmentLossEvent(payloadEvent, schema)
                const shipmentLossEventObject = mapPayloadIntoShipmentLossEventModel(payloadEvent)
            }
        })
    }

}







