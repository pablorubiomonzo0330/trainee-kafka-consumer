import {ShipmentLossEventModel} from "./models/shipmentLossEventModel"
import * as log4js from "log4js"
import * as fs from "fs"


interface Payload {
    [key: string]: any
}

export function mapPayloadIntoShipmentLossEventModel(payload: Payload){
    return new ShipmentLossEventModel(
        payload["detailedState"], 
        payload["occurredOn"], 
        payload["partnerId"], 
        payload["positionItemsLost"], 
        payload["shipmentId"], 
        payload["trackingKey"], 
        payload["trackingUrl"])
}

log4js.configure({
    appenders: { lightfish: { type: "file", filename: "kafkaProjectErrors.log" } },
    categories: { default: { appenders: ["lightfish"], level: "error" } },
});

export const logger : log4js.Logger = log4js.getLogger()

export function getLogs(): void{
    fs.readFile("../struktur-von-jan/lightfishErrors.log", "utf-8", (err, data) => {
        if (err){
            console.error("Error reading log file: ", err)
            return
        }
        const array_of_errors : string[] = data.split("(Mitteleuropäische Sommerzeit)").reverse()
        array_of_errors.forEach(err => {
            console.log(err)
        })

    })
}


