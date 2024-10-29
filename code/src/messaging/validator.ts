import {validate} from "jsonschema";
import {logger} from "../utils";
import {DeadLetterQueue} from "../services/dead-letter-queue";

export class Validator{

    public static async validateShipmentLossEvent(message: object, schema: object): Promise<void>{
        const validationErrors = validate(message, schema).errors
        const reasons = validationErrors.map((error: Error) => error.stack)
        if (reasons && reasons.length > 0){
            logger.error(reasons.toString())
            console.log("sendind message to DLQ")
            await new DeadLetterQueue().runProducer({message: message.toString(), reasons: reasons.toString()}).catch(e => console.log(e))
            console.log("Message sent to DLQ")
        } else {
            console.log("The shipment matches the schema")
        }
    }


    public static parseJson(body: string): unknown{
        try{
            return JSON.parse(body)
        }catch {
            throw new Error("Event can´t be parsed")
        }
    }
}