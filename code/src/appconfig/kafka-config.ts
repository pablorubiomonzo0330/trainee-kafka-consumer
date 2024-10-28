import { Kafka } from 'kafkajs';
import {parse} from "yaml";
import * as fs from "fs"

// To set the configuration from Kafka through environment variables
// const kafkaConfig: KafkaConfig = { brokers: [`${process.env.KAFKA_HOST_NAME}${process.env.KAFKA_PORT}`] }

export class KafkaConfig{
    private kafkaInstance: Kafka | undefined

    constructor(
        private KAFKA_BROKER_URL = `${process.env.KAFKA_HOST_NAME}${process.env.KAFKA_PORT}`
    ){}

    public getKafkaInstance(){
        if (this.kafkaInstance === undefined){
            const kafkaConfig =  this.getClientConfig()
            this.kafkaInstance = new Kafka(kafkaConfig)
        }
        return this.kafkaInstance
    }

    private getClientConfig(){
        return {
            clientId: `trainee_kafkaproject`,
            brokers: [this.KAFKA_BROKER_URL]
        }
    }
}
