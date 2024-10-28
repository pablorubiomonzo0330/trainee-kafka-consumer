import {KafkaConsumerService} from "../../src/services/kafkaConsumerService";

describe("ConsumerService test suite", () => {

    test("ConsumerService is connected properly", async () => {
        //Given
        const kafkaConsumerService = new KafkaConsumerService()
        const consumerConnect = jest.spyOn(kafkaConsumerService['consumer'], 'connect')
        const consumerRun =  jest.spyOn(kafkaConsumerService['consumer'], 'run').mockResolvedValue()
        const consumerSubscribe = jest.spyOn(kafkaConsumerService['consumer'], 'subscribe')
        //when
        await kafkaConsumerService.runConsumer()

        //then
        expect(consumerRun).toHaveBeenCalled()
        expect(consumerConnect).toHaveBeenCalled()
        expect(consumerSubscribe).toHaveBeenCalled()

    })
})