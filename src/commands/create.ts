import {GetMigrationName} from "../cli-arguments-parser";
import {AsmrLog, AsmrSuccess} from "../logging";
import * as fs from "fs";
import Migration from "../migration";

export async function Create() {
    const migrationName: string = GetMigrationName();

    await EnsureMigrationsDirectoryExists();
    await EnsureMigrationDoesNotExist(migrationName);
    await CreateMigration(migrationName);

    AsmrSuccess(`Migration '${migrationName}' successfully created.`);
}

async function EnsureMigrationsDirectoryExists() {
    if (!fs.existsSync('./migrations')) {
        AsmrLog('Migrations directory not found. Creating ...');
        fs.mkdirSync('./migrations');
    }
}

async function CreateMigration(migrationName: string) {
    const time = `${Date.now()}`;

    fs.mkdirSync(`./migrations/${time}-${migrationName}`);
    WriteMigrationFile('up');
    WriteMigrationFile('down');
    WriteMigrationFile('seed');

    function WriteMigrationFile(direction) {
        fs.writeFileSync(`./migrations/${time}-${migrationName}/${direction}.sql`, `-- ASMR: ${migrationName} - ${direction} migration`);
    }
}

async function EnsureMigrationDoesNotExist(migrationName: string) {
    const migrations = await Migration.GetAllMigrations();
    const exists = migrations.find(mig => mig.FriendlyName === migrationName);

    if (exists) {
        throw new Error(`Migration '${migrationName}' already exists in migrations directory.`);
    }
}
