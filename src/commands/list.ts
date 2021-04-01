import {AsmrLog} from "../logging";
import {AdapterFactory} from "../adapter";
import Migration from "../migration";
import HexColours from "../hex-colours";

export async function List() {
    const migrations = await Migration.GetAllMigrations();
    let executedMigrations = [];
    const adapter = await AdapterFactory();

    try {
        executedMigrations = await adapter.GetExecutedMigrations();
    } finally {
        await adapter.Close();
    }

    AsmrLog("Migrations: ");

    for (const migration of migrations) {
        const isExecuted = executedMigrations.find(executed => executed.Name == migration.Name);

        if (isExecuted) {
            AsmrLog(`- ${migration.FriendlyName} (already run)`, HexColours.Blue);
        } else {
            AsmrLog(`- ${migration.FriendlyName}`, HexColours.Grey);
        }
    }
}
