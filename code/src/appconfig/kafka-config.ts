import { Kafka } from 'kafkajs';
import {parse} from "yaml";
import * as fs from "fs"

// To set the configuration from Kafka through environment variables
// const kafkaConfig: KafkaConfig = { brokers: [`${process.env.KAFKA_HOST_NAME}${process.env.KAFKA_PORT}`] }

export class KafkaConfig{
    private kafkaInstance: Kafka | undefined

    constructor(
        private KAFKA_BROKER_URL_1 = `${process.env.KAFKA_HOST_NAME}${process.env.KAFKA_PORT_1}`,
        private KAFKA_BROKER_URL_2 =`${process.env.KAFKA_HOST_NAME}${process.env.KAFKA_PORT_2}`,
        private KAFKA_BROKER_URL_3 =`${process.env.KAFKA_HOST_NAME}${process.env.KAFKA_PORT_3}`
    ){}

    public getKafkaInstance(){
        if (this.kafkaInstance === undefined){
            const kafkaConfig =  this.getClientConfig()
            this.kafkaInstance = new Kafka(kafkaConfig)
        }
        return this.kafkaInstance
    }

    private getClientConfig(){
        console.log(this.KAFKA_BROKER_URL_1)
        return {
            brokers: [this.KAFKA_BROKER_URL_1, this.KAFKA_BROKER_URL_2, this.KAFKA_BROKER_URL_3]
        }
    }
}
