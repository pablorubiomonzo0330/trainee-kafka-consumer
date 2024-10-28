import {validate} from "jsonschema";
export class Validator{

    public static validateShipmentLossEvent(message: unknown, schema: unknown): void{
        console.log(message)
        const validationErrors = validate(message, schema).errors
        const reasons = validationErrors.map((error: Error) => error.stack)
        if (reasons && reasons.length > 0){
            throw new Error(reasons.toString())
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