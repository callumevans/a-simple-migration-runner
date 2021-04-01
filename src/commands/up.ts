import {AsmrLog, AsmrSuccess} from "../logging";
import {AdapterFactory} from "../adapter";
import Migration from "../migration";
import HexColours from "../hex-colours";

export async function Up() {
    const adapter = await AdapterFactory();

    try {
        const migrations = await Migration.GetAllMigrations();
        const executedMigrations = await adapter.GetExecutedMigrations();

        if (migrations.length < 1) {
            AsmrLog('No migrations found');
            return;
        }

        AsmrLog(`Migrations: `);

        const migrationsToRun: Migration[] = [];

        for (const migration of migrations) {
            const isExecuted = executedMigrations.find(x => x.Name === migration.Name);

            if (isExecuted) {
                AsmrLog(`- ${migration.Name} (already run)`, HexColours.Blue);
            } else {
                AsmrLog(`- ${migration.Name}`, HexColours.Grey);
                migrationsToRun.push(migration);
            }
        }

        if (migrationsToRun.length < 1) {
            AsmrLog('No migrations to run');
            return;
        }

        for (const migration of migrationsToRun) {
            await adapter.ExecuteUpMigration(migration);
            await adapter.WriteUpMigrationLog(migration);

            AsmrLog(`Successfully ran '${migration.Name}'`);
        }

        AsmrSuccess(`Successfully ran ${migrationsToRun.length} migration${migrationsToRun.length < 2 ? '' : 's'}`);
    } finally {
        await adapter.Close();
    }
}
