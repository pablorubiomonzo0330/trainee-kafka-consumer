import {KafkaConfig} from "../appconfig/kafka-config";
import {DeadLetterQueue} from "./dead-letter-queue";
import {Kafka} from "kafkajs";

export class DeadLetterQueueConsumer{
    private kafka
    private consumer
    constructor(){
        this.kafka = new KafkaConfig().getKafkaInstance()
        this.consumer = this.kafka.consumer({groupId:'dead-letter-queue'})
    }

    public async runConsumer() {
        await this.consumer.connect()
        console.log("DeadLetterQueueConsumer connected")
        await this.consumer.subscribe({topic: process.env.KAFKA_DEAD_LETTER_QUEUE as string, fromBeginning:true})
        console.log("DeadLetterQueueConsumer subscribed to", process.env.KAFKA_DEAD_LETTER_QUEUE)
        await this.consumer.run({
            eachMessage: async ({topic, partition, message}) =>{
                if (message.value === null){
                    console.log("message is null")
                    return
                }
                console.log(JSON.parse(Buffer.from(message.value).toString('utf-8')))
            }
        })
    }
}

async function main(){
    await new DeadLetterQueueConsumer().runConsumer()
}

main().catch(e => console.log(e))