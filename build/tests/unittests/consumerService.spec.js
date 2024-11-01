"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkaConsumerService_1 = require("../../src/services/kafkaConsumerService");
describe("ConsumerService test suite", () => {
    test("ConsumerService is connected properly", () => __awaiter(void 0, void 0, void 0, function* () {
        //Given
        const kafkaConsumerService = new kafkaConsumerService_1.KafkaConsumerService();
        const consumerConnect = jest.spyOn(kafkaConsumerService['consumer'], 'connect');
        const consumerRun = jest.spyOn(kafkaConsumerService['consumer'], 'run');
        const consumerSubscribe = jest.spyOn(kafkaConsumerService['consumer'], 'subscribe');
        //when
        yield kafkaConsumerService.runConsumer();
        //then
        expect(consumerRun).toHaveBeenCalled();
        expect(consumerConnect).toHaveBeenCalled();
        expect(consumerSubscribe).toHaveBeenCalled();
    }));
});
