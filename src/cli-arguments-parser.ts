import * as parseArgs from "minimist";
import * as fs from "fs";
import * as path from "path";
import {Adapter} from "./adapter";
import {Command} from "./command";

export function GetAdapter(): Adapter {
    return Adapter.Postgres;
}

export function GetConnectionString(): string {
    let connectionString = ReadConfigValue('connectionString');

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

const CONFIG_FILE_NAME = path.join(process.cwd(), './asmr-conf.json');

function ReadConfigValue(option: string): string {
    if (!fs.existsSync(CONFIG_FILE_NAME)) {
        return null;
    }

    const configFileData = fs.readFileSync(CONFIG_FILE_NAME, 'utf-8');
    let config = null;

    try {
        config = JSON.parse(configFileData)
    } catch {
        throw `Error parsing asmr-conf.json`;
    }

    if (config[option]) {
        return config[option].toString();
    }

    return null;
}

function GetOption(...option: string[]) {
    const argv = parseArgs(process.argv.slice(2));

    for (const opt of option) {
        if (argv[opt]) {
            return argv[opt];
        }
    }
}
