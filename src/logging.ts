import * as chalk from "chalk";
import HexColours from "./hex-colours";

export function AsmrLog(message: string, hex: string = HexColours.White) {
    console.log(`${chalk.hex(hex)(message)}`)
}

export function AsmrSuccess(message: string) {
    AsmrLog(message, HexColours.Green);
}

export function AsmrWarning(message: string) {
    console.warn(`${chalk.hex(HexColours.Yellow)(message)}`);
}

export function AsmrError(message: string) {
    console.error(`${chalk.hex(HexColours.Red)(message)}`)
}
