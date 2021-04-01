import {AsmrSuccess, AsmrWarning} from "../logging";
import {GetMigrationName} from "../cli-arguments-parser";
import * as fs from "fs";
import Migration from "../migration";
import * as rimraf from "rimraf";
import * as path from "path";

export async function Remove() {
    if (!EnsureMigrationsDirectoryExists()) {
        return;
    }

    const migrationName: string = GetMigrationName();
    await RemoveMigration(migrationName);
}

function EnsureMigrationsDirectoryExists(): boolean {
    if (!fs.existsSync('./migrations')) {
        AsmrWarning('No migrations directory found.');
        return false;
    }

    return true;
}

async function RemoveMigration(migrationName: string) {
    const migrations = await Migration.GetAllMigrations();
    const targetMigration = migrations.find(mig => mig.FriendlyName === migrationName);

    if (!targetMigration) {
        AsmrWarning(`No migration found with name '${migrationName}'`);
        return;
    }

    rimraf.sync(path.join(process.cwd(), `migrations/${targetMigration.Name}`));
    AsmrSuccess(`Successfully deleted migration '${migrationName}'`);
}
