import * as parseArgs from "minimist";
import {Adapter} from "./adapter";
import {Command} from "./command";

require('dotenv').config();

export function GetAdapter(): Adapter {
    return Adapter.Postgres;
}

export function GetConnectionString(): string {
    let connectionString = ReadEnvironmentValue('CONNECTION_STRING');

    if (connectionString) {
        return connectionString;
    }

    connectionString = GetOption('c', 'connectionString');

    if (!connectionString) {
        throw new Error(`No --connectionString (-c) argument provided.`)
    }

    return connectionString;
}

export function GetMigrationName(): string {
    const migrationName = GetOption('m', 'migration');

    if (!migrationName) {
        throw new Error(`No --migration (-m) argument provided.`)
    }

    return migrationName;
}

export function GetDownCount(): number {
    const number = GetOption('n', 'number');

    if (!number) {
        return 1;
    }

    return number;
}

export function GetCommand(): Command {
    const args: string[] = process.argv.slice(2);
    return <Command> args[0];
}

function ReadEnvironmentValue(option: string): string {
    return process.env[option];
}

function GetOption(...option: string[]) {
    const argv = parseArgs(process.argv.slice(2));

    for (const opt of option) {
        if (argv[opt]) {
            return argv[opt];
        }
    }
}
