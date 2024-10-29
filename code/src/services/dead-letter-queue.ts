import {KafkaConfig} from "../appconfig/kafka-config";
import {Kafka} from "kafkajs";
export class DeadLetterQueue{
    public producer
    private kafka: Kafka
    constructor(){
        this.kafka = new KafkaConfig().getKafkaInstance()
        this.producer = this.kafka.producer()
    }

    public async runProducer(message: object){
        console.log("about to connect")
        await this.producer.connect()
        console.log("connected")
        await this.producer.send({
            topic: process.env.KAFKA_DEAD_LETTER_QUEUE as string,
            messages: [{
                value: JSON.stringify(message)
            }]
        })
        await this.producer.disconnect()
    }
}

