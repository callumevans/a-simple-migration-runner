import {AsmrLog, AsmrSuccess, AsmrWarning} from "../logging";
import {AdapterFactory} from "../adapter";
import Migration from "../migration";
import HexColours from "../hex-colours";

export async function Reset() {
    const adapter = await AdapterFactory();

    try {
        const executedMigrations = await adapter.GetExecutedMigrations();

        AsmrLog(`Migrations to run down: `);

        const migrationsToRun: Migration[] = [];

        for (let i = executedMigrations.length - 1; i >= 0; i--) {
            AsmrLog(` - ${executedMigrations[i].Name}`, HexColours.Grey);
            migrationsToRun.push(executedMigrations[i]);
        }

        if (migrationsToRun.length < 1) {
            AsmrWarning('No migrations to run down.');
            return;
        }

        for (const migration of migrationsToRun) {
            await adapter.ExecuteDownMigration(migration);
            await adapter.WriteDownMigrationLog(migration);

            AsmrLog(`Successfully ran down '${migration.Name}'`);
        }

        AsmrSuccess(`Successfully ran down ${migrationsToRun.length} migration${migrationsToRun.length < 2 ? '' : 's'}`);
    } finally {
        await adapter.Close();
    }
}
