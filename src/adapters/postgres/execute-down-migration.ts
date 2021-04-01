import * as postgres from "postgres";
import Migration from "../../migration";

export async function ExecuteDownMigration(sql: postgres, migration: Migration) {
    const path = await migration.DownMigrationPath();

    await sql.begin(async sql => {
        await sql.file(path);
    });
}
