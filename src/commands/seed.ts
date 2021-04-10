import {AsmrLog, AsmrSuccess} from "../logging";
import {AdapterFactory} from "../adapter";
import Migration from "../migration";

export async function Seed() {
    const adapter = await AdapterFactory();

    try {
        const migrations = await Migration.GetAllMigrations();
        const seededMigrations = await adapter.GetSeededMigrations();

        for (const migration of migrations) {
            const isExecuted = seededMigrations.find(x => x.Name === migration.Name);

            if (isExecuted) {
                continue;
            }

            AsmrLog(`Seeding ${migration.FriendlyName}...`);
            await adapter.ExecuteSeed(migration);
            await adapter.WriteSeededMigrationLog(migration);
        }

        AsmrSuccess(`Finished seeding data`);
    } finally {
        await adapter.Close();
    }
}
